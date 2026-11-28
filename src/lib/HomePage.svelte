<script lang="ts">
	import type { Component } from 'svelte';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import IconCheck from '~icons/lucide/check';
	import IconSend from '~icons/lucide/send';
	import IconExternal from '~icons/lucide/external-link';
	import IconBook from '~icons/lucide/book-open';
	import IconGrid from '~icons/lucide/layout-grid';
	import IconBot from '~icons/lucide/bot';
	import IconGamepad from '~icons/lucide/gamepad-2';
	import IconUsers from '~icons/lucide/users';
	import IconBarChart from '~icons/lucide/chart-no-axes-column-increasing';
	import SeoHead from './SeoHead.svelte';
	import { m } from './paraglide/messages.js';
	import { localeState } from './locale.svelte.js';
	import { prefs } from './prefs.svelte.js';
	import { openExternal } from './telegram.js';
	import {
		CHANNELS,
		CHANNEL_STATS,
		CONTACT,
		PROJECTS,
		UI,
		type Project,
		type ProjectKind
	} from './projects.js';

	const lang = $derived(localeState.value);
	const inTg = $derived(prefs.telegram);
	/** Telegram handles external URLs itself; a target="_blank" opens a separate browser there. */
	const external = (href: string) => (event: MouseEvent) => {
		if (!inTg) return;
		event.preventDefault();
		openExternal(href);
	};
	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const ui = $derived({
		title: s('uiTitle'),
		description: s('uiDescription'),
		eyebrow: s('uiEyebrow'),
		lead: s('uiLead'),
		flowTitle: s('uiFlowTitle'),
		flow: UI[lang].flow.map((step, i) => ({
			...step,
			label: s(`flow${i}Label`),
			detail: s(`flow${i}Detail`)
		})),
		toolsTitle: s('uiToolsTitle'),
		toolsText: s('uiToolsText'),
		gamesTitle: s('uiGamesTitle'),
		gamesText: s('uiGamesText'),
		botsTitle: s('uiBotsTitle'),
		botsText: s('uiBotsText'),
		channelsTitle: s('uiChannelsTitle'),
		channelsText: s('uiChannelsText'),
		statsTitle: s('uiStatsTitle'),
		statsText: s('uiStatsText'),
		guideTitle: s('uiGuideTitle'),
		guideText: s('uiGuideText'),
		contactTitle: s('uiContactTitle'),
		contactText: s('uiContactText'),
		contactCta: s('uiContactCta'),
		footer: s('uiFooter')
	});

	const byKind = (kind: ProjectKind) => PROJECTS.filter((project) => project.kind === kind);
	const tools = byKind('tool');
	const games = byKind('game');
	const bots = byKind('bot');
	const guide = byKind('guide')[0];
	const guideText = $derived(guide.text[lang]);

	const isTelegram = (href: string) => href.startsWith('https://t.me/');
</script>

