<script lang="ts">
	import { goto } from '$app/navigation';
	import FluentEmojiMagnifyingGlass from '~icons/fluent-emoji/magnifying-glass-tilted-left';
	import FluentEmojiSun from '~icons/fluent-emoji/sun';
	import CrosshairsIcon from '~icons/fluent/target-20-regular';

	let {
		mapLat,
		mapLng,
		mapZoom,
		onToggleGeolocalization,
		isGeolocalizationActive,
		onOpenSunTool,
		isSunToolActive,
		onToggle3D,
		is3DActive,
		onToggleLayers,
		isLayersActive,
		onToggleOsm,
		isOsmActive,
		checkedSpots,
		onToggleUnchecked,
		uncheckedOnly
	}: {
		mapLat: number;
		mapLng: number;
		mapZoom: number;
		onToggleGeolocalization: () => void;
		isGeolocalizationActive: boolean;
		onOpenSunTool: () => void;
		isSunToolActive: boolean;
		onToggle3D: () => void;
		is3DActive: boolean;
		onToggleLayers: () => void;
		isLayersActive: boolean;
		onToggleOsm: () => void;
		isOsmActive: boolean;
		checkedSpots: number;
		onToggleUnchecked: () => void;
		uncheckedOnly: boolean;
	} = $props();
</script>

<div
	class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-slate-800 px-4 py-3"
>
	<!-- Left: Title and Status -->
	<div class="flex items-center gap-3">
		<div class="flex items-center gap-2">
			<FluentEmojiMagnifyingGlass class="text-primary size-6" />
			<div>
				<h1 class="text-lg font-bold">OSINT Geolocalization</h1>
				<p class="hidden text-xs opacity-60 sm:block">Footage Verification & OSINT Intelligence</p>
			</div>
		</div>
	</div>

	<!-- Center: Coordinate Display -->
	<div class="hidden items-center gap-6 text-sm md:flex">
		<div class="flex flex-col gap-1">
			<span class="text-xs opacity-60">LOCATION</span>
			<span class="font-mono font-bold">
				{(mapLat ?? 0).toFixed(4)}° N / {(mapLng ?? 0).toFixed(4)}° E
			</span>
		</div>
		<div class="divider divider-horizontal mx-0 h-8"></div>
		<div class="flex flex-col gap-1">
			<span class="text-xs opacity-60">ZOOM</span>
			<span class="font-mono font-bold">{mapZoom}</span>
		</div>
	</div>

	<!-- Right: Tools -->
	<div class="flex items-center gap-2">
		<button
			class="btn btn-sm {uncheckedOnly ? 'btn-primary' : 'btn-ghost'} hover:bg-primary/10 gap-2"
			onclick={onToggleUnchecked}
			title="Show unchecked spots only"
		>
			Unchecked
		</button>
		<button class="btn btn-sm btn-ghost" onclick={() => goto('/settings')}>Settings</button>
		<button class="btn btn-sm btn-ghost" onclick={() => goto('/about')}>About</button>

		<button
			class="btn btn-sm {is3DActive ? 'btn-primary' : 'btn-ghost'} hover:bg-primary/10 gap-2"
			onclick={onToggle3D}
			title="3D buildings"
		>
			3D
		</button>
		<button
			class="btn btn-sm {isOsmActive ? 'btn-primary' : 'btn-ghost'} hover:bg-primary/10 gap-2"
			onclick={onToggleOsm}
			title="OpenStreetMap search"
		>
			OSM
		</button>
		<button
			class="btn btn-sm {isLayersActive ? 'btn-primary' : 'btn-ghost'} hover:bg-primary/10 gap-2"
			onclick={onToggleLayers}
			title="Additional layers"
		>
			Layers
		</button>

		<span class="badge badge-success" title="Checked spots">{checkedSpots} ✓</span>

		<button
			class="btn btn-sm {isSunToolActive ? 'btn-primary' : 'btn-ghost'} hover:bg-primary/10 gap-2"
			onclick={onOpenSunTool}
			title="Sun Position & Shadows"
		>
			<FluentEmojiSun class="size-4" />
			<span class="hidden sm:inline">Sun</span>
		</button>

		<div class="divider divider-horizontal mx-1 h-6"></div>

		<button
			class="btn btn-sm {isGeolocalizationActive
				? 'btn-primary'
				: 'btn-ghost'} hover:bg-primary/10 gap-2"
			onclick={onToggleGeolocalization}
			title="Toggle Geolocalization Tools"
		>
			<CrosshairsIcon class="size-4" />
			<span class="hidden sm:inline">Geolocalize</span>
		</button>
	</div>
</div>
