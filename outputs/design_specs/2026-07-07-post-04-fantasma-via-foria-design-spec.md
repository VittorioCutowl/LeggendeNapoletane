# 2026-07-07-post-04-fantasma-via-foria Design Spec

Status: `design_ready`

## Figma

- Usare il file canonico:
  https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv
- Duplicare il post approvato piu recente o il template iniziale.
- Non creare un nuovo file Figma.
- Formato: 1080x1350, 9 slide.

## Direzione Visiva

Gotico napoletano di quartiere: portoni antichi, scale, pietra scura, strada
bagnata, luce gialla da androne, figura femminile appena suggerita. La paura
deve restare umana e malinconica, non horror.

Palette proposta:

- Nero caldo: `#090706`
- Pietra lavica: `#2A2925`
- Giallo lampione: `#D8A84D`
- Verde muffa/ombra: `#394136`
- Bianco sporco testo: `#F2EBDD`

## Regole Asset

- Asset senza testo, fonte, logo, CTA o watermark.
- Non rappresentare violenza esplicita.
- Non sessualizzare la donna.
- Non rappresentare il prete in modo accusatorio o caricaturale: usare una
  presenza lontana, un'ombra, un dettaglio di stoffa.
- Evitare simboli religiosi sensazionalistici o blasfemi.
- Lasciare area alta pulita per titolo e descrizione.

## Layout Figma

Usare fondino-gradiente nero quasi trasparente, non fascia piena:

- x: 0
- y: 0
- width: 1080
- height: 520
- stop indicativi: 0.50 -> 0.42 -> 0.18 -> 0.00

Layer richiesti: `image`, `fondino`, `eyebrow`, `title`, `description`,
`source`, `logo`, `footer`.

## Slide Visuali

1. Portone notturno, figura femminile velata in alto su una scala.
   Asset proposto:
   `outputs/figma/assets/2026-07-07-post-04-fantasma-via-foria-v1/01-cover-portone.png`
2. Via Foria evocativa: strada ampia, facciate storiche, lampioni, portoni bui.
3. Balconi chiusi, finestra socchiusa, atmosfera di segreto.
4. Figura femminile presso un portone, ombra maschile lontana e indefinita.
5. Scala vuota, candela spenta, velo o fazzoletto su pietra.
6. Pianerottolo antico, figura ferma contro luce.
7. Interno di palazzo: ringhiera, polvere nella luce, nessuna apparizione netta.
8. Mappa/appunti/libro aperto, tono da caveat e ricerca.
9. Porta chiusa, luce sottile dalla fessura, strada vuota dopo la pioggia.

## QA

Prima di `figma_done`, verificare cover, slide 5, slide 8 e slide 9:

- testo leggibile;
- caveat non nascosto;
- nessun asset contiene testo o watermark;
- figura femminile non appare come mostro;
- simboli religiosi sobri e non accusatori.
