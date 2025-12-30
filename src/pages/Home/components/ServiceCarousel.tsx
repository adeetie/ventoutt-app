import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const ADDITIONAL_SERVICES = [
    {
        title: 'Relationship Counseling',
        desc: 'Professional relationship therapists and marriage counselors can help partners rebuild trust, resolve conflicts, and strengthen their bond.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80'
    },
    {
        title: 'Family Counseling',
        desc: 'To address issues like communication gaps, intergenerational relationships, parenting challenges etc., Ventoutt provides affordable online family counseling.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80'
    },
    {
        title: 'Private Venting Space',
        desc: 'A safe, convenient and judgement free online venting space that protects your privacy, security and maintains ethical conduct.',
        image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=400&q=80'
    },
    {
        title: 'Individual Counseling',
        desc: 'Get individual counseling sessions where licensed therapists address your specific needs, from stress and anxiety to trauma and everyday struggles.',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80'
    },
    {
        title: 'Youth Support (18-34)',
        desc: 'Support from specialized youth counselors who understand your unique concerns in a fast-paced world.',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80'
    },
    {
        title: 'LGBTQ+ Affirming',
        desc: 'Safe, inclusive and affirming therapy with trained professionals who understand the nuances of identity.',
        image: 'https://images.unsplash.com/photo-1563823263595-5df882d9646b?w=400&q=80'
    }
];

const ServiceCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = 344; // Card width (320) + gap (24)
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="py-20 bg-[#F4EDE4] overflow-hidden relative">
            {/* Header */}
            <div className="text-center mb-12 px-5 relative z-10">
                <h2
                    className="font-bold text-[48px] text-[#212121] mb-4"
                    style={{
                        fontFamily: 'Lora, serif',
                        fontStyle: 'italic'
                    }}
                >
                    Why Choose Us?
                </h2>
            </div>

            {/* Carousel Wrapper */}
            <div className="relative max-w-[1200px] mx-auto mb-20 px-5">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    aria-label="Scroll Left"
                >
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 1L2 8L9 15" />
                    </svg>
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    aria-label="Scroll Right"
                >
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 15L8 8L1 1" />
                    </svg>
                </button>

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-10 pt-5 px-1 snap-x snap-mandatory no-scrollbar"
                >
                    {ADDITIONAL_SERVICES.map((service, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[320px] p-5 rounded-[20px] flex flex-col snap-center transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)';
                            }}
                        >
                            {/* Image */}
                            <div className="w-full h-[180px] rounded-xl overflow-hidden mb-5 bg-[#f0f0f0]">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Text */}
                            <h3
                                className="font-bold text-xl mb-3 text-[#212121]"
                                style={{ fontFamily: 'Lora, serif' }}
                            >
                                {service.title}
                            </h3>
                            <p
                                className="text-[15px] leading-[1.6] text-[#555555] flex-1"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hide scrollbar */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
};

export default ServiceCarousel;
