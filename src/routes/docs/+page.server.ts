import { loadDocs } from '#lib/server/docs.js';

export const load = () => ({ docs: loadDocs('index')! });
