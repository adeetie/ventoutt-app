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

gsap.registerPlugin(useGSAP);

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="vo-about pt-[100px]">
            {/* 1. Hero Section (Original with Odometer) */}
            <AboutHero />

            {/* 2. Infinite Image Carousel */}
            <ImageCarousel />

            {/* 3. Empower Section */}
            <Empower />

            {/* 4. Mission & Values (Bento Grid) */}
            <MissionValues />

            {/* 5. Founders Section (Desktop Grid / Mobile Sticky Stack) */}
            <Founders />

            {/* 6. Testimonials Slider */}
            <TestimonialSlider />

            {/* 7. FAQ Section */}
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
    );
};

export default About;
