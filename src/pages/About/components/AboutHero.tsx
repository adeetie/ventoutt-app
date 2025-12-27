import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stats, setStats] = useState({ users: 36615, hours: 265315 });

    // Odometer counting effect - increment from base values
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                users: prev.users + (Math.random() < 0.5 ? 1 : 0),
                hours: prev.hours + (Math.random() < 0.5 ? 2 : 1)
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const elements = containerRef.current?.querySelectorAll('.hero-element');
        if (!elements) return;

        gsap.from(elements, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="hero-v2 py-16 bg-vo-secondary-light min-h-[80vh] flex items-center overflow-hidden">
            <div className="hero-v2-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-[1240px] mx-auto px-6 w-full items-start">

                {/* --- Left Column --- */}
                <div className="hero-left-col flex flex-col gap-6">

                    {/* Greeting */}
                    <div className="mb-4">
                        <h1 className="font-serif italic text-6xl md:text-7xl lg:text-8xl text-vo-black leading-none">
                            About Us
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className="mb-10">
                        <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-vo-black/80 font-light leading-snug">
                            Creating a safe space<br className="hidden md:block" /> for mental health.
                        </h2>
                    </div>

                    {/* Stat Blocks Row */}
                    <div className="hero-stat-row flex gap-4 mt-4">
                        {/* Stat Block 1 */}
                        <div className="hero-stat-block-new bg-vo-white rounded-[24px] p-6 lg:p-8 flex flex-col min-w-[160px] flex-1 max-w-[200px] shadow-sm">
                            <span className="hero-stat-number text-[28px] font-bold font-body text-vo-primary">
                                {stats.users.toLocaleString()}
                            </span>
                            <span className="hero-stat-label text-sm font-body text-vo-gray mt-1">
                                Users worldwide
                            </span>
                        </div>

                        {/* Stat Block 2 */}
                        <div className="hero-stat-block-new bg-vo-white rounded-[24px] p-6 lg:p-8 flex flex-col min-w-[160px] flex-1 max-w-[200px] shadow-sm">
                            <span className="hero-stat-number text-[28px] font-bold font-body text-vo-primary">
                                {stats.hours.toLocaleString()}
                            </span>
                            <span className="hero-stat-label text-sm font-body text-vo-gray mt-1">
                                Hours of care
                            </span>
                        </div>
                    </div>

                    {/* Mobile Metrics (Visible Only on Mobile) */}
                    <div className="hero-metrics-text hero-metrics-mobile flex lg:hidden gap-8 pt-2">
                        <div className="hero-metric-item flex flex-col">
                            <span className="hero-metric-value font-bold text-2xl text-vo-text-primary">170+</span>
                            <span className="hero-metric-label text-sm text-vo-gray uppercase tracking-wide">Countries reached</span>
                        </div>
                        <div className="hero-metric-item flex flex-col">
                            <span className="hero-metric-value font-bold text-2xl text-vo-text-primary">9.5 ⭐</span>
                            <span className="hero-metric-label text-sm text-vo-gray uppercase tracking-wide">Avg. User Feedback</span>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="hero-cta-section mt-6">
                        <p className="hero-cta-subtext font-body text-base text-vo-gray mb-4 leading-[1.6]">
                            Learn more about our mission and values.
                        </p>
                        <a href="#" className="hero-cta-btn inline-block bg-vo-primary text-white py-[14px] px-9 rounded-[30px] font-body text-base font-semibold no-underline transition-all duration-300 hover:bg-vo-primary-light hover:-translate-y-0.5 hover:shadow-lg">
                            Let's Talk
                        </a>
                    </div>

                </div>

                {/* --- Right Column --- */}
                <div className="hero-right-col flex flex-col gap-5">

                    {/* Slideshow Image */}
                    <div className="hero-cell-slideshow relative rounded-[20px] overflow-hidden h-[250px] lg:h-[400px] shadow-lg hidden lg:block">
                        <img
                            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1600&auto=format&fit=crop"
                            alt="About Us"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Metrics Text Below Slideshow (Desktop Only) */}
                    <div className="hero-metrics-text hero-metrics-desktop hidden lg:flex gap-8">
                        <div className="hero-metric-item flex flex-col">
                            <span className="hero-metric-value font-bold text-2xl text-vo-text-primary">170+</span>
                            <span className="hero-metric-label text-sm text-vo-gray uppercase tracking-wide">Countries reached</span>
                        </div>
                        <div className="hero-metric-item flex flex-col">
                            <span className="hero-metric-value font-bold text-2xl text-vo-text-primary">9.5 ⭐</span>
                            <span className="hero-metric-label text-sm text-vo-gray uppercase tracking-wide">Avg. User Feedback</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutHero;
