import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WaveDivider from '../../../components/shared/WaveDivider';

gsap.registerPlugin(ScrollTrigger);

const ServicesHero: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    // GSAP FIRST: Stagger animation matching original (pages.js)
    useGSAP(() => {
        if (!gridRef.current) return;

        const items = gridRef.current.querySelectorAll('.hero-grid-item');

        gsap.from(items, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.1,  // Original timing: 0.1s between items
            ease: 'power2.out',  // Original easing
            scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',  // Original trigger point
                toggleActions: 'play none none none'
            }
        });
    }, []);

    return (
        <section
            className="pt-32 lg:pt-40 pb-20 px-4 lg:px-[60px] relative z-[1] overflow-hidden"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--vo-color-charcoal)' }}
        >
            <div className="max-w-[1400px] mx-auto relative z-20">
                {/* Header: Title + Desktop Text */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-[60px] md:mb-[30px] gap-0 md:gap-10">
                    <h1
                        className="font-heading text-4xl lg:text-5xl leading-[1.1] max-w-full md:max-w-[600px] mx-auto md:mx-0 text-center md:text-left m-0 text-[#2D2D2D] font-bold italic"
                    >
                        Your partners in holistic wellness
                    </h1>
                    <p
                        className="hidden md:block text-lg leading-[1.6] max-w-[450px] text-[#555555] mt-2.5"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Our experienced team of MA Psychology professionals, mental health guides, and empathetic listeners work together to create personalized support plans for young adults navigating life's challenges.
                    </p>
                </div>

                {/* Grid: Mobile 2x1, Desktop 4x2 */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-5 md:mb-0"
                    style={{
                        gridTemplateRows: 'minmax(180px, 200px) md:repeat(2, minmax(180px, 1fr))'
                    }}
                >
                    {/* Item 1: Woman with Glasses - Full column on mobile */}
                    <div
                        className="hero-grid-item rounded-[16px] md:rounded-lg overflow-hidden relative aspect-square md:aspect-auto md:row-span-1 md:col-start-1 md:row-start-1"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"
                            alt="Therapist"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 2: Modern House - Full column on mobile */}
                    <div
                        className="hero-grid-item rounded-[16px] md:rounded-lg overflow-hidden relative aspect-square md:aspect-auto md:col-start-2 md:row-start-1"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600596542815-60c37c6525fa?auto=format&fit=crop&w=500&q=80"
                            alt="Modern House"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 3: Centerpiece Woman - Desktop only (spans 2 rows) */}
                    <div
                        className="hero-grid-item hidden md:block rounded-lg overflow-hidden relative md:col-start-3 md:row-span-2"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                            alt="Senior Therapist"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 4: Woman Sitting - Desktop only */}
                    <div
                        className="hero-grid-item hidden md:block rounded-lg overflow-hidden relative md:col-start-4 md:row-start-1"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
                            alt="Relaxed Client"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 5: Testimonial (Green background) - DESKTOP ONLY */}
                    <div
                        className="hero-grid-item hidden md:flex rounded-lg overflow-hidden relative md:col-span-2 md:row-start-2 bg-[#3A7F56] flex-row items-center gap-5 p-6"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                            alt="Brandon Wathson"
                            className="w-[120px] h-[120px] rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col flex-1 justify-center">
                            <p
                                className="text-white text-base font-medium leading-[1.4] italic mb-2"
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                "I feel more confident and at peace since starting therapy here."
                            </p>
                            <span
                                className="text-[13px] text-[#E0E0E0] font-bold uppercase opacity-90"
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    letterSpacing: '0px'
                                }}
                            >
                                Brandon Wathson
                            </span>
                        </div>
                    </div>

                    {/* Item 6: Play Button - Desktop Only */}
                    <div
                        className="hero-grid-item hidden md:flex rounded-lg overflow-hidden relative md:col-start-4 md:row-start-2 items-center justify-center cursor-pointer transition-colors"
                        style={{
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            backgroundColor: 'var(--color-primary-500, #F57F17)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E65100')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-500, #F57F17)')}
                    >
                        {/* Play button triangle */}
                        <div
                            className="w-0 h-0"
                            style={{
                                borderTop: '12px solid transparent',
                                borderBottom: '12px solid transparent',
                                borderLeft: '20px solid white'
                            }}
                        />
                    </div>
                </div>

                {/* Mobile Only Text - Below Grid */}
                <p
                    className="md:hidden text-sm leading-[1.6] text-[#555555] text-left mt-5 px-[5px]"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Our experienced team of MA Psychology professionals, mental health guides, and empathetic listeners work together to create personalized support plans for young adults navigating life's challenges.
                </p>
            </div>

            {/* Bottom Wave Divider - DISABLED */}
            {/* <WaveDivider position="bottom" className="text-white z-10" /> */}

            {/* Add desktop-specific grid template rows */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 768px) {
                    .grid {
                        grid-template-rows: 280px 220px;
                    }
                }
            `}} />
        </section>
    );
};

export default ServicesHero;
