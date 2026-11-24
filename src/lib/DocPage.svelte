<script lang="ts">
	import IconSend from '~icons/lucide/send';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import { DOCS } from './docs.js';
	import { isDark, prefs } from './prefs.svelte.js';
	import type { Doc } from './server/docs.js';

	let { doc }: { doc: Doc } = $props();

	const BOTS = DOCS.filter((page) => page.bot);

	let body = $state<HTMLElement>();
	let renders = 0;

	// Flowcharts are drawn in the browser, in the colours of the current scheme
	$effect(() => {
		const dark = isDark();
		void doc.html; // draw again after moving to another page
		const blocks = Array.from(body?.querySelectorAll<HTMLElement>('[data-mermaid]') ?? []);
		if (!blocks.length) return;
		let cancelled = false;
		(async () => {
			const { default: mermaid } = await import('mermaid');
			const css = getComputedStyle(document.documentElement);
			const v = (name: string) => css.getPropertyValue(name).trim();
			mermaid.initialize({
				startOnLoad: false,
				securityLevel: 'strict',
				theme: 'base',
				fontFamily: 'Noto Sans, system-ui, sans-serif',
				themeVariables: {
					darkMode: dark,
					background: v('--card'),
					primaryColor: v('--bg-2'),
					primaryBorderColor: v('--accent'),
					primaryTextColor: v('--ink'),
					lineColor: v('--accent'),
					textColor: v('--ink'),
					edgeLabelBackground: v('--card'),
					tertiaryColor: v('--card')
				}
			});
			for (const block of blocks) {
				if (cancelled) return;
				try {
					const { svg } = await mermaid.render(`flow-${++renders}`, block.dataset.mermaid ?? '');
					if (!cancelled) block.innerHTML = svg;
				} catch (error) {
					console.warn('Flowchart left as text:', error); // leave the diagram as text
				}
			}
		})();
		return () => (cancelled = true);
	});
</script>

<svelte:head>
	<title>{doc.slug === 'index' ? 'Handbuch' : doc.name} · MilitärNews</title>
	<meta name="description" content={doc.summary} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-6 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-10">
	<aside class="lg:sticky lg:top-6 lg:self-start">
		<nav aria-label="Handbuch">
			<ul class="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
				{#each DOCS as page (page.slug)}
					{@const current = page.slug === doc.slug}
					<li class="shrink-0">
						<a
							href={page.href}
							class="block rounded-xl border px-3 py-2 text-sm transition-colors lg:border-transparent"
							class:border-[var(--line)]={!current}
							class:bg-[var(--card)]={current}
							class:border-[var(--accent)]={current}
							class:font-semibold={current}
							class:text-[var(--strong)]={current}
							class:text-[var(--muted)]={!current}
							aria-current={current ? 'page' : undefined}
						>
							<span class="flex items-center gap-2">
								{#if page.bot}
									<img
										src={page.bot.avatar}
										alt=""
										width="24"
										height="24"
										class="size-6 rounded-full"
									/>
								{/if}
								{page.name}
							</span>
						</a>
						{#if current && doc.toc.length}
							<ul class="mt-1 hidden border-l border-[var(--line)] pl-3 text-sm lg:block">
								{#each doc.toc as entry (entry.id)}
									<li>
										<a
											href="#{entry.id}"
											class="block py-1 text-[var(--muted)] hover:text-[var(--accent)]"
										>
											{entry.text}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<article class="min-w-0 pt-4 lg:pt-0">
		<p class="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase">
			{prefs.lang === 'de' ? 'Handbuch' : 'Handbook'}
		</p>
		<div class="mt-1 flex flex-wrap items-center gap-4">
			{#if doc.bot}
				<img
					src={doc.bot.avatar}
					alt=""
					width="80"
					height="80"
					class="size-16 rounded-full shadow-lg ring-4 ring-[var(--accent)]/30 sm:size-20"
				/>
			{/if}
			<div class="min-w-0 flex-1">
				<h1 class="text-3xl font-extrabold tracking-tight text-[var(--strong)] sm:text-4xl">
					{doc.title}
				</h1>
				{#if doc.bot}
					<a
						href="https://t.me/{doc.bot.username}"
						target="_blank"
						rel="noopener"
						class="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3.5 py-1.5 text-sm font-semibold text-[var(--accent-ink)] transition hover:brightness-110"
					>
						<IconSend class="size-4" aria-hidden="true" />
						@{doc.bot.username}
					</a>
				{/if}
			</div>
		</div>
		{#if prefs.lang === 'en'}
			<p
				class="mt-4 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] px-4 py-3 text-sm text-[var(--muted)]"
			>
				The handbook is written in German, the working language of the newsroom.
			</p>
		{/if}
		{#if doc.slug === 'index'}
			<h2 class="mt-8 text-xl font-bold text-[var(--strong)]">Die drei Bots</h2>
			<ul class="mt-4 grid gap-4 sm:grid-cols-3">
				{#each BOTS as page (page.slug)}
					{@const bot = page.bot!}
					<li
						class="flex flex-col items-center rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 text-center shadow-sm"
					>
						<img
							src={bot.avatar}
							alt=""
							width="96"
							height="96"
							class="size-24 rounded-full shadow-lg ring-4 ring-[var(--accent)]/30"
						/>
						<h3 class="mt-4 text-lg font-bold">{page.name}</h3>
						<a
							href="https://t.me/{bot.username}"
							target="_blank"
							rel="noopener"
							class="text-sm font-semibold text-[var(--accent)] hover:underline"
						>
							@{bot.username}
						</a>
						<p class="mt-2 text-sm text-[var(--muted)]">{page.summary}</p>
						<a
							href={page.href}
							class="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--strong)] hover:text-[var(--accent)]"
						>
							Zur Anleitung
							<IconArrowRight class="size-4" aria-hidden="true" />
						</a>
					</li>
				{/each}
			</ul>
		{/if}
		<div class="doc mt-6" bind:this={body}>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own markdown, rendered at build time -->
			{@html doc.html}
		</div>
	</article>
</div>
