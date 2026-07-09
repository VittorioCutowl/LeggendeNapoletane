# Leggende Napoletane Instagram

Progetto madre per coordinare una redazione Instagram dedicata a leggende,
misteri, luoghi e tradizioni narrative napoletane.

## Come Si Lavora

1. Creare o aggiornare un JSON in `content_queue/`.
2. Usare solo il campo `status` per avanzare nel workflow.
3. Distinguere sempre fonte storica, racconto popolare, variante e invenzione
   creativa.
4. Validare il JSON prima di ogni passaggio importante.
5. Salvare bozze, approvati, specifiche e manifest nelle cartelle `outputs/`.
6. In Figma mostrare le fonti solo sull'ultima card del carousel; nelle altre
   card il layer `source` deve essere nascosto/vuoto.
7. Per i caroselli Instagram portrait verificare sempre card singole
   `1080x1350` con titoli e testi grandi, non solo la strip completa.

## Memoria Operativa

Per non perdere riferimenti tra agenti e sessioni:

- `AGENTS.md`: contratto madre, workflow, gate, skill e documenti obbligatori.
- `content_queue/BOARD.md`: dashboard umana della coda e rischi residui.
- `content_queue/content_queue.schema.json`: contratto JSON.
- `brand/`: linea editoriale, tono, stile visuale e criteri.
- `sources/`: regole fonti, template fonte e note di ricerca.
- `.agents/skills/`: skill operative per ruoli editoriali, fact-check, Figma,
  QA copy, QA visuale, publishing e performance.
- `outputs/figma/QA_INDEX.md`: indice QA visuale e Figma.

Prima di programmare un post, controllare che non restino fonti `to_verify`,
claim `needs_context`, open issue di fact-check o audit aperti senza decisione
editoriale scritta.

## Validazione

PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\validate-content-queue.ps1
```

Node, se disponibile nel PATH:

```powershell
npm run validate:queue
```

## Fonti Di Verita

- `AGENTS.md`: regole operative della redazione.
- `content_queue/content_queue.schema.json`: contratto dei post.
- `content_queue/*.json`: stato operativo dei post reali.
- `outputs/figma/figma-map.schema.json`: contratto dei manifest Figma.
