import adapter from '@sveltejs/adapter-vercel';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit({
			alias: { $lib: 'src/lib' },
			preprocess: vitePreprocess(),
			compilerOptions: { runes: true },
			adapter: adapter({ runtime: 'bun1.x' })
		}),
		tailwindcss(),
		Icons({
			compiler: 'svelte',
			autoInstall: true,
			iconCustomizer(collection, icon, props) {
				props.mode = 'url';
			}
		})
	],
	server: {
		allowedHosts: true,
		port: 3011
	}
});