{#key localeState.value}
	<SeoHead title={ui.title} description={ui.description} path="/" />

	{#snippet sectionHead(Icon: Component, title: string, text: string)}
		<div class="mb-7 flex items-start gap-4">
			<span
				class="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
			>
				<Icon class="size-5" aria-hidden="true" />
			</span>
			<div>
				<h2 class="text-2xl font-extrabold tracking-tight text-[var(--strong)] sm:text-3xl">
					{title}
				</h2>
				<p class="mt-1 text-sm text-[var(--muted)] sm:text-base">{text}</p>
			</div>
		</div>
	{/snippet}

	{#snippet card(project: Project)}
		{@const text = project.text[lang]}
		<article
			id={project.id}
			class="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-xl {inTg
				? 'p-4'
				: 'p-5 sm:p-6'}"
		>
			<span
				class="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[var(--accent)] to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"
			></span>
			<div class="flex items-center gap-4">
				{#if project.image}
					<img
						src={project.image}
						alt=""
						width="72"
						height="72"
						class="size-16 shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-[var(--line)] sm:size-18"
					/>
				{:else if project.icon}
					<div
						class="grid size-16 shrink-0 place-items-center rounded-2xl bg-[var(--accent)] text-[var(--accent-ink)] shadow-md sm:size-18"
					>
						<project.icon class="size-8" aria-hidden="true" />
					</div>
				{/if}
				<div class="min-w-0">
					<div class="text-[0.7rem] font-bold tracking-widest text-[var(--accent)] uppercase">
						{text.audience}
					</div>
					<h3 class="mt-0.5 text-xl font-extrabold tracking-tight">{text.name}</h3>
					<p class="text-sm font-semibold text-[var(--muted)]">{text.tagline}</p>
				</div>
			</div>
			<p class="mt-4 text-sm leading-relaxed text-[var(--ink)]/90">{text.description}</p>
			<ul class="mt-4 grid gap-2 text-sm">
				{#each text.features as feature (feature)}
					<li class="flex gap-2.5">
						<span
							class="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]"
						>
							<IconCheck class="size-3" stroke-width={3} aria-hidden="true" />
						</span>
						<span>{feature}</span>
					</li>
				{/each}
			</ul>
			<div class="mt-auto pt-6">
				<a
					href={project.href}
					onclick={external(project.href)}
					class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--accent-ink)] shadow-sm transition-all hover:shadow-md hover:brightness-110"
				>
					{#if isTelegram(project.href)}
						<IconSend class="size-4" aria-hidden="true" />
					{:else if project.href.startsWith('/')}
						<IconBook class="size-4" aria-hidden="true" />
					{:else}
						<IconExternal class="size-4" aria-hidden="true" />
					{/if}
					{text.cta}
					<IconArrowRight
						class="size-4 transition-transform group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</a>
			</div>
		</article>
	{/snippet}

	<div class="relative overflow-x-clip">
		<!-- Radar rings behind the hero; Telegram keeps a calm, compact start -->
		{#if !inTg}
			<svg
				class="pointer-events-none absolute top-[-260px] left-1/2 -z-0 w-[1200px] max-w-none -translate-x-1/2 opacity-60"
				viewBox="0 0 1100 1100"
				aria-hidden="true"
			>
				{#each [120, 220, 320, 420, 520] as r (r)}
					<circle cx="550" cy="550" {r} fill="none" stroke="var(--ring)" stroke-width="2" />
				{/each}
				<line x1="550" y1="20" x2="550" y2="1080" stroke="var(--ring)" stroke-width="2" />
				<line x1="20" y1="550" x2="1080" y2="550" stroke="var(--ring)" stroke-width="2" />
				<path d="M550 550 L550 30 A520 520 0 0 1 918 182 Z" fill="var(--ring)" />
				<circle cx="760" cy="390" r="6" fill="var(--accent)" opacity="0.5" />
				<circle cx="330" cy="700" r="5" fill="var(--accent)" opacity="0.4" />
				<circle cx="690" cy="810" r="4" fill="var(--accent)" opacity="0.3" />
			</svg>
		{/if}

		<main class="relative mx-auto max-w-6xl px-4 sm:px-6 {inTg ? 'pb-10' : 'pb-20'}">
			<header
				class="flex flex-col items-center text-center {inTg ? 'pt-5 pb-8' : 'pt-8 pb-14 sm:pt-14'}"
			>
				<span
					class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-1.5 text-[0.7rem] font-bold tracking-widest text-[var(--accent)] uppercase shadow-sm"
				>
					<span class="size-1.5 rounded-full bg-[var(--accent)]"></span>
				</span>
				<img
					src="/img/mn.webp"
					alt="MilitärNews"
					width="176"
					height="176"
					class="rounded-full shadow-2xl ring-4 ring-[var(--accent)]/30 {inTg
						? 'mt-4 size-24'
						: 'mt-8 size-32 sm:size-40'}"
				/>
				<h1
					class="mt-7 bg-linear-to-r from-[var(--strong)] to-[var(--accent)] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl"
				>
					{ui.title}
				</h1>
				<p class="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
					{ui.lead}
				</p>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
					<a
						href="#tools"
						class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-ink)] shadow-md transition hover:brightness-110"
					>
						<IconGrid class="size-4" aria-hidden="true" />
						{ui.toolsTitle}
						<IconArrowRight class="size-4" aria-hidden="true" />
					</a>
					<a
						href="#handbook"
						class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--strong)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
					>
						<IconBook class="size-4" aria-hidden="true" />
						{ui.guideTitle}
					</a>
				</div>
			</header>

			<section id="flow" aria-labelledby="flow-title" class="scroll-mt-24">
				<div
					class="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-linear-to-br from-[var(--bg-2)] via-[var(--card)] to-[var(--bg-2)] shadow-sm {inTg
						? 'p-4'
						: 'p-6 sm:p-8'}"
				>
					<div
						class="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full border border-[var(--ring)]"
					></div>
					<div class="relative text-center">
						<span
							class="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[0.65rem] font-bold tracking-widest text-[var(--accent)] uppercase"
						>
							<span class="size-1.5 animate-pulse rounded-full bg-[var(--accent)]"></span>
							{s('homeHowItWorks')}
						</span>
						<h2
							id="flow-title"
							class="mt-3 text-xl font-extrabold text-[var(--strong)] sm:text-2xl"
						>
							{ui.flowTitle}
						</h2>
					</div>

					<ol class="relative mt-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-0">
						{#each ui.flow as step, index (step.label)}
							{@const adStep = index === 4}
							{@const StepIcon = step.icon}
							<li
								class="relative flex flex-1 flex-row items-center gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
							>
								<!-- Animated track from this node to the next one -->
								{#if index < ui.flow.length - 1}
									<div
										class="flow-track absolute top-7 left-1/2 z-0 hidden h-0.5 w-full lg:block"
										aria-hidden="true"
									></div>
								{/if}
								<div class="relative z-10 shrink-0">
									<div
										class="grid size-14 place-items-center rounded-2xl border shadow-lg transition-transform duration-300 hover:scale-110"
										class:border-[var(--accent)]={adStep}
										class:bg-[var(--accent)]={adStep}
										class:text-[var(--accent-ink)]={adStep}
										class:shadow-[0_0_2rem_var(--ring)]={adStep}
										class:border-[var(--line)]={!adStep}
										class:bg-[var(--card)]={!adStep}
										class:text-[var(--accent)]={!adStep}
									>
										<StepIcon class="size-6" aria-hidden="true" />
									</div>
									<span
										class="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full border border-[var(--line)] bg-[var(--bg-2)] text-[0.65rem] font-extrabold text-[var(--muted)]"
									>
										{index + 1}
									</span>
								</div>
								<div class="min-w-0 lg:mt-4 lg:px-1">
									<div class="text-sm font-extrabold" class:text-[var(--accent)]={adStep}>
										{step.label}
									</div>
									<div class="mt-0.5 text-xs leading-snug text-[var(--muted)]">{step.detail}</div>
								</div>
								{#if index < ui.flow.length - 1}
									<IconChevronRight
										class="size-5 shrink-0 rotate-90 text-[var(--accent)] lg:hidden"
										aria-hidden="true"
									/>
								{/if}
							</li>
						{/each}
					</ol>
				</div>
			</section>

			<section
				id="tools"
				aria-labelledby="tools-title"
				class="{inTg ? 'mt-12' : 'mt-20'} scroll-mt-24"
			>
				{@render sectionHead(IconGrid, ui.toolsTitle, ui.toolsText)}
				<h2 id="tools-title" class="sr-only">{ui.toolsTitle}</h2>
				<div class="grid gap-5 md:grid-cols-2">
					{#each tools as project (project.id)}
						{@render card(project)}
					{/each}
				</div>
			</section>

			<section
				id="games"
				aria-labelledby="games-title"
				class="{inTg ? 'mt-12' : 'mt-20'} scroll-mt-24"
			>
				{@render sectionHead(IconGamepad, ui.gamesTitle, ui.gamesText)}
				<h2 id="games-title" class="sr-only">{ui.gamesTitle}</h2>
				<div class="grid gap-5 md:grid-cols-2">
					{#each games as project (project.id)}
						{@render card(project)}
					{/each}
				</div>
			</section>

			<section
				id="bots"
				aria-labelledby="bots-title"
				class="{inTg ? 'mt-12' : 'mt-20'} scroll-mt-24"
			>
				{@render sectionHead(IconBot, ui.botsTitle, ui.botsText)}
				<h2 id="bots-title" class="sr-only">{ui.botsTitle}</h2>
				<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
					{#each bots as project (project.id)}
						{@render card(project)}
					{/each}
				</div>
			</section>

			<section
				id="channels"
				aria-labelledby="channels-title"
				class="{inTg ? 'mt-12' : 'mt-20'} scroll-mt-24"
			>
				{@render sectionHead(IconUsers, ui.channelsTitle, ui.channelsText)}
				<h2 id="channels-title" class="sr-only">{ui.channelsTitle}</h2>
				<ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
					{#each CHANNELS as channel (channel.username)}
						{@const href = channel.url ?? `https://t.me/${channel.username}`}
						<li>
							<a
								{href}
								onclick={external(href)}
								class="flex h-full items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-md"
							>
								<img
									src={`/img/channels/${channel.username}.webp`}
									alt=""
									width="40"
									height="40"
									loading="lazy"
									decoding="async"
									class="size-10 shrink-0 rounded-full object-cover ring-2 ring-[var(--accent)]/20"
								/>
								<span class="min-w-0">
									<span class="block text-sm font-bold">{channel.language[lang]}</span>
									<span class="block truncate text-xs text-[var(--muted)]"
										>{channel.url ? channel.username : `@${channel.username}`}</span
									>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>

			<section
				id="stats"
				aria-labelledby="stats-title"
				class="{inTg ? 'mt-12' : 'mt-20'} scroll-mt-24"
			>
				{@render sectionHead(IconBarChart, ui.statsTitle, ui.statsText)}
				<h2 id="stats-title" class="sr-only">{ui.statsTitle}</h2>
				<ul class="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{#each CHANNEL_STATS as stat (stat.label.de)}
						<li
							class="rounded-2xl border border-[var(--line)] bg-linear-to-br from-[var(--bg-2)] to-[var(--card)] p-5 text-center shadow-sm"
						>
							<div class="text-2xl font-extrabold text-[var(--accent)]">{stat.value}</div>
							<div class="mt-1 text-xs font-semibold text-[var(--muted)]">{stat.label[lang]}</div>
						</li>
					{/each}
				</ul>
			</section>

			<section
				id="handbook"
				aria-labelledby="handbook-title"
				class="{inTg ? 'mt-12' : 'mt-20'} scroll-mt-24"
			>
				{@render sectionHead(IconBook, ui.guideTitle, ui.guideText)}
				<h2 id="handbook-title" class="sr-only">{ui.guideTitle}</h2>
				<article
					class="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-linear-to-br from-[var(--bg-2)] to-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-8"
				>
					<IconBook
						class="pointer-events-none absolute -right-8 -bottom-12 size-64 text-[var(--accent)]/5"
						aria-hidden="true"
					/>
					<div class="relative flex flex-col gap-6 sm:flex-row sm:items-center">
						<div
							class="grid size-16 shrink-0 place-items-center rounded-2xl bg-[var(--accent)] text-[var(--accent-ink)] shadow-md"
						>
							<IconBook class="size-8" aria-hidden="true" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="text-[0.7rem] font-bold tracking-widest text-[var(--accent)] uppercase">
								{guideText.audience}
							</div>
							<h3 class="mt-1 text-2xl font-extrabold tracking-tight">{guideText.name}</h3>
							<p class="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
								{guideText.description}
							</p>
						</div>
						<a
							href={guide.href}
							class="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-ink)] shadow-md transition hover:brightness-110"
						>
							{guideText.cta}
							<IconArrowRight
								class="size-4 transition-transform group-hover:translate-x-0.5"
								aria-hidden="true"
							/>
						</a>
					</div>
				</article>
			</section>

			<section
				aria-labelledby="contact-title"
				class="relative {inTg
					? 'mt-12'
					: 'mt-20'} overflow-hidden rounded-3xl border border-[var(--line)] bg-linear-to-br from-[var(--bg-2)] via-[var(--card)] to-[var(--bg-2)] p-6 text-center shadow-sm sm:p-12"
			>
				<div
					class="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full border border-[var(--ring)]"
				></div>
				<div
					class="pointer-events-none absolute -right-16 -bottom-28 size-80 rounded-full border border-[var(--ring)]"
				></div>
				<div class="relative">
					<span
						class="inline-flex size-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]"
					>
						<IconSend class="size-5" aria-hidden="true" />
					</span>
					<h2
						id="contact-title"
						class="mt-4 text-2xl font-extrabold text-[var(--strong)] sm:text-3xl"
					>
						{ui.contactTitle}
					</h2>
					<p class="mx-auto mt-3 max-w-xl leading-relaxed text-[var(--muted)]">
						{ui.contactText}
					</p>
					<a
						href={CONTACT}
						onclick={external(CONTACT)}
						class="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-ink)] shadow-md transition hover:brightness-110"
					>
						{ui.contactCta}
						<IconArrowRight class="size-4" aria-hidden="true" />
					</a>
				</div>
			</section>

			<footer
				class="mt-12 flex flex-col items-center justify-between gap-2 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] sm:flex-row"
			>
				<span class="font-semibold">{ui.footer}</span>
				<a
					class="transition-colors hover:text-[var(--accent)]"
					href={CONTACT}
					onclick={external(CONTACT)}
				>
					@MilitaernewsKontakt
				</a>
			</footer>
		</main>
	</div>
{/key}
