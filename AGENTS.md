# Leggende Napoletane Instagram

## Obiettivo

Coordinare una redazione Instagram dedicata a leggende napoletane famose,
misteriose e visualmente potenti. Il progetto produce caroselli divulgativi che
raccontano luoghi, personaggi, varianti e contesti storici senza spacciare il
folklore per cronaca certa.

Ogni post deve far convivere tre piani:

- il racconto, con atmosfera e tensione narrativa;
- il contesto, con luogo, periodo, tradizione e fonti;
- il caveat, cioe cosa sappiamo, cosa e tramandato e cosa resta incerto.

## Contratto Operativo

Il file JSON in `content_queue/` e la fonte operativa del singolo post.
Il campo canonico dello stato e `status`, non `workflow_state`.

La lavagna `content_queue/BOARD.md` e la vista umana di avanzamento. Ogni volta
che un post cambia stato, owner, blocco o prossima azione, aggiornare anche la
lavagna.

Non avanzare un contenuto usando fonti in conflitto senza registrare il
conflitto nei claim, nei caveat o in `blocked`.

## Ruoli Editoriali

- **Editore**: definisce priorita, rubrica, angolo e approvazioni.
- **Ricercatore**: raccoglie fonti, varianti, luoghi e contesto storico.
- **Narratore**: trasforma il brief in slide, caption, ritmo e hook.
- **Fact-checker**: distingue fatti documentati, tradizione orale e ipotesi.
- **Designer**: prepara direzione visuale, asset e manifest Figma.
- **Performance analyst**: legge metriche autorizzate dopo la pubblicazione.

## Stati Consentiti

Usare solo questi valori in `status`:

- `idea`: tema grezzo o leggenda candidata.
- `brief_ready`: brief editoriale pronto.
- `draft_ready`: copy, slide e caption in bozza completa.
- `fact_check_needed`: claim pronti per verifica.
- `fact_checked`: fact-check superato.
- `design_ready`: contenuto approvato per design.
- `figma_done`: montaggio Figma completato e manifest/preflight validati.
- `approved`: approvazione finale ricevuta.
- `scheduled`: pubblicazione programmata con data/ora compilata.
- `published`: pubblicato.
- `archived`: archiviato.

## Transizioni Minime

| Da | A | Ruolo | Gate minimo |
|---|---|---|---|
| `idea` | `brief_ready` | Editore | leggenda, luogo, angolo e target definiti |
| `brief_ready` | `draft_ready` | Narratore | cover, slides, caption e fonti iniziali |
| `draft_ready` | `fact_check_needed` | Narratore | claims atomici collegati a sources |
| `fact_check_needed` | `fact_checked` | Fact-checker | `fact_check.status = passed` |
| `fact_checked` | `design_ready` | Editore | `approvals.editorial.status = approved` |
| `design_ready` | `figma_done` | Designer | cover approvata, preflight passato, Figma done |
| `figma_done` | `approved` | Editore | design e finale approvati |
| `approved` | `scheduled` | Social manager | `publication.scheduled_at` compilato |
| `scheduled` | `published` | Social manager | URL e data pubblicazione compilati |
| qualsiasi | `archived` | Editore | motivo registrato |

Se un gate non e soddisfatto, non forzare lo stato: compilare `blocked`.

## Fonti E Fact-Check

- Non inventare fonti, date, citazioni o varianti.
- Ogni claim importante deve avere almeno una fonte in `sources`.
- Ogni claim deve dichiarare `source_ids`, `evidence`, `caveat` e `status`.
- Distinguere: fatto documentato, tradizione orale, leggenda, interpretazione,
  ipotesi e proposta creativa.
- Preferire fonti verificabili: libri, archivi, musei, universita, biblioteche,
  cataloghi, giornali storici, interviste dichiarate, siti istituzionali.
- Le fonti turistiche o blog possono dare spunti, ma non devono reggere da sole
  un claim centrale.
- Registrare varianti della leggenda quando esistono.
- Segnalare fonti non datate, non accessibili, contraddittorie o troppo tarde.

## Tono Di Voce

Scrivere in italiano con tono narrativo, curioso, preciso e non sensazionalista.
Il mistero deve attirare, ma la redazione deve restare onesta.

