export type Plan = 'free' | 'pro' | 'max';

export const PLANS = {
	pro: { stars: 200, days: 30, features: ['planExports', 'planHistory', 'planBranding'] },
	max: {
		stars: 500,
		days: 30,
		features: ['planExports', 'planHistory', 'planBranding', 'planTeam', 'planPriority']
	}
} as const;

export type PaidPlan = keyof typeof PLANS;
