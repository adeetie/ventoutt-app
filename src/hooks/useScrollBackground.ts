import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to smoothly change the body background color based on scroll position.
 * Each section should have a data-bg attribute with the target background color.
 * 
 * Usage:
 * 1. Add data-bg="<color>" to your section elements
 * 2. Call useScrollBackground() in your page component
 * 
 * Example:
 * <section data-bg="#F4EDE4">Hero</section>
 * <section data-bg="#1a1a1a">Dark Section</section>
 */
export const useScrollBackground = (containerRef: React.RefObject<HTMLElement>) => {
    useEffect(() => {
        if (!containerRef.current) return;

        const sections = containerRef.current.querySelectorAll('[data-bg]');
        if (sections.length === 0) return;

        // Set initial background
        const firstBg = sections[0].getAttribute('data-bg');
        if (firstBg) {
            gsap.set(document.body, { backgroundColor: firstBg });
        }

        // Create ScrollTrigger for each section
        const triggers: ScrollTrigger[] = [];

        sections.forEach((section) => {
            const bgColor = section.getAttribute('data-bg');
            if (!bgColor) return;

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => {
                    gsap.to(document.body, {
                        backgroundColor: bgColor,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                },
                onEnterBack: () => {
                    gsap.to(document.body, {
                        backgroundColor: bgColor,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            });

            triggers.push(trigger);
        });

        // Cleanup
        return () => {
            triggers.forEach(trigger => trigger.kill());
            // Reset body background on unmount
            gsap.set(document.body, { backgroundColor: '' });
        };
    }, [containerRef]);
};

export default useScrollBackground;
