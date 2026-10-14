# easyblobs-webui

The operator console for the **[easyblobs](../easyblobs)** multi-protocol
package registry — a Svelte 5 + Vite + Tailwind v4 single-page app.

It talks to the registry's `system` admin adapter over JSON, so it is served
**same-origin** by the binary at `/artifacts/system/ui/` (the SPA carries no
secrets; the operator pastes a write token that only the JSON endpoints
validate, so it loads pre-auth).

## Pages

Overview · Packages · Images · Repositories · Downloads · Config

## Develop

```sh
npm install
npm run dev      # vite dev server (proxies nothing; point it at a registry)
```

## Build

Standalone (into `./dist`):

```sh
npm run build
```

Build straight into the **server repo's embedded directory** so a
`go build` of easyblobs serves the new UI:

```sh
OUT_DIR=../easyblobs/system/ui/dist npm run build
```

`base` is fixed at `/artifacts/system/ui/` (the adapter's mount); keep it in
sync with the server if the mount ever moves.

## Relationship to easyblobs

This repo is the UI **source**. The easyblobs server embeds the **built** output
via `//go:embed all:ui/dist` (`system/ui.go`), and that build is committed there
so `go build` needs no Node. After changing the UI here, rebuild with
`OUT_DIR=…/system/ui/dist` and commit the result in the server repo.
