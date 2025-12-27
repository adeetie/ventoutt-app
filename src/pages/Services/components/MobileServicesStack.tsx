import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOBILE_SERVICES = [
    {
        title: "Therapy",
        desc: "Specialized care for anxiety, depression, and trauma. Professionals with 3+ years experience.",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
        cta: "Start Therapy"
    },
    {
        title: "Family Counseling",
        desc: "Strengthen family bonds and resolve conflicts. Affordable online support for home harmony.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
        cta: "Book Family Session"
    },
    {
        title: "Venting Space",
        desc: "Instant, anonymous relief for your thoughts. Always judgment-free with active listeners.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80",
        cta: "Vent Now"
    },
    {
        title: "Career Coaching",
        desc: "Expert guidance for career transition and leadership. Goal-oriented actionable strategies.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
        cta: "Unlock Potential"
    }
];

const MobileServicesStack: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = gsap.utils.toArray('.vo-mobile-service-card');
        cards.forEach((card: any, i) => {
            if (i === 0) return;

            ScrollTrigger.create({
                trigger: card,
                start: "top 90%",
                id: `card-${i}`,
                onEnter: () => gsap.to(card, { y: 0, opacity: 1, duration: 0.5 }),
                onLeaveBack: () => gsap.to(card, { y: 50, opacity: 0.5, duration: 0.5 })
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 px-[5%] bg-vo-bg lg:hidden overflow-hidden">
            <div className="space-y-12 mb-12 text-center">
                <span className="text-primary font-bold text-sm tracking-widest uppercase">Mobile Focus</span>
                <h2 className="font-heading text-4xl font-bold text-vo-text-primary italic">Our Specialized Services</h2>
            </div>

            <div className="flex flex-col gap-8">
                {MOBILE_SERVICES.map((service, idx) => (
                    <div
                        key={idx}
                        className="vo-mobile-service-card sticky top-24 bg-vo-white p-6 rounded-[32px] shadow-xl border border-vo-border-light space-y-6"
                        style={{ top: `${96 + (idx * 20)}px`, zIndex: idx + 1 }}
                    >
                        <div className="aspect-video rounded-[24px] overflow-hidden">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-heading text-2xl font-bold text-vo-text-primary">{service.title}</h3>
                            <p className="font-body text-vo-text-secondary leading-relaxed">{service.desc}</p>
                            <button className="w-full py-4 bg-primary text-vo-white rounded-2xl font-heading font-bold text-lg shadow-lg">
                                {service.cta}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MobileServicesStack;
