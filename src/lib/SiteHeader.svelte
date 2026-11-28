<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import IconSettings from '~icons/lucide/settings-2';
	import IconMenu from '~icons/lucide/menu';
	import IconX from '~icons/lucide/x';
	import { m } from './paraglide/messages.js';
	import { localeState } from './locale.svelte.js';
	import { prefs } from './prefs.svelte.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';

	let menuOpen = $state(false);
	let progress = $state(0);

	const links = $derived([
		{ href: '/', label: s('navHome') },
		{ href: '/#tools', label: s('navTools') },
		{ href: '/docs', label: s('navDocs') },
		{ href: '/about', label: s('navAbout') },
		{ href: '/changelog', label: s('navChangelog') },
		{ href: '/viz', label: 'Viz' },
		{ href: '/geo', label: 'Geo' },
		{ href: '/charts', label: 'Charts' }
	]);

	const active = (href: string) => {
		if (href.includes('#')) return false;
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	};

	onMount(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});

	$effect(() => {
		page.url.pathname;
		menuOpen = false;
	});

	const linkClass = (href: string) =>
		`rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)] ${
			active(href) ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : ''
		}`;
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') menuOpen = false;
	}}
/>

{#key localeState.value}
	{#if menuOpen}
		<button
			class="fixed inset-0 z-10 cursor-default bg-[var(--bg)]/70 backdrop-blur-sm md:hidden"
			aria-label={s('navClose')}
			onclick={() => (menuOpen = false)}
		></button>
	{/if}
	<header
		class="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg-glass)] backdrop-blur-xl"
	>
		<div
			class="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2.5 sm:px-6"
			class:py-2={prefs.telegram}
		>
			<a
				href="/"
				class="mr-auto flex items-center gap-2.5 font-extrabold text-[var(--strong)]"
				onclick={() => (menuOpen = false)}
			>
				<img
					src="/img/mn.webp"
					alt=""
					width="32"
					height="32"
					class="size-8 rounded-full shadow-sm ring-2 ring-[var(--accent)]/30"
				/>
				<span class="text-sm sm:text-base">MilitärNews</span>
			</a>

			<nav class="hidden items-center text-sm font-semibold md:flex" aria-label={s('navMenu')}>
				{#each links as link (link.href)}
					<a href={link.href} class={linkClass(link.href)}>{link.label}</a>
				{/each}
			</nav>

			<div class="flex items-center gap-1">
				<a
					href="/settings"
					class="grid size-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
					title={s('navSettings')}
					aria-label={s('navSettings')}
				>
					<IconSettings class="size-4" aria-hidden="true" />
				</a>
				<button
					class="grid size-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
					type="button"
					aria-label={menuOpen ? s('navClose') : s('navMenu')}
					aria-expanded={menuOpen}
					aria-controls="mobile-menu"
					onclick={() => (menuOpen = !menuOpen)}
				>
					{#if menuOpen}
						<IconX class="size-4" aria-hidden="true" />
					{:else}
						<IconMenu class="size-4" aria-hidden="true" />
					{/if}
				</button>
			</div>
		</div>

		{#if menuOpen}
			<nav
				id="mobile-menu"
				aria-label={s('navMenu')}
				class="absolute inset-x-0 top-full border-b border-[var(--line)] bg-[var(--bg-glass)] px-4 pt-2 pb-4 shadow-xl backdrop-blur-xl md:hidden"
			>
				<div class="grid grid-cols-2 gap-2">
					{#each links as link (link.href)}
						<a
							href={link.href}
							onclick={() => (menuOpen = false)}
							class="rounded-xl border bg-[var(--card)] px-3 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
							class:border-[var(--line)]={!active(link.href)}
							class:border-[var(--accent)]={active(link.href)}
							class:text-[var(--accent)]={active(link.href)}
						>
							{link.label}
						</a>
					{/each}
				</div>
			</nav>
		{/if}

		<div class="absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true">
			<div
				class="h-full bg-[var(--accent)] transition-[width] duration-150 ease-out"
				style:width={`${progress}%`}
			></div>
		</div>
	</header>
{/key}
