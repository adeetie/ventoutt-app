import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOBILE_SERVICES = [
    {
        title: "Mental Health Guidance (Coaching)",
        desc: "Feeling stuck? Expert psychologists help you navigate life's challenges—career, relationships, stress.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
        cta: "Book Guidance",
        popular: true
    },
    {
        title: "Instant Venting",
        desc: "Immediate emotional release with trained listeners. 100% anonymous and judgment-free.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80",
        cta: "Vent Now",
        popular: false
    },
    {
        title: "Professional Therapy",
        desc: "Clinical support for diagnosed conditions. Structured treatment with licensed therapists.",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
        cta: "Find Therapist",
        popular: false
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
        <section ref={sectionRef} className="py-24 px-[5%] bg-vo-bg lg:hidden overflow-hidden relative">
            <div className="space-y-12 mb-12 text-center relative z-10">
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
                        <div className="aspect-video rounded-[24px] overflow-hidden relative">
                            {/* MOST POPULAR BADGE */}
                            {service.popular && (
                                <div className="absolute top-4 left-4 bg-[#F57F17] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                    ⭐ MOST POPULAR
                                </div>
                            )}
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
