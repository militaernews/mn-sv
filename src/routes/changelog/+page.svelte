<script lang="ts">
	import IconHistory from '~icons/lucide/history';
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';

	let { data }: { data: { sections: { date: string; html: string }[] } } = $props();

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const title = $derived(s('changelogTitle'));
	const description = $derived(s('changelogText'));
</script>

{#key localeState.value}
	<SeoHead {title} {description} path="/changelog" />

	<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<a href="/" class="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
			← {s('navHome')}
		</a>
		<h1
			class="mt-5 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-[var(--strong)] sm:text-4xl"
		>
			<IconHistory class="size-8 text-[var(--accent)]" />
			{title}
		</h1>
		<p class="mt-2 text-[var(--muted)]">{description}</p>

		<div class="mt-8 space-y-5">
			{#each data.sections as section (section.date)}
				<section class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6">
					<h2 class="text-lg font-extrabold text-[var(--accent)]">{section.date}</h2>
					<div class="doc mt-3">{@html section.html}</div>
				</section>
			{/each}
		</div>

		<nav
			class="mt-10 flex flex-wrap gap-4 border-t border-[var(--line)] pt-6 text-sm font-semibold"
		>
			<a class="text-[var(--accent)] hover:underline" href="/about">{s('navAbout')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/docs">{s('navDocs')}</a>
			<a class="text-[var(--accent)] hover:underline" href="/settings">{s('navSettings')}</a>
		</nav>
	</main>
{/key}
