<script lang="ts">
	import VizPage from '#lib/apps/viz/VizPage.svelte';

	let { data }: { data: any } = $props();
</script>

<VizPage {data} />
