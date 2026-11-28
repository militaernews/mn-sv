# mn-sv

The overview page of the MilitärNews tools for editors and customers. Tools (Newsmix, viz, maps,
charts), Games (World War 3) and the Telegram bots each have their own section, followed by the
language channels, community stats and the handbook. Every page has a German and an English URL
(prefixed with `/en`); the switch is in the header.

The projects and their texts are in `src/lib/projects.ts`; pictures are in `static/img/`. The
handbook lives in `src/lib/docs/` with an English translation in `src/lib/docs/en/` and is rendered
by `src/lib/server/docs.ts`.

```sh
bun install
bun run dev
bun run build
```

Deployed on Vercel from `main`.
