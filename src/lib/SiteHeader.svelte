<script lang="ts">
	import IconMonitor from '~icons/lucide/monitor';
	import IconSun from '~icons/lucide/sun';
	import IconMoon from '~icons/lucide/moon';
	import { page } from '$app/state';
	import { LANGS } from './projects.js';
	import { THEMES, prefs, setLang, setTheme, type Theme } from './prefs.svelte.js';

	const NAV = {
		de: {
			home: 'Start',
			apps: 'Apps',
			docs: 'Handbuch',
			theme: 'Darstellung',
			language: 'Sprache'
		},
		en: { home: 'Home', apps: 'Apps', docs: 'Handbook', theme: 'Appearance', language: 'Language' }
	};
	const THEME_LABEL: Record<'de' | 'en', Record<Theme, string>> = {
		de: { system: 'Wie das System', light: 'Hell', dark: 'Dunkel' },
		en: { system: 'Match the system', light: 'Light', dark: 'Dark' }
	};
	const ICON = { system: IconMonitor, light: IconSun, dark: IconMoon };

	const nav = $derived(NAV[prefs.lang]);
	const onDocs = $derived(page.url.pathname.startsWith('/docs'));
</script>

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
		<nav class="flex text-sm font-semibold" aria-label={nav.docs}>
			<a
				href="/"
				class="rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]"
				class:text-[var(--accent)]={!onDocs}
				aria-current={!onDocs ? 'page' : undefined}>{nav.home}</a
			>
			<a href="/#apps" class="rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]"
				>{nav.apps}</a
			>
			<a
				href="/docs"
				class="rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]"
				class:text-[var(--accent)]={onDocs}
				aria-current={onDocs ? 'page' : undefined}>{nav.docs}</a
			>
		</nav>
		<div
			class="flex rounded-full border border-[var(--line)] bg-[var(--card)] p-1 shadow-sm"
			role="group"
			aria-label={nav.theme}
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
					title={THEME_LABEL[prefs.lang][option]}
					aria-label={THEME_LABEL[prefs.lang][option]}
					onclick={() => setTheme(option)}
				>
					<Icon class="size-4" aria-hidden="true" />
				</button>
			{/each}
		</div>
		<div
			class="flex rounded-full border border-[var(--line)] bg-[var(--card)] p-1 text-sm shadow-sm"
			role="group"
			aria-label={nav.language}
		>
			{#each LANGS as option (option)}
				<button
					type="button"
					class="h-7 rounded-full px-2.5 font-semibold uppercase transition-colors"
					class:bg-[var(--accent)]={prefs.lang === option}
					class:text-[var(--accent-ink)]={prefs.lang === option}
					class:text-[var(--muted)]={prefs.lang !== option}
					aria-pressed={prefs.lang === option}
					onclick={() => setLang(option)}
				>
					{option}
				</button>
			{/each}
		</div>
	</div>
</header>
