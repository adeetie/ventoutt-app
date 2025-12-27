import React from 'react';
import Hero from './components/Hero';
import ExpandingGallery from './components/ExpandingGallery';

import StickyStack from './components/StickyStack';
import ExpertsGrid from './components/ExpertsGrid';
import FitSection from './components/FitSection';
import HowItWorks from '../../components/shared/HowItWorks';
import PartnersCarousel from '../../components/shared/PartnersCarousel';

import RelatedBlogs from '../../components/shared/RelatedBlogs';
import FAQ from '../../components/shared/FAQ';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';

const Home: React.FC = () => {
    return (
        <main className="w-full">
            <Hero />
            <ExpandingGallery />
            {/* <StatsTestimonialsSection /> */}
            {/* <RealExperts /> */}
            <StickyStack />
            <ExpertsGrid />
            <FitSection />
            <HowItWorks />
            <PartnersCarousel />
            {/* <TherapistProfileCarousel /> Removed as merged into PartnersCarousel */}
            <RelatedBlogs />
            <FAQ items={[
                { q: "Is venting safe?", a: "Yes, venting is safe. We prioritize your privacy and anonymity." },
                { q: "Who are your coaches?", a: "Our coaches are trained professionals with experience in various fields of mental health." },
                { q: "Is this therapy?", a: "No, venting and coaching are not replacements for clinical therapy, but they can be a great first step." },
                { q: "Will my chats stay private?", a: "Absolutely. All chats are confidential and anonymous." },
                { q: "Are your psychologists licensed?", a: "Yes, all our therapists and psychologists are licensed professionals." },
                { q: "Can I stay anonymous?", a: "Yes, you can choose to remain anonymous during your sessions." }
            ]} />
            <SpecializationsChallenges />
        </main>
    );
};

export default Home;
