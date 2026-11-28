# mn-sv

The overview page of the MilitärNews tools for editors and customers. Tools (Newsmix, viz, maps,
charts), Games (World War 3) and the Telegram bots each have their own section, followed by the
language channels, community stats and the handbook. Every page has a German and an English URL
(prefixed with `/en`); the switch is in the header.

The projects and their texts are in `src/lib/projects.ts`; pictures are in `static/img/`. The
handbook lives in `src/lib/docs/` with an English translation in `src/lib/docs/en/` and is rendered
by `src/lib/server/docs.ts`.

The header leads to `/settings` (language, appearance and the changelog from `src/lib/changelog.md`)
and `/about` (support contact and the four `/legal/*` pages). The legal texts live in
`src/lib/legal/{de,en}/`; operator details are still marked as TODO placeholders.

Appearance follows the system colour scheme in a browser. Inside Telegram, the WebApp colour scheme
and colours are used instead, updates live when Telegram's theme changes, and external links open
through the WebApp. Telegram also gets a compact layout. The relevant code is in `src/app.html`,
`src/lib/prefs.svelte.ts` and `src/lib/telegram.ts`.

```sh
bun install
bun run dev
bun run build
```

Deployed on Vercel from `main`.
