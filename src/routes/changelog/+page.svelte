<script lang="ts">
	import IconHistory from '~icons/lucide/history';
	import IconGitCommit from '~icons/lucide/git-commit-horizontal';
	import IconUsers from '~icons/lucide/users';
	import IconCalendar from '~icons/lucide/calendar-days';
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';

	interface Commit {
		sha: string;
		message: string;
		date: string;
		author: string;
	}
	let {
		data
	}: {
		data: {
			sections: { date: string; html: string }[];
			commits: Commit[];
			stats: { total: number; contributors: number; lastUpdate: string };
		};
	} = $props();

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

		<div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
			<div class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
				<IconGitCommit class="size-5 text-[var(--accent)]" />
				<strong class="mt-2 block text-2xl text-[var(--strong)]">{data.stats.total}</strong>
				<span class="text-xs text-[var(--muted)]">{s('changelogCommitsTotal')}</span>
			</div>
			<div class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
				<IconUsers class="size-5 text-[var(--accent)]" />
				<strong class="mt-2 block text-2xl text-[var(--strong)]">{data.stats.contributors}</strong>
				<span class="text-xs text-[var(--muted)]">{s('changelogContributors')}</span>
			</div>
			<div class="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
				<IconCalendar class="size-5 text-[var(--accent)]" />
				<strong class="mt-2 block text-sm text-[var(--strong)]">
					{data.stats.lastUpdate
						? new Date(data.stats.lastUpdate).toLocaleDateString(
								localeState.value === 'de' ? 'de-DE' : 'en-GB'
							)
						: '–'}
				</strong>
				<span class="text-xs text-[var(--muted)]">{s('changelogLastUpdate')}</span>
			</div>
		</div>

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
