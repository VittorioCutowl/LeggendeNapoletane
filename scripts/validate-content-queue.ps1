$ErrorActionPreference = "Stop"

$queueDir = Join-Path (Get-Location) "content_queue"
$rootDir = Get-Location
$advancedDesignStatuses = @("figma_done", "approved", "scheduled", "published")
$finalApprovalStatuses = @("approved", "scheduled", "published")
$requiredFigmaLayers = @("image", "fondino", "eyebrow", "title", "description", "source", "logo", "footer")
$allowedStatus = @(
  "idea",
  "brief_ready",
  "draft_ready",
  "fact_check_needed",
  "fact_checked",
  "design_ready",
  "figma_done",
  "approved",
  "scheduled",
  "published",
  "archived"
)

$requiredTopLevel = @(
  "post_id",
  "status",
  "priority",
  "topic",
  "angle",
  "target",
  "editorial_owner",
  "sources",
  "claims",
  "cover",
  "slides",
  "caption",
  "design_notes",
  "production_preflight",
  "figma",
  "fact_check",
  "approvals",
  "publication",
  "performance",
  "blocked"
)

function Assert-Field($Object, [string]$Field, [string]$Path) {
  if (-not ($Object.PSObject.Properties.Name -contains $Field)) {
    throw "$Path manca $Field"
  }
}

function Assert-Fields($Object, [string[]]$Fields, [string]$Path) {
  foreach ($field in $Fields) {
    Assert-Field $Object $field $Path
  }
}

function Read-JsonFile([string]$Path) {
  $text = Get-Content -Raw -Encoding UTF8 -LiteralPath $Path
  if ($text.IndexOf([char]0x00C3) -ge 0 -or $text.IndexOf([char]0x00C2) -ge 0 -or $text.IndexOf([char]0xFFFD) -ge 0) {
    throw "$Path possibile encoding corrotto, trovati caratteri mojibake"
  }
  return $text | ConvertFrom-Json
}

