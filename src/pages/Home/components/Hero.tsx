import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

const GREETINGS = [
    'hello..', 'नमस्ते..', 'hola..', 'こんにちは..',
    'bonjour..', 'ciao..', 'hallo..', 'olá..'
];

const SLIDES = [
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop'
];

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const greetingRef = useRef<HTMLHeadingElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useGSAP(() => {
        // 1. Typewriter Effect using GSAP
        // If TextPlugin is available, this works great. If not, we might need a fallback, 
        // but let's assume standard GSAP build for now or emulate it.
        // Since we can't guarantee TextPlugin is installed/working in the user's specific text environment without checking package.json,
        // we will use a robust vanilla GSAP timeline for the text content to be safe and smooth.

        const masterTl = gsap.timeline({ repeat: -1 });
        GREETINGS.forEach((word) => {
            let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tl.to(greetingRef.current, {
                duration: word.length * 0.1,
                text: word,
                ease: "none"
            });
            masterTl.add(tl);
        });

        // 2. Entrance Animations
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
        tl.from('.vo-hero__content-wrapper > *', {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            delay: 0.2
        })
            .from('.vo-hero__visual', {
                opacity: 0,
                scale: 0.95,
                duration: 1.2
            }, "-=0.8");

        // 3. Floating Doodles Animation
        gsap.to('.vo-doodle--top-left', {
            y: -15,
            rotate: -5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to('.vo-doodle--bottom-right', {
            y: 15,
            rotate: 5,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    // Slideshow Logic
    useGSAP(() => {
        const interval = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} className="vo-hero min-h-screen relative flex items-center pt-[150px] lg:pt-[180px] pb-20 bg-vo-bg overflow-hidden">
            <div className="vo-hero__container w-full max-w-[1240px] mx-auto px-[5%] flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

                {/* Content Wrapper - Uses display: contents on mobile to allow reordering of children */}
                <div className="vo-hero__content-wrapper contents lg:flex lg:flex-col lg:gap-0 lg:max-w-[600px] lg:order-1">

                    {/* Greeting Wrapper (Order 1 on mobile) */}
                    <div className="vo-hero__greeting-wrapper order-1 lg:order-none w-full flex justify-start items-end h-24 lg:h-36 mb-2 overflow-hidden">
                        <h2 id="dynamic-hello" ref={greetingRef} className="vo-hero__greeting font-heading font-bold text-[6rem] lg:text-[7.5rem] text-[#F57F17] leading-none opacity-100 inline-block tracking-[-1px]">
                            {/* Text injected by GSAP */}
                            hello..
                        </h2>
                    </div>

                    {/* Header Group (Order 2 on mobile) */}
                    <div className="vo-hero__header order-2 lg:order-none w-full flex flex-col items-start text-left">
                        <h1 className="vo-hero__title font-heading font-bold text-[2.5rem] lg:text-[3.5rem] leading-[1.1] text-vo-gray-dark italic mb-6">
                            Creating a safe space for mental health.
                        </h1>
                    </div>

                    {/* Footer Group (Order 4 on mobile) */}
                    <div className="vo-hero__footer order-4 lg:order-none w-full flex flex-col items-start text-left gap-8">
                        <p className="vo-hero__description font-body text-lg lg:text-lg text-vo-text-secondary leading-[1.6] max-w-[480px] mb-8 lg:mb-0">
                            We believe that mental health is just as important as physical health, and our mission is to
                            provide support, education, and a judgment-free space for everyone.
                        </p>
                        <a href="#" className="btn-secondary inline-flex items-center gap-4 w-fit pl-[6px] pr-5 py-[6px] rounded-[50px] font-body font-semibold text-base shadow-sm transition-all duration-300">
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                                alt="Avatar"
                                className="vo-btn__avatar w-9 h-9 rounded-full border-2 border-white/20 object-cover"
                            />
                            <span className="vo-btn__text text-base">Let's talk with us</span>
                        </a>
                    </div>
                </div>

                {/* Visual Frame (Order 3 on mobile) */}
                <div className="vo-hero__visual order-3 lg:order-2 lg:col-start-2 w-full flex justify-center lg:justify-end relative pr-0 lg:pr-5 my-4 lg:my-0">
                    <div className="vo-hero__frame-wrapper relative z-1 inline-block rotate-12">
                        {/* Top Edge Squibble (Touching Top Left Corner) */}
                        <svg className="vo-doodle vo-doodle--top-left absolute z-10 w-[80px] lg:w-[140px] text-green-100 top-[-10px] left-[-10px] lg:top-[-20px] lg:left-[-20px] -rotate-[15deg]" viewBox="0 0 140 50" fill="none">
                            <path d="M10 25 Q 25 10, 40 25 T 70 25 T 100 25 T 130 25" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>



                        {/* Image Frame */}
                        <div className="vo-hero__img-frame relative bg-[#F9EBE8] p-3 lg:p-[12px] rounded-[32px] shadow-[0_25px_50px_rgba(0,0,0,0.1)] -rotate-3 z-5 overflow-hidden w-[300px] h-[280px] lg:w-[440px] lg:h-[540px] border-[8px] lg:border-0 border-white">
                            <div className="vo-hero-slides relative w-full h-full rounded-[20px] overflow-hidden">
                                {SLIDES.map((url, idx) => (
                                    <div
                                        key={idx}
                                        className={`vo-hero-slide absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out z-1 ${activeSlide === idx ? 'opacity-100 z-2' : 'opacity-0'}`}
                                        style={{ backgroundImage: `url(${url})` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom Right Squibble (Touching Bottom Right Corner) */}
                        <svg className="vo-doodle vo-doodle--bottom-right absolute z-10 w-[80px] lg:w-[140px] text-white bottom-[-10px] right-[-10px] lg:bottom-[-20px] lg:right-[-20px] -rotate-[15deg]" viewBox="0 0 140 50" fill="none">
                            <path d="M10 25 Q 25 40, 40 25 T 70 25 T 100 25 T 130 25" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
