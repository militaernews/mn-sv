import { marked } from 'marked';
import changelog from '#lib/changelog.md?raw';

interface Commit {
	sha: string;
	message: string;
	date: string;
	author: string;
}

const repo = 'militaernews/mn-sv';

export const load = async () => {
	const sections = changelog
		.split(/^## /m)
		.slice(1)
		.map((section) => {
			const [date, ...body] = section.split('\n');
			return {
				date: date.trim(),
				html: marked.parse(body.join('\n').trim(), { async: false }) as string
			};
		});

	let commits: Commit[] = [];
	let total = 0;
	let contributors = 0;
	let lastUpdate = '';
	try {
		const headers: Record<string, string> = process.env.GITHUB_TOKEN
			? {
					authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
					accept: 'application/vnd.github+json'
				}
			: { accept: 'application/vnd.github+json' };
		const [commitResponse, repoResponse] = await Promise.all([
			fetch(`https://api.github.com/repos/${repo}/commits?per_page=40`, { headers }),
			fetch(`https://api.github.com/repos/${repo}`, { headers })
		]);
		if (commitResponse.ok && repoResponse.ok) {
			const data = await commitResponse.json();
			commits = data.map((item: any) => ({
				sha: item.sha?.slice(0, 7) ?? '',
				message: item.commit?.message?.split('\n')[0] ?? '',
				date: item.commit?.author?.date ?? '',
				author: item.author?.login ?? item.commit?.author?.name ?? 'unknown'
			}));
			const info = await repoResponse.json();
			total = info.size ?? 0;
			lastUpdate = info.pushed_at ?? commits[0]?.date ?? '';
			contributors = new Set(commits.map((commit) => commit.author)).size;
		}
	} catch {}

	return { sections, commits, stats: { total, contributors, lastUpdate } };
};
