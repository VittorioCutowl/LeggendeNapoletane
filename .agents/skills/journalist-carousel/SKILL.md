# name: journalist-carousel

## description

Trasforma un brief approvato in un carousel Instagram: ricerca, claim, fonti,
cover, slide, CTA e caption.

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
- Default `1080x1350`: titolo massimo 2 righe, descrizione massimo 5 righe.
- Registrare il budget righe in `design_notes.safe_area`.
- Prima di consegnare la bozza, fare revisione linguistica di accenti,
  ortografia e punteggiatura.

