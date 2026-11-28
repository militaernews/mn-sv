/** The four legal documents, in the order they are linked from About. */
export const LEGAL_SLUGS = ['imprint', 'privacy', 'terms', 'withdrawal'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export const LEGAL_LABELS: Record<LegalSlug, { de: string; en: string }> = {
	imprint: { de: 'Impressum', en: 'Imprint' },
	privacy: { de: 'Datenschutz', en: 'Privacy policy' },
	terms: { de: 'AGB', en: 'Terms' },
	withdrawal: { de: 'Widerruf', en: 'Withdrawal' }
};

export const LEGAL_HREF = (slug: LegalSlug) => `/legal/${slug}`;
