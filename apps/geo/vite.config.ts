import adapter from '@sveltejs/adapter-vercel';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		sveltekit({
			alias: { $lib: 'src/lib' },
			preprocess: vitePreprocess(),
			compilerOptions: { runes: true },
			adapter: adapter()
		}),
		tailwindcss({ optimize: { minify: true } })
	],
	server: {
		allowedHosts: true,
		port: 3021
	}
});
