<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SiteHeader from '#lib/SiteHeader.svelte';
	import { langFromPath } from '#lib/lang.js';
	import { startPrefs } from '#lib/prefs.svelte.js';

	let { children } = $props();

	onMount(startPrefs);

	$effect(() => {
		document.documentElement.lang = langFromPath(page.url.pathname);
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
