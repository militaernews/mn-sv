import type { Plan } from './plans';

const KEY = 'mn-plan';

export interface Entitlement {
	plan: 'pro' | 'max';
	uid: number;
	exp: number;
	token: string;
}

export function saveEntitlement(value: Entitlement) {
	localStorage.setItem(KEY, JSON.stringify(value));
}

export function currentEntitlement(): Entitlement | null {
	try {
		const value = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Entitlement | null;
		return value && value.exp > Date.now() ? value : null;
	} catch {
		return null;
	}
}

export function currentPlan(): Plan {
	return currentEntitlement()?.plan ?? 'free';
}
