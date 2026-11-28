<script lang="ts">
	import IconArrowLeft from '~icons/lucide/arrow-left';
	import IconExternalLink from '~icons/lucide/external-link';
	import SeoHead from '#lib/SeoHead.svelte';

	let {
		title,
		description,
		src,
		path
	}: { title: string; description: string; src: string; path: string } = $props();
</script>

<SeoHead {title} {description} {path} />

<div class="bg-base-100 fixed inset-0 z-50 flex flex-col">
	<div class="border-base-300 flex shrink-0 items-center gap-3 border-b px-4 py-2 text-sm">
		<a href="/" class="hover:text-accent inline-flex items-center gap-2 font-semibold">
			<IconArrowLeft class="size-4" /> MilitärNews
		</a>
		<span class="text-accent font-extrabold">{title}</span>
		<a
			href={src}
			target="_blank"
			rel="noreferrer"
			class="ml-auto inline-flex items-center gap-1 opacity-60 hover:opacity-100"
		>
			<IconExternalLink class="size-4" /> <span class="hidden sm:inline">Open standalone</span>
		</a>
	</div>
	<iframe {src} {title} class="min-h-0 w-full flex-1 border-0" loading="lazy"></iframe>
</div>
