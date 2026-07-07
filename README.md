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

