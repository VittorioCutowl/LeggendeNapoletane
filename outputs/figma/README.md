# Figma Manifests

I manifest canonici dei nuovi post vanno salvati qui.

## Regole

- Progetto/cartella Figma di riferimento:
  `https://www.figma.com/files/team/1350367327777249991/project/622589564?fuid=1350367108007565255`.
- File Figma canonico:
  `https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv`.
- Template iniziale:
  `https://www.figma.com/design/TSOtnFu4optue3Zt6a4Nzv?node-id=2-2`.
- Nome consigliato: `YYYY-MM-DD-post-XX-slug-figma-map.json`.
- Ogni manifest deve puntare al JSON operativo in `content_queue/`.
- `figma.file_url` deve puntare al file canonico; `figma.node_url` deve puntare
  alla sezione o al primo frame del post quando disponibile.
- I frame Figma devono seguire i `frame_name` dichiarati dal manifest.
- Layer template attesi: `image`, `fondino`, `eyebrow`, `title`,
  `description`, `source`, `logo`, `footer`.
- Il layer `source` deve essere visibile solo sull'ultima card del carousel.
  Nelle card precedenti va lasciato nascosto/vuoto; le fonti restano tracciate
  nel JSON operativo e nella caption.
- Gli asset pesanti non vanno copiati qui: usare link o path dichiarati.
- Per nuovi manifest seguire `figma-map.schema.json`.

## Sequenza Veloce

1. Copertina: creare una proposta sola e attendere approvazione.
2. Batch: generare tutte le immagini solo dopo approvazione cover.
3. Preflight: controllare asset, righe copy, manifest, template e mappa layer.
4. Import: popolare Figma dal manifest/template.
5. QA: verificare cover, una slide centrale e una slide con copy lungo.

## Definition Of Done Figma

Un post puo passare a `figma_done` solo se:

- il manifest e collegato al JSON operativo corretto;
- `figma.file_url` punta al file canonico;
- `figma.node_url` punta alla sezione o al primo frame reale del post;
- il numero di frame nel manifest coincide con il numero di slide nel JSON;
- ogni frame registra i layer attesi: `image`, `fondino`, `eyebrow`, `title`,
  `description`, `source`, `logo`, `footer`;
- il layer `source` e visibile solo sull'ultima card;
- asset locali esistenti o asset `figma_only` dichiarati esplicitamente;
- duplicati visuali assenti o motivati;
- QA visuale linkato in `outputs/figma/QA_INDEX.md`, asset index, manifest o
  audit;
- cover, slide centrale, slide piu lunga e ultima card sono state controllate
  singolarmente a `1080x1350`.

## Standard Visuale Corrente

- Formato default: `1080x1350` px.
- Fondino testo full-card: x=0, y=0, 1080x1350px, gradiente lungo che si schiarisce dopo il testo.
- Box testo uniformi: eyebrow 900x44px a x=72 y=66; titolo 860x190px a x=72
  y=115; descrizione 900x280px a x=72 y=314; fonte 820x30px nel footer.
- Testo descrittivo (`description`): Lora Medium 48px, interlinea 54px.
- Il layer `source` resta nel template di ogni card, ma deve essere visibile
  solo nell'ultima card del carosello. Sulle card precedenti va nascosto per non
  sporcare la grafica.
- La paginazione `swipe-count` va ripetuta su ogni card e posizionata dentro la
  fascetta nera del footer, centrata verticalmente sul layer `footer`.
- Non variare l'altezza del fondino in base al testo della singola slide: il fondino resta sempre full-card. Se il
  copy non entra nei box previsti, tornare alla bozza e riscrivere o dividere la
  slide.
- Verificare sempre almeno alcune singole card renderizzate a `1080x1350`,
  non solo screenshot della strip del carousel.
