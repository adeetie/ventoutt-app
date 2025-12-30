import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Components
import AboutHero from './components/AboutHero';
import ImageCarousel from './components/ImageCarousel';
import Empower from './components/Empower';
import MissionValues from './components/MissionValues';
import Founders from './components/Founders';
import TestimonialSlider from './components/TestimonialSlider';
import FAQ from '../../components/shared/FAQ';

// Hook for scroll-based background changes
import useScrollBackground from '../../hooks/useScrollBackground';

gsap.registerPlugin(useGSAP);

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Enable scroll-triggered background color changes
    useScrollBackground(containerRef);

    return (
        <div ref={containerRef} className="vo-about pt-[100px]">
            {/* 1. Hero Section - Light beige background */}
            <div data-bg="#F4EDE4">
                <AboutHero />
            </div>

            {/* 2. Infinite Image Carousel - Same as hero */}
            <div data-bg="#F4EDE4">
                <ImageCarousel />
            </div>

            {/* 3. Empower Section */}
            <div data-bg="#ffffff">
                <Empower />
            </div>

            {/* 4. Mission & Values (Dark theme with Bento Grid) */}
            <div data-bg="#1a1a1a">
                <MissionValues />
            </div>

            {/* 5. Founders Section (Desktop Grid / Mobile Sticky Stack) */}
            <div data-bg="#ffffff">
                <Founders />
            </div>

            {/* 6. Testimonials Slider */}
            <div data-bg="#F5F5F5">
                <TestimonialSlider />
            </div>

            {/* 7. FAQ Section */}
            <div data-bg="#F5F5F5">
                <FAQ
                    items={[
                        {
                            q: "Is venting safe?",
                            a: "Yes, venting is safe. We prioritize your privacy and anonymity."
                        },
                        {
                            q: "Who are your coaches?",
                            a: "Our coaches are trained professionals with experience in various fields of mental health."
                        },
                        {
                            q: "Is this therapy?",
                            a: "No, venting and coaching are not replacements for clinical therapy, but they can be a great first step."
                        },
                        {
                            q: "Will my chats stay private?",
                            a: "Absolutely. All chats are confidential and anonymous."
                        },
                        {
                            q: "Are your psychologists licensed?",
                            a: "Yes, all our therapists and psychologists are licensed professionals."
                        },
                        {
                            q: "Can I stay anonymous?",
                            a: "Yes, you can choose to remain anonymous during your sessions."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default About;
