import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import HeroTransition from './components/HeroTransition';
// import Hero from './components/Hero'; // Kept for reference
import ExpandingGallery from './components/ExpandingGallery';
import GuidanceVsTherapy from './components/GuidanceVsTherapy';
import StickyStack from './components/StickyStack';
import RealExperts from './components/RealExperts';
import ExpertsGrid from './components/ExpertsGrid';
import FitSection from './components/FitSection';
import StatsTestimonialsSection from './components/StatsTestimonialsSection';

// Shared Components
import HowItWorks from '../../components/shared/HowItWorks';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import FAQ from '../../components/shared/FAQ';
import PartnersCarousel from '../../components/shared/PartnersCarousel';
import RelatedBlogs from '../../components/shared/RelatedBlogs';

const FAQ_ITEMS = [
    {
        q: "What is Ventoutt exactly?",
        a: "Ventoutt is an emotional support platform connecting you with empathetic listeners, mental health coaches, and licensed therapists. We offer a safe, anonymous space where you can be heard without judgment."
    },
    {
        q: "Who is this for?",
        a: "Anyone who needs to talk differently. Whether you're stressed, anxious, lonely, or just need to vent, Ventoutt is for you. We support students, young professionals, and anyone seeking affordable mental health guidance."
    },
    {
        q: "How does 'Guidance' differ from Therapy?",
        a: "Guidance focuses on present challenges, skill-building, and goal-setting for non-clinical issues (stress, career, relationships). Therapy diagnoses and treats mental health conditions. We help you find the right fit."
    },
    {
        q: "Is my data safe?",
        a: "Absolutely. We are SSL secured and use Stripe for payments. Your conversations are confidential and we prioritize your privacy and anonymity."
    },
    {
        q: "Can I switch professionals?",
        a: "Yes! If you don't feel a connection, you can easily switch to another listener or guide. We want you to find the perfect match for your journey."
    }
];

const Home = () => {
    // GSAP Background animation removed per user request

    return (
        <main className="vo-home">
            <div className="bg-[#fffdf7]">
                <HeroTransition />
            </div>

            <div className="gallery-section bg-white">
                <ExpandingGallery />
            </div>

            <div className="guidance-section bg-[#f0fdf4]">
                <GuidanceVsTherapy />
            </div>

            <div className="stats-testimonials-section bg-white">
                <StatsTestimonialsSection />
            </div>

            {/* Real Experts (Dark Mode) */}
            <div className="bg-[#1a1a1a]">
                <RealExperts />
            </div>

            {/* Why People Love VentOutt (Sticky Stack) - White */}
            <div className="sticky-stack-section bg-white">
                <StickyStack />
            </div>

            {/* Experts Grid - Beige */}
            <div className="bg-[#faf7f2]">
                <ExpertsGrid />
            </div>

            {/* Fit Section - White */}
            <div className="bg-white">
                <FitSection />
            </div>

            {/* How It Works - Beige */}
            <div className="bg-[#faf7f2]">
                <HowItWorks />
            </div>

            {/* Partners Section - Black (Contrast) */}
            <div className="bg-[#1a1a1a]">
                <PartnersCarousel />
            </div>

            {/* Related Blogs - Beige */}
            <div className="bg-[#faf7f2]">
                <RelatedBlogs />
            </div>

            <div className="bg-white py-16 lg:py-24">
                <div className="max-w-[800px] mx-auto px-6">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-12 text-[#2D2D2D]">
                        Frequently Asked Questions
                    </h2>
                    <FAQ items={FAQ_ITEMS} title="" className="py-0 bg-transparent" />
                </div>
            </div>

            <div className="bg-[#faf7f2]">
                <SpecializationsChallenges />
            </div>
        </main>
    );
};

export default Home;
