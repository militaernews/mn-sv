import { error } from '@sveltejs/kit';
import { DOCS } from '#lib/docs.js';
import { loadDocs } from '#lib/server/docs.js';

export const entries = () =>
	DOCS.filter((doc) => doc.slug !== 'index').map((doc) => ({ slug: doc.slug }));

export const load = ({ params }) => {
	const docs = loadDocs(params.slug);
	if (!docs) error(404, 'This page is not in the handbook.');
	return { docs };
};
