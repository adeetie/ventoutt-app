import React from 'react';
import ServicesHero from './components/ServicesHero';
import DetailedServicesSection from './components/DetailedServicesSection';
import MobileServicesStack from './components/MobileServicesStack';
import ServiceCarousel from '../Home/components/ServiceCarousel';
import ExpertsGrid from '../Home/components/ExpertsGrid';
import FAQ from '../../components/shared/FAQ';
import RelatedBlogs from '../../components/shared/RelatedBlogs';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import FindYourRightFit from '../Home/components/FitSection';
import StatsTestimonialsSection from '../Home/components/StatsTestimonialsSection'; // Reused from Home
import HowItWorks from '../../components/shared/HowItWorks';

const SERVICES_FAQ = [
    {
        q: "Who are your coaches?",
        a: "Our mental health professionals include MA Psychology graduates from prestigious government-recognized universities with 3+ years of experience. They're trained to support young adults through stress, relationships, career challenges, and personal growth. All professionals go through rigorous multi-stage selection to ensure cultural fluency and effectiveness."
    },
    {
        q: "Is this therapy?",
        a: "We offer three types of support:\n\n• Mental Health Guidance (Most Popular): Professional coaching with MA Psychology experts for life challenges—stress, relationships, career, personal growth. This is NOT clinical therapy, but goal-oriented support.\n\n• Venting: Immediate emotional release with trained listeners (not therapy). Perfect for when you just need to be heard right now.\n\n• Professional Therapy: Structured treatment with licensed clinicians for diagnosed mental health conditions (this IS therapy)."
    },
    {
        q: "Are your psychologists licensed?",
        a: "Our mental health guides hold Master's degrees (MA) in Psychology from government-recognized universities and have 3+ years of experience supporting young adults. They provide professional coaching and guidance.\n\nFor our professional therapy services, we work with US/Canada/EU licensed clinicians who provide clinical diagnosis and treatment."
    },
    {
        q: "What's the difference between mental health guidance and therapy?",
        a: "Great question! Here's the key difference:\n\nMental Health Guidance (Coaching):\n• Focus: Where do you want to go? How can we get you there?\n• For: Everyday challenges like stress, relationships, career decisions\n• Approach: Goal-oriented, skill-building, forward-focused\n• Professionals: MA Psychology graduates (not licensed therapists)\n• Cost: $35/session\n• Perfect for: 85% of people looking for mental health support\n\nProfessional Therapy:\n• Focus: Clinical diagnosis and treatment of mental health conditions\n• For: Diagnosed depression, anxiety disorders, PTSD, etc.\n• Approach: Evidence-based therapeutic treatment\n• Professionals: US/Canada/EU licensed therapists\n• Cost: Premium pricing\n• Perfect for: Those needing clinical mental health treatment"
    }
];

const SERVICES_STEPS = [
    { num: "01", desc: "Choose your path: Guidance (Coaching), Venting, or Therapy.", color: "#F4A261" },
    { num: "02", desc: "Take a quick assessment or chat with our AI to get matched.", color: "#E6914F" },
    { num: "03", desc: "Connect with your professional or listener instantly or schedule.", color: "#CE7830" },
    { num: "04", desc: "Start your session via text, audio, or video.", color: "#7F7053" },
    { num: "05", desc: "Get ongoing support and resources to keep growing.", color: "#5D5D5D" }
];

const Services: React.FC = () => {
    return (
        <div className="vo-services-page">
            <ServicesHero />

            {/* Section 2: Testimonials (Shared from Home) */}
            <div className="bg-white">
                <StatsTestimonialsSection
                    showStats={false}
                    title="What Our Users Say"
                    subtitle=""
                />
            </div>

            <DetailedServicesSection />
            <MobileServicesStack />

            <ServiceCarousel />
            <FindYourRightFit />
            <ExpertsGrid />

            <HowItWorks title="How It Works" steps={SERVICES_STEPS} />

            <RelatedBlogs />
            <SpecializationsChallenges />

            <div className="bg-white py-20 px-[5%] relative overflow-hidden">
                <div className="max-w-[800px] mx-auto relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-12 text-[#2D2D2D]">
                        Frequently Asked Questions
                    </h2>
                    <FAQ items={SERVICES_FAQ} />
                </div>
            </div>
        </div>
    );
};

export default Services;
