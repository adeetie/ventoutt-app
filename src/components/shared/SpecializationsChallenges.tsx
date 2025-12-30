import React, { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const SPECIALIZATIONS = [
    { label: 'Relationship & Family', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80' },
    { label: 'Individual well-being', image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80' },
    { label: 'Life Transitions', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80' },
    { label: 'Telehealth & Virtual Therapy', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80' }
];

const COMMON_CHALLENGES = [
    "Family therapy for conflict resolution",
    "Therapy for coping with grief and loss",
    "EMDR therapy for trauma processing",
    "Couples counseling for relationship issues",
    "Art therapy for emotional expression",
    "Dialectical behavior therapy for BPD",
    "Marriage counseling to rebuild trust",
    "Holistic therapy for mind–body wellness",
    "Career counseling therapy for stress",
    "Online therapy for busy students",
    "Therapy for dealing with divorce",
    "Therapy for managing chronic pain",
    "Therapy for dealing with loss of loved ones",
    "Affordable therapy for individuals",
    "Anger management therapy for individuals",
    "Therapy for improving communication skills",
    "Therapy for depression",
    "Child therapy for trauma recovery",
    "Therapy for managing bipolar disorder",
    "Therapy for improving self-esteem"
];

const SpecializationsChallenges: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 px-[5%] bg-[#faf7f2] relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative z-10">

                {/* Specializations Grid */}
                <div className="text-center space-y-4 mb-8">
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vo-black italic">What We Specialize In</h2>
                    <p className="font-body text-vo-text-secondary max-w-2xl mx-auto">
                        Our therapists support you through every phase of life. Here's what we specialize in.
                    </p>
                </div>

                {/* Specializations: Desktop Grid / Mobile Carousel with Arrows */}
                <div className="relative mb-8">
                    {/* Desktop Grid (Hidden on Mobile) */}
                    <div className="hidden lg:grid grid-cols-4 gap-6">
                        {SPECIALIZATIONS.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative h-[300px] rounded-[32px] overflow-hidden hover:-translate-y-2 transition-transform duration-500"
                            >
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-6 left-0 right-0 text-center text-white font-heading font-bold text-xl px-4 transform group-hover:-translate-y-2 transition-transform">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Carousel (Hidden on Desktop) */}
                    <div className="lg:hidden relative group">
                        <div
                            id="specs-carousel"
                            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scrollbar scroll-smooth"
                        >
                            {SPECIALIZATIONS.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative min-w-[85vw] h-[400px] snap-center rounded-[32px] overflow-hidden"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                    <div className="absolute bottom-10 left-0 right-0 text-center text-white p-6">
                                        <h3 className="font-heading font-bold text-3xl mb-2">{item.label}</h3>
                                        <p className="font-body text-white/80 text-sm">Professional Support</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Navigation Arrows */}
                        <div className="absolute bottom-1/2 translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
                            <button
                                onClick={() => {
                                    const el = document.getElementById('specs-carousel');
                                    if (el) el.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' });
                                }}
                                className="w-12 h-12 bg-white/90 backdrop-blur text-primary rounded-full flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform active:scale-95"
                                aria-label="Previous"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('specs-carousel');
                                    if (el) el.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' });
                                }}
                                className="w-12 h-12 bg-white/90 backdrop-blur text-primary rounded-full flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform active:scale-95"
                                aria-label="Next"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Common Challenges List */}
                <div className="vo-common-challenges" style={{ marginTop: '60px', textAlign: 'center' }}>
                    <h3 className="font-heading text-3xl font-bold text-vo-text-primary mb-8">Common Challenges We Help With</h3>

                    <div className={isExpanded
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-left auto-rows-min max-w-5xl mx-auto"
                        : "flex flex-col md:flex-row md:justify-center gap-x-8 gap-y-4 text-left max-w-5xl mx-auto"
                    }>
                        {/* Always visible first 3 on mobile if needed, or just show all/subset */}
                        {(isExpanded ? COMMON_CHALLENGES : COMMON_CHALLENGES.slice(0, 3)).map((challenge, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-vo-text-secondary font-medium justify-center md:justify-start">
                                <span className="text-primary mt-1">✓</span>
                                {challenge}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 text-vo-black font-heading font-bold text-lg hover:text-primary transition-colors"
                        >
                            {isExpanded ? 'See Less' : 'See More'}
                            <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            >
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SpecializationsChallenges;
