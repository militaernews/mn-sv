<script lang="ts">
	import { onMount } from 'svelte';
	import type { Circle } from '#geo/Circle';
	import CircleItem from '#geo/component/CircleItem.svelte';
	import Branding from '#geo/component/Branding.svelte';
	import Legend from './Legend.svelte';
	import type { Readable } from 'svelte/store';

	const {
		currentMapUrl,
		circles,
		onCircleEdit,
		onToggleChecked,
		onCirclesUpdate,
		displayLegend,
		legendTexts,
		onLegendChange,
		activeLegendEntries,
		isMobile,
		lat,
		lng,
		zoom
	}: {
		currentMapUrl: string;
		circles: Circle[];
		onCircleEdit: (circle: Circle) => void;
		onToggleChecked: (circle: Circle) => void;
		onCirclesUpdate: (updatedCircles: Circle[]) => void;
		displayLegend: boolean;
		legendTexts: Map<number, string>;
		onLegendChange: (map: Map<number, string>) => void;
		activeLegendEntries: Readable<[number, string][]>;
		isMobile: boolean;
		lat: number;
		lng: number;
		zoom: number;
	} = $props();

	let isMapLoading = $state(true);
	let iframeRef: HTMLIFrameElement | null = null;
	let draggingId: number | null = $state(null);
	let dragStarted = $state(false);

	function handlePointerDown(event: PointerEvent, id: number) {
		draggingId = id;
		dragStarted = false;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: PointerEvent) {
		if (draggingId === null) return;
		dragStarted = true;

		const container = event.currentTarget as HTMLElement;
		const rect = container.getBoundingClientRect();

		let x = ((event.clientX - rect.left) / rect.width) * 100;
		let y = ((event.clientY - rect.top) / rect.height) * 100;

		const circleSizeX = (56 / rect.width) * 100;
		const circleSizeY = (56 / rect.height) * 100;
		const margin = 2;

		const minX = margin + circleSizeX / 2;
		const maxX = 100 - margin - circleSizeX / 2;
		const minY = margin + circleSizeY / 2;
		const maxY = 100 - margin - circleSizeY / 2;

		x = Math.min(maxX, Math.max(minX, x));
		y = Math.min(maxY, Math.max(minY, y));

		const updatedCircles = circles.map((circle) =>
			circle.id === draggingId ? { ...circle, x, y } : circle
		);
		onCirclesUpdate(updatedCircles);
	}

	function handlePointerUp() {
		if (draggingId === null) return;

		if (!dragStarted) {
			const circle = circles.find((c) => c.id === draggingId);
			if (circle) onCircleEdit(circle);
		}

		draggingId = null;
		dragStarted = false;
	}

	const finalMapUrl = $derived.by(() => {
		if (!currentMapUrl) return '';
		try {
			const url = new URL(currentMapUrl);
			// Many map services use hash or query params for position
			// We try to append/replace them if possible, or just use the base URL
			// For simplicity and compatibility with most iframes, we just use the URL as is
			// but we could add logic here for specific providers (Google, OSM, etc.)
			return currentMapUrl;
		} catch (e) {
			return currentMapUrl;
		}
	});

	$effect(() => {
		isMapLoading = true;
		if (iframeRef) {
			iframeRef.src = '';
			setTimeout(() => {
				if (iframeRef) {
					iframeRef.src = finalMapUrl;
				}
			}, 100);
		}
	});

	onMount(() => {
		const handleIframeLoad = () => {
			isMapLoading = false;
		};
		iframeRef?.addEventListener('load', handleIframeLoad);
		return () => {
			iframeRef?.removeEventListener('load', handleIframeLoad);
		};
	});
</script>

<div
	class="relative z-0 h-full flex-grow overflow-hidden"
	id="container"
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerUp}
>
	<div class=" z-0 h-full w-full">
		{#if isMapLoading}
			<div class="bg-base-100 absolute inset-0 z-10 flex items-center justify-center">
				<div class="flex flex-col items-center gap-4">
					<span class="loading loading-spinner loading-lg text-primary"></span>
					<p class="text-base-content/70">Loading map...</p>
				</div>
			</div>
		{/if}
		<iframe
			bind:this={iframeRef}
			src={currentMapUrl}
			class="h-full w-full"
			loading="lazy"
			allowfullscreen
			title="Interactive Map"
			allow="display-capture"
			onload={() => (isMapLoading = false)}
		></iframe>
	</div>

	{#each circles as circle (circle.id)}
		<CircleItem
			{circle}
			onDragStart={(e) => handlePointerDown(e, circle.id)}
			onEdit={onCircleEdit}
			{onToggleChecked}
		/>
	{/each}

	{#if displayLegend && $activeLegendEntries.length > 0}
		<Legend
			entries={$activeLegendEntries}
			onChange={(colorIndex, value) => {
				const map = new Map(legendTexts);
				map.set(colorIndex, value);
				onLegendChange(map);
			}}
		/>
	{/if}

	<Branding {isMobile} />
</div>
