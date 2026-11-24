import { loadDoc } from '#lib/server/docs.js';

export const load = () => ({ doc: loadDoc('index')! });
