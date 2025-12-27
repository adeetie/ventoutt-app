import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: "Individual Therapy",
        desc: "Personalized sessions focusing on your mental health journey. We address anxiety, depression, trauma, and personal growth through evidence-based practices.",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
        features: ["Anxiety & Depression", "Trauma Recovery", "Identity & Self-Esteem", "Grief & Loss"]
    },
    {
        title: "Couple Therapy",
        desc: "Strengthen your bond and resolve conflicts with expert guidance. We help partners build trust, improve communication, and find common ground.",
        image: "https://images.unsplash.com/photo-1516589174184-c685ca3c162e?w=800&q=80",
        features: ["Conflict Resolution", "Communication Skills", "Trust Rebuilding", "Premarital Counseling"]
    },
    {
        title: "Venting Space",
        desc: "Sometimes you just need to let it out. Our anonymous venting space provides instant relief with trained listeners who understand your need to be heard.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
        features: ["24/7 Availability", "100% Anonymous", "Judgment-Free", "Safe Environment"]
    },
    {
        title: "Expert Coaching",
        desc: "Goal-oriented guidance for your career and personal life. Unlock your potential with actionable strategies and mindset shifts.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        features: ["Career Transition", "Leadership Skills", "Time Management", "Mindset Shift"]
    }
];

const DetailedServicesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // GSAP FIRST: Scroll-triggered fade-in for each service row
    useGSAP(() => {
        if (!sectionRef.current) return;

        const rows = sectionRef.current.querySelectorAll('.service-detail-row');

        rows.forEach((row) => {
            gsap.from(row, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-white w-full"
            style={{
                fontFamily: 'var(--font-body)'
            }}
        >
            {/* Content Container - Constrained Width */}
            <div
                className="space-y-20 px-5"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {SERVICES.map((service, idx) => (
                    <div
                        key={idx}
                        className={`service-detail-row flex items-center gap-[60px] ${idx % 2 !== 0 ? 'flex-row-reverse' : ''
                            }`}
                    >
                        {/* Text Content */}
                        <div className="flex-1">
                            <h2
                                className="mb-5"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '32px',
                                    color: 'var(--vo-color-charcoal)',
                                    fontWeight: 700
                                }}
                            >
                                {service.title}
                            </h2>

                            <p
                                className="mb-6"
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    color: '#555'
                                }}
                            >
                                {service.desc}
                            </p>

                            {/* Feature List */}
                            <ul
                                className="mb-[30px]"
                                style={{
                                    listStyle: 'none',
                                    padding: 0
                                }}
                            >
                                {service.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className="relative pl-6 mb-3"
                                        style={{ color: '#444' }}
                                    >
                                        <span
                                            className="absolute left-0 font-bold"
                                            style={{ color: 'var(--vo-color-primary, #F57F17)' }}
                                        >
                                            •
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <a
                                href="#"
                                className="inline-block px-7 py-3 rounded-[30px] font-semibold no-underline transition-colors"
                                style={{
                                    backgroundColor: 'var(--vo-color-primary, #F57F17)',
                                    color: '#fff'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D84315')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--vo-color-primary, #F57F17)')}
                            >
                                Book a Session
                            </a>
                        </div>

                        {/* Image */}
                        <div
                            className="flex-1 rounded-[20px] overflow-hidden"
                            style={{
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Sticky Stack Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    /* Sticky Stack Effect - Mobile Only */
                    .service-detail-row {
                        position: sticky;
                        top: 90px; /* Base position */
                        height: auto;
                        margin-bottom: 2rem;
                        width: 100%;
                        background-color: #fff;
                        border-radius: 20px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                        overflow: hidden;
                        flex-direction: column !important;
                        gap: 0;
                        padding: 0;
                    }
                    
                    /* Progressive stacking offsets */
                    .service-detail-row:nth-child(1) {
                        top: 90px;
                        z-index: 10;
                    }
                    .service-detail-row:nth-child(2) {
                        top: 120px;
                        z-index: 20;
                    }
                    .service-detail-row:nth-child(3) {
                        top: 150px;
                        z-index: 30;
                    }
                    .service-detail-row:nth-child(4) {
                        top: 180px;
                        z-index: 40;
                    }
                    
                    /* Content comes first */
                    .service-detail-row > div:first-child {
                        order: 1;
                        padding: 1.5rem;
                    }
                    
                    /* Image comes second (bottom) */
                    .service-detail-row > div:last-child {
                        order: 2;
                        border-radius: 0;
                        box-shadow: none;
                    }
                    
                    .service-detail-row > div:last-child img {
                        height: 250px;
                        border-radius: 0;
                    }
                    
                    .service-detail-row h2 {
                        font-size: 24px !important;
                        margin-bottom: 0.75rem !important;
                    }
                    
                    .service-detail-row p {
                        font-size: 15px !important;
                        line-height: 1.5 !important;
                        margin-bottom: 1.25rem !important;
                    }
                    
                    .service-detail-row ul {
                        margin-bottom: 1.25rem !important;
                    }
                }
            `}} />
        </section>
    );
};

export default DetailedServicesSection;
