import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STACK_ITEMS = [
    {
        title: 'Relationship Building',
        desc: 'Great relationships are built on trust, communication, and mutual respect. Our professionals help you strengthen connections through guided conversations and proven strategies.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    },
    {
        title: 'Improved Mental Health',
        desc: 'Prioritize rest, mindfulness, and supportive relationships for a healthier mind. We support your mental wellness at every stage—from venting to therapy.',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
    },
    {
        title: 'Emotional Support',
        desc: 'Being present and listening without judgment goes a long way. Whether you need someone to hear you out right now or ongoing guidance, we are here.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    },
    {
        title: 'Professional Guidance & Therapy',
        desc: 'A safe space to heal, grow, and gain clarity. Get expert mental health support—from professional guidance to structured therapy.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    },
    {
        title: 'Best Pricing',
        desc: 'Quality mental health support shouldn\'t cost a fortune. From $5 venting sessions to $35 professional guidance—get support at prices that make sense.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    },
    {
        title: '24 x 7 Connectivity',
        desc: 'Message your assigned mental health professional at any time. Whether you need immediate venting or ongoing guidance, Ventoutt is here.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    },
    {
        title: 'Certified Professionals',
        desc: 'Access confirmed MA Psychology professionals supporting you globally. Trusted care tailored to your needs.',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    },
    {
        title: 'Data Privacy',
        desc: 'Your privacy is our priority. All conversations are completely confidential, adhering to strict standards for global customers.',
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
    },
    {
        title: 'Get Matched in 24 Hours',
        desc: 'We connect you with certified mental health professionals within 24 hours globally across the USA, UK, and beyond.',
        image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80',
    },
    {
        title: 'Support for Young Adults',
        desc: 'Ventoutt is a safe, supportive platform created especially for young adults (18-34) navigating life\'s challenges.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    }
];

const StickyStack: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Use a timeline for strict sequencing
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${STACK_ITEMS.length * 100}%`, // Scroll distance proportional to items
                scrub: 1,
                pin: true,
                pinSpacing: true,
            }
        });

        // Loop through cards. 
        // Logic: Card N slides UP. Card N-1 scales DOWN.
        // We skip the first card (Base card).

        cardsRef.current.forEach((card, index) => {
            if (index === 0) return; // Base card doesn't move in initially
            if (!card) return;

            const prevCard = cardsRef.current[index - 1];

            // 1. Previous card scales down/darkens as new one enters - UPDATED: Just scale, no dimming
            if (prevCard) {
                // We add this to the timeline simultaneous with the incoming card
                tl.to(prevCard, {
                    scale: 0.95,
                    // filter: 'brightness(0.9)', // Removed for clean white stack
                    duration: 1,
                    ease: "power1.inOut"
                }, ">-1"); // Overlap with previous
            }

            // 2. Current card slides UP from bottom
            // Wait, we need to ensure the `to` above happens WHILE this one enters.
            // GSAP Timeline sequence works step by step.
            // We want simultaneous.

            // Actually, simplest is just to sequence the "Enter".
            // The "Scale Previous" effect can be triggered by the same scroll position.

            // Let's create a label
            tl.add(`card${index}`);

            // Animate Current Card IN
            tl.fromTo(card,
                { y: '120vh', rotate: 2 },
                { y: '0vh', rotate: 0, duration: 1, ease: "power2.out" },
                `card${index}`
            );

            // Animate Previous Card OUT (Scale down)
            if (prevCard) {
                tl.to(prevCard, {
                    scale: 0.95,
                    // opacity: 0.5, // Removed to keep pure white
                    // y: '-5vh', // Optional push up
                    duration: 1,
                    ease: "power2.out"
                }, `card${index}`);
            }

            // If there's a card before that (index-2), maybe scale it further?
            // Founder logic had 3 levels: 1, 0.95, 0.9.
            if (index >= 2) {
                const prevPrevCard = cardsRef.current[index - 2];
                if (prevPrevCard) {
                    tl.to(prevPrevCard, {
                        scale: 0.9,
                        // opacity: 0, // Removed to keep functional stack visibility
                        duration: 1
                    }, `card${index}`);
                }
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="h-screen w-full bg-white flex flex-col justify-center items-center overflow-hidden relative">

            {/* Main Heading */}
            <div className="absolute top-8 md:top-12 z-50 text-center w-full px-4">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-vo-black italic leading-tight inline-block">
                    Why People Love VentOutt
                </h2>
            </div>

            {/* Stack Container */}
            <div className="relative w-[90%] max-w-[1000px] h-[60vh] min-h-[500px] mt-28">
                {STACK_ITEMS.map((item, idx) => (
                    <div
                        key={idx}
                        ref={el => { cardsRef.current[idx] = el; }}
                        className="absolute inset-0 w-full h-full"
                        style={{
                            zIndex: idx + 10,
                            // Visual reset for hydration
                            // transform: idx === 0 ? 'none' : 'translateY(120vh)' 
                        }}
                    >
                        {/* Visual Card */}
                        <div className="w-full h-full bg-white rounded-[32px] border border-black/5 overflow-hidden flex flex-col lg:flex-row origin-bottom">
                            {/* Content */}
                            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center space-y-6 order-2 lg:order-1">
                                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-vo-black leading-tight">
                                    {item.title}
                                </h3>
                                <p className="font-body text-base sm:text-lg text-vo-text-secondary leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Image */}
                            <div className="flex-1 h-[250px] lg:h-auto relative order-1 lg:order-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StickyStack;
