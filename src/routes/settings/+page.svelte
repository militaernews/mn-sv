<script lang="ts">
	import type { Component } from 'svelte';
	import IconMonitor from '~icons/lucide/monitor';
	import IconSun from '~icons/lucide/sun';
	import IconMoon from '~icons/lucide/moon';
	import IconCheck from '~icons/lucide/check';
	import IconStar from '~icons/lucide/star';
	import { onMount } from 'svelte';
	import { currentEntitlement, saveEntitlement } from '#lib/entitlement.ts';
	import { PLANS, type PaidPlan } from '#lib/plans.js';
	import { getInitData, openInvoice } from '#lib/telegram.js';
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { locales } from '#lib/paraglide/runtime.js';
	import { changeLocale, localeState } from '#lib/locale.svelte.js';
	import { prefs, setTheme, THEMES, type Theme } from '#lib/prefs.svelte.js';

	let entitlement = $state(currentEntitlement());
	let busy = $state(false);
	let notice = $state('');

	onMount(() => {
		entitlement = currentEntitlement();
	});

	async function subscribe(plan: PaidPlan) {
		busy = true;
		notice = '';
		try {
			const response = await fetch('/api/stars', {
				method: 'POST',
				headers: { 'content-type': 'application/json', 'x-telegram-init-data': getInitData() },
				body: JSON.stringify({ action: 'invoice', plan })
			});
			if (!response.ok) throw new Error(s('invoiceFailed'));
			const { url } = await response.json();
			openInvoice(url, async (status) => {
				if (status !== 'paid') return;
				const activation = await fetch('/api/stars', {
					method: 'POST',
					headers: { 'content-type': 'application/json', 'x-telegram-init-data': getInitData() },
					body: JSON.stringify({ action: 'activate', plan })
				});
				if (!activation.ok) return;
				const result = await activation.json();
				saveEntitlement(result);
				entitlement = currentEntitlement();
				notice = s('planThanks');
			});
		} catch (cause) {
			notice = cause instanceof Error ? cause.message : s('invoiceFailed');
		} finally {
			busy = false;
		}
	}

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

		<section class="mt-12" aria-labelledby="plans-title">
			<h2 id="plans-title" class="text-xl font-extrabold text-[var(--strong)]">
				{s('plansTitle')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('plansText')}</p>
			{#if entitlement}
				<p
					class="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold"
				>
					<IconCheck class="size-4" />
					{s('currentPlan')}: {entitlement.plan.toUpperCase()} ·
					{s('activeUntil')}
					{new Date(entitlement.exp).toLocaleDateString()}
				</p>
			{/if}
			{#if notice}<p class="mt-3 text-sm font-semibold text-[var(--accent)]">{notice}</p>{/if}
			<div class="mt-4 grid gap-4 sm:grid-cols-2">
				{#each Object.entries(PLANS) as [id, plan] (id)}
					<div class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5">
						<div class="flex items-center gap-2 text-lg font-extrabold">
							<IconStar class="size-5 text-[var(--accent)]" />
							{s(id === 'pro' ? 'planPro' : 'planMax')}
						</div>
						<p class="mt-1 text-sm text-[var(--muted)]">{plan.stars} Stars · {s('perMonth')}</p>
						<ul class="mt-3 space-y-1 text-sm text-[var(--muted)]">
							{#each plan.features as feature}
								<li class="flex items-center gap-2"><IconCheck class="size-4" /> {s(feature)}</li>
							{/each}
						</ul>
						<button
							type="button"
							disabled={busy}
							class="btn btn-primary mt-4 w-full"
							onclick={() => subscribe(id as PaidPlan)}>{s('subscribe')}</button
						>
					</div>
				{/each}
			</div>
		</section>

		<section class="mt-12">
			<a
				href="/changelog"
				class="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--accent)]"
			>
				<span>
					<strong class="block text-lg font-extrabold text-[var(--strong)]"
						>{s('settingsChangelog')}</strong
					>
					<span class="mt-1 block text-sm text-[var(--muted)]">{s('settingsChangelogText')}</span>
				</span>
				<span class="text-[var(--accent)]">→</span>
			</a>
		</section>

		<nav
			class="mt-10 flex flex-wrap gap-4 border-t border-[var(--line)] pt-6 text-sm font-semibold"
		>
			<a class="text-[var(--accent)] hover:underline" href="/about">{s('navAbout')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/docs">{s('navDocs')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/brand">{s('brandTitle')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/legal/imprint">{s('footerLegal')}</a>
		</nav>
	</main>
{/key}
