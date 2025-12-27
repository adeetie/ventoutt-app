import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface TherapyHeroProps {
    image?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

const TherapyHero: React.FC<TherapyHeroProps> = ({
    image = "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1920&q=80",
    title = "Healing That Begins with the Right Connection",
    subtitle = "Browse our curated list of verified US clinical partners. Whether you need diagnosis or long-term medical care, we help you find the best match for your needs.",
    ctaText = "View Verified Partners ↓",
    ctaLink = "#verified-partners"
}) => {
    const bannerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Image reveal
        tl.from(bannerRef.current, {
            clipPath: 'inset(0 100% 0 0)',
            duration: 1.5,
            ease: 'expo.inOut'
        })
            .from(textRef.current?.children || [], {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2
            }, '-=0.5');

    });

    return (
        <>
            {/* Hero Illustration Banner */}
            <section className="service-img-banner" ref={bannerRef} style={{ height: '40vh', minHeight: 'auto' }}>
                <img
                    src={image}
                    alt="Hero Banner"
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
            </section>

            {/* Hero Text Content */}
            <section className="service-text-content-wrapper" ref={textRef}>
                <h1 className="service-hero-title-dark">{title}</h1>
                <p className="service-hero-subtitle-dark">
                    {subtitle}
                </p>
                <div className="service-hero-buttons-col">
                    <a href={ctaLink} className="btn-green-download">{ctaText}</a>
                </div>
            </section>
        </>
    );
};

export default TherapyHero;
