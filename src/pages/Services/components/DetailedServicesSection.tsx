import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: "Mental Health Guidance (Coaching)",
        desc: "Feeling stuck? Our expert psychologists help you navigate life's challenges—career, relationships, stress, and personal growth. Get the clarity and tools you need to move forward.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        features: ["Goal-Oriented Support", "Skill Building", "Personal Growth", "Actionable Strategies"],
        buttonText: "Book Guidance Session",
        popular: true
    },
    {
        title: "Instant Venting",
        desc: "Need to let it all out? Connect with a trained empathetic listener in seconds. Whether you're frustrated, sad, or just need to talk, we're here to listen without judgment.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
        features: ["24/7 Availability", "100% Anonymous", "No Diagnosis Needed", "Immediate Relief"],
        buttonText: "Start Venting Now",
        popular: false
    },
    {
        title: "Professional Therapy",
        desc: "Clinical support for diagnosed mental health conditions. Work with licensed therapists to manage depression, anxiety, trauma, and more through structured, evidence-based treatment.",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
        features: ["Clinical Treatment", "Deep Trauma Work", "Licensed Experts", "Structured Healing"],
        buttonText: "Find a Therapist",
        popular: false
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
                        <div className="flex-1 relative">
                            {/* MOST POPULAR BADGE */}
                            {service.popular && (
                                <span className="inline-block px-3 py-1 bg-[#F57F17] text-white text-xs font-bold rounded-full mb-4 shadow-sm">
                                    ⭐ MOST POPULAR
                                </span>
                            )}

                            <h2
                                className="mb-5 mt-2"
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
                                {service.buttonText}
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
                        object-fit: cover;
                        width: 100%;
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
