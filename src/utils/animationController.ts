/**
 * Animation Controller for A/B Testing
 * Manages dynamic animation assignment and tracking
 */

import React from 'react';
import { applyAnimation } from './gsapAnimations';
import type { AnimationType, AnimationConfig } from './gsapAnimations';

export type AnimationTestVariant = {
    id: string;
    name: string;
    animation: AnimationType;
    config?: Partial<AnimationConfig>;
};

export type SectionAnimationTest = {
    sectionId: string;
    sectionName: string;
    variants: AnimationTestVariant[];
    activeVariantId?: string;
};

/**
 * Animation Test Manager
 */
export class AnimationTestManager {
    private tests: Map<string, SectionAnimationTest> = new Map();
    private readonly STORAGE_KEY = 'ventoutt-animation-tests';

    constructor() {
        this.loadTests();
    }

    /**
     * Register a new A/B test for a section
     */
    registerTest(test: SectionAnimationTest): void {
        this.tests.set(test.sectionId, test);
        this.saveTests();
    }

    /**
     * Get active variant for a section
     */
    getActiveVariant(sectionId: string): AnimationTestVariant | null {
        const test = this.tests.get(sectionId);
        if (!test) return null;

        if (test.activeVariantId) {
            return test.variants.find(v => v.id === test.activeVariantId) || null;
        }

        // No active variant - assign randomly for A/B testing
        const randomVariant = test.variants[Math.floor(Math.random() * test.variants.length)];
        test.activeVariantId = randomVariant.id;
        this.saveTests();

        // Track for analytics
        this.trackVariantAssignment(sectionId, randomVariant.id);

        return randomVariant;
    }

    /**
     * Set specific variant for a section (manual override)
     */
    setVariant(sectionId: string, variantId: string): void {
        const test = this.tests.get(sectionId);
        if (!test) {
            console.warn(`Test for section "${sectionId}" not found`);
            return;
        }

        const variant = test.variants.find(v => v.id === variantId);
        if (!variant) {
            console.warn(`Variant "${variantId}" not found in test "${sectionId}"`);
            return;
        }

        test.activeVariantId = variantId;
        this.saveTests();
    }

    /**
     * Apply animation to a section based on active test
     */
    applyToSection(sectionId: string, element: HTMLElement): void {
        const variant = this.getActiveVariant(sectionId);
        if (!variant) {
            console.warn(`No variant found for section "${sectionId}"`);
            return;
        }

        applyAnimation(element, variant.animation, variant.config);
    }

    /**
     * Get all registered tests
     */
    getAllTests(): SectionAnimationTest[] {
        return Array.from(this.tests.values());
    }

    /**
     * Reset all tests (clear assignments)
     */
    resetAllTests(): void {
        this.tests.forEach(test => {
            test.activeVariantId = undefined;
        });
        this.saveTests();
    }

    /**
     * Reset specific test
     */
    resetTest(sectionId: string): void {
        const test = this.tests.get(sectionId);
        if (test) {
            test.activeVariantId = undefined;
            this.saveTests();
        }
    }

    /**
     * Load tests from localStorage
     */
    private loadTests(): void {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const testsArray: SectionAnimationTest[] = JSON.parse(stored);
                testsArray.forEach(test => {
                    this.tests.set(test.sectionId, test);
                });
            }
        } catch (error) {
            console.error('Failed to load animation tests:', error);
        }
    }

    /**
     * Save tests to localStorage
     */
    private saveTests(): void {
        try {
            const testsArray = Array.from(this.tests.values());
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(testsArray));
        } catch (error) {
            console.error('Failed to save animation tests:', error);
        }
    }

    /**
     * Track variant assignment for analytics
     */
    private trackVariantAssignment(sectionId: string, variantId: string): void {
        const event = {
            type: 'animation_variant_assigned',
            sectionId,
            variantId,
            timestamp: new Date().toISOString()
        };

        // Store in localStorage for analytics
        try {
            const key = `animation-assignment-${sectionId}`;
            localStorage.setItem(key, JSON.stringify(event));

            // Could also send to analytics service here
            // analytics.track('Animation Variant Assigned', event);
        } catch (error) {
            console.error('Failed to track variant assignment:', error);
        }
    }

    /**
     * Get assignment data for analytics
     */
    getAnalyticsData(): Record<string, any> {
        const data: Record<string, any> = {};

        this.tests.forEach((test, sectionId) => {
            if (test.activeVariantId) {
                const variant = test.variants.find(v => v.id === test.activeVariantId);
                data[sectionId] = {
                    variantId: test.activeVariantId,
                    variantName: variant?.name,
                    animation: variant?.animation
                };
            }
        });

        return data;
    }
}

// Singleton instance
export const animationTestManager = new AnimationTestManager();

/**
 * React Hook for using animation tests
 */
export const useAnimationTest = (
    sectionId: string,
    elementRef: React.RefObject<HTMLElement>
) => {
    React.useEffect(() => {
        if (!elementRef.current) return;
        animationTestManager.applyToSection(sectionId, elementRef.current);
    }, [sectionId, elementRef]);

    return {
        activeVariant: animationTestManager.getActiveVariant(sectionId),
        setVariant: (variantId: string) => animationTestManager.setVariant(sectionId, variantId),
        resetTest: () => animationTestManager.resetTest(sectionId)
    };
};
