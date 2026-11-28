import { mock } from 'bun:test';

// unplugin-icons virtual modules are only available through Vite. Stub them for unit tests.
for (const name of [
	'book-open',
	'map',
	'chart-column',
	'globe',
	'languages',
	'scan-eye',
	'radio',
	'megaphone',
	'users-round'
]) {
	mock.module(`~icons/lucide/${name}`, () => ({ default: () => null }));
}
