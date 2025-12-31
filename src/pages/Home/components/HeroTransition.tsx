import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

// Data
const GREETINGS = [
    'hello..', 'नमस्ते..', 'hola..', 'こんにちは..',
    'bonjour..', 'ciao..', 'hallo..', 'olá..'
];

const MAIN_IMAGE = 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2670&auto=format&fit=crop'; // Landscape Nature
const SECOND_IMAGE = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2670&auto=format&fit=crop'; // Landscape Support

const HeroTransition: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const greetingRef = useRef<HTMLHeadingElement>(null);
    const mainImageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // 1. Typewriter Effect (Kept Same)
    useGSAP(() => {
        if (!greetingRef.current) return;
        const masterTl = gsap.timeline({ repeat: -1 });
        GREETINGS.forEach((word) => {
            let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tl.to(greetingRef.current, {
                duration: word.length * 0.1,
                text: word,
                ease: "none"
            });
            masterTl.add(tl);
        });
    }, { scope: containerRef });

    // 2. Scroll Animation (Optimized)
    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            if (!mainImageRef.current || !contentRef.current) return;

            // Set initial will-change to avoid painting issues
            gsap.set(mainImageRef.current, { willChange: "width, transform", force3D: true });
            gsap.set(contentRef.current, { willChange: "opacity, transform", force3D: true });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=150%", // Scroll distance
                    pin: true,
                    scrub: 1, // Increased scrub smoothing slightly if needed, but 1 is usually good
                    anticipatePin: 1,
                    invalidateOnRefresh: true // Handle resizing better
                }
            });

            {/* ANIMATION STEPS:
            // 1. Main Image Shrinks width and moves to Left
            */ }
            tl.to(mainImageRef.current, {
                width: '44%',          // Shrunk further to increase gap
                x: 0,
                borderRadius: '32px',
                duration: 2,
                ease: 'power2.inOut'
            }, "start");

            // 2. Reveal Right Content
            tl.fromTo(contentRef.current,
                { opacity: 0, x: -50, display: 'none' },
                { opacity: 1, x: 0, display: 'flex', duration: 2, ease: 'power2.inOut' },
                "<"
            );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="hero-transition-section w-full relative overflow-hidden flex flex-col pt-32 lg:pt-40 pb-20 px-[5%] min-h-screen">

            {/* --- HEADER --- */}
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 mb-12 lg:mb-16 items-start">

                {/* Left Header */}
                <div className="flex flex-col items-start text-left">
                    {/* Greeting */}
                    <div className="h-20 lg:h-24 flex items-end mb-2">
                        <h2 ref={greetingRef} className="font-heading font-bold text-[5rem] lg:text-[5rem] text-[#E68638] leading-none tracking-[-1px]">
                            hello..
                        </h2>
                    </div>
                    {/* Main Heading */}
                    <h1 className="font-heading font-bold text-4xl lg:text-5xl text-vo-gray-dark italic leading-[1.1]">
                        Get Help, Grow, and Thrive
                    </h1>
                </div>

                {/* Right Header */}
                <div className="flex flex-col items-start lg:items-start lg:pl-12 pt-4">
                    <p className="font-heading font-semibold text-xl lg:text-xl text-vo-text-primary mb-6 max-w-md">
                        Affordable online therapy and mental health support that works
                    </p>
                    <button className="hidden lg:inline-flex btn-primary px-8 py-3 rounded-full bg-[#3a7f56] hover:bg-[#2e6645] text-white font-bold text-lg shadow-lg transition-all">
                        Get Started
                    </button>
                </div>
            </div>

            {/* --- CONTENT CONTAINER --- */}
            <div className="w-full max-w-[1400px] mx-auto flex-grow relative flex flex-col lg:flex-row items-start">

                {/* Main Image (Animated) */}
                {/* Starts full width, animates to left column width */}
                <div ref={mainImageRef} className="hero-main-image w-full h-[50vh] lg:h-[60vh] overflow-hidden rounded-[32px] relative z-10 origin-top-left">
                    <img
                        src={MAIN_IMAGE}
                        alt="Serene Landscape"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* MOBILE CONTENT: Paragraph & Button (Visible only on Mobile) */}
                <div className="flex flex-col items-start mt-8 lg:hidden w-full px-2">
                    <p className="font-body text-base text-vo-text-secondary leading-[1.6] mb-8">
                        We believe that mental health is just as important as physical health. Whether you need someone to listen right now, professional guidance to navigate life's challenges, or structured therapy—our mission is to provide support, education, and a judgment-free space for young adults like you.
                    </p>
                    <button className="w-full btn-primary py-4 rounded-full bg-[#3a7f56] hover:bg-[#2e6645] text-white font-bold text-lg shadow-lg transition-all">
                        Get Started
                    </button>
                </div>

                {/* Right Content (Desktop Only - Hidden initially, reveals on scroll) */}
                <div ref={contentRef} className="hero-right-content hidden lg:flex flex-col w-[50%] h-full pl-32 justify-center absolute right-0 top-0">

                    {/* Paragraph */}
                    <p className="font-body text-lg text-vo-text-secondary leading-[1.6] mb-10 max-w-lg">
                        We believe that mental health is just as important as physical health. Whether you need someone to listen right now, professional guidance to navigate life's challenges, or structured therapy—our mission is to provide support, education, and a judgment-free space for young adults like you.
                    </p>
                </div>

            </div>

            {/* Style for Marquee Animation (Reused) */}
            <style>{`
                .hero-transition-section {
                    /* Ensure scroll space */
                }
                @keyframes marquee-content {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-content {
                    animation: marquee-content 20s linear infinite;
                }
            `}</style>

        </section>
    );
};

export default HeroTransition;
