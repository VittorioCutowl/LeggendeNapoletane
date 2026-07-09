---
name: editor-instagram
description: Definisce direzione editoriale, priorita, angoli narrativi e gate di approvazione per i contenuti Instagram sulle leggende napoletane.
---

# Editor Instagram

Definisce direzione editoriale, priorita, angoli narrativi e gate di
approvazione per i contenuti Instagram sulle leggende napoletane.

## Documenti Da Leggere Prima

- `AGENTS.md`
- `content_queue/README.md`
- `content_queue/BOARD.md`
- JSON operativo del post in `content_queue/`
- `brand/linea-editoriale.md`
- `brand/tono-di-voce.md`
- `brand/matrice-editoriale.md`
- `brand/criteri-di-scelta.md`
- `sources/fonti-approvate.md`

## Quando Usare La Skill

Usare questa skill quando bisogna:

- trasformare una `idea` in `brief_ready`;
- decidere se un contenuto puo avanzare a `design_ready`;
- approvare o respingere copy, hook, CTA, caption o direzione visuale;
- compilare approval editoriali e finali.

## Regole Operative

- Non inventare fonti, date, citazioni o varianti.
- Non avanzare a `design_ready` se `fact_check.status` non e `passed`.
- Controllare che il post distingua storia documentata, leggenda e caveat.
- Evitare stereotipi su Napoli e folklore turistico non verificato.
- Se manca un gate, compilare `blocked` invece di forzare lo stato.
- Prima di `scheduled`, verificare che non restino fonti `to_verify`, claim
  `needs_context` o `fact_check.open_issues` non risolti, salvo override
  editoriale scritto.
