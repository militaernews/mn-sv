<script lang="ts">
	import { onMount } from 'svelte';
	import { prefs, setTheme, startPrefs, type Theme } from '$lib/prefs.svelte';

	const themes: { id: Theme; label: string }[] = [
		{ id: 'system', label: 'System' },
		{ id: 'light', label: 'Light' },
		{ id: 'dark', label: 'Dark' }
	];
	const changes = [
		{
			version: '1.1',
			date: '2026-11-28',
			items: ['Updated dependencies', 'Settings, theme and about pages', 'Smaller installable PWA']
		},
		{ version: '1.0', date: '2026-11-28', items: ['Initial release'] }
	];
	onMount(startPrefs);
</script>

<svelte:head><title>Settings · MilitärNews</title></svelte:head>

<div class="min-h-dvh bg-base-200 p-4 text-base-content">
	<div class="mx-auto max-w-2xl space-y-6">
		<header>
			<a class="link link-primary" href="/">← Back</a>
			<h1 class="mt-2 text-3xl font-extrabold">Settings</h1>
			<p class="opacity-70">Appearance and recent changes.</p>
		</header>
		<section class="card bg-base-100 shadow">
			<div class="card-body">
				<h2 class="card-title">Appearance</h2>
				<div class="join">
					{#each themes as theme}
						<button
							class="btn join-item"
							class:btn-primary={prefs.theme === theme.id}
							onclick={() => setTheme(theme.id)}
						>
							{theme.label}
						</button>
					{/each}
				</div>
			</div>
		</section>
		<section class="card bg-base-100 shadow">
			<div class="card-body">
				<h2 class="card-title">Changelog</h2>
				{#each changes as change}
					<div class="border-b border-base-300 pb-3 last:border-0">
						<strong>{change.version}</strong> <span class="opacity-60">· {change.date}</span>
						<ul class="mt-1 list-inside list-disc opacity-70">
							{#each change.items as item}<li>{item}</li>{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>
		<a class="btn btn-outline" href="/about">About &amp; legal →</a>
	</div>
</div>
