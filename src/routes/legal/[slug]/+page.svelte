<script lang="ts">
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';
	import { LEGAL_HREF, LEGAL_LABELS, LEGAL_SLUGS, type LegalSlug } from '#lib/legal.js';

	let { data }: { data: { slug: string; docs: Record<'de' | 'en', string> } } = $props();

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const slug = $derived(data.slug as LegalSlug);
	const label = $derived(LEGAL_LABELS[slug][localeState.value]);
	const summary = $derived(s(`legal${slug[0].toUpperCase()}${slug.slice(1)}Summary`));
	const notice = $derived(s('legalNotice'));
</script>

{#key localeState.value}
	<SeoHead title={label} description={summary} path={LEGAL_HREF(slug)} />

	<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<a href="/about" class="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
			← {s('legalBackAbout')}
		</a>
		<h1 class="mt-5 text-3xl font-extrabold tracking-tight text-[var(--strong)] sm:text-4xl">
			{label}
		</h1>
		<p class="mt-2 text-[var(--muted)]">{summary}</p>

		<div
			class="mt-4 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]"
			role="note"
		>
			{notice}
		</div>

		<article class="doc mt-6 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6">
			{@html data.docs[localeState.value]}
			<p class="mt-8 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
				{s('legalUpdated')}
			</p>
		</article>

		<nav class="mt-10" aria-labelledby="legal-more-heading">
			<h2 id="legal-more-heading" class="text-lg font-bold text-[var(--strong)]">
				{s('legalMore')}
			</h2>
			<ul class="mt-3 grid gap-2 sm:grid-cols-2">
				{#each LEGAL_SLUGS as other (other)}
					<li>
						<a
							href={LEGAL_HREF(other)}
							class="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
							aria-current={other === slug ? 'page' : undefined}
						>
							{LEGAL_LABELS[other][localeState.value]}
							{#if other === slug}<span class="text-xs text-[var(--muted)]">•</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</main>
{/key}
