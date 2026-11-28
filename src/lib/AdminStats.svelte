<script lang="ts">
	import { onMount } from 'svelte';
	import IconShield from '~icons/lucide/shield';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';
	import { getInitData } from '#lib/telegram.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	let stats: {
		github: { stars: number; forks: number; issues: number };
		channels: number;
		projects: number;
		docs: number;
	} | null = $state(null);

	onMount(async () => {
		const response = await fetch('/api/admin/stats', {
			headers: { 'x-telegram-init-data': getInitData() }
		});
		if (response.ok) stats = await response.json();
	});
</script>

{#if stats}
	{#key localeState.value}
		<section class="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5">
			<h2 class="flex items-center gap-2 text-lg font-extrabold text-[var(--strong)]">
				<IconShield class="size-5 text-[var(--accent)]" />
				{s('adminStatsTitle')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('adminStatsText')}</p>
			<ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
				<li class="rounded-xl bg-[var(--bg-2)] p-4 text-center">
					<strong class="block text-2xl text-[var(--accent)]">{stats.github.stars}</strong><span
						class="text-xs text-[var(--muted)]">{s('adminStars')}</span
					>
				</li>
				<li class="rounded-xl bg-[var(--bg-2)] p-4 text-center">
					<strong class="block text-2xl text-[var(--accent)]">{stats.github.forks}</strong><span
						class="text-xs text-[var(--muted)]">{s('adminForks')}</span
					>
				</li>
				<li class="rounded-xl bg-[var(--bg-2)] p-4 text-center">
					<strong class="block text-2xl text-[var(--accent)]">{stats.github.issues}</strong><span
						class="text-xs text-[var(--muted)]">{s('adminIssues')}</span
					>
				</li>
				<li class="rounded-xl bg-[var(--bg-2)] p-4 text-center">
					<strong class="block text-2xl text-[var(--accent)]">{stats.channels}</strong><span
						class="text-xs text-[var(--muted)]">{s('adminChannels')}</span
					>
				</li>
				<li class="rounded-xl bg-[var(--bg-2)] p-4 text-center">
					<strong class="block text-2xl text-[var(--accent)]">{stats.projects}</strong><span
						class="text-xs text-[var(--muted)]">{s('adminProjects')}</span
					>
				</li>
				<li class="rounded-xl bg-[var(--bg-2)] p-4 text-center">
					<strong class="block text-2xl text-[var(--accent)]">{stats.docs}</strong><span
						class="text-xs text-[var(--muted)]">{s('adminDocs')}</span
					>
				</li>
			</ul>
		</section>
	{/key}
{/if}
