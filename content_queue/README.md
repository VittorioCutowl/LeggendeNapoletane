# Content Queue

La coda contenuti raccoglie i post in lavorazione come file JSON conformi a
`content_queue.schema.json`.

`BOARD.md` e la lavagna leggibile della coda: serve per vedere a colpo d'occhio
quali leggende sono da decidere, in scrittura, da verificare o in produzione Figma.

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
- approvazioni necessarie alla produzione e blocchi tracciati;
- `production_preflight` compilato prima di `figma_done`.
- `production_preflight.checks` deve confermare font canonici, fondino uniforme
  sfumato e firma `Leggende Napoletane` su tutte le card prima di `figma_done`.

## Regole Figma E Fonti

- Le fonti editoriali restano sempre registrate in `sources`, nei `claim`,
  negli `slide.source_ids` e nella `caption.source_note`.
- Nel layout Figma, pero, il layer `source` va mostrato solo sull'ultima card
  del carousel; nelle card precedenti deve essere nascosto/vuoto.
- Per post `1080x1350`, verificare la leggibilita su singola card Instagram
  portrait: titoli e testi devono restare grandi, non miniaturizzati per far
  entrare troppo copy.

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
archived
```

Le transizioni operative sono definite in `../AGENTS.md`.

## Convenzione Nome File

Usare nomi leggibili e stabili:

```text
YYYY-MM-DD-post-XX-slug.json
```

`template.json` e una base non operativa.
