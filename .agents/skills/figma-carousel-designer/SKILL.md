---
name: figma-carousel-designer
description: Prepara specifiche visuali, asset, manifest e QA Figma per trasformare un carousel approvato in produzione.
---

# Figma Carousel Designer

Prepara specifiche visuali e manifest per trasformare un carousel approvato in
asset e montaggio Figma.

## Documenti Da Leggere Prima

- `AGENTS.md`
- `content_queue/README.md`
- `content_queue/BOARD.md`
- JSON operativo del post in `content_queue/`
- `brand/visual-style.md`
- `brand/tono-di-voce.md`
- `outputs/figma/README.md`
- `outputs/figma/figma-map.schema.json`
- `outputs/figma/ASSET_INDEX_TEMPLATE.md`
- eventuali audit in `outputs/audits/`

## Quando Usare La Skill

Usare questa skill solo quando il post e in stato:

- `design_ready`
- `figma_done` per revisioni o correzioni mirate gia approvate

## Regole Operative

- Non lavorare se `fact_check.status` non e `passed`.
- Non modificare copy approvato senza segnalarlo.
- Seguire la sequenza: proposta cover, approvazione cover, batch immagini,
  preflight, import Figma, QA, `figma_done`.
- Non creare nuovi file Figma senza decisione esplicita.
- Usare template con layer stabili: `image`, `fondino`, `eyebrow`, `title`,
  `description`, `source`, `logo`, `footer`.
- Formato default `1080x1350`.
- Standard leggibilita Instagram portrait: controllare sempre singole card
  `1080x1350`, non solo la strip del carousel.
- Fondino testo corrente: gradiente nero quasi trasparente x=0, y=0,
  1080x760px.
- Box testo corrente: eyebrow 940x54 a x=72 y=52, titolo 940x166 a x=72
  y=106, descrizione 942x430 a x=72 y=310, fonte 820x30 nel footer.
- Dimensioni testo correnti: eyebrow 38px, titolo dinamico 88-118px,
  descrizione dinamica 47-56px, fonte 17px.
- Mostrare le fonti solo sull'ultima card del carousel: nelle altre slide il
  layer `source` deve restare nascosto/vuoto. Le fonti restano comunque
  tracciate nel JSON operativo e nella caption.
- Non inserire testi, fonti, logo, CTA o caption negli asset locali.
- Le immagini devono evocare luogo e leggenda senza diventare horror generico.
- Compilare `production_preflight` prima di `figma_done`.
- Registrare QA e prove visuali in modo rintracciabile: manifest, asset index,
  screenshot o note in `outputs/figma/QA_INDEX.md` quando presente.
- Se un asset e solo in Figma o non esiste localmente, dichiararlo nel manifest
  o nell'asset index invece di farlo sembrare un path locale verificabile.
