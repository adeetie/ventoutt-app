import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
    {
        num: "01",
        desc: "Talk to our chatbot. Tell us what's on your mind—completely anonymous & judgment-free.",
        color: "#F4A261"
    },
    {
        num: "02",
        desc: "Get Matched. We'll pair you with the best professional for your needs.",
        color: "#E6914F"
    },
    {
        num: "03",
        desc: "Schedule your session. Pick a time that works for you.",
        color: "#CE7830"
    },
    {
        num: "04",
        desc: "Start your journey. Connect via text, audio, or video and start feeling better.",
        color: "#7F7053"
    }
];

interface HowItWorksProps {
    title?: string;
    steps?: string[] | { num: string; desc: string }[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({ title = "How It Works", steps }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Normalize steps
    const displaySteps = useMemo(() => {
        let initialSteps = STEPS;
        if (steps) {
            if (steps.length > 0 && typeof steps[0] === 'string') {
                initialSteps = (steps as string[]).map((desc, idx) => ({
                    num: `0${idx + 1}`,
                    desc,
                    color: STEPS[idx % STEPS.length].color
                }));
            } else {
                initialSteps = (steps as any[]).map((s, idx) => ({
                    ...s,
                    color: s.color || STEPS[idx % STEPS.length].color
                }));
            }
        }
        return initialSteps;
    }, [steps]);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Desktop: Pinned Scroll Sequence (Scrollytelling)
            const line = document.querySelector('.how-line-progress');
            const cards = gsap.utils.toArray('.how-desktop-card') as HTMLElement[];

            // Initial setup
            gsap.set(line, { width: '0%' });
            gsap.set(cards, { opacity: 0, y: 30 });
            gsap.set('.how-desktop-dot', { scale: 0, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',         // Lock when top hits top of viewport
                    end: '+=2000',            // Pin for 2000px of scroll
                    pin: true,                // PIN THE SECTION
                    scrub: 1,                 // Smooth scrubbing
                    anticipatePin: 1
                }
            });

            cards.forEach((card, i) => {
                const dot = card.querySelector('.how-desktop-dot');

                // 1. Reveal Dot & Card
                tl.to(dot, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' })
                    .to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "<");

                // 2. Grow line to next Step
                if (i < cards.length - 1) {
                    tl.to(line, {
                        width: `${(i + 1) * 25}%`,
                        duration: 0.5,
                        ease: 'none'
                    });
                }
            });
        });

        mm.add("(max-width: 1023px)", () => {
            // Mobile: Sequential Timeline Animation
            const steps = gsap.utils.toArray<HTMLElement>('.how-mobile-step');

            steps.forEach((step) => {
                const dot = step.querySelector('.how-mobile-dot');
                const card = step.querySelector('.how-mobile-card');
                const line = step.querySelector('.how-mobile-line');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 75%',
                        end: 'bottom 75%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // 1. Pop in the dot
                if (dot) {
                    tl.fromTo(dot,
                        { scale: 0, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
                    );
                }

                // 2. Slide in the card
                if (card) {
                    tl.fromTo(card,
                        { opacity: 0, x: 50 },
                        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
                        "-=0.2"
                    );
                }

                // 3. Grow the line to the next step
                if (line) {
                    tl.fromTo(line,
                        { height: 0, opacity: 0 },
                        { height: '100%', opacity: 1, duration: 0.4, ease: 'none' }
                    );
                }
            });
        });

    }, { scope: containerRef, dependencies: [displaySteps] });

    return (
        <section ref={containerRef} className="how-scroll-wrapper py-24 bg-[#faf7f2] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-[5%] relative z-10">
                <div className="mb-16 sm:mb-24 space-y-2 text-left">
                    <span className="text-[#5D5D5D] font-bold text-xs tracking-[0.2em] uppercase block mb-4">SIMPLE PROCESS</span>
                    <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#1a1a1a]">{title}</h2>
                </div>

                {/* DESKTOP LAYOUT (Horizontal) */}
                <div className="how-desktop-wrapper hidden lg:block relative">
                    {/* Progress Line */}
                    <div className="absolute top-4 left-0 w-full h-[2px] bg-[#d1d1d1]">
                        <div className="how-line-progress h-full bg-[#333] w-0"></div>
                    </div>

                    <div className={`grid gap-6 relative ${displaySteps.length === 3 ? 'grid-cols-3' :
                        displaySteps.length === 4 ? 'grid-cols-4' :
                            'grid-cols-5'
                        }`}>
                        {displaySteps.map((step, idx) => (
                            <div key={idx} className="how-desktop-card flex flex-col pt-0 group">
                                {/* Dot */}
                                <div className="how-desktop-dot w-8 h-8 rounded-full border-4 border-[#F8F5F0] relative z-10 mb-12 transition-transform duration-300 group-hover:scale-125"
                                    style={{ backgroundColor: step.color }}>
                                </div>

                                {/* Card */}
                                <div className="how-desktop-card-content bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[220px] flex flex-col justify-between h-full">
                                    <span className="font-heading text-3xl font-bold mb-4 block"
                                        style={{ color: step.color }}>
                                        {step.num}
                                    </span>
                                    <p className="font-body text-[#4a4a4a] text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOBILE LAYOUT (Vertical Timeline) */}
                <div className="how-mobile-wrapper flex flex-col gap-0 lg:hidden relative pl-4">
                    {displaySteps.map((step, idx) => (
                        <div key={idx} className="how-mobile-step flex gap-6 relative pb-12 last:pb-0">
                            {/* Timeline Line (Left) */}
                            <div className="flex flex-col items-center flex-shrink-0 w-8 relative">
                                {/* Dot */}
                                <div className="how-mobile-dot w-8 h-8 rounded-full border-4 border-[#F8F5F0] relative z-10 box-content"
                                    style={{ backgroundColor: step.color }}>
                                </div>
                                {/* Connecting Line */}
                                {idx !== displaySteps.length - 1 && (
                                    <div className="how-mobile-line w-[2px] bg-[#d1d1d1] flex-grow absolute top-8 bottom-0 -z-0 origin-top"></div>
                                )}
                            </div>

                            {/* Content Card (Right) */}
                            <div className="how-mobile-card flex-1 bg-white rounded-2xl p-6 shadow-sm relative top-[-8px]">
                                <span className="font-heading text-3xl font-bold mb-3 block"
                                    style={{ color: step.color }}>
                                    {step.num}
                                </span>
                                <p className="font-body text-[#4a4a4a] text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
