<script lang="ts">
	import { SITE_URL } from './site.js';

	let {
		title,
		description,
		path,
		image = '/img/mn.webp'
	}: { title: string; description: string; path: string; image?: string } = $props();

	const canonical = $derived(SITE_URL + path);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={SITE_URL + image} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
