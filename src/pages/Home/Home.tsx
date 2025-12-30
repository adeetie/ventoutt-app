import React from 'react';

// Components
import HeroTransition from './components/HeroTransition';
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
    return (
        <main className="vo-home">
            {/* 1. Hero */}
            <div className="bg-[#fffdf7]">
                <HeroTransition />
            </div>

            {/* 2. Gallery */}
            <div className="bg-white">
                <ExpandingGallery />
            </div>

            {/* 3. Guidance (Yellow Card Section) */}
            <GuidanceVsTherapy />

            {/* 4. Stats */}
            <div className="bg-white">
                <StatsTestimonialsSection />
            </div>

            {/* 5. Real Experts (Charcoal) */}
            <RealExperts />

            {/* 6. Sticky Stack */}
            <div className="bg-[#fffdf7]">
                <StickyStack />
            </div>

            {/* 7. Experts Grid (Beige) */}
            <ExpertsGrid />

            {/* 8. Fit Section */}
            <FitSection />

            {/* 9. How It Works (Beige - from component) */}
            <HowItWorks />

            {/* 10. Partners (Charcoal - from component) */}
            <PartnersCarousel />

            {/* 11. Related Blogs (Beige - from component) */}
            <RelatedBlogs />

            {/* 12. FAQ (White - from component) */}
            <FAQ items={FAQ_ITEMS} />

            {/* 13. Specializations (Beige - from component) */}
            <SpecializationsChallenges />
        </main>
    );
};

export default Home;


