# Visual Style

Le immagini devono sostenere il racconto senza inserire testo negli asset.

## Direzione

- Illustrazione editoriale atmosferica.
- Luoghi riconoscibili o evocati con dettagli concreti.
- Palette notturne, minerali, marine o devozionali secondo il tema.
- Aree pulite per titolo, copy e metadati.
- Testi, fonti, logo e CTA vengono montati in Figma, non dentro gli asset.
- Per i caroselli 1080x1350, preferire un fondino-gradiente nero molto leggero
  su tutta la card invece di una fascia piena: deve sembrare un'ombra morbida
  al servizio della leggibilita, con dissolvenza continua fino a trasparenza sul
  fondo.
- Il gradiente consigliato parte da nero al 38% circa in alto, passa per 16%
  a meta card e arriva a 0% sul fondo.
- Il titolo appare solo sulla prima e sull'ultima card. Nelle card interne la
  descrizione si allinea sotto l'eyebrow, lasciando respirare l'immagine.
- Tutto il testo montato in Figma usa bianco puro `#FFFFFF`: niente eyebrow oro
  o altri accenti cromatici.
- L'occhio e un dettaglio narrativo, non un segno grafico del mistero. Usarlo
  soltanto se sguardo, visione, sorveglianza o testimonianza sono centrali al
  claim della card; al massimo una card per carousel. Mai come icona, logo,
  "occhio che tutto vede" o decorazione occultista; mai in cover, salvo che lo
  sguardo sia il hook esplicito del post.

## Prompt Canonico Immagini

Base consigliata per asset generati o direzione visuale:

```text
Illustrazione editoriale atmosferica napoletana, luogo riconoscibile o evocato
con dettagli concreti, luce cinematografica morbida, tono gotico accessibile,
spazio pulito nella parte alta per titolo e descrizione, nessun testo
nell'immagine, nessun logo, nessun watermark.
```

Negative prompt operativo:

```text
horror generico, cartolina turistica, folklore caricaturale, stereotipi,
testo, logo, watermark, CTA, fonti, simboli religiosi gratuiti, fondino nero
compatto, composizione troppo affollata, occhio che tutto vede, occhio
stilizzato decorativo, occhi ripetuti senza funzione narrativa
```

## Budget Testo 1080x1350

| Elemento | Box default | Font default | Budget |
|---|---|---|---|
| Eyebrow | 940x54 px, x=72 y=52 | 38 px | 1 riga |
| Titolo | 940x166 px, x=72 y=106 | 88-118 px dinamico | massimo 2 righe |
| Descrizione | 942x430 px, x=72 y=310 | 47-56 px dinamico | massimo 5 righe |
| Fonte | 820x30 px nel footer | 17 px | solo ultima card |

Se il testo non entra, riscrivere o dividere la slide. Non ridurre i font sotto
lo standard solo per salvare copy troppo lungo.

QA minimo prima di `figma_done`: cover, una slide centrale, la slide piu lunga
e l'ultima card con fonte visibile.

## Evitare

- Horror generico.
- Cartoline turistiche.
- Folklore caricaturale.
- Simboli religiosi usati in modo gratuito.
- Testo, logo o watermark dentro le immagini.
- Fondini neri compatti che tagliano l'illustrazione o appesantiscono la card.
