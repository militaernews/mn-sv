import { error } from '@sveltejs/kit';
import { DOCS } from '#lib/docs.js';
import { loadDoc } from '#lib/server/docs.js';

export const entries = () =>
	DOCS.filter((doc) => doc.slug !== 'index').map((doc) => ({ slug: doc.slug }));

export const load = ({ params }) => {
	const doc = params.slug === 'index' ? undefined : loadDoc(params.slug);
	if (!doc) error(404, 'Diese Seite gibt es im Handbuch nicht.');
	return { doc };
};
