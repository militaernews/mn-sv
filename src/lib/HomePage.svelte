<script lang="ts">
	import type { Component } from 'svelte';
	import { page } from '$app/state';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import IconCheck from '~icons/lucide/check';
	import IconSend from '~icons/lucide/send';
	import IconExternal from '~icons/lucide/external-link';
	import IconBook from '~icons/lucide/book-open';
	import IconGrid from '~icons/lucide/layout-grid';
	import IconBot from '~icons/lucide/bot';
	import SeoHead from './SeoHead.svelte';
	import { langFromPath, localizedHref } from './lang.js';
	import { CONTACT, PROJECTS, UI, type Project, type ProjectKind } from './projects.js';

	const lang = $derived(langFromPath(page.url.pathname));
	const ui = $derived(UI[lang]);

	const byKind = (kind: ProjectKind) => PROJECTS.filter((project) => project.kind === kind);
	const apps = byKind('app');
	const bots = byKind('bot');
	const guide = byKind('guide')[0];
	const guideText = $derived(guide.text[lang]);

	const isTelegram = (href: string) => href.startsWith('https://t.me/');
</script>

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
		class="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-xl sm:p-6"
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
				href={localizedHref(project.href, lang)}
				target={project.href.startsWith('/') ? undefined : '_blank'}
				rel={project.href.startsWith('/') ? undefined : 'noopener'}
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
	<!-- Radar rings behind the hero -->
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

	<main class="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
		<header class="flex flex-col items-center pt-8 pb-14 text-center sm:pt-14">
			<span
				class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-1.5 text-[0.7rem] font-bold tracking-widest text-[var(--accent)] uppercase shadow-sm"
			>
				<span class="size-1.5 rounded-full bg-[var(--accent)]"></span>
				{ui.eyebrow}
			</span>
			<img
				src="/img/mn.webp"
				alt="MilitärNews"
				width="176"
				height="176"
				class="mt-8 size-32 rounded-full shadow-2xl ring-4 ring-[var(--accent)]/30 sm:size-40"
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
					href="#apps"
					class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-ink)] shadow-md transition hover:brightness-110"
				>
					<IconGrid class="size-4" aria-hidden="true" />
					{ui.appsTitle}
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

		<section aria-labelledby="flow-title" class="scroll-mt-24">
			<h2
				id="flow-title"
				class="mb-6 text-center text-sm font-bold tracking-widest text-[var(--muted)] uppercase"
			>
				{ui.flowTitle}
			</h2>
			<ol class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-stretch sm:justify-center">
				{#each ui.flow as step, index (step.label)}
					<li class="flex flex-col items-center gap-2 sm:flex-row">
						<div
							class="flex w-full items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 shadow-sm sm:w-auto"
						>
							<span
								class="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-sm font-extrabold text-[var(--accent)]"
							>
								{index + 1}
							</span>
							<div>
								<div class="text-sm font-bold">{step.label}</div>
								<div class="text-xs text-[var(--muted)]">{step.detail}</div>
							</div>
						</div>
						{#if index < ui.flow.length - 1}
							<IconChevronRight
								class="size-5 shrink-0 rotate-90 text-[var(--accent)] sm:rotate-0"
								aria-hidden="true"
							/>
						{/if}
					</li>
				{/each}
			</ol>
		</section>

		<section id="apps" aria-labelledby="apps-title" class="mt-20 scroll-mt-24">
			{@render sectionHead(IconGrid, ui.appsTitle, ui.appsText)}
			<h2 id="apps-title" class="sr-only">{ui.appsTitle}</h2>
			<div class="grid gap-5 md:grid-cols-2">
				{#each apps as project (project.id)}
					{@render card(project)}
				{/each}
			</div>
		</section>

		<section id="bots" aria-labelledby="bots-title" class="mt-20 scroll-mt-24">
			{@render sectionHead(IconBot, ui.botsTitle, ui.botsText)}
			<h2 id="bots-title" class="sr-only">{ui.botsTitle}</h2>
			<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
				{#each bots as project (project.id)}
					{@render card(project)}
				{/each}
			</div>
		</section>

		<section id="handbook" aria-labelledby="handbook-title" class="mt-20 scroll-mt-24">
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
						href={localizedHref(guide.href, lang)}
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
			class="relative mt-20 overflow-hidden rounded-3xl border border-[var(--line)] bg-linear-to-br from-[var(--bg-2)] via-[var(--card)] to-[var(--bg-2)] p-6 text-center shadow-sm sm:p-12"
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
					target="_blank"
					rel="noopener"
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
			<a class="transition-colors hover:text-[var(--accent)]" href={CONTACT}>
				@MilitaernewsKontakt
			</a>
		</footer>
	</main>
</div>
