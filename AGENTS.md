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

## Indice Documenti Obbligatori

Prima di lavorare su un post, leggere sempre:

- `AGENTS.md`: contratto operativo, gate e regole di progetto.
- `content_queue/README.md`: regole della coda contenuti.
- `content_queue/content_queue.schema.json`: schema JSON operativo.
- `content_queue/BOARD.md`: stato umano della coda.
- JSON operativo del post in `content_queue/`.

Per scelte editoriali leggere anche:

- `brand/linea-editoriale.md`
- `brand/tono-di-voce.md`
- `brand/matrice-editoriale.md`
- `brand/categorie-editoriali.md`
- `brand/criteri-di-scelta.md`

Per fonti, ricerca e fact-check leggere anche:

- `sources/fonti-approvate.md`
- `sources/SOURCE_CARD_TEMPLATE.md`
- eventuali note in `sources/research/`

Per design, asset e Figma leggere anche:

- `brand/visual-style.md`
- `outputs/figma/README.md`
- `outputs/figma/figma-map.schema.json`
- `outputs/figma/ASSET_INDEX_TEMPLATE.md`
- eventuali audit in `outputs/audits/`
- eventuali QA in `outputs/figma/qa/`

## Quale Skill Usare

| Caso | Skill | Stato tipico | Output atteso |
|---|---|---|---|
| Nuove idee o rosa leggende | `trend-scout` | `idea` | proposta, angolo, direzione fonti |
| Priorita, angolo, approvazioni | `editor-instagram` | `idea`, `fact_checked`, `figma_done` | brief, approval, blocchi |
| Scrittura carousel | `journalist-carousel` | `brief_ready`, `draft_ready` | slide, caption, claim |
| Verifica fonti e claim | `fact-checker` | `fact_check_needed` | claim verificati, caveat, open issue |
| Ricerca online e fonti esterne | `leggende-napoletane-factcheck-internet` | `idea`, `brief_ready`, `fact_check_needed` | fonti qualificate, conflitti, consultazione |
| QA linguistico del carousel | `instagram-carousel-copy-qa` | `figma_done` | report accenti, grammatica, line budget |
| Design, asset, manifest Figma | `figma-carousel-designer` | `design_ready` | spec, manifest, preflight |
| QA visuale e asset | `leggende-napoletane-visual-preflight` | `design_ready`, `figma_done` | report asset, Figma, duplicati, screenshot |

## Ruoli Editoriali

- **Editore**: definisce priorita, rubrica, angolo e approvazioni.
- **Ricercatore**: raccoglie fonti, varianti, luoghi e contesto storico.
- **Narratore**: trasforma il brief in slide, caption, ritmo e hook.
- **Fact-checker**: distingue fatti documentati, tradizione orale e ipotesi.
- **Designer**: prepara direzione visuale, asset e manifest Figma.

## Stati Consentiti

Usare solo questi valori in `status`:

- `idea`: tema grezzo o leggenda candidata.
- `brief_ready`: brief editoriale pronto.
- `draft_ready`: copy, slide e caption in bozza completa.
- `fact_check_needed`: claim pronti per verifica.
- `fact_checked`: fact-check superato.
- `design_ready`: contenuto approvato per design.
- `figma_done`: montaggio Figma completato e manifest/preflight validati.
- `figma_done`: produzione Figma completata, manifest e preflight validati. È il termine del workflow.
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
| qualsiasi | `archived` | Editore | motivo registrato |

Se un gate non e soddisfatto, non forzare lo stato: compilare `blocked`.

Prima di passare a `figma_done`, controllare che non restino:

- fonti con `status = to_verify`;
- claim con `status = needs_context` o `to_verify`;
- `fact_check.open_issues` non risolti;
- audit visuali o linguistici aperti;
- mismatch tra JSON, `BOARD.md`, file approvato, design spec e manifest Figma.

Se una criticita non blocca la produzione Figma, registrare una decisione
editoriale esplicita in `approvals.final.notes`, `blocked.next_action` o nella
lavagna. Non lasciare residui invisibili.

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
  fondino-gradiente nero leggero su tutta la card (`1080x1350px` a `x=0`,
  `y=0`): piu presente in alto e dissolto fino a trasparenza sul fondo.
- Box testo default aggiornati per leggibilita mobile: eyebrow 940x54px a x=72
  y=52; titolo 940x166px a x=72 y=106; descrizione 942x430px a x=72 y=310;
  fonte 820x30px nel footer.
- Dimensioni testo default: eyebrow 38px, titolo dinamico 88-118px,
  descrizione dinamica 47-56px, fonte 17px.
- Tutti i layer testuali (`eyebrow`, `title`, `description`, `source`, `logo` e
  indicatori) usano bianco puro `#FFFFFF`, senza accenti cromatici.
- Il layer `title` e visibile solo sulla cover e sulla card finale. Nelle card
  centrali deve restare nascosto; la `description` sale sotto l'eyebrow.
- Verificare sempre singole card `1080x1350`, non solo screenshot della strip
  completa del carousel.
- Prima di `figma_done`, verificare su cover, card centrale e chiusura il
  sistema visivo completo: `fondino` nero su tutta la card con dissolvenza,
  font canonici (Cormorant Garamond per eyebrow/titoli, Lora per descrizioni,
  fonti e firma) e firma `Leggende Napoletane` visibile nel footer di ogni
  card. Registrare l'esito in `production_preflight.checks`.
- Gli asset locali devono essere senza testo, fonti, logo, CTA o watermark.
- Testi, fonti, logo e caption si montano in Figma.
- Le fonti editoriali restano nel JSON e nella caption, ma nel layout Figma il
  layer `source` deve essere visibile solo sull'ultima card del carousel. Nelle
  altre card deve restare nascosto/vuoto.
- Le immagini devono lasciare aree pulite per titolo, descrizione e footer.
- L'occhio non e un simbolo generico del mistero: puo comparire solo come
  dettaglio umano o narrativo quando sguardo, visione, sorveglianza o
  testimonianza sono centrali nel racconto. Mai come icona/logo o "occhio che
  tutto vede", mai ripetuto in piu card, e mai in cover salvo che lo sguardo
  sia il vero hook del post.

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

## Validazione Obbligatoria

Prima di dichiarare completo un cambio operativo eseguire:

```bash
npm run validate:queue
```

La validazione controlla i JSON in `content_queue/` e, quando presenti, i
manifest Figma collegati. Se la validazione fallisce, non avanzare lo stato:
correggere il problema o registrare un blocco.

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