function Get-RelativePath([string]$Path) {
  $rootPath = [System.IO.Path]::GetFullPath($rootDir.Path)
  if (-not $rootPath.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
    $rootPath = "$rootPath$([System.IO.Path]::DirectorySeparatorChar)"
  }
  $targetPath = [System.IO.Path]::GetFullPath($Path)
  $rootUri = [System.Uri]::new($rootPath)
  $targetUri = [System.Uri]::new($targetPath)
  $relative = [System.Uri]::UnescapeDataString($rootUri.MakeRelativeUri($targetUri).ToString())
  return $relative.Replace("\", "/")
}

function Get-ExpectedAssetSize([string]$AssetFormat) {
  switch ($AssetFormat) {
    "1080x1350" { return @{ width = 1080; height = 1350 } }
    "1080x1080" { return @{ width = 1080; height = 1080 } }
    "1080x1920" { return @{ width = 1080; height = 1920 } }
    default { return $null }
  }
}

function Assert-LocalImageSize([string]$AssetPath, $ExpectedSize) {
  if (-not (Test-Path -LiteralPath $AssetPath)) {
    return
  }

  Add-Type -AssemblyName System.Drawing
  $image = [System.Drawing.Image]::FromFile($AssetPath)
  try {
    if ($image.Width -ne $ExpectedSize.width -or $image.Height -ne $ExpectedSize.height) {
      throw "$AssetPath dimensioni $($image.Width)x$($image.Height), attese $($ExpectedSize.width)x$($ExpectedSize.height)"
    }
  }
  finally {
    $image.Dispose()
  }
}

function Validate-Manifest($Post, [string]$PostPath) {
  if (-not $Post.figma.manifest_path) {
    if ($advancedDesignStatuses -contains $Post.status) {
      throw "$PostPath $($Post.status) richiede figma.manifest_path"
    }
    return
  }

  $manifestPath = Join-Path $rootDir $Post.figma.manifest_path
  if (-not (Test-Path -LiteralPath $manifestPath)) {
    throw "$PostPath manifest Figma non trovato: $($Post.figma.manifest_path)"
  }

  $manifest = Read-JsonFile $manifestPath
  Assert-Fields $manifest @(
    "schema_version",
    "post_id",
    "status",
    "source_post",
    "asset_rules",
    "import_mode",
    "template_contract",
    "layout_rules",
    "slides",
    "figma"
  ) "$manifestPath"

  if ($manifest.post_id -ne $Post.post_id) {
    throw "$manifestPath post_id non coincide con $($Post.post_id)"
  }
  $expectedSourcePost = Get-RelativePath $PostPath
  if ($manifest.source_post -ne $expectedSourcePost) {
    throw "$manifestPath source_post deve puntare a $expectedSourcePost"
  }
  if (@("draft", "in_progress", "ready_for_review", "approved", "done") -notcontains $manifest.status) {
    throw "$manifestPath status manifest non consentito: $($manifest.status)"
  }
  if ($advancedDesignStatuses -contains $Post.status -and $manifest.status -ne "done") {
    throw "$manifestPath $($Post.status) richiede manifest.status done"
  }
  if (-not $manifest.slides -or $manifest.slides.Count -ne $Post.slides.Count) {
    throw "$manifestPath numero slide manifest diverso dal JSON operativo"
  }
  if ($Post.production_preflight.asset_count -ne $manifest.slides.Count) {
    throw "$PostPath production_preflight.asset_count non coincide con le slide manifest"
  }
  if ($advancedDesignStatuses -contains $Post.status -and (-not $Post.figma.file_url -or -not $Post.figma.node_url)) {
    throw "$PostPath $($Post.status) richiede figma.file_url e figma.node_url"
  }
  if (-not $manifest.figma.file_url -or -not $manifest.figma.node_url) {
    throw "$manifestPath figma.file_url e figma.node_url devono essere compilati"
  }
  if ($manifest.asset_rules.no_text_in_assets -ne $true) {
    throw "$manifestPath asset_rules.no_text_in_assets deve essere true"
  }

  $expectedSize = Get-ExpectedAssetSize $Post.production_preflight.asset_format
  if ($expectedSize) {
    if ($manifest.asset_rules.width -ne $expectedSize.width -or $manifest.asset_rules.height -ne $expectedSize.height) {
      throw "$manifestPath asset_rules width/height non coerenti con $($Post.production_preflight.asset_format)"
    }
    if ($manifest.layout_rules.format_px.width -ne $expectedSize.width -or $manifest.layout_rules.format_px.height -ne $expectedSize.height) {
      throw "$manifestPath layout_rules.format_px non coerente con $($Post.production_preflight.asset_format)"
    }
  }

  Assert-Fields $manifest.template_contract @("template_source", "required_layers") "$manifestPath template_contract"
  foreach ($layer in $requiredFigmaLayers) {
    if ($manifest.template_contract.required_layers -notcontains $layer) {
      throw "$manifestPath template_contract.required_layers manca $layer"
    }
  }

  $manifestSlideNumbers = @{}
  foreach ($slide in $manifest.slides) {
    Assert-Fields $slide @("slide_number", "frame_name", "asset_path", "title", "copy", "visual_note", "figma_layers") "$manifestPath slides[]"
    if ($manifestSlideNumbers.ContainsKey([string]$slide.slide_number)) {
      throw "$manifestPath slide_number duplicato $($slide.slide_number)"
    }
    $manifestSlideNumbers[[string]$slide.slide_number] = $true
    if ($advancedDesignStatuses -contains $Post.status -and (-not $slide.figma_frame_id -or -not $slide.figma_bitmap_layer_id)) {
      throw "$manifestPath slide $($slide.slide_number) richiede figma_frame_id e figma_bitmap_layer_id"
    }
    foreach ($layer in $requiredFigmaLayers) {
      Assert-Field $slide.figma_layers $layer "$manifestPath slide $($slide.slide_number) figma_layers"
      if (-not $slide.figma_layers.$layer.name) {
        throw "$manifestPath slide $($slide.slide_number) manca figma_layers.$layer.name"
      }
    }

    if ($expectedSize) {
      $assetPath = Join-Path $rootDir $slide.asset_path
      Assert-LocalImageSize $assetPath $expectedSize
    }
  }
}

function Validate-Post($Post, [string]$Path) {
  Assert-Fields $Post $requiredTopLevel $Path

  if ($Post.post_id -notmatch '^\d{4}-\d{2}-\d{2}-post-\d{2}-[a-z0-9-]+$') {
    throw "$Path post_id non segue YYYY-MM-DD-post-XX-slug"
  }
  if ($allowedStatus -notcontains $Post.status) {
    throw "$Path status non consentito: $($Post.status)"
  }
  if (-not $Post.sources -or $Post.sources.Count -lt 1) {
    throw "$Path sources deve avere almeno una voce"
  }
  if (-not $Post.slides -or $Post.slides.Count -lt 1) {
    throw "$Path slides deve avere almeno una slide"
  }

  $sourceIds = @{}
  foreach ($source in $Post.sources) {
    Assert-Fields $source @("source_id", "title", "type", "status", "url", "checked_at") "$Path sources[]"
    if ($sourceIds.ContainsKey($source.source_id)) {
      throw "$Path source_id duplicato $($source.source_id)"
    }
    $sourceIds[$source.source_id] = $true
  }

  $claimIds = @{}
  foreach ($claim in $Post.claims) {
    Assert-Fields $claim @("claim_id", "text", "source_ids", "evidence", "caveat", "status") "$Path claims[]"
    if ($claimIds.ContainsKey($claim.claim_id)) {
      throw "$Path claim_id duplicato $($claim.claim_id)"
    }
    $claimIds[$claim.claim_id] = $true
    foreach ($sourceId in $claim.source_ids) {
      if (-not $sourceIds.ContainsKey($sourceId)) {
        throw "$Path claim $($claim.claim_id) punta a source mancante $sourceId"
      }
    }
  }

  $slideNumbers = @{}
  foreach ($slide in $Post.slides) {
    Assert-Fields $slide @("slide_number", "role", "title", "copy", "visual_note", "source_ids") "$Path slides[]"
    if ($slideNumbers.ContainsKey([string]$slide.slide_number)) {
      throw "$Path slide_number duplicato $($slide.slide_number)"
    }
    $slideNumbers[[string]$slide.slide_number] = $true
    foreach ($sourceId in $slide.source_ids) {
      if (-not $sourceIds.ContainsKey($sourceId)) {
        throw "$Path slide $($slide.slide_number) punta a source mancante $sourceId"
      }
    }
  }

  Assert-Fields $Post.approvals @("editorial", "fact_check", "cover", "design", "final") "$Path approvals"
  Assert-Fields $Post.production_preflight @("status", "checked_at", "asset_format", "asset_count", "checks", "notes") "$Path production_preflight"
  Assert-Fields $Post.production_preflight.checks @(
    "cover_approved",
    "manifest_matches_slides",
    "assets_named_and_sized",
    "assets_have_no_text_logo_sources",
    "copy_line_budget_ok",
    "figma_template_layers_ready",
    "figma_qa_sample_done"
  ) "$Path production_preflight.checks"

  if ($Post.status -eq "fact_checked" -and $Post.fact_check.status -ne "passed") {
    throw "$Path fact_checked richiede fact_check.status passed"
  }
  if ($Post.status -eq "design_ready" -and $Post.approvals.editorial.status -ne "approved") {
    throw "$Path design_ready richiede approvals.editorial approved"
  }
  if ($Post.status -eq "figma_done" -and $Post.figma.status -ne "done") {
    throw "$Path figma_done richiede figma.status done"
  }
  if ($Post.status -eq "figma_done" -and $Post.approvals.cover.status -ne "approved") {
    throw "$Path figma_done richiede approvals.cover approved"
  }
  if ($advancedDesignStatuses -contains $Post.status -and $Post.figma.status -ne "done") {
    throw "$Path $($Post.status) richiede figma.status done"
  }
  if ($finalApprovalStatuses -contains $Post.status -and $Post.approvals.design.status -ne "approved") {
    throw "$Path $($Post.status) richiede approvals.design approved"
  }
  if ($finalApprovalStatuses -contains $Post.status -and $Post.approvals.final.status -ne "approved") {
    throw "$Path $($Post.status) richiede approvals.final approved"
  }
  if ($advancedDesignStatuses -contains $Post.status -and $Post.production_preflight.status -ne "passed") {
    throw "$Path $($Post.status) richiede production_preflight.status passed"
  }
  if ($advancedDesignStatuses -contains $Post.status) {
    foreach ($checkName in $Post.production_preflight.checks.PSObject.Properties.Name) {
      if ($Post.production_preflight.checks.$checkName -ne $true) {
        throw "$Path $($Post.status) richiede production_preflight.checks.$checkName true"
      }
    }
  }
  Validate-Manifest $Post $Path
  if ($Post.status -eq "scheduled" -and $Post.publication.status -ne "scheduled") {
    throw "$Path scheduled richiede publication.status scheduled"
  }
  if ($Post.status -eq "scheduled" -and -not $Post.publication.scheduled_at) {
    throw "$Path scheduled richiede publication.scheduled_at compilato"
  }
  if ($Post.status -eq "published" -and $Post.publication.status -ne "published") {
    throw "$Path published richiede publication.status published"
  }
  if ($Post.status -eq "published" -and (-not $Post.publication.scheduled_at -or -not $Post.publication.published_at -or -not $Post.publication.published_url)) {
    throw "$Path published richiede scheduled_at, published_at e published_url compilati"
  }
}

$files = Get-ChildItem -Path $queueDir -Filter "*.json" |
  Where-Object { $_.Name -notin @("content_queue.schema.json", "template.json", "esempio-post.json") }

foreach ($file in $files) {
  $post = Read-JsonFile $file.FullName
  Validate-Post $post $file.FullName
}

Write-Output "Content queue valida: $($files.Count) file controllati."
