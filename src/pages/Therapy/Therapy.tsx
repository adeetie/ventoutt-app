import React, { useEffect } from 'react';
import TherapyHero from './components/TherapyHero';
import TherapyFeatures from './components/TherapyFeaturesSection';
import HowItWorks from '../../components/shared/HowItWorks';
import TherapyExperts from './components/TherapyExperts';
import WhyLoveSection from './components/WhyLoveSection';

const VETTING_STEPS = [
    "License Verification: We check state medical licenses.",
    "Safety Check: We review ethical standing.",
    "Quality Assurance: We only list therapists with 4.5+ ratings."
];

// Shared Components
import FAQ from '../../components/shared/FAQ';
import RelatedBlogs from '../../components/shared/RelatedBlogs';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import FitSection from '../Home/components/FitSection';
import StatsTestimonialsSection from '../Home/components/StatsTestimonialsSection';

const Therapy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-vo-white min-h-screen">
            <main>
                <TherapyHero />
                <TherapyFeatures />
                <StatsTestimonialsSection
                    showStats={false}
                    title="What Our Users Say"
                    subtitle=""
                />
                <WhyLoveSection />
                <HowItWorks steps={VETTING_STEPS} />
                <TherapyExperts />
                <FitSection />
                {/* <VentingBanner /> */}
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
        </div>
    );
};

export default Therapy;
