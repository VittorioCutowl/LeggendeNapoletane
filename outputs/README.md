# Outputs

Questa cartella contiene deliverable prodotti dalla redazione.

## Cartelle Operative

- `drafts/`: bozze editoriali derivate da JSON in `content_queue/`.
- `approved/`: copy approvati e pronti per design o pubblicazione.
- `design_specs/`: specifiche visuali e note asset.
- `figma/`: manifest Figma canonici dei post reali.
- `figma/qa/`: screenshot, contact sheet e prove visuali quando disponibili.
- `audits/`: audit visuali, editoriali o workflow.

## Relazione Tra Output

Il JSON in `content_queue/` resta la fonte operativa. Gli output servono come
evidenza leggibile:

- `drafts/` conserva la bozza narrativa.
- `approved/` conserva il copy finale pubblicabile.
- `design_specs/` traduce copy e direzione editoriale in indicazioni visuali.
- `figma/` conserva manifest, asset index, riferimenti Figma e QA.
- `audits/` registra problemi, revisioni e chiusure.

Un post `approved` dovrebbe avere JSON valido, copy approvato, design spec,
manifest Figma, preflight passato e nessun audit bloccante aperto.
