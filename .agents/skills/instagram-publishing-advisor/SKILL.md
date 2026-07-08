---
name: instagram-publishing-advisor
description: Consiglia strategia e calendario di pubblicazione Instagram per Leggende Napoletane. Usa questa skill quando il lavoro riguarda quando pubblicare, quale post scegliere dopo, frequenza sostenibile, mix caroselli/Reels/Stories, caption/CTA/hashtag per reach e salvataggi, lettura metriche Instagram, o trasformare la coda contenuti in un piano editoriale leggero. Non usarla per scrivere il contenuto narrativo completo, fare fact-check, creare asset o montare Figma.
---

# Instagram Publishing Advisor

## Scope

Guidare decisioni di pubblicazione Instagram per il profilo `Leggende Napoletane`,
tenendo insieme crescita, sostenibilita e rigore editoriale.

Questa skill consiglia il piano di uscita. Non produce il post completo, non
avanza stati senza gate, non sostituisce `editor-instagram`,
`journalist-carousel`, `fact-checker` o `figma-carousel-designer`.

## Prima Di Consigliare

Leggere, se disponibili:

- `content_queue/BOARD.md` per stato umano della coda.
- I JSON dei post candidati in `content_queue/`.
- `outputs/approved/` e `outputs/drafts/` per copy disponibile.
- `outputs/audits/` per rischi visuali o workflow.

Se l'utente chiede "oggi", "questa settimana", "ultimo algoritmo" o consigli
aggiornati, documentarsi online prima di rispondere. Le regole Instagram
cambiano spesso.

Per dettagli sulle euristiche social aggiornate al 2026-07-07, leggere
`references/instagram-current-notes.md`.

## Output Standard

Ogni risposta operativa deve includere:

- post lavorato o lista post consigliata;
- `status` attuale dei post citati;
- raccomandazione di pubblicazione;
- motivo sintetico;
- fonti/asset interni consultati;
- blocchi o revisioni richieste.

## Regole Di Pubblicazione

- Non consigliare di pubblicare contenuti sotto `approved`.
- Se un post e `figma_done` ma design/finale sono pending, proporre revisione
  finale prima della pubblicazione.
- Se un post e in Figma ma non ha JSON operativo, trattarlo come `untracked`:
  non pubblicarlo prima di portarlo nel workflow.
- Preferire originalita: asset AI o originali, non repost, screenshot o moodboard
  senza apporto creativo.
- Per un profilo nuovo, privilegiare qualita e riconoscibilita rispetto al
  volume. Un post al giorno e un obiettivo, non un obbligo se la coda pronta e
  debole.

## Decisione Sul Prossimo Post

Ordinare i candidati cosi:

1. `approved` con visual pulito e caption pronta.
2. `figma_done` con solo approvazione finale mancante.
3. `design_ready` con copy forte e rischio basso.
4. Post in draft/fact-check solo se servono a completare un mix editoriale.

Valutare poi:

- riconoscibilita della leggenda per aprire il profilo;
- varieta tra luoghi, creature, mare, devozione, sottosuolo;
- forza della cover;
- chiarezza del caveat;
- probabilita di salvataggi e condivisioni in DM;
- tempo reale richiesto all'utente per approvare.

## Frequenza Leggera

Default per questo progetto:

- 3-5 caroselli a settimana finche il workflow non e stabile.
- Obiettivo massimo: 1 post al giorno solo con almeno 7 contenuti `approved`.
- Massimo 1 Reel a settimana, ricavato da un carosello gia approvato.
- Stories opzionali: 2-3 alla settimana per sondaggi, domande e riprese del
  post, senza creare nuovo lavoro editoriale.

Se l'utente vuole dedicare poco tempo, proporre batch settimanale:

- 60-90 minuti per scegliere e approvare la settimana.
- 10 minuti al giorno per controllo pubblicazione/commenti.
- 20 minuti a fine settimana per leggere metriche e decidere cosa replicare.

## Formati

### Carosello

Usarlo come formato principale per leggende e luoghi.

Checklist prima della pubblicazione:

- cover chiara e breve;
- 5-10 slide;
- una slide caveat/fonti;
- caption con contesto e CTA;
- alt text sintetico se richiesto;
- 3-5 hashtag specifici, non lista generica;
- primo commento non necessario salvo scelta editoriale.

### Reel

Usarlo solo quando esiste gia un carosello approvato.

Formato consigliato:

- 20-45 secondi per profilo nuovo;
- massimo 90 secondi salvo ragione forte;
- hook nei primi 2 secondi;
- voiceover AI naturale;
- sottotitoli leggibili;
- CTA verso salvataggio, commento o carosello correlato;
- nessuna affermazione piu forte del fact-check del post originale.

### Stories

Usarle per alleggerire lavoro e aumentare segnali sociali:

- sondaggio su prossima leggenda;
- quiz vero/falso con caveat;
- repost del carosello pubblicato;
- box domande per raccogliere varianti orali, marcandole come tali.

## Caption, CTA E Hashtag

Caption:

- prima riga con promessa narrativa chiara;
- corpo breve, concreto, non sensazionalista;
- caveat esplicito se la leggenda e orale o letteraria;
- CTA singola.

CTA preferite:

- "La conoscevi?"
- "Ti avevano mai raccontato un'altra versione?"
- "La salveresti per il prossimo giro a Napoli?"
- "Mandala a chi ama le storie di Napoli."

Hashtag:

- usare 3-5 hashtag pertinenti;
- mescolare luogo, tema e nicchia;
- evitare blocchi da 20-30 hashtag e tag generici.

## Metriche Da Guardare

Nelle prime 24-72 ore guardare:

- condivisioni, soprattutto in DM;
- salvataggi;
- completamento carosello;
- profili visitati;
- follow generati;
- commenti con varianti o correzioni utili.

Non sovrainterpretare un singolo post. Decidere dopo pattern di almeno 3-5
contenuti simili.

## Piano Settimanale Tipo

Per un profilo nuovo:

- Lunedi: carosello riconoscibile.
- Martedi: luogo misterioso o storia urbana.
- Mercoledi: pausa o Story leggera.
- Giovedi: carosello piu narrativo.
- Venerdi/sabato: Reel tratto dal post migliore.
- Domenica: sondaggio o recap.

Se ci sono solo 2-3 post pronti, non riempire il calendario con contenuti deboli:
pubblicare meno e preparare la coda.

## Aggiornamenti Di Workflow

Questa skill puo suggerire cambi di priorita, ma non deve modificare stati da
sola. Se una raccomandazione comporta cambio stato, aggiornare anche
`content_queue/BOARD.md` e il JSON solo quando i gate del progetto sono
soddisfatti.
