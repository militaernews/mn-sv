<script lang="ts">
	import IconMonitor from '~icons/lucide/monitor';
	import IconSun from '~icons/lucide/sun';
	import IconMoon from '~icons/lucide/moon';
	import { m } from './paraglide/messages.js';
	import { locales } from './paraglide/runtime.js';
	import { localeState, changeLocale } from './locale.svelte.js';
	import { THEMES, prefs, setTheme, type Theme } from './prefs.svelte.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const label: Record<Theme, string> = {
		system: s('themeSystem'),
		light: s('themeLight'),
		dark: s('themeDark')
	};
	const ICON = { system: IconMonitor, light: IconSun, dark: IconMoon };
</script>

{#key localeState.value}
	<header
		class="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg-glass)] backdrop-blur-xl"
	>
		<div class="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6">
			<a href="/" class="mr-auto flex items-center gap-2.5 font-extrabold text-[var(--strong)]">
				<img
					src="/img/mn.webp"
					alt=""
					width="32"
					height="32"
					class="size-8 rounded-full shadow-sm ring-2 ring-[var(--accent)]/30"
				/>
				<span class="hidden sm:inline">MilitärNews</span>
			</a>
			<nav class="flex text-sm font-semibold" aria-label={s('navDocs')}>
				<a href="/" class="rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]"
					>{s('navHome')}</a
				>
				<a
					href="/#tools"
					class="rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]"
					>{s('navTools')}</a
				>
				<a
					href="/docs"
					class="rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]"
					>{s('navDocs')}</a
				>
			</nav>
			<div
				class="flex rounded-full border border-[var(--line)] bg-[var(--card)] p-1 shadow-sm"
				role="group"
				aria-label={s('appearance')}
			>
				{#each THEMES as option (option)}
					{@const Icon = ICON[option]}
					<button
						type="button"
						class="grid size-7 place-items-center rounded-full transition-colors"
						class:bg-[var(--accent)]={prefs.theme === option}
						class:text-[var(--accent-ink)]={prefs.theme === option}
						class:text-[var(--muted)]={prefs.theme !== option}
						aria-pressed={prefs.theme === option}
						title={label[option]}
						aria-label={label[option]}
						onclick={() => setTheme(option)}
					>
						<Icon class="size-4" aria-hidden="true" />
					</button>
				{/each}
			</div>
			<div
				class="flex rounded-full border border-[var(--line)] bg-[var(--card)] p-1 text-sm shadow-sm"
				role="group"
				aria-label={s('language')}
			>
				{#each locales as option (option)}
					<button
						type="button"
						class="h-7 rounded-full px-2.5 font-semibold uppercase transition-colors"
						class:bg-[var(--accent)]={localeState.value === option}
						class:text-[var(--accent-ink)]={localeState.value === option}
						class:text-[var(--muted)]={localeState.value !== option}
						aria-pressed={localeState.value === option}
						aria-label={option}
						onclick={() => changeLocale(option)}
					>
						{option}
					</button>
				{/each}
			</div>
		</div>
	</header>
{/key}
