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
- Gli asset pesanti non vanno copiati qui: usare link o path dichiarati.
- Per nuovi manifest seguire `figma-map.schema.json`.

## Sequenza Veloce

1. Copertina: creare una proposta sola e attendere approvazione.
2. Batch: generare tutte le immagini solo dopo approvazione cover.
3. Preflight: controllare asset, righe copy, manifest, template e mappa layer.
4. Import: popolare Figma dal manifest/template.
5. QA: verificare cover, una slide centrale e una slide con copy lungo.

## Standard Visuale Corrente

- Formato default: `1080x1350` px.
- Fondino testo uniforme: x=0, y=0, 1080x622px.
- Box testo uniformi: eyebrow 900x44px a x=72 y=66; titolo 860x190px a x=72
  y=115; descrizione 900x280px a x=72 y=314; fonte 820x30px nel footer.
- Non variare l'altezza del fondino in base al testo della singola slide. Se il
  copy non entra nei box previsti, tornare alla bozza e riscrivere o dividere la
  slide.
