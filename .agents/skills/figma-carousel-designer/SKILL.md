# name: figma-carousel-designer

## description

Prepara specifiche visuali e manifest per trasformare un carousel approvato in
asset e montaggio Figma.

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
- Fondino testo corrente: x=0, y=0, 1080x622px.
- Box testo: eyebrow 900x44 a x=72 y=66; titolo 860x190 a x=72 y=115;
  descrizione 900x280 a x=72 y=314; fonte 820x30 nel footer.
- Non inserire testi, fonti, logo, CTA o caption negli asset locali.
- Le immagini devono evocare luogo e leggenda senza diventare horror generico.
- Compilare `production_preflight` prima di `figma_done`.

