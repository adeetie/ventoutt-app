import React, { useRef, useState, useEffect } from 'react';

// Using a custom hook or simple resize detection
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
};

const FitSection: React.FC = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!isMobile || !trackRef.current) return;

        // 1) Center the Coaching card horizontally within the carousel (NOT the whole page)
        const centerCard = trackRef.current.children[1] as HTMLElement;
        if (centerCard && trackRef.current) {
            setTimeout(() => {
                // Calculate scroll position to center the card within the container
                const containerWidth = trackRef.current!.offsetWidth;
                const cardLeft = centerCard.offsetLeft;
                const cardWidth = centerCard.offsetWidth;
                const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

                // Use scrollTo on the container, NOT scrollIntoView (which scrolls the page)
                trackRef.current!.scrollTo({
                    left: scrollPosition,
                    behavior: 'auto'
                });
            }, 100);
        }

        // 2) Intersection Observer for "Bigger Centre Card" Logic
        const observerOptions = {
            root: trackRef.current,
            threshold: 0.6,
            rootMargin: '0px -20% 0px -20%'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    target.dataset.active = "true";
                } else {
                    target.dataset.active = "false";
                }
            });
        }, observerOptions);

        Array.from(trackRef.current.children).forEach(child => observer.observe(child));

        return () => observer.disconnect();
    }, [isMobile]);

    const scroll = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;
        // Scroll amount slightly less than full width to show peek of next card
        const scrollAmount = 350;
        trackRef.current.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="vo-fit-section py-24 px-[5%] bg-white overflow-hidden relative">
            <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="font-heading italic text-4xl sm:text-5xl font-bold text-vo-black">
                        Find Your Right Fit
                    </h2>
                    <p className="font-body text-lg text-vo-text-secondary max-w-2xl mx-auto">
                        Every path is valid. Choose what helps you today.
                    </p>
                </div>

                {/* Grid Container (Desktop) / Scroll Track (Mobile) */}
                <div className="relative group/track">
                    {/* Mobile Navigation Arrows (Visible only on lg:hidden) - Positioned over the cards */}
                    <button
                        onClick={() => scroll('left')}
                        className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-vo-black transition-all active:scale-95 disabled:opacity-50"
                        style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                        aria-label="Previous"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-vo-black transition-all active:scale-95 disabled:opacity-50"
                        style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                        aria-label="Next"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>

                    <div
                        ref={trackRef}
                        className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch text-left overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-8 lg:pb-0 -mx-[5%] px-[50%] lg:px-0 lg:mx-0 touch-pan-x no-scrollbar"
                    >

                        {/* 1. Instant Venting Card (Dark) */}
                        <div className="transition-all duration-300 ease-out snap-center shrink-0 w-[85vw] max-w-[380px] lg:w-auto
                            group relative bg-[#1A1A1A] p-8 lg:p-10 rounded-[32px] flex flex-col hover:-translate-y-2 hover:shadow-2xl h-auto
                            data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=false]:scale-90 data-[active=false]:opacity-50 lg:data-[active=false]:scale-100 lg:data-[active=false]:opacity-100"
                        >
                            <div className="mb-8">
                                <h3 className="font-heading font-bold text-3xl text-white mb-2">Instant Venting</h3>
                                <p className="text-gray-400 font-medium text-sm mb-6">Empathetic Listeners</p>
                                <p className="text-white font-bold text-xl">Low Cost ($5/session)</p>
                            </div>

                            <ul className="space-y-4 font-body text-white/90 text-sm mb-10 flex-grow">
                                <li className="flex items-start"><span className="text-primary mr-3 font-bold">✓</span> <strong>Goal:</strong>&nbsp; Instant Relief</li>
                                <li className="flex items-start"><span className="text-primary mr-3 font-bold">✓</span> <strong>Focus:</strong>&nbsp; "Feeling Heard Right Now"</li>
                                <li className="flex items-start"><span className="text-primary mr-3 font-bold">✓</span> <strong>Availability:</strong>&nbsp; Instant Access</li>
                                <li className="flex items-start"><span className="text-primary mr-3 font-bold">✓</span> <strong>Best for:</strong>&nbsp; One-time situations, immediate release</li>
                            </ul>

                            <button
                                className="w-full h-12 rounded-full border border-[#E68638] text-[#E68638] font-heading font-bold text-lg hover:bg-[#E68638] hover:text-white transition-colors mt-auto"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                            >
                                Start Venting
                            </button>
                        </div>

                        {/* 2. Mental Health Guidance Card (Green - Featured) */}
                        <div className="transition-all duration-300 ease-out snap-center shrink-0 w-[85vw] max-w-[380px] lg:w-auto
                            group relative bg-[#1B3B36] p-8 lg:p-10 rounded-[32px] flex flex-col shadow-2xl z-10 border border-[#2C5F56] h-auto
                            lg:scale-105
                            data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=false]:scale-90 data-[active=false]:opacity-50 lg:data-[active=false]:scale-105 lg:data-[active=false]:opacity-100"
                        >
                            <div className="mb-8 relative">
                                <h3 className="font-heading font-bold text-3xl text-white mb-2">Mental Health Guidance</h3>
                                <p className="text-gray-300 font-medium text-sm mb-4">MA Psychology Professionals</p>

                                <span className="inline-block bg-[#3D635B] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4">
                                    Most Popular
                                </span>

                                <p className="text-white font-bold text-xl">Affordable ($$) - $35/session</p>
                            </div>

                            <ul className="space-y-4 font-body text-white/90 text-sm mb-10 flex-grow">
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Goal:</strong>&nbsp; Growth & Lasting Change</li>
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Focus:</strong>&nbsp; "Building Skills & Clarity"</li>
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Availability:</strong>&nbsp; Matched in 24 Hours</li>
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Bonus:</strong>&nbsp; 50 FREE Texts to Start</li>
                            </ul>

                            <button
                                className="w-full h-12 rounded-full bg-[#3a7f56] text-white font-heading font-bold text-lg hover:bg-[#2e6645] transition-colors hover:shadow-lg mt-auto"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                            >
                                Get Matched
                            </button>
                        </div>

                        {/* 3. Professional Therapy Card (Dark) */}
                        <div className="transition-all duration-300 ease-out snap-center shrink-0 w-[85vw] max-w-[380px] lg:w-auto
                            group relative bg-[#1A1A1A] p-8 lg:p-10 rounded-[32px] flex flex-col hover:-translate-y-2 hover:shadow-2xl h-auto
                            data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=false]:scale-90 data-[active=false]:opacity-50 lg:data-[active=false]:scale-100 lg:data-[active=false]:opacity-100"
                        >
                            <div className="mb-8">
                                <h3 className="font-heading font-bold text-3xl text-white mb-2">Professional Therapy</h3>
                                <p className="text-gray-400 font-medium text-sm mb-6">Licensed Clinicians</p>
                                <p className="text-white font-bold text-xl">Professional Service</p>
                            </div>

                            <ul className="space-y-4 font-body text-white/90 text-sm mb-10 flex-grow">
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Goal:</strong>&nbsp; Clinical Support & Deep Healing</li>
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Focus:</strong>&nbsp; "Structured Treatment"</li>
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Availability:</strong>&nbsp; By Appointment</li>
                                <li className="flex items-start"><span className="text-[#E68638] mr-3 font-bold">✓</span> <strong>Best for:</strong>&nbsp; Clinical diagnosis, diagnosed conditions</li>
                            </ul>

                            <button
                                className="w-full h-12 rounded-full border border-[#E68638] text-[#E68638] font-heading font-bold text-lg hover:bg-[#E68638] hover:text-white transition-colors mt-auto"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                            >
                                Learn More
                            </button>
                        </div>

                    </div>
                </div>

                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default FitSection;
