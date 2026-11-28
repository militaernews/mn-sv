<script lang="ts">
	import { onMount } from 'svelte';
	import FluentEmojiMagnifyingGlass from '~icons/fluent-emoji/magnifying-glass-tilted-left';
	import FluentEmojiBridge from '~icons/fluent-emoji/bridge-at-night';
	import FluentEmojiEvergreenTree from '~icons/fluent-emoji/evergreen-tree';
	import FluentEmojiZap from '~icons/fluent-emoji/high-voltage';
	import FluentEmojiConstruction from '~icons/fluent-emoji/construction-worker';

	const {
		onSearch,
		onResults
	}: {
		onSearch: (type: string, query: string) => void;
		onResults?: (results: any[]) => void;
	} = $props();

	let query = $state('');
	let selectedType = $state('power');

	const infrastructureTypes = [
		{ id: 'power', icon: FluentEmojiZap, label: 'Power Lines' },
		{ id: 'bridge', icon: FluentEmojiBridge, label: 'Bridges' },
		{ id: 'tree', icon: FluentEmojiEvergreenTree, label: 'Trees' },
		{ id: 'fence', icon: FluentEmojiConstruction, label: 'Fences' }
	];

	async function handleSearch() {
		if (query.trim()) {
			onSearch(selectedType, query.trim());

			// Fetch from Nominatim for markers
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query.trim())}&limit=10`
				);
				const data = await response.json();
				if (onResults) onResults(data);
			} catch (error) {
				console.error('Search failed:', error);
			}
		}
	}
</script>

<div
	class="bg-base-100 border-base-300/50 animate-in fade-in slide-in-from-top-2 absolute top-4 left-20 z-[1001] w-72 rounded-xl border p-4 shadow-lg backdrop-blur-sm duration-300"
>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<FluentEmojiMagnifyingGlass class="text-primary size-5" />
			<h3 class="text-sm font-semibold tracking-tight">Infrastructure Search</h3>
		</div>

		<div class="join w-full">
			<input
				type="text"
				class="input input-bordered input-sm join-item focus:ring-primary/50 flex-1 transition-all duration-200 focus:ring-2 focus:outline-none"
				placeholder="City name..."
				bind:value={query}
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			<button
				class="btn btn-sm btn-primary join-item hover:btn-primary-focus transition-all duration-200"
				onclick={handleSearch}
			>
				Search
			</button>
		</div>

		<div class="grid grid-cols-2 gap-2">
			{#each infrastructureTypes as type}
				<button
					class="btn btn-xs flex items-center justify-start gap-2 transition-all duration-200 {selectedType ===
					type.id
						? 'btn-primary shadow-md'
						: 'btn-ghost hover:bg-base-200'}"
					onclick={() => (selectedType = type.id)}
				>
					<type.icon class="size-3" />
					<span class="text-[10px]">{type.label}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
