<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(() => {
		if (import.meta.env.PROD && 'serviceWorker' in navigator)
			navigator.serviceWorker.register('/sw.js').catch(() => {});
	});
</script>

<svelte:head>
	<title>Military Loss Chart Builder</title>
</svelte:head>

<div
	class="flex min-h-dvh w-dvw items-center justify-center bg-base-100 p-4"
	style="font-family:'HP Simplified'"
>
	<div class="flex w-full flex-col">
		{@render children()}
	</div>
</div>
