<script lang="ts">
	import type { Component } from 'svelte';
	import IconMonitor from '~icons/lucide/monitor';
	import IconSun from '~icons/lucide/sun';
	import IconMoon from '~icons/lucide/moon';
	import IconCheck from '~icons/lucide/check';
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { locales } from '#lib/paraglide/runtime.js';
	import { changeLocale, localeState } from '#lib/locale.svelte.js';
	import { prefs, setTheme, THEMES, type Theme } from '#lib/prefs.svelte.js';

	let { data }: { data: { changelog: string } } = $props();

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const title = $derived(s('settingsTitle'));
	const description = $derived(s('settingsDescription'));
	const ICON: Record<Theme, Component> = { system: IconMonitor, light: IconSun, dark: IconMoon };
	const HINT: Record<Theme, string> = {
		system: s('themeSystemHint'),
		light: s('themeLightHint'),
		dark: s('themeDarkHint')
	};
	const option = 'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors';
	const active = 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--strong)]';
	const idle = 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--accent)]/60';
</script>

{#key localeState.value}
	<SeoHead {title} {description} path="/settings" />

	<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<a href="/" class="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
			← {s('navHome')}
		</a>
		<h1 class="mt-5 text-3xl font-extrabold tracking-tight text-[var(--strong)] sm:text-4xl">
			{title}
		</h1>
		<p class="mt-2 text-[var(--muted)]">{description}</p>

		<section class="mt-10" aria-labelledby="appearance-title">
			<h2 id="appearance-title" class="text-xl font-extrabold text-[var(--strong)]">
				{s('settingsAppearance')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('settingsAppearanceText')}</p>
			<div class="mt-4 grid gap-3 sm:grid-cols-3" role="group" aria-label={s('appearance')}>
				{#each THEMES as theme (theme)}
					{@const Icon = ICON[theme]}
					<button
						type="button"
						class="{option} {prefs.theme === theme ? active : idle}"
						aria-pressed={prefs.theme === theme}
						onclick={() => setTheme(theme)}
					>
						<span
							class="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--accent)] text-[var(--accent-ink)]"
						>
							<Icon class="size-4" aria-hidden="true" />
						</span>
						<span class="min-w-0">
							<span class="block text-sm font-bold"
								>{s(`theme${theme[0].toUpperCase()}${theme.slice(1)}`)}</span
							>
							<span class="block text-xs text-[var(--muted)]">{HINT[theme]}</span>
						</span>
						{#if prefs.theme === theme}
							<IconCheck class="ml-auto size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
						{/if}
					</button>
				{/each}
			</div>
			{#if prefs.telegram}
				<p class="mt-3 rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">
					{s('settingsTelegramNote')}
				</p>
			{/if}
		</section>

		<section class="mt-10" aria-labelledby="language-title">
			<h2 id="language-title" class="text-xl font-extrabold text-[var(--strong)]">
				{s('settingsLanguage')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('settingsLanguageText')}</p>
			<div class="mt-4 flex gap-3" role="group" aria-label={s('language')}>
				{#each locales as locale (locale)}
					<button
						type="button"
						class="{option} min-w-32 {localeState.value === locale ? active : idle}"
						aria-pressed={localeState.value === locale}
						onclick={() => changeLocale(locale)}
					>
						<span class="text-lg font-bold uppercase">{locale}</span>
						<span class="text-sm text-[var(--muted)]">
							{locale === 'de' ? 'Deutsch' : 'English'}
						</span>
						{#if localeState.value === locale}
							<IconCheck class="ml-auto size-4 text-[var(--accent)]" aria-hidden="true" />
						{/if}
					</button>
				{/each}
			</div>
		</section>

		<section class="mt-12" aria-labelledby="changelog-title">
			<h2 id="changelog-title" class="text-xl font-extrabold text-[var(--strong)]">
				{s('settingsChangelog')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('settingsChangelogText')}</p>
			<div class="doc mt-4 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6">
				{@html data.changelog}
			</div>
		</section>

		<nav
			class="mt-10 flex flex-wrap gap-4 border-t border-[var(--line)] pt-6 text-sm font-semibold"
		>
			<a class="text-[var(--accent)] hover:underline" href="/about">{s('navAbout')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/docs">{s('navDocs')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/legal/imprint">{s('footerLegal')}</a>
		</nav>
	</main>
{/key}
