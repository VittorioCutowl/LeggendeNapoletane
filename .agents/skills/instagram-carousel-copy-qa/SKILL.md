---
name: instagram-carousel-copy-qa
description: Controlla copy, accenti, grammatica, line budget, stati e coerenza tra JSON, approved Markdown e manifest Figma prima di programmare o pubblicare un carousel.
---

# Instagram Carousel Copy QA

## Scope

Verificare che un carousel gia scritto o approvato sia pronto per scheduling e
pubblicazione dal punto di vista linguistico, editoriale e tipografico.

Questa skill non riscrive il post in modo creativo: segnala problemi, propone
micro-correzioni e registra blocchi o revisioni richieste.

## Documenti Da Leggere Prima

- `AGENTS.md`
- `content_queue/README.md`
- `content_queue/BOARD.md`
- JSON operativo del post in `content_queue/`
- `brand/tono-di-voce.md`
- `brand/visual-style.md`
- `outputs/approved/` relativo al post
- `outputs/drafts/` relativo al post, se serve confronto
- `outputs/design_specs/` relativo al post
- manifest in `outputs/figma/`

## Quando Usare La Skill

Usare questa skill quando:

- un post e `figma_done`, `approved` o sta per diventare `scheduled`;
- bisogna controllare accenti, grammatica o punteggiatura;
- ci sono dubbi su testo troppo lungo o font troppo piccoli;
- si sospetta mismatch tra JSON, board, approved Markdown, design spec o Figma.

## Checklist QA

- Italiano finale con accenti corretti: `è`, `più`, `città`, `perché`,
  `però`, `così`, `può`.
- Nessuna forma ASCII semplificata nei copy pubblicabili, salvo slug o codice.
- Titoli e descrizioni rispettano il budget righe dichiarato.
- Default `1080x1350`: titolo massimo 2 righe solo su cover e chiusura;
  descrizione massimo 5 righe. Nelle card interne il layer titolo deve restare
  nascosto e la descrizione deve partire sotto l'eyebrow.
- Non ridurre il font sotto gli standard per far entrare copy troppo lungo:
  riscrivere o dividere la slide.
- CTA singola, naturale e coerente con il post.
- Stato dichiarato in JSON, board, approved Markdown e design spec coerente.
- File approved presente per ogni post `approved`.
- `caption.source_note` coerente con `fact_check.status`.
- Nessuna fonte `to_verify`, claim `needs_context` o open issue invisibile
  prima di `scheduled`, salvo override editoriale scritto.
- Layer `source` visibile solo sull'ultima card nel manifest Figma.
- Tutti i layer testuali, incluso eyebrow e fonte, usano bianco puro
  `#FFFFFF`.

## Output Atteso

Rispondere sempre con:

- post controllato e `status` attuale;
- esito `pass`, `needs_fix` o `blocked`;
- problemi linguistici;
- problemi di stato o fonti;
- problemi di line budget o Figma;
- file consultati;
- correzioni consigliate o blocchi da registrare.
