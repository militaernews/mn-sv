<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import SiteHeader from '#lib/SiteHeader.svelte';
	import { localeState } from '#lib/locale.svelte.js';
	import { startPrefs } from '#lib/prefs.svelte.js';
	import { startTelegram } from '#lib/telegram.js';

	let { children } = $props();

	onMount(() => {
		startPrefs();
		startTelegram();
	});

	$effect(() => {
		document.documentElement.lang = localeState.value;
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SiteHeader />

{@render children()}
