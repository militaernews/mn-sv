<script lang="ts">
	import type { MapSource } from '$lib/MapSource';
	import IconDismiss from '~icons/fluent/dismiss-16-regular';

	let {
		sources,
		selectedIndex,
		onSelect,
		onClose
	}: {
		sources: MapSource[];
		selectedIndex: number;
		onSelect: (index: number) => void;
		onClose: () => void;
	} = $props();

	const categories = [...new Set(sources.map((source) => source.category ?? 'Other'))];
</script>

<div
	class="border-base-300/50 bg-base-100 animate-in fade-in absolute top-4 right-4 z-[1001] flex max-h-[70vh] w-72 flex-col overflow-hidden rounded-xl border shadow-lg"
>
	<div
		class="from-base-200 to-base-100 border-base-300/30 flex items-center justify-between border-b bg-gradient-to-r p-3"
	>
		<strong class="text-sm">Map layers</strong>
		<button class="btn btn-ghost btn-xs" onclick={onClose} aria-label="Close layers">
			<IconDismiss />
		</button>
	</div>
	<div class="space-y-3 overflow-y-auto p-3">
		{#each categories as category}
			<div>
				<p class="mb-1 text-[10px] font-bold tracking-wider uppercase opacity-50">{category}</p>
				<div class="space-y-1">
					{#each sources as source, index}
						{#if (source.category ?? 'Other') === category}
							<button
								class="btn btn-xs w-full justify-start {index === selectedIndex
									? 'btn-primary'
									: 'btn-ghost'}"
								onclick={() => {
									onSelect(index);
									onClose();
								}}
							>
								<span class="truncate">{source.name}</span>
							</button>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