Quando una leggenda viene raccontata come memoria o tradizione, preferire il
passato narrativo e formule come "si raccontava", "veniva immaginato",
"secondo alcune versioni". Evitare il presente assertivo quando rischia di far
sembrare la leggenda un fatto in corso o una cronaca certa.

Lo stile deve sembrare un cunto raccontato con calore: evocativo, fiabesco,
gotico accessibile, concreto nei dettagli domestici e urbani. Non nominare la
rubrica o il "primo post" dentro il copy delle card, salvo richiesta esplicita:
il lettore deve entrare direttamente nella leggenda.

Evitare:

- titoli da clickbait;
- folklore inventato senza avviso;
- dialetto usato come decorazione stereotipata;
- confusione tra Napoli reale, immaginario turistico e racconto popolare.

## Output Instagram Carousel

Ogni carosello deve avere:

- hook di copertina breve;
- 5-10 slide;
- luogo e leggenda riconoscibili;
- una slide o passaggio su fonti, varianti o caveat;
- ritmo narrativo chiaro: promessa, racconto, svolta, contesto, chiusura;
- caption Instagram pronta per revisione;
- fonti finali e data di consultazione;
- controllo linguistico completato.

## Designer E Figma

- Il designer lavora solo dopo `design_ready`.
- Progetto/cartella Figma di riferimento:
  `https://www.figma.com/files/team/1350367327777249991/project/622589564?fuid=1350367108007565255`.
- File Figma canonico del progetto:
  `https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv`.
- Template iniziale:
  `https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv?node-id=2-2`.
- Per ogni nuovo post, lavorare dentro il file canonico duplicando il template
  iniziale o il post approvato piu recente.
- Non creare un nuovo file Figma senza decisione esplicita dell'editore.
- Il template Figma deve avere layer nominati in modo stabile: `image`,
  `fondino`, `eyebrow`, `title`, `description`, `source`, `logo`, `footer`.
- Formato default: `1080x1350` px, rapporto `4:5`.
- Per `1080x1350`, evitare fondini pieni invadenti. Usare di default un
  fondino-gradiente nero quasi trasparente nella parte alta, solo per
  leggibilita: layer `1080x520px` a `x=0`, `y=0`, con stop indicativi
  `0.50 -> 0.42 -> 0.18 -> 0.00` fino alla dissolvenza completa verso il
  basso.
- Box testo default: eyebrow 900x44px a x=72 y=66; titolo 860x190px a x=72
  y=115; descrizione 900x280px a x=72 y=314; fonte 820x30px nel footer.
- Gli asset locali devono essere senza testo, fonti, logo, CTA o watermark.
- Testi, fonti, logo e caption si montano in Figma.
- Le immagini devono lasciare aree pulite per testo e fonte.

## Preflight Produzione

Prima di passare da `design_ready` a `figma_done`, compilare
`production_preflight` nel JSON operativo.

Il preflight passa solo se:

- la cover e approvata;
- il manifest contiene lo stesso numero di slide del JSON operativo;
- ogni asset ha naming coerente, formato dichiarato e dimensioni corrette;
- gli asset non contengono testo, fonti, logo, CTA o watermark;
- titoli e descrizioni rispettano il budget righe;
- il template Figma ha layer stabili;
- il QA visivo e stato fatto almeno su cover, slide centrale e slide lunga.

## Cosa Non Fare

- Non spacciare leggende come fatti certi.
- Non inventare citazioni storiche o fonti.
- Non usare stereotipi su Napoli come scorciatoia narrativa.
- Non avanzare uno stato senza evidenza o approvazione richiesta.
- Non passare al post successivo se quello corrente richiede revisione.

## Formato Obbligatorio Degli Output

Ogni contenuto operativo deve essere rappresentato da un JSON conforme a:

```text
content_queue/content_queue.schema.json
```

I deliverable si salvano in:

- `content_queue/`: stato e dati strutturati del post;
- `content_queue/BOARD.md`: lavagna leggibile;
- `outputs/drafts/`: bozze editoriali;
- `outputs/approved/`: copy approvati;
- `outputs/design_specs/`: specifiche per designer;
- `outputs/figma/`: manifest o riferimenti Figma.

Ogni risposta operativa deve indicare: post lavorato, `status` attuale, fonti
usate, output prodotti, blocchi o revisioni richieste.
