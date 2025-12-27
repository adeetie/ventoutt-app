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
    },
    {
        title: "Our Vision",
        desc: "A brighter future.",
        mobileDesc: "A world where mental wellness is accessible to all.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    },
    {
        title: "Privacy",
        desc: "100% Anonymous.",
        mobileDesc: "100% anonymous interactions guaranteed.",
        image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&q=80",
    },
    {
        title: "Inclusivity",
        desc: "You belong here.",
        mobileDesc: "Everyone belongs here, regardless of background.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
    {
        title: "Community",
        desc: "Heal together.",
        mobileDesc: "Healing together in a supportive environment.",
        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
    },
    {
        title: "Accessibility",
        desc: "Support for everyone.",
        mobileDesc: "Affordable support for everyone.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    }
];

const MissionValues: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!scrollWrapperRef.current || !trackRef.current) return;

        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        // Restore GSAP Horizontal Scroll (Pinning/Hijacking) as requested
        gsap.to(trackRef.current, {
            x: -(totalWidth - viewportWidth),
            ease: "none",
            scrollTrigger: {
                trigger: scrollWrapperRef.current,
                start: "top top",
                end: `+=${totalWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-vo-black text-white py-24 overflow-hidden">
            <div className="max-w-[1300px] mx-auto px-6">
                <div className="mb-0 md:bg-transparent relative z-10">
                    <div className="text-center md:text-left mb-16">
                        <span className="text-white/60 font-bold tracking-[0.2em] text-sm uppercase block mb-4">OUR CORE PRINCIPLES</span>
                        <h2 className="text-5xl md:text-6xl font-serif italic font-medium leading-[1.1]">
                            Mission & Values<br />
                            <span className="text-gray-400 not-italic">Committed to Your Well-Being</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* GSAP PINNED HORIZONTAL SCROLL TRACK */}
            <div ref={scrollWrapperRef} className="w-full h-screen relative flex items-center overflow-hidden">
                <div ref={trackRef} className="flex gap-4 md:gap-8 px-6 md:px-12 w-max">
                    {CARDS.map((card, index) => (
                        <div key={index} className="w-[85vw] md:w-[40vw] lg:w-[30vw] h-[60vh] md:h-[70vh] rounded-[32px] md:rounded-[48px] relative overflow-hidden shrink-0 group">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
                                <h3 className="text-4xl md:text-5xl font-serif mb-3 md:mb-5 text-white">{card.title}</h3>
                                <p className="text-gray-200 text-xl leading-relaxed">
                                    {card.mobileDesc || card.desc}
                                </p>
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
