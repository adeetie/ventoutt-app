import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Draggable);

/**
 * Animates a section's background color smoothly when the theme changes.
 */
export const animateSectionThemeChange = (
    target: HTMLElement,
    newColors: { background: string; text: string; accent: string },
    duration: number = 0.8
) => {
    gsap.to(target, {
        backgroundColor: newColors.background,
        color: newColors.text,
        duration: duration,
        ease: 'power2.inOut',
        overwrite: 'auto'
    });

    // Animate accents if they exist as CSS variables or specific class targets
    // Assuming accents are applied to children with specific data attributes or classes
    // E.g., .theme-accent
    const accents = target.querySelectorAll('.theme-accent');
    if (accents.length > 0) {
        gsap.to(accents, {
            color: newColors.accent,
            fill: newColors.accent,
            borderColor: newColors.accent,
            duration: duration,
            ease: 'power2.inOut'
        });
    }
};

/**
 * Creates a scroll-linked background color transition (ScrollyMorph).
 * @param target The element to animate (e.g., Main Content Wrapper)
 * @param startColor Color entering from top
 * @param endColor Color at bottom
 * @param trigger The scroll trigger element
 */
export const createScrollColorMorph = (
    target: HTMLElement,
    colors: string[], // Array of colors to morph through
    trigger: HTMLElement
) => {
    // Create a timeline that acts as the interpolator
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    // Distribute color changes across the scroll distance
    colors.forEach((color, index) => {
        if (index === 0) return; // Skip start color as it's the initial state
        const duration = 1 / (colors.length - 1);
        tl.to(target, {
            backgroundColor: color,
            ease: "none",
            duration: duration
        });
    });

    return tl;
};

/**
 * Mobile: Horizontal Swipe for Cards (No Stacking).
 * @param container The container of cards
 * @param cards The individual card elements
 */
export const initMobileHorizontalScroll = (
    container: HTMLElement,
    cards: HTMLElement[]
) => {
    // 1. Ensure container is wide enough
    const totalWidth = cards.length * 90; // approx 90vw per card
    gsap.set(container, { width: `${totalWidth}vw` });

    // 2. Setup Horizontal Scroll via ScrollTrigger
    gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: container.parentElement, // Trigger on the wrapper
            pin: true,
            scrub: 1,
            // Snap to each card
            snap: 1 / (cards.length - 1),
            // Duration logic
            end: () => "+=" + (window.innerHeight * cards.length / 1.5)
        }
    });
};
