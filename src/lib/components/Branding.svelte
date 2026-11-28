<script lang="ts">
	import IconSettings from '~icons/fluent/settings-16-regular';
	import IconInfo from '~icons/fluent/info-16-regular';
	let { isMobile }: { isMobile: boolean } = $props();
</script>

<div
	class="pointer-events-auto absolute top-0 right-0 z-10 flex items-center gap-2 px-3 py-2 text-xl font-semibold"
>
	<a href="/about" aria-label="About" class="link link-hover">
		<span style="color:#00ff00">Militär</span>News
	</a>
	<a href="/settings" aria-label="Settings" class="link link-hover"><IconSettings /></a>
	<a href="/about" aria-label="About" class="link link-hover sm:hidden"><IconInfo /></a>
</div>

{#if !isMobile}
	<div class="pointer-events-none absolute bottom-0 left-0 z-10 px-3 py-2 text-xl font-semibold">
		<span style="color:#00ff00">Militär</span>News
	</div>
{/if}
