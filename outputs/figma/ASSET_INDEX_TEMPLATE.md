# Asset Index Template

Usare questo modello per tracciare asset senza copiare file pesanti nel repo.

| Slide | Asset | Origine | Link/path | Dimensioni | Licenza/diritti | Stato | Figma layer | Hash/ID | QA | Note |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 01-cover.jpg | generated / supplied / archive / figma_only |  | 1080x1350 | da verificare | draft |  |  | pending |  |

## Stati Asset

- `draft`: bozza non approvata.
- `in_review`: asset in revisione visuale o editoriale.
- `approved`: approvato per Figma.
- `in_figma`: asset gia montato in Figma.
- `rejected`: scartato.
- `replaced`: sostituito da una versione più recente.

## Regole

- Non inserire testo, fonti, CTA, caption o logo negli asset locali.
- Registrare origine e diritti prima di passare a `approved`.
- Se l'asset e su Drive o Figma, salvare il link invece del file pesante.
- Se l'asset esiste solo in Figma, indicare `figma_only` e registrare node/layer.
- Registrare duplicati visuali intenzionali; altrimenti sostituirli.
- Il QA minimo deve coprire cover, slide centrale, slide piu lunga e ultima card
  con fonte.
