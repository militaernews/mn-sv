<script lang="ts">
	import IconSend from '~icons/lucide/send';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import IconBook from '~icons/lucide/book-open';
	import IconScale from '~icons/lucide/scale';
	import IconGrid from '~icons/lucide/layout-grid';
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';
	import { CONTACT } from '#lib/projects.js';
	import { LEGAL_HREF, LEGAL_LABELS, LEGAL_SLUGS } from '#lib/legal.js';
	import { openExternal } from '#lib/telegram.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
</script>

{#key localeState.value}
	<SeoHead title={s('aboutTitle')} description={s('aboutDescription')} path="/about" />

	<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<a href="/" class="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
			← {s('navHome')}
		</a>
		<h1 class="mt-5 text-3xl font-extrabold tracking-tight text-[var(--strong)] sm:text-4xl">
			{s('aboutTitle')}
		</h1>
		<p class="mt-3 text-lg leading-relaxed text-[var(--muted)]">{s('aboutDescription')}</p>

		<div class="mt-10 grid gap-4">
			<section
				class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm sm:p-8"
			>
				<span
					class="grid size-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
				>
					<IconSend class="size-5" aria-hidden="true" />
				</span>
				<h2 class="mt-4 text-xl font-extrabold text-[var(--strong)]">{s('aboutSupport')}</h2>
				<p class="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s('aboutSupportText')}</p>
				<a
					href={CONTACT}
					onclick={(event) => {
						event.preventDefault();
						openExternal(CONTACT);
					}}
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-ink)] shadow-sm transition hover:brightness-110"
				>
					{s('aboutSupportCta')}
					<IconArrowRight class="size-4" aria-hidden="true" />
				</a>
			</section>

			<section
				class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm sm:p-8"
			>
				<span
					class="grid size-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
				>
					<IconScale class="size-5" aria-hidden="true" />
				</span>
				<h2 class="mt-4 text-xl font-extrabold text-[var(--strong)]">{s('aboutLegal')}</h2>
				<p class="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s('aboutLegalText')}</p>
				<ul class="mt-5 grid gap-2 sm:grid-cols-2">
					{#each LEGAL_SLUGS as slug (slug)}
						<li>
							<a
								href={LEGAL_HREF(slug)}
								class="flex items-center justify-between rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
							>
								{LEGAL_LABELS[slug][localeState.value]}
								<IconArrowRight class="size-4" aria-hidden="true" />
							</a>
						</li>
					{/each}
					<li>
						<a
							href="/legal"
							class="flex items-center justify-between rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
						>
							{s('legalMore')}
							<IconArrowRight class="size-4" aria-hidden="true" />
						</a>
					</li>
				</ul>
			</section>

			<div class="grid gap-4 sm:grid-cols-2">
				<section class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6">
					<span
						class="grid size-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
					>
						<IconBook class="size-5" aria-hidden="true" />
					</span>
					<h2 class="mt-4 text-lg font-extrabold text-[var(--strong)]">{s('aboutHandbook')}</h2>
					<p class="mt-2 text-sm text-[var(--muted)]">{s('aboutHandbookText')}</p>
					<a
						href="/docs"
						class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:underline"
					>
						{s('aboutHandbookCta')}
						<IconArrowRight class="size-4" aria-hidden="true" />
					</a>
				</section>
				<section class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6">
					<span
						class="grid size-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
					>
						<IconGrid class="size-5" aria-hidden="true" />
					</span>
					<h2 class="mt-4 text-lg font-extrabold text-[var(--strong)]">{s('navTools')}</h2>
					<p class="mt-2 text-sm text-[var(--muted)]">{s('aboutToolsText')}</p>
					<a
						href="/#tools"
						class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:underline"
					>
						{s('aboutHomeCta')}
						<IconArrowRight class="size-4" aria-hidden="true" />
					</a>
				</section>
			</div>
		</div>

		<nav
			class="mt-10 flex flex-wrap gap-4 border-t border-[var(--line)] pt-6 text-sm font-semibold"
		>
			<a class="text-[var(--accent)] hover:underline" href="/settings">{s('navSettings')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/docs">{s('navDocs')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/legal/imprint">
				{s('footerLegal')}
			</a>
		</nav>
	</main>
{/key}
