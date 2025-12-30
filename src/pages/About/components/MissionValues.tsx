import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        title: "Our Mission",
        desc: "Safe space for all.",
        mobileDesc: "Creating a safe, judgment-free space for everyone.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        span: "col-span-2 row-span-2" // Large
    },
    {
        title: "Our Vision",
        desc: "A brighter future.",
        mobileDesc: "A world where mental wellness is accessible to all.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
        span: "col-span-1 row-span-1" // Small
    },
    {
        title: "Privacy",
        desc: "100% Anonymous.",
        mobileDesc: "100% anonymous interactions guaranteed.",
        image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&q=80",
        span: "col-span-1 row-span-1" // Small
    },
    {
        title: "Inclusivity",
        desc: "You belong here.",
        mobileDesc: "Everyone belongs here, regardless of background.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
        span: "col-span-1 row-span-2" // Tall
    },
    {
        title: "Community",
        desc: "Heal together.",
        mobileDesc: "Healing together in a supportive environment.",
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
        span: "col-span-1 row-span-1" // Small
    },
    {
        title: "Accessibility",
        desc: "Support for everyone.",
        mobileDesc: "Affordable support for everyone.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        span: "col-span-1 row-span-1" // Small
    }
];

const MissionValues: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileTrackRef = useRef<HTMLDivElement>(null);

    // Mobile: Horizontal scroll animation
    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 1023px)", () => {
            if (!mobileTrackRef.current) return;

            const totalWidth = mobileTrackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;

            gsap.to(mobileTrackRef.current, {
                x: -(totalWidth - viewportWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: mobileTrackRef.current?.parentElement,
                    start: "top top",
                    end: `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
        });

        // Desktop: Simple stagger animation for bento grid
        mm.add("(min-width: 1024px)", () => {
            const cards = containerRef.current?.querySelectorAll('.bento-card');
            if (!cards) return;

            gsap.from(cards, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%'
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-[#1a1a1a] text-white py-24 overflow-hidden">
            <div className="max-w-[1300px] mx-auto px-6">
                <div className="mb-0 md:bg-transparent relative z-10">
                    <div className="text-center md:text-left mb-16">
                        <span className="text-white/80 font-bold tracking-[0.2em] text-sm uppercase block mb-4">OUR CORE PRINCIPLES</span>
                        <h2 className="text-5xl md:text-6xl font-serif italic font-medium leading-[1.1] text-white">
                            Mission & Values<br />
                            <span className="text-white/60 not-italic">Committed to Your Well-Being</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* DESKTOP: Bento Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6 max-w-[1300px] mx-auto px-6 auto-rows-[240px]">
                {CARDS.map((card, index) => (
                    <div
                        key={index}
                        className={`bento-card relative rounded-[32px] overflow-hidden group cursor-pointer ${card.span} bg-[#2a2a2a]`}
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end items-start border border-white/10 rounded-[32px]">
                            <h3 className="text-3xl font-serif mb-2 text-white relative z-10">{card.title}</h3>
                            <p className="text-gray-300 text-base leading-relaxed relative z-10">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* MOBILE: Horizontal Scroll */}
            <div className="lg:hidden w-full h-screen relative flex items-center overflow-hidden">
                <div ref={mobileTrackRef} className="flex gap-4 px-6 w-max">
                    {CARDS.map((card, index) => (
                        <div key={index} className="w-[85vw] h-[60vh] rounded-[32px] relative overflow-hidden shrink-0 group">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <h3 className="text-4xl font-serif mb-3 text-white">{card.title}</h3>
                                <p className="text-gray-200 text-xl leading-relaxed">{card.mobileDesc}</p>
                            </div>
                        </div>
                    ))}
                    <div className="w-[10vw] shrink-0"></div>
                </div>
            </div>
        </section>
    );
};

export default MissionValues;
