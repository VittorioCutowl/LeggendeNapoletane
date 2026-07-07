# 2026-07-07-post-01-monaciello Design Spec

Status: `approved`

## Formato

- Carousel Instagram 1080x1350 px, rapporto 4:5.
- Numero slide: 9.
- Usare template canonico nel file Figma:
  https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv?node-id=2-2
- Non creare nuovo file Figma.

## Direzione Visiva

Tono fiabesco napoletano: una nonna che racconta una storia di magia e mistero
ai nipoti. Il Monaciello deve essere suggerito, non trasformato in mostro.
Evitare horror aggressivo, caricature folkloristiche e dialetto decorativo.
Ispirazione generale: pittura napoletana ottocentesca, luce di marina, vicoli,
picari e scugnizzi, senza imitare un singolo artista.

Palette proposta:

- nero profondo per fondino;
- bianco caldo per testi;
- oro di tramonto napoletano;
- blu mare/notte;
- tufo, terracotta, rame e verde ossidato.

## Cover

Headline: **Il Monaciello**  
Subheadline: **Lo spiritello che entra in casa senza bussare**

Visual: interno napoletano notturno, corridoio o scala in penombra, piccola
figura incappucciata solo suggerita sul fondo. Nessun volto esplicito.

Cover v2 prodotta:
`outputs/figma/assets/2026-07-07-post-01-monaciello-v2/01-cover-fiabesca.png`

Contact sheet QA v2:
`outputs/figma/assets/2026-07-07-post-01-monaciello-v2/qa-contact-sheet-v2.png`

## Layout V3

- Fondino: ombra-gradiente nera quasi trasparente, non fascia piena.
- Dimensione layer: 1080x520 px, y=0.
- Gradiente verticale consigliato:
  - y=0: nero opacita 0.50;
  - y=160: nero opacita 0.42;
  - y=320: nero opacita 0.18;
  - y=520: nero opacita 0.00.
- Il gradiente deve servire solo alla leggibilita del testo: deve sembrare
  un'ombra morbida che sfuma verso il basso, lasciando respirare
  l'illustrazione.
- Testi sempre bianchi/bianco caldo.
- Titoli: Cormorant Garamond Bold.
- Corpo: Lora Medium.
- Testi ingranditi rispetto alla prima versione.

## Asset Per Slide

1. Corridoio domestico in penombra, sagoma bassa con cappuccio sul fondo.
2. Oggetti domestici fuori posto, cassetto, luce radente.
3. Dettaglio di stoffa scura, cappuccio o fibbie, senza creatura definita.
4. Monete su tavolo antico, ombra di finestra.
5. Cunicolo in tufo, pozzo verticale, scala o appigli nel muro.
6. Figura in mantello dentro cunicolo, vista di spalle, taglio documentario.
7. Chiostro o finestra alta di convento, tono malinconico.
8. Libro antico, appunti, mappa del centro storico.
9. Portone socchiuso su vicolo notturno con luce calda dall'interno.

## Regole Asset

- Asset senza testo, fonti, logo, CTA o watermark.
- Lasciare area pulita per testo su ombra-gradiente superiore, senza fascia
  nera percepita.
- Testi, fonte, logo e footer vanno montati in Figma.
- Non usare immagini che facciano sembrare la variante del 1445 un fatto storico
  documentato.

## Rischi Da Controllare

- La figura non deve sembrare un demone certo: e una presenza folklorica.
- La pista dei pozzari va resa come atmosfera e contesto, non come spiegazione
  definitiva.
- La slide 7 deve restare delicata: niente melodramma visuale o scena violenta.

## Preflight Completato

Il `production_preflight` e stato rifatto dopo applicazione del gradiente in
Figma. QA visivo eseguito su cover, slide 5, slide 7 e slide 8: testo leggibile,
illustrazione visibile, nessun blocco nero invadente.
