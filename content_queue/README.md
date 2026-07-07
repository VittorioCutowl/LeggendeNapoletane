# Content Queue

La coda contenuti raccoglie i post in lavorazione come file JSON conformi a
`content_queue.schema.json`.

`BOARD.md` e la lavagna leggibile della coda: serve per vedere a colpo d'occhio
quali leggende sono da decidere, in scrittura, da verificare, in design, pronte
o pubblicate.

## Regole

Ogni post deve avere:

- un `post_id` stabile;
- un `status` consentito dallo schema;
- owner editoriali compilati;
- fonti registrate in `sources`;
- claim registrati in `claims`;
- caveat chiari tra storia, leggenda, variante e interpretazione;
- stato fact-check in `fact_check`;
- stato Figma in `figma`;
- approval e blocchi tracciati;
- `production_preflight` compilato prima di `figma_done`.

## Stati

Gli stati ammessi sono:

```text
idea
brief_ready
draft_ready
fact_check_needed
fact_checked
design_ready
figma_done
approved
scheduled
published
archived
```

Le transizioni operative sono definite in `../AGENTS.md`.

## Convenzione Nome File

Usare nomi leggibili e stabili:

```text
YYYY-MM-DD-post-XX-slug.json
```

`template.json` e una base non operativa.

