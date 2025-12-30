import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [stats, setStats] = useState({ users: 36615, hours: 265315 });

    // Odometer counting effect
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
        if (!gridRef.current) return;
        const items = gridRef.current.querySelectorAll('.hero-grid-item');

        gsap.from(items, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }, []);

    return (
        <section
            className="pt-[140px] pb-20 px-[60px] md:px-5 relative z-[1] overflow-hidden"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--vo-color-charcoal)' }}
        >
            <div className="max-w-[1400px] mx-auto relative z-20">
                {/* Header: Title + Desktop Text */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-[60px] md:mb-[30px] gap-0 md:gap-10">
                    <div className="max-w-full md:max-w-[600px]">
                        <h1
                            className="font-heading text-[3rem] md:text-[5rem] leading-[1] md:leading-[0.95] text-center md:text-left m-0 text-[#2D2D2D] font-bold" // Increased size slightly for "About Us"
                            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}
                        >
                            About Us
                        </h1>
                        <h2 className="text-xl md:text-2xl mt-4 text-[#555555] font-light text-center md:text-left">
                            Creating a safe space for mental health.
                        </h2>
                    </div>

                    <div className="hidden md:flex flex-col items-start gap-6 max-w-[450px] mt-2.5">
                        <p className="text-lg leading-[1.6] text-[#555555]" style={{ fontFamily: 'var(--font-body)' }}>
                            We are dedicated to making mental wellness accessible to everyone. Our platform connects you with compassionate listeners and professionals who truly care.
                        </p>
                        <a href="#" className="inline-block bg-[#F97316] text-white py-3 px-8 rounded-full font-semibold transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                            Let's Talk
                        </a>
                    </div>
                </div>

                {/* Grid: Mobile 2x2, Desktop 4x2 */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-6 mb-5 md:mb-0"
                    style={{
                        gridTemplateRows: '200px 200px'
                    }}
                >
                    {/* Item 1: Team Member / Community */}
                    <div
                        className="hero-grid-item rounded-[20px] md:rounded-lg overflow-hidden relative col-start-1 row-span-2 md:row-span-1 md:col-start-1 md:row-start-1"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80"
                            alt="Community"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 2: Support / Hands */}
                    <div
                        className="hero-grid-item rounded-[20px] md:rounded-lg overflow-hidden relative col-start-2 row-start-1 md:col-start-2 md:row-start-1"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ec?auto=format&fit=crop&w=500&q=80"
                            alt="Support"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 3: Centerpiece - Large Team/Vision Image */}
                    <div
                        className="hero-grid-item hidden md:block rounded-lg overflow-hidden relative md:col-start-3 md:row-span-2"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80"
                            alt="Vision"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 4: Diverse Group */}
                    <div
                        className="hero-grid-item hidden md:block rounded-lg overflow-hidden relative md:col-start-4 md:row-start-1"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=500&q=80"
                            alt="Diversity"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Item 5: STATS BOX (Replacing Testimonial) - Green BG */}
                    <div
                        className="hero-grid-item hidden md:flex rounded-lg overflow-hidden relative md:col-span-2 md:row-start-2 bg-[#3A7F56] flex-row items-center justify-around p-8"
                        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl lg:text-5xl font-bold text-white mb-1">
                                {stats.users.toLocaleString()}
                            </span>
                            <span className="text-sm font-bold uppercase tracking-wider text-white/80">Users Worldwide</span>
                        </div>
                        <div className="w-[1px] h-12 bg-white/30"></div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl lg:text-5xl font-bold text-white mb-1">
                                {stats.hours.toLocaleString()}
                            </span>
                            <span className="text-sm font-bold uppercase tracking-wider text-white/80">Hours of Care</span>
                        </div>
                    </div>

                    {/* Item 6: Play Button / Interactive Element */}
                    <div
                        className="hero-grid-item rounded-[20px] md:rounded-lg overflow-hidden relative col-start-2 row-start-2 md:col-start-4 md:row-start-2 flex items-center justify-center cursor-pointer transition-colors"
                        style={{
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            backgroundColor: 'var(--color-primary-500, #F57F17)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E65100')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-500, #F57F17)')}
                    >
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

                {/* Mobile Only Text/CTA - Below Grid */}
                <div className="md:hidden mt-6 flex flex-col gap-4">
                    <p
                        className="text-sm leading-[1.6] text-[#555555] text-left"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        We are dedicated to making mental wellness accessible.
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-xl flex-1 shadow-sm">
                            <span className="block text-2xl font-bold text-[#F97316]">{stats.users.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">USERS</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl flex-1 shadow-sm">
                            <span className="block text-2xl font-bold text-[#F97316]">{stats.hours.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">HOURS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Grid Rows Sizing */}
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

export default AboutHero;
