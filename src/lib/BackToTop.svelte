<script lang="ts">
	import { onMount } from 'svelte';
	import IconArrowUp from '~icons/lucide/arrow-up';
	import { m } from './paraglide/messages.js';

	let progress = $state(0);
	let visible = $state(false);
	const circumference = 2 * Math.PI * 20;

	onMount(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			visible = window.scrollY > 320;
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});

	function toTop() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
	}

	const label = () => (m as unknown as Record<string, () => string>)['backToTop']?.() ?? '';
</script>

{#if visible}
	<button
		type="button"
		onclick={toTop}
		title={label()}
		aria-label={label()}
		class="fixed right-4 bottom-4 z-30 grid size-11 animate-[fadeIn_.2s_ease-out] place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--accent)] shadow-lg transition-transform hover:scale-110 md:right-8 md:bottom-8"
	>
		<svg class="absolute inset-0 size-full -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
			<circle cx="22" cy="22" r="20" fill="none" stroke="var(--line)" stroke-width="2" />
			<circle
				cx="22"
				cy="22"
				r="20"
				fill="none"
				stroke="var(--accent)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={circumference * (1 - progress)}
				style="transition: stroke-dashoffset .15s ease-out"
			/>
		</svg>
		<IconArrowUp class="relative size-4" aria-hidden="true" />
	</button>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
