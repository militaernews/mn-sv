<script lang="ts">
	import { onMount } from 'svelte';
	import * as maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import IconDismiss from '~icons/lucide/x';

	let { lat, lng, zoom, onClose }: { lat: number; lng: number; zoom: number; onClose: () => void } =
		$props();

	let container: HTMLDivElement;
	let note = $state('');

	onMount(() => {
		const map = new maplibregl.Map({
			container,
			style: 'https://tiles.openfreemap.org/styles/liberty',
			center: [lng, lat],
			zoom,
			pitch: 60,
			bearing: -18
		});
		map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
		map.on('load', () => {
			try {
				const buildingLayer = map
					.getStyle()
					.layers?.find(
						(layer: any) => 'source-layer' in layer && layer['source-layer'] === 'building'
					);
				const source = (buildingLayer as any)?.source ?? 'openmaptiles';
				if (!map.getSource(source)) throw new Error('No building source');
				map.addLayer({
					id: 'litfass-3d-buildings',
					source,
					'source-layer': 'building',
					type: 'fill-extrusion',
					paint: {
						'fill-extrusion-color': '#9be7ff',
						'fill-extrusion-height': ['coalesce', ['get', 'render_height'], ['get', 'height'], 10],
						'fill-extrusion-base': [
							'coalesce',
							['get', 'render_min_height'],
							['get', 'min_height'],
							0
						],
						'fill-extrusion-opacity': 0.75
					}
				});
			} catch {
				note = '3D buildings are unavailable for this style — the map still works in 3D.';
			}
		});
		return () => map.remove();
	});
</script>

<div class="bg-base-100 fixed inset-0 z-[2000]">
	<div bind:this={container} class="size-full"></div>
	<div
		class="bg-base-100/90 absolute top-4 left-4 flex items-center gap-3 rounded-xl px-4 py-2 shadow-lg backdrop-blur"
	>
		<strong class="text-sm">3D buildings</strong>
		<span class="font-mono text-xs opacity-60">{lat.toFixed(4)}° N / {lng.toFixed(4)}° E</span>
		<button class="btn btn-ghost btn-sm" onclick={onClose} aria-label="Close 3D view">
			<IconDismiss />
		</button>
	</div>
	{#if note}<p
			class="bg-warning/20 text-warning absolute bottom-4 left-4 rounded-lg px-3 py-2 text-xs"
		>
			{note}
		</p>{/if}
</div>
