<script lang="ts">
	import IconDownload from '~icons/lucide/download';
	import IconFileArchive from '~icons/lucide/file-archive';
	import IconImage from '~icons/lucide/image';
	import SeoHead from '#lib/SeoHead.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localeState } from '#lib/locale.svelte.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const masters = [
		{ name: 'mn-wide.xcf', description: 'Wide logo artwork' },
		{
			name: 'mn-talk-31-03-2023_font-hp-simplified-4.xcf',
			description: 'Talk graphic · HP Simplified'
		},
		{ name: 'BlackedOut-Regular.otf', description: 'BlackedOut regular typeface' }
	];
	const pngs = [
		{ name: 'icon.png', description: 'App icon' },
		{ name: 'favicon.png', description: 'Favicon' }
	];

	const title = $derived(s('brandTitle'));
	const description = $derived(s('brandText'));
</script>

{#key localeState.value}
	<SeoHead {title} {description} path="/brand" />

	<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<a href="/" class="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
			← {s('navHome')}
		</a>
		<h1 class="mt-5 text-3xl font-extrabold tracking-tight text-[var(--strong)] sm:text-4xl">
			{title}
		</h1>
		<p class="mt-2 text-[var(--muted)]">{description}</p>

		<section class="mt-8">
			<h2 class="flex items-center gap-2 text-lg font-extrabold text-[var(--strong)]">
				<IconFileArchive class="size-5 text-[var(--accent)]" />
				{s('brandMaster')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('brandMasterText')}</p>
			<ul class="mt-3 space-y-2">
				{#each masters as file (file.name)}
					<li
						class="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4"
					>
						<div class="min-w-0">
							<strong class="block truncate text-sm">{file.name}</strong>
							<span class="text-xs text-[var(--muted)]">{file.description}</span>
						</div>
						<a class="btn btn-ghost btn-sm ml-auto" href={`/brand/${file.name}`} download>
							<IconDownload class="size-4" />
							{s('brandDownload')}
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<section class="mt-10">
			<h2 class="flex items-center gap-2 text-lg font-extrabold text-[var(--strong)]">
				<IconImage class="size-5 text-[var(--accent)]" />
				{s('brandPng')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('brandPngText')}</p>
			<ul class="mt-3 space-y-2">
				{#each pngs as file (file.name)}
					<li
						class="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4"
					>
						<div class="min-w-0">
							<strong class="block truncate text-sm">{file.name}</strong>
							<span class="text-xs text-[var(--muted)]">{file.description}</span>
						</div>
						<a class="btn btn-ghost btn-sm ml-auto" href={`/${file.name}`} download>
							<IconDownload class="size-4" />
							{s('brandDownload')}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</main>
{/key}
