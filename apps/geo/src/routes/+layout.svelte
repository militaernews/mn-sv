<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(() => {
		if (import.meta.env.PROD && 'serviceWorker' in navigator)
			navigator.serviceWorker.register('/sw.js').catch(() => {});
	});
</script>

<div class="relative flex h-dvh w-dvw flex-row overflow-hidden" style="font-family:'HP Simplified'">
	{@render children()}
</div>
