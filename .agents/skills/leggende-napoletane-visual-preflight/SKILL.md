---
name: leggende-napoletane-visual-preflight
description: Controlla asset, stile immagini, manifest Figma, QA visuale e rischi di pubblicazione dei caroselli Leggende Napoletane.
---

# Leggende Napoletane Visual Preflight

## Scope

Verificare che immagini, manifest e montaggio Figma siano coerenti con lo stile
del progetto e pronti per pubblicazione.

Questa skill non sostituisce il designer: controlla rischi, coerenza e prove QA.

## Documenti Da Leggere Prima

- `AGENTS.md`
- JSON operativo del post in `content_queue/`
- `brand/visual-style.md`
- `brand/tono-di-voce.md`
- `outputs/figma/README.md`
- `outputs/figma/figma-map.schema.json`
- `outputs/figma/ASSET_INDEX_TEMPLATE.md`
- manifest Figma del post
- asset index del post
- eventuali screenshot o audit in `outputs/audits/` e `outputs/figma/qa/`

## Quando Usare La Skill

Usare questa skill quando:

- un post passa da `design_ready` a `figma_done`;
- si prepara la pubblicazione di un post `approved`;
- bisogna verificare asset locali, asset solo Figma o duplicati;
- ci sono dubbi su leggibilita, stile immagini, fonti visibili o watermark.

## Checklist Visuale

- Formato default `1080x1350`, rapporto `4:5`.
- Asset senza testo, fonti, logo, CTA o watermark.
- Stile: illustrazione editoriale atmosferica, concreta e napoletana.
- Evitare horror generico, cartoline turistiche, folklore caricaturale e simboli
  religiosi gratuiti.
- Immagini con aree pulite per titolo, descrizione e footer.
- Fondino-gradiente alto leggero, non fascia piena invadente.
- Box e dimensioni testo coerenti con gli standard del template.
- Source visibile solo sull'ultima card; nelle altre card nascosto/vuoto.
- Asset duplicati registrati come scelta consapevole o sostituiti.
- Asset path locali esistenti oppure dichiarati come `figma_only`.
- QA eseguito almeno su cover, slide centrale e slide piu lunga.
- Node Figma e frame/layer ID reali registrati nel manifest.

## Output Atteso

Rispondere sempre con:

- post controllato e `status` attuale;
- esito `pass`, `needs_fix` o `blocked`;
- problemi asset;
- problemi Figma;
- problemi stile o leggibilita;
- prove QA consultate;
- aggiornamenti consigliati per JSON, manifest, asset index o board.

