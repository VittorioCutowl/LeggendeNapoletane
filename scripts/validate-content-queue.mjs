import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const queueDir = path.join(root, "content_queue");
const advancedDesignStatuses = new Set(["figma_done", "approved", "scheduled", "published"]);
const finalApprovalStatuses = new Set(["approved", "scheduled", "published"]);
const requiredFigmaLayers = ["image", "fondino", "eyebrow", "title", "description", "source", "logo", "footer"];
const expectedAssetSizes = {
  "1080x1350": { width: 1080, height: 1350 },
  "1080x1080": { width: 1080, height: 1080 },
  "1080x1920": { width: 1080, height: 1920 }
};
const schedulingStatuses = new Set(["scheduled", "published"]);
const warnings = [];
const allowedStatus = new Set([
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
]);

const requiredTopLevel = [
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
];

function readJson(file) {
  const text = fs.readFileSync(file, "utf8");
  if (/[ÃÂ�]/.test(text)) {
    throw new Error(`${file}: possibile encoding corrotto, trovati caratteri mojibake`);
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${file}: JSON non valido: ${error.message}`);
  }
}

function requireFields(file, object, fields, prefix = "") {
  for (const field of fields) {
    if (!(field in object)) {
      throw new Error(`${file}: manca ${prefix}${field}`);
    }
  }
}

function normalizeRelative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function warn(message) {
  warnings.push(message);
}

function readImageSize(file) {
  const buffer = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();

  if (ext === ".png" && buffer.length >= 24 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if ((ext === ".jpg" || ext === ".jpeg") && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }

  throw new Error(`${file}: formato immagine non supportato per controllo dimensioni`);
}

function validateManifest(file, post) {
  if (!post.figma.manifest_path) {
    if (advancedDesignStatuses.has(post.status)) {
      throw new Error(`${file}: ${post.status} richiede figma.manifest_path`);
    }
    return;
  }

  const manifestFile = path.join(root, post.figma.manifest_path);
  if (!fs.existsSync(manifestFile)) {
    throw new Error(`${file}: manifest Figma non trovato: ${post.figma.manifest_path}`);
  }

  const manifest = readJson(manifestFile);
  requireFields(manifestFile, manifest, [
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
  ]);

  if (manifest.post_id !== post.post_id) {
    throw new Error(`${manifestFile}: post_id non coincide con ${post.post_id}`);
  }
  if (manifest.source_post !== normalizeRelative(file)) {
    throw new Error(`${manifestFile}: source_post deve puntare a ${normalizeRelative(file)}`);
  }
  if (!["draft", "in_progress", "ready_for_review", "approved", "done"].includes(manifest.status)) {
    throw new Error(`${manifestFile}: status manifest non consentito: ${manifest.status}`);
  }
  if (advancedDesignStatuses.has(post.status) && manifest.status !== "done") {
    throw new Error(`${manifestFile}: ${post.status} richiede manifest.status done`);
  }
  if (!Array.isArray(manifest.slides) || manifest.slides.length !== post.slides.length) {
    throw new Error(`${manifestFile}: numero slide manifest diverso dal JSON operativo`);
  }
  if (post.production_preflight.asset_count !== manifest.slides.length) {
    throw new Error(`${file}: production_preflight.asset_count non coincide con le slide manifest`);
  }
  if (!post.figma.file_url || !post.figma.node_url) {
    if (advancedDesignStatuses.has(post.status)) {
      throw new Error(`${file}: ${post.status} richiede figma.file_url e figma.node_url`);
    }
  }
  if (!manifest.figma.file_url || !manifest.figma.node_url) {
    throw new Error(`${manifestFile}: figma.file_url e figma.node_url devono essere compilati`);
  }
  if (post.figma.file_url && manifest.figma.file_url && post.figma.file_url !== manifest.figma.file_url) {
    throw new Error(`${manifestFile}: figma.file_url non coincide con il JSON operativo`);
  }
  if (manifest.asset_rules.no_text_in_assets !== true) {
    throw new Error(`${manifestFile}: asset_rules.no_text_in_assets deve essere true`);
  }

  const expectedSize = expectedAssetSizes[post.production_preflight.asset_format];
  if (expectedSize) {
    if (manifest.asset_rules.width !== expectedSize.width || manifest.asset_rules.height !== expectedSize.height) {
      throw new Error(`${manifestFile}: asset_rules width/height non coerenti con ${post.production_preflight.asset_format}`);
    }
    if (manifest.layout_rules.format_px.width !== expectedSize.width || manifest.layout_rules.format_px.height !== expectedSize.height) {
      throw new Error(`${manifestFile}: layout_rules.format_px non coerente con ${post.production_preflight.asset_format}`);
    }
  }

  requireFields(manifestFile, manifest.template_contract, ["template_source", "required_layers"], "template_contract.");
  for (const layer of requiredFigmaLayers) {
    if (!manifest.template_contract.required_layers.includes(layer)) {
      throw new Error(`${manifestFile}: template_contract.required_layers manca ${layer}`);
    }
  }

  const manifestSlideNumbers = new Set();
  const assetPaths = new Map();
  const lastSlideNumber = Math.max(...manifest.slides.map((slide) => slide.slide_number));
  for (const slide of manifest.slides) {
    requireFields(manifestFile, slide, ["slide_number", "frame_name", "asset_path", "title", "copy", "visual_note", "figma_layers"], "slides[].");
    if (manifestSlideNumbers.has(slide.slide_number)) {
      throw new Error(`${manifestFile}: slide_number duplicato ${slide.slide_number}`);
    }
    manifestSlideNumbers.add(slide.slide_number);
    if (slide.asset_path) {
      const previousSlide = assetPaths.get(slide.asset_path);
      if (previousSlide) {
        warn(`${manifestFile}: asset_path duplicato ${slide.asset_path} su slide ${previousSlide} e ${slide.slide_number}; dichiarare eccezione se intenzionale`);
      }
      assetPaths.set(slide.asset_path, slide.slide_number);
    }
    if (advancedDesignStatuses.has(post.status) && (!slide.figma_frame_id || !slide.figma_bitmap_layer_id)) {
      throw new Error(`${manifestFile}: slide ${slide.slide_number} richiede figma_frame_id e figma_bitmap_layer_id`);
    }
    for (const layer of requiredFigmaLayers) {
      if (!slide.figma_layers[layer] || !slide.figma_layers[layer].name) {
        throw new Error(`${manifestFile}: slide ${slide.slide_number} manca figma_layers.${layer}.name`);
      }
    }
    const sourceLayer = slide.figma_layers.source;
    if (sourceLayer && sourceLayer.visible === true && slide.slide_number !== lastSlideNumber) {
      throw new Error(`${manifestFile}: slide ${slide.slide_number} ha source visibile ma solo l'ultima card puo mostrarlo`);
    }
    if (sourceLayer && sourceLayer.visible === false && slide.slide_number === lastSlideNumber) {
      warn(`${manifestFile}: ultima slide ${slide.slide_number} dichiara source non visibile; verificare policy fonti`);
    }

    const assetFile = path.join(root, slide.asset_path);
    if (fs.existsSync(assetFile) && expectedSize) {
      const size = readImageSize(assetFile);
      if (size.width !== expectedSize.width || size.height !== expectedSize.height) {
        throw new Error(`${assetFile}: dimensioni ${size.width}x${size.height}, attese ${expectedSize.width}x${expectedSize.height}`);
      }
    } else if (
      advancedDesignStatuses.has(post.status) &&
      slide.asset_path &&
      !slide.asset_path.startsWith("http") &&
      slide.asset_origin !== "figma_only" &&
      slide.local_file_required !== false
    ) {
      warn(`${manifestFile}: asset locale non trovato per slide ${slide.slide_number}: ${slide.asset_path}; dichiarare asset_origin figma_only o local_file_required false se e solo in Figma`);
    }
  }
}

