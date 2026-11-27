<script lang="ts">
	import DocPage from '#lib/DocPage.svelte';

	let { data } = $props();
</script>

<DocPage docs={data.docs} />
