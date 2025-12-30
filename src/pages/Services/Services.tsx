import React from 'react';
import ServicesHero from './components/ServicesHero';
import DetailedServicesSection from './components/DetailedServicesSection';
import MobileServicesStack from './components/MobileServicesStack';
import ExpertsGrid from '../Home/components/ExpertsGrid';
import RealExperts from '../Home/components/RealExperts';
import FitSection from '../Home/components/FitSection';
import FAQ from '../../components/shared/FAQ';
import RelatedBlogs from '../../components/shared/RelatedBlogs';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import StatsTestimonialsSection from '../Home/components/StatsTestimonialsSection';
import HowItWorks from '../../components/shared/HowItWorks';
import PartnersCarousel from '../../components/shared/PartnersCarousel';
import WhyLoveSection from '../Therapy/components/WhyLoveSection';
import { useScrollBackground } from '../../hooks/useScrollBackground';

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

const WHY_CHOOSE_POINTS = [
    { title: "Affordable Excellence", desc: "Quality mental health support at $35/session—not $200. Accessible care for students and young professionals.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" },
    { title: "Globally Available 24/7", desc: "Support when you need it, wherever you are. Our professionals are available around the clock.", image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&q=80" },
    { title: "Instant Matching", desc: "Get paired with the right professional in minutes, not weeks. AI-powered matching for the best fit.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" },
    { title: "Flexible Sessions", desc: "Text, audio, or video—your choice. Schedule or connect instantly based on your comfort.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
    { title: "Private & Secure", desc: "Complete anonymity and confidentiality. Your conversations are encrypted and protected.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" }
];

const Services: React.FC = () => {
    useScrollBackground();
    return (
        <div className="vo-services-page">
            {/* 1. Hero */}
            <div className="bg-[#fffdf7]" data-bg="#fffdf7">
                <ServicesHero />
            </div>

            {/* 2. Services Section (with title) */}
            <div className="bg-white py-16" data-bg="#FFFFFF">
                <div className="max-w-[1400px] mx-auto px-[5%]">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#2D2D2D] italic mb-4">
                            Our Services
                        </h2>
                        <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
                            Choose the right support for your journey—from immediate emotional relief to professional guidance.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white" data-bg="#FFFFFF">
                <DetailedServicesSection />
            </div>
            <div className="bg-white" data-bg="#FFFFFF">
                <MobileServicesStack />
            </div>

            {/* 3. Testimonials */}
            <div className="bg-[#fffdf7]" data-bg="#fffdf7">
                <StatsTestimonialsSection
                    showStats={false}
                    title="What Our Users Say"
                    subtitle=""
                />
            </div>

            {/* 4. Why Choose Us (White) */}
            <div className="bg-white" data-bg="#FFFFFF">
                <WhyLoveSection
                    title="Why Choose Ventoutt"
                    points={WHY_CHOOSE_POINTS}
                />
            </div>

            {/* 5. Caring & Expert Members (Grey) */}
            <div className="bg-[#F5F5F5]" data-bg="#F5F5F5">
                <ExpertsGrid />
            </div>

            {/* 6. Fit Section (White) */}
            <div className="bg-white" data-bg="#FFFFFF">
                <FitSection />
            </div>

            {/* 7. Real Experts (Dark) */}
            <div className="bg-[#1a1a1a]" data-bg="#1a1a1a">
                <RealExperts />
            </div>

            {/* 8. How It Works (Hero) */}
            <div className="bg-[#fffdf7]" data-bg="#fffdf7">
                <HowItWorks title="How It Works" steps={SERVICES_STEPS} />
            </div>

            {/* 9. Partners (Dark) */}
            <div className="bg-[#1a1a1a]" data-bg="#1a1a1a">
                <PartnersCarousel />
            </div>

            {/* 10. Blogs (White) */}
            <div className="bg-white" data-bg="#FFFFFF">
                <RelatedBlogs />
            </div>

            {/* 11. FAQ (Grey) */}
            <div className="bg-[#F5F5F5]" data-bg="#F5F5F5">
                <FAQ items={SERVICES_FAQ} />
            </div>

            {/* 12. Challenges (Hero) */}
            <div className="bg-[#fffdf7]" data-bg="#fffdf7">
                <SpecializationsChallenges />
            </div>
        </div>
    );
};

export default Services;

