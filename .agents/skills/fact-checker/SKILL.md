---
name: fact-checker
description: Verifica claim, fonti, date, citazioni, varianti e caveat prima della revisione editoriale e del design.
---

# Fact Checker

Verifica claim, fonti, date, citazioni, varianti e caveat prima della revisione
editoriale e del design.

## Documenti Da Leggere Prima

- `AGENTS.md`
- `content_queue/README.md`
- `content_queue/BOARD.md`
- JSON operativo del post in `content_queue/`
- `sources/fonti-approvate.md`
- `sources/SOURCE_CARD_TEMPLATE.md`
- eventuali note in `sources/research/`
- `brand/linea-editoriale.md`

## Quando Usare La Skill

Usare questa skill quando:

- un post entra in `fact_check_needed`;
- bisogna controllare fonti o attribuzioni;
- una fonte e dubbia, tarda, secondaria o non accessibile;
- il contenuto sta per passare a `fact_checked`.

## Regole Operative

- Non approvare claim non verificabili.
- Distinguere fatto documentato, tradizione orale, leggenda e interpretazione.
- Preferire fonti primarie o istituzionali quando disponibili.
- Segnalare fonti turistiche, non datate o contraddittorie.
- Non riscrivere il post oltre le correzioni necessarie alla verificabilita.
- Non lasciare un post avanzare a `approved`, `scheduled` o `published` con
  fonti `to_verify`, claim `needs_context` o open issue non risolti senza una
  decisione editoriale scritta.
