import { marked } from 'marked';
import changelog from '#lib/changelog.md?raw';

export const load = () => ({
	changelog: marked.parse(changelog, { async: false }) as string
});
