<script lang="ts">
	import { page } from '$app/state';
	import { langFromPath, localizedHref } from './lang.js';
	import { SITE_URL } from './site.js';

	let {
		title,
		description,
		path,
		image = '/img/mn.webp'
	}: { title: string; description: string; path: string; image?: string } = $props();

	const lang = $derived(langFromPath(page.url.pathname));
	const de = $derived(SITE_URL + localizedHref(path, 'de'));
	const en = $derived(SITE_URL + localizedHref(path, 'en'));
	const canonical = $derived(lang === 'en' ? en : de);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="de" href={de} />
	<link rel="alternate" hreflang="en" href={en} />
	<link rel="alternate" hreflang="x-default" href={de} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={SITE_URL + image} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
