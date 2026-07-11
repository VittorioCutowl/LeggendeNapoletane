# Sibilla Cumana — design spec

Post: `2026-07-11-post-07-sibilla-cumana`
Stato: `figma_done`
Formato: 1080x1350 px, 8 card

## Direzione

Il carousel mette in scena il contrasto tra la voce profetica della tradizione virgiliana e il monumento reale di Cuma. Tufo, luce radente, vento e paesaggio flegreo; niente horror generico, niente iconografia occultista.

## Asset

1. `01-cover-antro-voce.png` — ingresso dell'antro, foglie nel vento, figura lontana.
2. `02-acropoli-cuma.png` — acropoli e paesaggio flegreo, atmosfera mitica sobria.
3. `03-foglie-vento.png` — foglie vuote trascinate nella galleria.
4. `04-enea-soglia.png` — due figure davanti alla soglia, allusione alla discesa.
5. `05-galleria-tufo.png` — interno della galleria con aperture laterali e cisterne.
6. `06-galleria-militare.png` — tufo, fortificazione e stratificazione archeologica.
7. `07-taccuino-maiuri.png` — taccuino di scavo, tufo e luce del mattino.
8. `08-uscita-luce.png` — uscita dell'antro verso il paesaggio flegreo.

Tutti gli asset devono essere illustrazioni editoriali senza testo, logo, fonti, CTA o watermark, con spazio pulito nella fascia superiore per i layer Figma.

## Layout Figma

- `image`: 1080x1350, full bleed.
- `fondino`: rettangolo nero uniforme 1080x1350, più presente in alto e dissolto con morbidezza verso il fondo.
- `eyebrow`: Cormorant Garamond SemiBold, bianco puro, 38 px.
- `title`: Cormorant Garamond Bold, bianco puro, solo cover e chiusura, massimo 2 righe.
- `description`: Lora Regular, bianco puro, massimo 5 righe; nelle card interne sotto l'eyebrow.
- `source`: vuoto/nascosto nelle card 1-7, visibile solo nella card 8.
- `logo`: Lora Medium, bianco puro, firma completa `Leggende Napoletane` nel footer di ogni card.
- `footer`: componente del template canonico.

## QA richiesto

Verificare singolarmente cover, card 5, card 6 e card 8; controllare leggibilità mobile, correttezza dei caveat e assenza di testo negli asset.