function validatePost(file, post) {
  requireFields(file, post, requiredTopLevel);

  if (!/^\d{4}-\d{2}-\d{2}-post-\d{2}-[a-z0-9-]+$/.test(post.post_id)) {
    throw new Error(`${file}: post_id non segue YYYY-MM-DD-post-XX-slug`);
  }
  if (!allowedStatus.has(post.status)) {
    throw new Error(`${file}: status non consentito: ${post.status}`);
  }
  if (!Array.isArray(post.sources) || post.sources.length < 1) {
    throw new Error(`${file}: sources deve avere almeno una voce`);
  }
  if (!Array.isArray(post.claims)) {
    throw new Error(`${file}: claims deve essere array`);
  }
  if (!Array.isArray(post.slides) || post.slides.length < 1) {
    throw new Error(`${file}: slides deve avere almeno una slide`);
  }

  const sourceIds = new Set();
  for (const source of post.sources) {
    requireFields(file, source, ["source_id", "title", "type", "status", "url", "checked_at"], "sources[].");
    if (sourceIds.has(source.source_id)) {
      throw new Error(`${file}: source_id duplicato ${source.source_id}`);
    }
    sourceIds.add(source.source_id);
  }

  const claimIds = new Set();
  for (const claim of post.claims) {
    requireFields(file, claim, ["claim_id", "text", "source_ids", "evidence", "caveat", "status"], "claims[].");
    if (claimIds.has(claim.claim_id)) {
      throw new Error(`${file}: claim_id duplicato ${claim.claim_id}`);
    }
    claimIds.add(claim.claim_id);
    for (const sourceId of claim.source_ids || []) {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`${file}: claim ${claim.claim_id} punta a source mancante ${sourceId}`);
      }
    }
  }

  const unresolvedSources = post.sources.filter((source) => source.status === "to_verify");
  const unresolvedClaims = post.claims.filter((claim) => claim.status === "to_verify" || claim.status === "needs_context");
  const openIssues = Array.isArray(post.fact_check?.open_issues)
    ? post.fact_check.open_issues.filter((issue) => String(issue || "").trim())
    : [];
  if (schedulingStatuses.has(post.status) && (unresolvedSources.length || unresolvedClaims.length || openIssues.length)) {
    throw new Error(`${file}: ${post.status} non puo avere fonti to_verify, claim aperti o fact_check.open_issues senza risoluzione`);
  }
  if (post.status === "approved" && (unresolvedSources.length || unresolvedClaims.length || openIssues.length)) {
    warn(`${file}: approved con residui da decidere prima di scheduled (${unresolvedSources.length} fonti, ${unresolvedClaims.length} claim, ${openIssues.length} open issue)`);
  }

  const slideNumbers = new Set();
  for (const slide of post.slides) {
    requireFields(file, slide, ["slide_number", "role", "title", "copy", "visual_note", "source_ids"], "slides[].");
    if (slideNumbers.has(slide.slide_number)) {
      throw new Error(`${file}: slide_number duplicato ${slide.slide_number}`);
    }
    slideNumbers.add(slide.slide_number);
    for (const sourceId of slide.source_ids || []) {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`${file}: slide ${slide.slide_number} punta a source mancante ${sourceId}`);
      }
    }
  }

  requireFields(file, post.approvals, ["editorial", "fact_check", "cover", "design", "final"], "approvals.");
  requireFields(file, post.production_preflight, ["status", "checked_at", "asset_format", "asset_count", "checks", "notes"], "production_preflight.");
  requireFields(file, post.production_preflight.checks, [
    "cover_approved",
    "manifest_matches_slides",
    "assets_named_and_sized",
    "assets_have_no_text_logo_sources",
    "copy_line_budget_ok",
    "figma_template_layers_ready",
    "figma_qa_sample_done"
  ], "production_preflight.checks.");

  if (post.status === "fact_checked" && post.fact_check.status !== "passed") {
    throw new Error(`${file}: fact_checked richiede fact_check.status passed`);
  }
  if (post.status === "design_ready" && post.approvals.editorial.status !== "approved") {
    throw new Error(`${file}: design_ready richiede approvals.editorial approved`);
  }
  if (post.status === "figma_done" && post.figma.status !== "done") {
    throw new Error(`${file}: figma_done richiede figma.status done`);
  }
  if (post.status === "figma_done" && post.approvals.cover.status !== "approved") {
    throw new Error(`${file}: figma_done richiede approvals.cover approved`);
  }
  if (advancedDesignStatuses.has(post.status) && post.figma.status !== "done") {
    throw new Error(`${file}: ${post.status} richiede figma.status done`);
  }
  if (finalApprovalStatuses.has(post.status) && post.approvals.design.status !== "approved") {
    throw new Error(`${file}: ${post.status} richiede approvals.design approved`);
  }
  if (finalApprovalStatuses.has(post.status) && post.approvals.final.status !== "approved") {
    throw new Error(`${file}: ${post.status} richiede approvals.final approved`);
  }
  if (advancedDesignStatuses.has(post.status) && post.production_preflight.status !== "passed") {
    throw new Error(`${file}: ${post.status} richiede production_preflight.status passed`);
  }
  if (advancedDesignStatuses.has(post.status)) {
    for (const [checkName, value] of Object.entries(post.production_preflight.checks)) {
      if (value !== true) {
        throw new Error(`${file}: ${post.status} richiede production_preflight.checks.${checkName} true`);
      }
    }
  }
  validateManifest(file, post);
  if (post.status === "scheduled" && post.publication.status !== "scheduled") {
    throw new Error(`${file}: scheduled richiede publication.status scheduled`);
  }
  if (post.status === "scheduled" && !post.publication.scheduled_at) {
    throw new Error(`${file}: scheduled richiede publication.scheduled_at compilato`);
  }
  if (post.status === "published" && post.publication.status !== "published") {
    throw new Error(`${file}: published richiede publication.status published`);
  }
  if (post.status === "published" && (!post.publication.scheduled_at || !post.publication.published_at || !post.publication.published_url)) {
    throw new Error(`${file}: published richiede scheduled_at, published_at e published_url compilati`);
  }
}

const files = fs
  .readdirSync(queueDir)
  .filter((name) => name.endsWith(".json") && !["content_queue.schema.json", "template.json", "esempio-post.json"].includes(name))
  .map((name) => path.join(queueDir, name));

for (const file of files) {
  validatePost(file, readJson(file));
}

for (const message of warnings) {
  console.warn(`Warning: ${message}`);
}

console.log(`Content queue valida: ${files.length} file controllati.`);
