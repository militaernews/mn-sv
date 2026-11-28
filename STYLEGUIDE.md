# MilitärNews styleguide

Applies to every MilitärNews web app and Telegram bot, including `apps/viz`, `apps/geo`,
`apps/charts`, the main site, and external tools such as `litfass`.

## 1. Brand & tone

- Be calm, direct and useful. No hype, no exclamation-mark spam, no jargon.
- German uses **Du**. English uses **you**. Keep sentences short.
- One emoji per message or card at most, and only where it adds meaning.
- Adverts are always labelled **Anzeige** (§ 6 DDG, § 5a UWG). Never hide that label.
- Support contact is always **@MilitaernewsKontakt**.

## 2. Colour tokens

Dark theme is the default. These are the canonical values:

| Token | Dark | Light |
| --- | --- | --- |
| Page | `#06142a` | `#eef6fc` |
| Surface | `#0a1f3d` | `#dcecf8` |
| Card | `#0d2648` | `#ffffff` |
| Border | `#1c3a63` | `#c9d9ea` |
| Text | `#e6f6ff` | `#0b1d33` |
| Muted | `#9fb6c9` | `#4a5d73` |
| Primary | `#9be7ff` | `#0c3a6b` |
| Accent | `#2ec5ff` | `#0a7fbf` |
| On accent | `#06142a` | `#ffffff` |
| Success | `#4ade80` | `#0a7f5b` |
| Warning | `#facc15` | `#8a5a00` |
| Danger | `#ff7a6b` | `#b42318` |

Use daisyUI variables (`--color-base-100`, `--color-primary`, …) in Svelte apps so themes
switch cleanly. Never hardcode a single theme's colour in a component.

## 3. Typography

- Font: system sans-serif; `HP Simplified` where it is bundled.
- Body: 16px / 1.55. Headings 700–800 weight, letter-spacing `-0.04em`.
- Numbers and IDs: monospace.
- Maximum reading width: ~70 characters for prose, 1040px for dashboards.

## 4. Shape, space, motion

- Cards: 16–22px radius, 1px border, soft shadow (`0 12px 36px #0003`).
- Buttons and pills: full radius (`999px`).
- Inputs: 10–12px radius, minimum 44px height on touch devices.
- Spacing scale: 4, 8, 12, 16, 24, 32px.
- Transitions: 150–250ms `ease`; always honour `prefers-reduced-motion`.
- Respect `env(safe-area-inset-bottom)` on mobile.

## 5. Icons

- Use **Lucide** via `unplugin-icons` only. No emoji as UI icons in web apps.
- Sizes: 14/16px inline, 18/20px in nav, 24–28px in feature headers.
- Always `currentColor`, stroke width 2, `aria-hidden="true"` for decorative icons.

## 6. Layout patterns

- Desktop: sidebar or step rail + main panel; no full-width walls of controls.
- Mobile: single column, fixed bottom navigation where there are 3–5 main views.
- Every data view has explicit empty, loading and error states.
- Tables scroll horizontally rather than squeezing; key figures get cards.
- Telegram Mini Apps use the client's `colorScheme` and `themeParams`, remove decorative
  gradients and reduce top padding.

## 7. Telegram bots

- Commands: lowercase, short, with a command list set via `setMyCommands`.
- Replies lead with the answer, then one clear next action. Keep under ~400 characters.
- Inline keyboards: at most 3 buttons per row, primary action first, no dead buttons.
- Errors say what happened **and** what to do next, e.g. "I cannot post here. Make me an admin
  with 'send messages' permission."
- Buttons and callbacks use stable IDs (`ad:<id>:show`, `pub:<id>:stats`).
- Never put tokens, secrets, personal data or tailnet addresses in messages, logs or commits.
- Daily/periodic messages are opt-in and can be turned off.

## 8. Data visualisation

- Use a consistent series order and colour meaning: views = primary, clicks = accent,
  rewards/conversions = yellow.
- Always label axes, time range and units. Show comparison to the previous period when possible.
- Prefer small multiple cards + one chart over a dashboard full of charts.
- Export buttons produce CSV/PNG with the same labels the UI shows.

## 9. Code conventions

- TypeScript + Svelte 5 runes. Props are typed; no `$props<T>()`.
- Translate all user-facing text with Paraglide (`de`/`en`); no hardcoded UI strings.
- Keep data access in `$lib/server`, never import it into client components.
- Commit messages follow `AGENTS.md`: `type(scope): What was changed`.
- Private infrastructure stays out of public repos: no host names, Telegram user IDs or tokens.

## 10. Quick checklist

- [ ] Light and dark both readable?
- [ ] Works at 360px width with 44px touch targets?
- [ ] Icons are Lucide, sized and labelled?
- [ ] Empty / loading / error states present?
- [ ] Telegram theme and safe areas handled?
- [ ] German and English complete?
- [ ] "Anzeige" label intact on adverts?
- [ ] Commit message matches the convention?
