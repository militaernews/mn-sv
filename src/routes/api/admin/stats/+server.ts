import { error, json } from '@sveltejs/kit';
import { CHANNELS, PROJECTS } from '#lib/projects.js';
import { DOCS } from '#lib/docs.js';
import { isAdmin, verifyTelegram } from '#lib/server/tg.js';

export async function GET({ request }) {
	const uid = verifyTelegram(request.headers.get('x-telegram-init-data') ?? '');
	if (uid === null || !isAdmin(uid)) throw error(403, 'Admins only');

	let github = { stars: 0, forks: 0, issues: 0 };
	try {
		const response = await fetch('https://api.github.com/repos/militaernews/mn-sv', {
			headers: process.env.GITHUB_TOKEN
				? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
				: {}
		});
		if (response.ok) {
			const repo = await response.json();
			github = {
				stars: repo.stargazers_count ?? 0,
				forks: repo.forks_count ?? 0,
				issues: repo.open_issues_count ?? 0
			};
		}
	} catch {}

	return json({
		github,
		channels: CHANNELS.length,
		projects: PROJECTS.length,
		docs: DOCS.length
	});
}
