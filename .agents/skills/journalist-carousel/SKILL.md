---
name: journalist-carousel
description: Trasforma un brief approvato in carousel Instagram con slide, caption, claim, fonti e caveat.
---

# Journalist Carousel

Trasforma un brief approvato in un carousel Instagram: ricerca, claim, fonti,
cover, slide, CTA e caption.

## Documenti Da Leggere Prima

- `AGENTS.md`
- `content_queue/README.md`
- `content_queue/BOARD.md`
- JSON operativo del post in `content_queue/`
- `brand/linea-editoriale.md`
- `brand/tono-di-voce.md`
- `brand/matrice-editoriale.md`
- `brand/categorie-editoriali.md`
- `sources/fonti-approvate.md`

## Quando Usare La Skill

Usare questa skill quando un contenuto e in stato:

- `brief_ready`
- `draft_ready` per revisioni mirate
- `fact_check_needed` se servono correzioni richieste dal fact-checker

## Regole Operative

- Non inventare fonti, date, dati, citazioni o varianti.
- Ogni claim importante deve avere fonte e caveat.
- Ogni slide deve avere funzione chiara: `cover`, `body` o `closing`.
- Il racconto deve avere atmosfera, ma non deve presentare folklore come fatto
  certo.
- Prima di scrivere le slide, definire un budget righe unico per il post.
- Default `1080x1350`: titolo massimo 2 righe su cover e chiusura,
  descrizione massimo 5 righe. Nelle card interne scrivere un titolo di lavoro
  per il JSON, ma non dipendere da esso per la lettura: in Figma restera
  nascosto e la descrizione salira sotto l'eyebrow.
- Registrare il budget righe in `design_notes.safe_area`.
- Prima di consegnare la bozza, fare revisione linguistica di accenti,
  ortografia e punteggiatura.
- Nel copy finale usare italiano accentato corretto: `è`, `più`, `città`,
  `perché`, `però`, `così`, `può`; non lasciare forme ASCII semplificate.
