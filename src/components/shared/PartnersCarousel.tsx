import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// --- DATA ---
const PARTNERS = [
    { name: "Decoders", logo: "https://placehold.co/200x100/333333/ffffff?text=Decoders" },
    { name: "Collative", logo: "https://placehold.co/200x100/333333/ffffff?text=Collative" },
    { name: "SuccessBrew", logo: "https://placehold.co/200x100/333333/ffffff?text=SuccessBrew" },
    { name: "Make A Difference", logo: "https://placehold.co/200x100/333333/ffffff?text=Make+A+Diff" }
];

const THERAPISTS = [
    {
        name: "FRANCES GUERRERO",
        role: "Clinical Psychologist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
        specialization: "Anxiety, Trauma, PTSD"
    },
    {
        name: "DENNIS BARRETT",
        role: "Family Therapist",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        specialization: "Couples Therapy, Relationship Issues"
    },
    {
        name: "LARRY LAWSON",
        role: "Mental Health Counselor",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
        specialization: "Depression, grief, Loss"
    },
    {
        name: "SARAH JENKINS",
        role: "Psychiatrist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
        specialization: "Mood Disorders, ADHD, Bipolar"
    }
];

const PartnersCarousel: React.FC = () => {
    const therapistRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Therapist Carousel (Moves LEFT)
        if (therapistRef.current) {
            const tWidth = therapistRef.current.scrollWidth;
            const tSetWidth = tWidth / 3;

            gsap.to(therapistRef.current, {
                x: -tSetWidth,
                duration: 20,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % tSetWidth)
                }
            });
        }

        // Logo Carousel (Moves RIGHT - Opposite)
        if (logoRef.current) {
            const lWidth = logoRef.current.scrollWidth;
            const lSetWidth = lWidth / 3;

            // To move RIGHT seamlessly: Start from -width and go to 0
            // Or animate from 0 to +width? No, standard seamless loop for Right direction
            // is usually x: 0 -> width?
            // Actually simpler: Set initial x to -lSetWidth. Animate to 0.

            gsap.fromTo(logoRef.current,
                { x: -lSetWidth },
                {
                    x: 0,
                    duration: 15, // Slightly different speed
                    ease: "none",
                    repeat: -1
                }
            );
        }
    }, { scope: undefined });

    return (
        <section className="py-12 px-[5%] bg-[#1a1a1a] text-white overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* TOP SECTION: Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Heading */}
                    <div className="space-y-6 text-center lg:text-left">
                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold italic leading-tight text-white">
                            Making mental health a priority together with our partners.
                        </h2>
                    </div>

                    {/* Right: Logos Marquee (Single Line, Loop Right) */}
                    <div className="w-full overflow-hidden relative fade-mask-x">
                        <div ref={logoRef} className="flex items-center gap-12 w-max py-4">
                            {/* Tripled for loop */}
                            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
                                <div key={idx} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-10 sm:h-12 w-auto object-contain filter grayscale invert brightness-200"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Therapist Cards Carousel (Loop Left) */}
                <div className="mt-4 overflow-hidden -mx-[5%] px-[5%]">
                    <div ref={therapistRef} className="flex gap-8 w-max py-8">
                        {[...THERAPISTS, ...THERAPISTS, ...THERAPISTS].map((expert, idx) => (
                            <div key={idx} className="w-[300px] sm:w-[350px] bg-white rounded-[24px] p-6 text-vo-black flex flex-col items-center text-center hover:translate-y-[-8px] transition-transform duration-300 border-[3px] border-transparent hover:border-orange-100 shadow-xl relative group shrink-0">
                                {/* Image */}
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 -mt-12 bg-gray-200 relative z-10">
                                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="space-y-2 mb-6 flex-1 w-full">
                                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-gray-900">{expert.name}</h3>
                                    <p className="text-sm font-bold text-[#F97316] uppercase tracking-wider">{expert.role}</p>
                                    <div className="w-12 h-[2px] bg-gray-100 mx-auto my-4"></div>
                                    <p className="text-xs text-gray-600 px-2 line-clamp-2 min-h-[40px]">
                                        <span className="font-bold text-gray-900">Specializations:</span> {expert.specialization}
                                    </p>
                                </div>

                                {/* Button */}
                                <button className="w-full py-3.5 bg-[#F97316] text-white font-bold rounded-xl hover:bg-[#EA580C] transition-all relative overflow-hidden shadow-md hover:shadow-lg translate-y-0 active:translate-y-0.5">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .fade-mask-x { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
            `}} />

        </section>
    );
};

export default PartnersCarousel;
