import { beforeEach, describe, expect, test } from 'bun:test';
import { currentEntitlement, currentPlan, saveEntitlement } from '../../src/lib/entitlement.js';
import { PLANS } from '../../src/lib/plans.js';

const store = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
	configurable: true,
	value: {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => void store.set(key, value),
		removeItem: (key: string) => void store.delete(key),
		clear: () => store.clear(),
		key: (index: number) => [...store.keys()][index] ?? null,
		get length() {
			return store.size;
		}
	}
});

const plan = { plan: 'pro' as const, uid: 42, exp: Date.now() + 60_000, token: 'signed' };

describe('entitlements', () => {
	beforeEach(() => store.clear());

	test('returns free without a stored pass', () => {
		expect(currentPlan()).toBe('free');
		expect(currentEntitlement()).toBeNull();
	});

	test('round-trips a saved pass', () => {
		saveEntitlement(plan);
		expect(currentPlan()).toBe('pro');
		expect(currentEntitlement()?.uid).toBe(42);
	});

	test('ignores expired passes', () => {
		saveEntitlement({ ...plan, exp: Date.now() - 1 });
		expect(currentPlan()).toBe('free');
		expect(currentEntitlement()).toBeNull();
	});

	test('survives corrupt storage', () => {
		store.set('mn-plan', '{not json');
		expect(currentPlan()).toBe('free');
		expect(currentEntitlement()).toBeNull();
	});

	test('plans are 30-day passes with max including every pro feature', () => {
		expect(PLANS.pro.days).toBe(30);
		expect(PLANS.max.days).toBe(30);
		expect(PLANS.pro.stars).toBeLessThan(PLANS.max.stars);
		for (const feature of PLANS.pro.features) {
			expect(PLANS.max.features).toContain(feature);
		}
	});
});
