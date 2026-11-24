<script lang="ts">
	import { onMount } from 'svelte';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import IconCheck from '~icons/lucide/check';
	import IconSend from '~icons/lucide/send';
	import IconExternal from '~icons/lucide/external-link';
	import { CONTACT, LANGS, PROJECTS, UI, type Lang } from '#lib/projects.js';

	const KEY = 'mn-sv:lang';

	// Prerendered in German; the browser language or a remembered choice may switch to English
	let lang = $state<Lang>('de');
	const ui = $derived(UI[lang]);

	onMount(() => {
		let saved: string | null = null;
		try {
			saved = localStorage.getItem(KEY);
		} catch {
			// storage blocked: fall back to the browser language
		}
		const preferred = navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
		lang = saved === 'de' || saved === 'en' ? saved : preferred;
	});

	$effect(() => {
		document.documentElement.lang = lang;
	});

	function choose(next: Lang) {
		lang = next;
		try {
			localStorage.setItem(KEY, next);
		} catch {
			// not remembered, still switched
		}
	}

	const isTelegram = (href: string) => href.startsWith('https://t.me/');
</script>

<svelte:head>
	<title>{ui.title}</title>
	<meta name="description" content={ui.description} />
	<meta property="og:title" content={ui.title} />
	<meta property="og:description" content={ui.description} />
	<meta property="og:image" content="/img/mn.webp" />
</svelte:head>

<div class="relative overflow-x-clip">
	<!-- Radar rings behind the hero -->
	<svg
		class="pointer-events-none absolute top-[-220px] left-1/2 -z-0 w-[1100px] max-w-none -translate-x-1/2 opacity-70"
		viewBox="0 0 1100 1100"
		aria-hidden="true"
	>
		{#each [120, 220, 320, 420, 520] as r (r)}
			<circle cx="550" cy="550" {r} fill="none" stroke="var(--ring)" stroke-width="2" />
		{/each}
		<line x1="550" y1="20" x2="550" y2="1080" stroke="var(--ring)" stroke-width="2" />
		<line x1="20" y1="550" x2="1080" y2="550" stroke="var(--ring)" stroke-width="2" />
		<path d="M550 550 L550 30 A520 520 0 0 1 918 182 Z" fill="var(--ring)" />
	</svg>

	<main class="relative mx-auto max-w-5xl px-4 pb-16 sm:px-6">
		<nav class="flex justify-end pt-4" aria-label="Sprache / Language">
			<div class="flex rounded-full border border-[var(--line)] bg-[var(--card)] p-1 text-sm">
				{#each LANGS as option (option)}
					<button
						type="button"
						class="rounded-full px-3 py-1 font-semibold uppercase transition-colors"
						class:bg-[var(--accent)]={lang === option}
						class:text-[var(--accent-ink)]={lang === option}
						class:text-[var(--muted)]={lang !== option}
						aria-pressed={lang === option}
						onclick={() => choose(option)}
					>
						{option}
					</button>
				{/each}
			</div>
		</nav>

		<header class="flex flex-col items-center pt-8 pb-12 text-center sm:pt-12">
			<img
				src="/img/mn.webp"
				alt="MilitärNews"
				width="160"
				height="160"
				class="size-32 rounded-full shadow-xl ring-4 ring-[var(--accent)]/40 sm:size-40"
			/>
			<h1 class="mt-6 text-4xl font-extrabold tracking-tight text-[var(--strong)] sm:text-6xl">
				{ui.title}
			</h1>
			<p class="mt-4 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">{ui.lead}</p>
		</header>

		<section aria-labelledby="flow-title">
			<h2 id="flow-title" class="mb-4 text-center text-xl font-bold text-[var(--strong)]">
				{ui.flowTitle}
			</h2>
			<ol class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
				{#each ui.flow as step, index (step.label)}
					<li class="flex flex-col items-center gap-2 sm:flex-row">
						<div
							class="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-center sm:w-auto"
						>
							<div class="font-semibold">{step.label}</div>
							<div class="text-sm text-[var(--muted)]">{step.detail}</div>
						</div>
						{#if index < ui.flow.length - 1}
							<IconChevronRight
								class="size-5 rotate-90 text-[var(--accent)] sm:rotate-0"
								aria-hidden="true"
							/>
						{/if}
					</li>
				{/each}
			</ol>
		</section>

		<section aria-labelledby="projects-title" class="mt-16">
			<h2 id="projects-title" class="mb-6 text-2xl font-bold text-[var(--strong)]">
				{ui.projectsTitle}
			</h2>
			<div class="grid gap-5 md:grid-cols-2">
				{#each PROJECTS as project (project.id)}
					{@const text = project.text[lang]}
					<article
						id={project.id}
						class="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm sm:p-6"
					>
						<div class="flex items-center gap-4">
							{#if project.image}
								<img
									src={project.image}
									alt=""
									width="64"
									height="64"
									class="size-16 shrink-0 rounded-2xl object-cover"
								/>
							{:else if project.icon}
								<div
									class="grid size-16 shrink-0 place-items-center rounded-2xl bg-[var(--accent)] text-[var(--accent-ink)]"
								>
									<project.icon class="size-8" aria-hidden="true" />
								</div>
							{/if}
							<div class="min-w-0">
								<div class="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase">
									{text.audience}
								</div>
								<h3 class="text-xl font-bold">{text.name}</h3>
								<p class="text-sm font-semibold text-[var(--muted)]">{text.tagline}</p>
							</div>
						</div>
						<p class="mt-4 text-[var(--ink)]/90">{text.description}</p>
						<ul class="mt-4 grid gap-1.5 text-sm">
							{#each text.features as feature (feature)}
								<li class="flex gap-2">
									<IconCheck
										class="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
										aria-hidden="true"
									/>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
						<div class="mt-auto pt-5">
							<a
								href={project.href}
								target="_blank"
								rel="noopener"
								class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 font-semibold text-[var(--accent-ink)] transition hover:brightness-110"
							>
								{#if isTelegram(project.href)}
									<IconSend class="size-4" aria-hidden="true" />
								{:else}
									<IconExternal class="size-4" aria-hidden="true" />
								{/if}
								{text.cta}
							</a>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section
			aria-labelledby="contact-title"
			class="mt-16 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-6 text-center sm:p-10"
		>
			<h2 id="contact-title" class="text-2xl font-bold text-[var(--strong)]">
				{ui.contactTitle}
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-[var(--muted)]">{ui.contactText}</p>
			<a
				href={CONTACT}
				target="_blank"
				rel="noopener"
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 font-semibold text-[var(--accent-ink)] transition hover:brightness-110"
			>
				{ui.contactCta}
				<IconArrowRight class="size-4" aria-hidden="true" />
			</a>
		</section>

		<footer class="mt-12 text-center text-sm text-[var(--muted)]">
			{ui.footer} · <a class="underline" href={CONTACT}>@MilitaernewsKontakt</a>
		</footer>
	</main>
</div>
