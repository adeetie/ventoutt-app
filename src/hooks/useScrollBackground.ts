import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollBackground = () => {
    useEffect(() => {
        // Find all sections with data-bg attribute
        const sections = gsap.utils.toArray<HTMLElement>('[data-bg]');

        if (sections.length === 0) return;

        // Set initial body background to the first section's color
        const firstColor = sections[0].getAttribute('data-bg');
        if (firstColor) {
            gsap.set(document.body, { backgroundColor: firstColor });
        }

        const triggers: ScrollTrigger[] = [];

        sections.forEach((section) => {
            const color = section.getAttribute('data-bg');
            if (!color) return;

            // Create ScrollTrigger for each section
            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top 55%', // Trigger when top of section passes middle-ish of viewport
                end: 'bottom 55%',
                onEnter: () => gsap.to(document.body, { backgroundColor: color, duration: 0.6, overwrite: 'auto' }),
                onEnterBack: () => gsap.to(document.body, { backgroundColor: color, duration: 0.6, overwrite: 'auto' }),
                // markers: true // Uncomment for debugging
            });
            triggers.push(trigger);
        });

        return () => {
            triggers.forEach(t => t.kill());
            // Reset background on unmount
            gsap.set(document.body, { backgroundColor: '' });
        };
    }, []);
};
