import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
    "Top mental health professionals, educated at prestigious government-recognized universities with Master's degrees in Psychology",
    "Minimum 3+ years of experience supporting young adults through real-world challenges",
    "Multi-stage selection ensures globally fluent, culturally sensitive professionals",
    "Personally verified to meet global professional standards",
    "With us, you're never just talking. You're growing—with professional guidance tailored to your needs."
];

const RealExperts: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const mobileContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // --- Desktop Animation ---
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".re-desktop-grid",
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".re-title", { y: 30, opacity: 0, duration: 0.8 })
                .from(".re-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
                .from(".re-list-item", { x: -20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.4")
                .from(".re-tagline", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.2");
        });

        // --- Mobile Animation (Scrollytelling) ---
        mm.add("(max-width: 1023px)", () => {
            const items = gsap.utils.toArray('.re-mobile-point');

            // Pin the container for scrollytelling
            ScrollTrigger.create({
                trigger: mobileContainerRef.current,
                start: "top top",
                end: "+=150%", // Scroll distance: 1.5x viewport height
                pin: true,
                pinSpacing: true,
            });

            // Animate points as we scrub through the pinned section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mobileContainerRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1,
                }
            });

            items.forEach((item, i) => {
                tl.fromTo(item as any,
                    { opacity: 0.2, x: -10, color: "#6b7280" }, // Dim state (gray-500)
                    { opacity: 1, x: 0, color: "#e5e7eb", duration: 1, ease: "power2.out" }, // Active state (gray-200)
                    i * 2 // Stagger timing
                );
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="vo-real-experts w-full bg-[#1a1a1a] relative">

            {/* =========================================
                DESKTOP LAYOUT (>1024px)
               ========================================= */}
            <div className="hidden lg:block py-24">
                <div className="re-desktop-grid max-w-[1240px] mx-auto px-6 grid grid-cols-2 gap-12 items-center text-white">
                    {/* Content */}
                    <div>
                        <h2 className="re-title font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
                            Real Experts. <span className="text-[#F97316] block mt-2">Real Care.</span> Just for You.
                        </h2>
                        <p className="re-desc font-body text-lg text-gray-300 leading-relaxed mb-8">
                            Our mental health professionals aren't just qualified—they've been carefully selected to meet the emotional needs of young adults like you.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {POINTS.map((point, idx) => (
                                <li key={idx} className="re-list-item flex items-start gap-3">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[#F97316] shrink-0" />
                                    <span className="text-gray-300 leading-relaxed font-body">{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="re-tagline inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                            <span className="font-heading font-bold text-[#F97316] tracking-wide">
                                Verified. Compassionate. Confidential.
                            </span>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl skew-x-[-2deg] transition-transform duration-700 hover:skew-x-0">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                            alt="Expert Professional"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 text-white max-w-sm">
                            <div className="font-heading font-bold text-2xl mb-2">Global Standards</div>
                            <p className="text-white/90">Professionals you can trust, selected from top global universities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                MOBILE LAYOUT (<1023px)
               ========================================= */}
            <div className="lg:hidden">
                {/* 
                    Container height is viewport height (100vh) because it gets pinned.
                    The logic allows 150% scroll distance scrubbing.
                */}
                <div ref={mobileContainerRef} className="h-[100dvh] w-full relative flex flex-col justify-end bg-[#1a1a1a] overflow-hidden">

                    {/* Background Image (Absolute to container) */}
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                            alt="Expert Professional"
                            className="w-full h-full object-cover opacity-50"
                        />
                        {/* Heavy Dark Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
                    </div>

                    {/* Glassmorphism Card (Dark Theme) */}
                    <div className="relative z-10 w-full px-6 pb-24 pt-10">
                        <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl w-full">
                            <h2 className="font-heading text-3xl font-bold text-white mb-6 leading-tight">
                                Real Experts.<br /><span className="text-[#F97316]">Real Care.</span>
                            </h2>

                            <div className="space-y-4">
                                {POINTS.map((point, idx) => (
                                    <div key={idx} className="re-mobile-point flex items-start gap-3 transform translate-x-0">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                                        {/* Default state handled by GSAP (dimmed -> bright) */}
                                        <span className="font-body text-sm leading-relaxed">{point}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10">
                                <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-wider">
                                    Verified & Confidential
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default RealExperts;
