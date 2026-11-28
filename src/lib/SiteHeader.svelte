<script lang="ts">
	import IconSettings from '~icons/lucide/settings-2';
	import { m } from './paraglide/messages.js';
	import { localeState } from './locale.svelte.js';
	import { prefs } from './prefs.svelte.js';

	const s = (key: string) =>
		(m as unknown as Record<string, (() => string) | undefined>)[key]?.() ?? '';
	const link = 'rounded-full px-3 py-1.5 transition-colors hover:text-[var(--accent)]';
</script>

{#key localeState.value}
	<header
		class="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg-glass)] backdrop-blur-xl"
	>
		<div
			class="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2.5 sm:px-6"
			class:py-2={prefs.telegram}
		>
			<a href="/" class="mr-auto flex items-center gap-2.5 font-extrabold text-[var(--strong)]">
				<img
					src="/img/mn.webp"
					alt=""
					width="32"
					height="32"
					class="size-8 rounded-full shadow-sm ring-2 ring-[var(--accent)]/30"
				/>
				<span class="hidden sm:inline">MilitärNews</span>
			</a>
			<nav class="flex items-center text-sm font-semibold" aria-label={s('navDocs')}>
				<a href="/" class={link}>{s('navHome')}</a>
				<a href="/#tools" class={link}>{s('navTools')}</a>
				<a href="/docs" class={link}>{s('navDocs')}</a>
				<a href="/about" class={link}>{s('navAbout')}</a>
				<a href="/changelog" class={link}>{s('navChangelog')}</a>
				<a
					href="/settings"
					class="ml-1 grid size-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
					title={s('navSettings')}
					aria-label={s('navSettings')}
				>
					<IconSettings class="size-4" aria-hidden="true" />
				</a>
			</nav>
		</div>
	</header>
{/key}
