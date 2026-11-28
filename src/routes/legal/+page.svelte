<script lang="ts">
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';
	import { LEGAL_HREF, LEGAL_LABELS, LEGAL_SLUGS } from '#lib/legal.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
</script>

{#key localeState.value}
	<SeoHead title={s('aboutLegal')} description={s('aboutLegalText')} path="/legal" />

	<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<a href="/about" class="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
			← {s('legalBackAbout')}
		</a>
		<h1 class="mt-5 text-3xl font-extrabold text-[var(--strong)] sm:text-4xl">{s('aboutLegal')}</h1>
		<p class="mt-2 text-[var(--muted)]">{s('aboutLegalText')}</p>
		<ul class="mt-8 grid gap-3 sm:grid-cols-2">
			{#each LEGAL_SLUGS as slug (slug)}
				<li>
					<a
						href={LEGAL_HREF(slug)}
						class="block h-full rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--accent)]"
					>
						<span class="block font-bold">{LEGAL_LABELS[slug][localeState.value]}</span>
						<span class="mt-1 block text-sm text-[var(--muted)]">
							{s(`legal${slug[0].toUpperCase()}${slug.slice(1)}Summary`)}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</main>
{/key}
