import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GuidanceVsTherapy: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // 3D Reveal Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',   // Trigger earlier to be visible
                end: 'top 40%',
                toggleActions: 'play none none reverse'
            }
        });

        // 1. 3D Tilt Up & Expand to Full Width
        tl.from('.gvt-3d-card', {
            width: '85%',        // Starts smaller
            borderRadius: '48px', // Starts rounded
            rotationX: 20,       // Tilts back
            y: 80,               // Moves up
            opacity: 0,
            scale: 0.95,
            duration: 1.5,
            ease: "power3.out",
            transformOrigin: "center top"
        });

        // 2. Staggered Content Reveal
        tl.from('.gvt-left > *', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=1.0")
            .from('.gvt-right', {
                x: 30,
                opacity: 0,
                duration: 1.0,
                ease: "power2.out"
            }, "-=0.8")
            .from('.gvt-card', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.5)"
            }, "-=0.6");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="vo-section py-0 bg-white relative overflow-hidden perspective-[1200px]">
            {/* 3D Animated Background Card -> Expands to Full Width */}
            <div className="gvt-3d-card w-full mx-auto bg-[#FFE4AD] rounded-none py-16 lg:py-24 shadow-sm will-change-transform origin-top">

                <div className="max-w-[1400px] mx-auto px-[5%]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT COLUMN: Text Content */}
                        <div className="gvt-left flex flex-col items-start text-left">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E68638]/10 text-[#E68638] text-sm font-semibold mb-6">
                                Guidance vs Therapy
                            </span>

                            <h2 className="gvt-headline font-heading text-4xl lg:text-5xl font-bold text-[#1e1e1e] leading-[1.15] mb-6">
                                Most people think they need therapy.<br />
                                <span className="text-[#E68638] italic">What they really need is guidance.</span>
                            </h2>

                            <p className="gvt-body font-body text-lg text-gray-700 leading-relaxed mb-10 max-w-xl">
                                Here's something most mental health platforms won't tell you: not everyone needs clinical therapy.
                                In fact, most young adults dealing with stress, relationships, career confusion, or life transitions
                                don't need a diagnosis—they need professional guidance.
                            </p>

                            <div className="space-y-8 w-full max-w-lg mb-10">
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-[#1e1e1e] mb-3">Compassion</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong className="text-[#1e1e1e]">Feeling overwhelmed?</strong> Sometimes you just need to vent and be heard.
                                        We offer a safe space to share without judgment.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-[#1e1e1e] mb-3">Empowerment</h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        <strong className="text-[#1e1e1e]">Need clarity?</strong> Professional guidance helps you build coping skills and set goals.
                                        <br />
                                        <strong className="text-[#1e1e1e]">Clinical distress?</strong> That's when we recommend therapy with licensed professionals.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById('fit-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-[#E68638] text-white rounded-full font-heading font-bold text-lg hover:bg-[#cc702a] transition-colors shadow-lg hover:shadow-xl"
                            >
                                Find What's Right For You
                            </button>
                        </div>

                        {/* RIGHT COLUMN: Image + Floating Card */}
                        <div className="gvt-right relative h-[600px] w-full hidden lg:block">
                            {/* Main Image */}
                            <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000"
                                    alt="Support Group"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Card */}
                            <div className="gvt-card absolute bottom-8 left-[-50px] bg-white p-8 rounded-3xl shadow-xl max-w-md border border-gray-100">
                                <div className="flex -space-x-3 mb-6">
                                    {[
                                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
                                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces',
                                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces',
                                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces'
                                    ].map((src, i) => (
                                        <img key={i} src={src} alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    "Most companies start helping only when you're in distress. We're here to support you at every stage of your journey."
                                </p>
                                <p className="text-sm text-[#E68638] font-bold mt-4 uppercase tracking-wider">
                                    — The VentOutt Promise
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuidanceVsTherapy;
