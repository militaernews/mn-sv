import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			// Every page is prerendered; Vercel only serves files
			adapter: vercelAdapter()
		}),
		tailwindcss(),
		Icons({ compiler: 'svelte' })
	]
});
