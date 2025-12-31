import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to create a "stacking sections" effect on mobile.
 * Each section pins at the top while the next section scrolls over it.
 * Only active on screens < 1024px.
 */
export const useMobileSectionPinning = (containerSelector: string = '.vo-home') => {
    useEffect(() => {
        // Create a matchMedia context for mobile only
        const mm = gsap.matchMedia();

        mm.add('(max-width: 1023px)', () => {
            const container = document.querySelector(containerSelector);
            if (!container) return;

            // Get all direct child divs (sections) with data-bg attribute
            const sections = gsap.utils.toArray<HTMLElement>(`${containerSelector} > div[data-bg]`);

            if (sections.length === 0) return;

            const triggers: ScrollTrigger[] = [];

            sections.forEach((section, index) => {
                // Set z-index so later sections appear on top
                gsap.set(section, {
                    zIndex: index + 1,
                    position: 'relative'
                });

                // Don't pin the last section
                if (index === sections.length - 1) return;

                // Create pinning ScrollTrigger
                const trigger = ScrollTrigger.create({
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false, // Don't add space after pinned element
                    // markers: true // Uncomment for debugging
                });

                triggers.push(trigger);
            });

            // Cleanup function for this matchMedia context
            return () => {
                triggers.forEach(t => t.kill());
            };
        });

        // Cleanup matchMedia on unmount
        return () => {
            mm.revert();
        };
    }, [containerSelector]);
};

export default useMobileSectionPinning;
