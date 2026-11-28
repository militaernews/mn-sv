import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['localStorage', 'preferredLanguage', 'baseLocale']
		}),
		sveltekit({
			preprocess: vitePreprocess(),
			// Every page is prerendered; the fallback function runs on Vercel's Bun runtime (bunVersion in vercel.json)
			adapter: vercelAdapter({ runtime: 'bun1.x' })
		}),
		tailwindcss(),
		Icons({ compiler: 'svelte' })
	]
});
