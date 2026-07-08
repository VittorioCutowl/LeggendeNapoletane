# Audit Visuale Post - 2026-07-07

## Scope

Audit su carousel presenti nel file Figma canonico:

- `2026-07-07-post-01-monaciello / Carousel`
- `2026-07-07-post-02-sirena-partenope - cloned from Monaciello approved`
- `2026-07-07-post-03-uovo-castel-dell-ovo / Carousel`
- `2026-07-07-post-04-fantasma-via-foria / Carousel`

Metodo:

- confronto manifest locali;
- controllo diretto Figma dei layer `image`;
- verifica `imageHash` dei fill immagine;
- confronto tra stato Figma e stato tracciato nel repository.

## Executive Summary

Problema principale confermato: **Monaciello contiene illustrazioni duplicate
nel Figma finale**.

Non risultano duplicati esatti nei layer immagine di Partenope, Uovo di Castel
dell'Ovo e Via Foria. Pero Partenope e Uovo sono montati in Figma ma non hanno
ancora JSON operativo, copy approvato, manifest locale o lavagna nel repo.

## Findings

### P1 - Monaciello: duplicati reali in Figma

Post:
`2026-07-07-post-01-monaciello / Carousel`

Carousel Figma:
`https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv?node-id=4-2`

Duplicati trovati nei layer `image`:

| Slide | Titolo | Frame | Image layer | imageHash |
|---|---|---|---|---|
| 03 | La voce correva | `4:23` | `4:24` | `2c60c23bab7780f54ce748b058fd5bd3d1ac710a` |
| 04 | Un'ombra col cappuccio | `4:33` | `4:34` | `2c60c23bab7780f54ce748b058fd5bd3d1ac710a` |
| 05 | Dispetti e fortuna | `4:43` | `4:44` | `a5f154bcb03f5d0d15bf0750cc86a6cac47cffcf` |
| 06 | Il segreto del dono | `4:53` | `4:54` | `a5f154bcb03f5d0d15bf0750cc86a6cac47cffcf` |

Impatto:

- Slide 3 e 4 raccontano momenti diversi ma usano la stessa illustrazione.
- Slide 5 e 6 sono semanticamente vicine, ma il riuso dell'immagine fa sembrare
  il carousel meno curato.

### P1 - Monaciello: manifest locale non coincide con Figma

Manifest:
`outputs/figma/2026-07-07-post-01-monaciello-figma-map.json`

Il manifest dichiara lo stesso asset path per le slide 4, 5 e 6:

| Slide | Titolo | Asset dichiarato |
|---|---|---|
| 04 | Un'ombra col cappuccio | `04-monete-segrete.png` |
| 05 | Dispetti e fortuna | `04-monete-segrete.png` |
| 06 | Il segreto del dono | `04-monete-segrete.png` |

Ma l'asset index dichiara asset distinti che non risultano usati nel manifest:

- `06-mantello-cunicolo.png`
- `07-variante-tragica.png`

Impatto:

- La fonte strutturata non descrive correttamente il montaggio finale.
- Un futuro reimport o QA automatico rischia di reintrodurre duplicati.

### P2 - Asset Monaciello non presenti localmente

I path `outputs/figma/assets/2026-07-07-post-01-monaciello-v2/*.png` sono
referenziati da manifest e asset index, ma non risultano presenti nel workspace
tracciato.

Impatto:

- Non si puo rigenerare una contact sheet locale del Monaciello.
- Non si puo fare perceptual hash locale o sostituire asset senza recuperarli
  da Figma o rigenerarli.

### P2 - Partenope e Uovo sono in Figma ma fuori workflow repo

Carousel presenti in Figma:

- `2026-07-07-post-02-sirena-partenope - cloned from Monaciello approved`
- `2026-07-07-post-03-uovo-castel-dell-ovo / Carousel`

Risultato duplicati:

- Partenope: nessun `imageHash` duplicato tra gli 8 frame.
- Uovo: nessun `imageHash` duplicato tra gli 8 frame.

Problema:

- Non esistono file `content_queue/*.json` corrispondenti.
- Non esistono manifest locali corrispondenti.
- Non risultano in `content_queue/BOARD.md`.

Impatto:

- Sono post visualmente montati ma non governati dal workflow.
- Mancano fonti, claim, stato, approvals, preflight e tracciamento editoriale.

### P3 - Via Foria pulito sui duplicati

Post:
`2026-07-07-post-04-fantasma-via-foria / Carousel`

Carousel Figma:
`https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv?node-id=77-2`

Risultato:

- 9 frame.
- 9 layer `image`.
- 9 `imageHash` distinti.
- Manifest aggiornato con frame id e image layer id reali.

Nota:

- Resta da fare revisione editoriale finale prima di `approved`.

## Azioni Raccomandate

1. **Correggere Monaciello in Figma**
   - Rigenerare o recuperare asset distinti per slide 3/4 e 5/6.
   - Priorita: slide 4 `Un'ombra col cappuccio` e slide 6 `Il segreto del dono`.

2. **Allineare il manifest Monaciello**
   - Aggiornare `asset_path` slide 4, 5 e 6 in base agli asset effettivi.
   - Registrare i `figma_bitmap_layer_id` corretti dopo la sostituzione.

3. **Recuperare o rigenerare asset Monaciello localmente**
   - Portare nel workspace gli asset realmente usati o rigenerarli.
   - Salvare una contact sheet locale.

4. **Portare Partenope e Uovo nel workflow**
   - Creare `content_queue` JSON per entrambi.
   - Creare manifest Figma.
   - Aggiornare `BOARD.md`.
   - Fare fact-check e approvals prima di considerarli pronti.

5. **Aggiungere un controllo automatico**
   - Estendere `scripts/validate-content-queue.mjs` per fallire quando lo stesso
     `asset_path` compare su piu slide dello stesso manifest, salvo eccezione
     dichiarata.

## Stato Finale Audit

- Monaciello: `needs_fix` per duplicati visuali e manifest non coerente.
- Partenope: `untracked_in_repo`, nessun duplicato esatto in Figma.
- Uovo di Castel dell'Ovo: `untracked_in_repo`, nessun duplicato esatto in Figma.
- Via Foria: `figma_done`, nessun duplicato esatto in Figma.
