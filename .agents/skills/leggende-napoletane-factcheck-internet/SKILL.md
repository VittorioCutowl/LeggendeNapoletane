---
name: leggende-napoletane-factcheck-internet
description: Ricerca e qualifica fonti online per leggende napoletane, distinguendo fonti istituzionali, bibliografiche, divulgative e turistiche con caveat espliciti.
---

# Leggende Napoletane Factcheck Internet

## Scope

Usare internet come supporto a ricerca, verifica e arricchimento dei post senza
trasformare blog, turismo o Wikipedia in prova centrale.

Questa skill aiuta a trovare fonti, non a inventare varianti o citazioni.

## Documenti Da Leggere Prima

- `AGENTS.md`
- `content_queue/README.md`
- JSON operativo del post in `content_queue/`, se esiste
- `sources/fonti-approvate.md`
- `sources/SOURCE_CARD_TEMPLATE.md`
- `brand/linea-editoriale.md`
- `brand/tono-di-voce.md`

## Quando Usare La Skill

Usare questa skill quando:

- serve proporre nuove leggende o varianti da fonti esterne;
- un claim ha fonte debole, tarda, turistica o non datata;
- bisogna completare `sources`, `claims` o `fact_check.open_issues`;
- una fonte online e in conflitto con un'altra.

## Gerarchia Fonti

Preferire, in ordine:

- archivi, biblioteche, musei, universita, cataloghi e siti istituzionali;
- libri, saggi, articoli accademici o repertori folklorici verificabili;
- giornali storici o testate locali autorevoli;
- interviste o testimonianze dichiarate come tradizione orale;
- siti divulgativi con autore, data e bibliografia;
- blog turistici, social e Wikipedia solo come tracce o contesto secondario.

Wikipedia puo aiutare per orientamento, luoghi e bibliografia, ma non deve
reggere da sola un claim centrale o una approvazione finale.

## Regole Operative

- Registrare sempre URL, titolo, autore se disponibile, data pubblicazione se
  disponibile e `checked_at`.
- Dichiarare cosa supporta la fonte in `supports`.
- Dichiarare limiti, datazione tarda, inaccessibilita o conflitti in `caveat`.
- Se due fonti confliggono, non scegliere la versione piu suggestiva senza
  annotare il conflitto nei claim o in `blocked`.
- Non avanzare a `approved`, `scheduled` o `published` con fonti `to_verify`,
  claim `needs_context` o open issue non risolti, salvo override editoriale
  scritto.

## Output Atteso

Rispondere sempre con:

- post o leggenda lavorata;
- fonti trovate o controllate;
- valutazione affidabilita;
- claim supportati;
- caveat e conflitti;
- aggiornamenti consigliati per JSON, board o blocchi.

