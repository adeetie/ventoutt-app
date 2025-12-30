import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const TESTIMONIALS = [
    {
        id: 1,
        text: "Ventoutt provided me the safe space I didn't know I needed. It's truly life-changing.",
        author: "Sarah M.",
        role: "Early Adopter",
        pill: "Success Stories",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80"
    },
    {
        id: 2,
        text: "Connecting with others who understand my anxiety made me feel less alone.",
        author: "James P.",
        role: "Community Member",
        pill: "Community Love",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=1600&q=80"
    },
    {
        id: 3,
        text: "The resources here gave me the tools to manage my stress effectively.",
        author: "Elena R.",
        role: "Student",
        pill: "Real Impact",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1600&q=80"
    }
];

const TestimonialSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    // Auto-slide interval
    React.useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        // Crossfade effect for background images
        gsap.fromTo(".testimonial-bg-img",
            { opacity: 0.5, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.inOut", overwrite: true }
        );

        // Text fade in with proper easing
        gsap.fromTo(".testimonial-content",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
        );
    }, [currentIndex]);

    const currentTestimonial = TESTIMONIALS[currentIndex];

    return (
        <section className="relative w-full py-0 md:py-20 lg:py-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl mx-4 lg:mx-auto">

                {/* Background Image Layer */}
                <div key={currentTestimonial.image} className="absolute inset-0 testimonial-bg-img">
                    <img
                        src={currentTestimonial.image}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content Card - Centrally aligned on mobile, Left on desktop */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-start p-5 md:p-16">
                    <div className="testimonial-content bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-[28px] shadow-xl max-w-lg w-full text-center md:text-left transform transition-all">
                        <span className="block text-[#E68638] text-[10px] font-bold uppercase tracking-wider mb-5 font-sans">
                            {currentTestimonial.pill}
                        </span>
                        <h3 className="font-serif italic text-lg md:text-2xl text-vo-black leading-tight mb-6">
                            "{currentTestimonial.text}"
                        </h3>
                        <div className="flex flex-col items-center md:items-start gap-0.5">
                            <span className="font-bold text-vo-black text-xs font-serif">{currentTestimonial.author}</span>
                            <span className="text-vo-gray text-[9px] font-medium uppercase tracking-wide font-sans">{currentTestimonial.role}</span>
                        </div>
                    </div>
                </div>

                {/* Video Thumbnail (Bottom Right) */}
                <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-32 md:w-48 aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 cursor-pointer hover:scale-105 transition-transform group hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&q=80"
                        alt="Video Testimonial"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center pl-1">
                            <span className="text-black text-xs">▶</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TestimonialSlider;
