<script lang="ts">
	import IconDownload from '~icons/lucide/download';
	import IconFileArchive from '~icons/lucide/file-archive';
	import IconImage from '~icons/lucide/image';
	import IconPencil from '~icons/lucide/pencil';
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

	let line1 = $state('MILITÄR');
	let line2 = $state('NEWS');
	let subline = $state('');
	let variant = $state<'wide' | 'talk'>('wide');
	let accent = $state('#2ec5ff');
	let svgUrl = $state('');
	let pngUrl = $state('');
	let busy = $state(false);

	async function render() {
		busy = true;
		const response = await fetch('/api/brand/render', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ line1, line2, subline, variant, accent })
		});
		if (response.ok) {
			const data = await response.json();
			svgUrl = data.svgUrl;
			pngUrl = data.pngUrl;
		}
		busy = false;
	}

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
		<section class="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5">
			<h2 class="flex items-center gap-2 text-lg font-extrabold text-[var(--strong)]">
				<IconPencil class="size-5 text-[var(--accent)]" />
				{s('brandEditor')}
			</h2>
			<p class="mt-1 text-sm text-[var(--muted)]">{s('brandEditable')}</p>
			<div class="mt-4 grid gap-3 sm:grid-cols-2">
				<label class="text-sm font-semibold"
					>{s('brandLine1')}<input
						class="input input-bordered w-full"
						bind:value={line1}
						maxlength="40"
					/></label
				>
				<label class="text-sm font-semibold"
					>{s('brandLine2')}<input
						class="input input-bordered w-full"
						bind:value={line2}
						maxlength="40"
					/></label
				>
				<label class="text-sm font-semibold sm:col-span-2"
					>{s('brandSubline')}<input
						class="input input-bordered w-full"
						bind:value={subline}
						maxlength="80"
					/></label
				>
				<label class="text-sm font-semibold"
					>{s('brandVariant')}<select class="select select-bordered w-full" bind:value={variant}
						><option value="wide">{s('brandWide')}</option><option value="talk"
							>{s('brandTalk')}</option
						></select
					></label
				>
				<label class="text-sm font-semibold"
					>{s('brandAccent')}<input class="w-full" type="color" bind:value={accent} /></label
				>
			</div>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each [['MILITÄR', 'NEWS', '#2ec5ff'], ['MILITARY', 'NEWS', '#facc15'], ['MILITAIRE', 'ACTUALITÉ', '#ff7a6b']] as preset}
					<button
						class="btn btn-outline btn-sm"
						onclick={() => {
							line1 = preset[0];
							line2 = preset[1];
							accent = preset[2];
							render();
						}}>{preset[0]}</button
					>
				{/each}
				<button class="btn btn-primary btn-sm" disabled={busy} onclick={render}
					>{s('brandRender')}</button
				>
			</div>
			{#if svgUrl && pngUrl}
				<div
					class="mt-5 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-2)] p-3"
				>
					<img src={pngUrl} alt="Brand preview" class="mx-auto max-h-80 w-auto" />
					<div class="mt-3 flex flex-wrap gap-2">
						<a class="btn btn-sm" href={svgUrl} download={`mn-${variant}.svg`}>{s('brandSvg')}</a>
						<a class="btn btn-sm btn-primary" href={pngUrl} download={`mn-${variant}.png`}
							>{s('brandPng')}</a
						>
					</div>
				</div>
			{/if}
		</section>
	</main>
{/key}
