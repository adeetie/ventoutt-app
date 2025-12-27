import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface WhyLovePoint {
    title: string;
    desc: string;
    image: string;
}

const DEFAULT_POINTS: WhyLovePoint[] = [
    { title: "Built around people, not policies:", desc: "That means flexible sessions, accessible formats, and support that works around your life — not the other way around.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
    { title: "24/7 Availability:", desc: "Life doesn't pause for business hours. Whether it's 3 AM or lunch break, our listeners are here when you need to vent.", image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&q=80" },
    { title: "Complete Anonymity:", desc: "Express yourself freely without judgment. Your identity stays protected, so you can be completely honest about how you feel.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" },
    { title: "Affordable Support:", desc: "Quality emotional support shouldn't break the bank. We've made mental wellness accessible to everyone, everywhere.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" },
    { title: "Trained Listeners:", desc: "Our community of listeners is trained to provide empathetic, non-judgmental support whenever you need someone to talk to.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" }
];

interface WhyLoveSectionProps {
    points?: WhyLovePoint[];
    title?: string;
}

const WhyLoveSection: React.FC<WhyLoveSectionProps> = ({ points = DEFAULT_POINTS, title = "Why People Love Ventoutt" }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const pointsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const index = Math.min(
                    Math.floor(self.progress * points.length),
                    points.length - 1
                );
                setActiveIndex(index);
            }
        });
    }, { scope: containerRef, dependencies: [points] });

    return (
        <section className="why-love-scroll-section" ref={containerRef} style={{ minHeight: '500vh' }}>
            <div className="why-love-scroll-container" style={{ position: 'sticky', top: 0, height: '100vh' }}>
                <div className="why-love-scroll-left">
                    <h2 className="why-love-main-title">{title}</h2>

                    <div className="why-love-points-wrapper" ref={pointsRef}>
                        {points.map((point, idx) => (
                            <div
                                key={idx}
                                className={`why-love-point ${idx === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(idx)}
                                onMouseEnter={() => setActiveIndex(idx)}
                                style={{
                                    cursor: 'pointer',
                                    // Original CSS has absolute positioning for points, which we want for this stacking effect
                                    // But we need to ensure they are visible when active
                                    opacity: idx === activeIndex ? 1 : 0.3, // Visual feedback for inactive
                                }}
                            >
                                <h3 className="why-love-subtitle">
                                    {point.title}
                                </h3>
                                <p className="why-love-description">
                                    {point.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="why-love-scroll-right">
                    <div className="why-love-slideshow" style={{ height: '70vh', maxHeight: '700px', width: '100%' }}>
                        {points.map((point, idx) => (
                            <img
                                key={idx}
                                src={point.image}
                                alt={point.title}
                                className={`why-love-slide-image ${idx === activeIndex ? 'active' : ''}`}
                                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default WhyLoveSection;
