import { marked } from 'marked';
import changelog from '#lib/changelog.md?raw';

/** Split the markdown into dated sections so each day gets its own card. */
export const load = () => {
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
	return { sections };
};
