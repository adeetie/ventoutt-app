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

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".re-title", {
            y: 30,
            opacity: 0,
            duration: 0.8
        })
            .from(".re-desc", {
                y: 20,
                opacity: 0,
                duration: 0.8
            }, "-=0.6")
            .from(".re-list-item", {
                x: -20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6
            }, "-=0.4")
            .from(".re-tagline", {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.2");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="vo-real-experts py-16 bg-[#1a1a1a] overflow-hidden text-white">
            <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Content Side */}
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

                {/* Visual Side */}
                <div className="relative h-[500px] lg:h-[600px] rounded-[40px] overflow-hidden shadow-2xl skew-x-[-2deg] transition-transform duration-700 hover:skew-x-0">
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

        </section>
    );
};

export default RealExperts;
