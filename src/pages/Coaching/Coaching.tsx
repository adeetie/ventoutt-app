import React, { useEffect } from 'react';
import { CheckCircle, Clock, Shield, Users, Minimize2 } from 'lucide-react';

// Components
import TherapyHero from '../Therapy/components/TherapyHero';
import TherapyFeatures, { type Feature } from '../Therapy/components/TherapyFeaturesSection';
import WhyLoveSection, { type WhyLovePoint } from '../Therapy/components/WhyLoveSection';
import Testimonials from '../Home/components/TestimonialsSection';
import ExpertsGrid from '../Home/components/ExpertsGrid';
import FitSection from '../Home/components/FitSection';
import RelatedBlogs from '../../components/shared/RelatedBlogs';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import FAQ from '../../components/shared/FAQ';

const COACHING_FEATURES: Feature[] = [
    {
        icon: Users,
        label: "Qualified Psychologists",
        description: "Work with experienced professionals dedicated to your growth."
    },
    {
        icon: CheckCircle,
        label: "Goal-Oriented Sessions",
        description: "Structured sessions designed to help you achieve specific milestones."
    },
    {
        icon: Clock,
        label: "Same-Day Matching",
        description: "Get matched quickly with a coach who fits your needs."
    },
    {
        icon: Minimize2,
        label: "Action-Based Approach",
        description: "Focus on practical steps and real-world application."
    },
    {
        icon: Shield,
        label: "Personal & Career Growth",
        description: "Holistic development for both your personal and professional life."
    }
];

const COACHING_POINTS: WhyLovePoint[] = [
    { title: "Goal Setting", desc: "Identify exactly what you want to achieve and create a roadmap to get there.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
    { title: "Skill Building", desc: "Learn practical tools to manage time, stress, and communication effectively.", image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80" },
    { title: "Continuous Growth", desc: "Adaptive coaching that evolves as you reach your milestones.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" },
    { title: "Accountability", desc: "Regular check-ins to keep you on track and motivated.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" }, // Added filler to match 4-5 points usually
    { title: "Expert Guidance", desc: "Benefit from the wisdom and experience of seasoned professionals.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" }
];

const Coaching: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-vo-white min-h-screen">
            <main>
                <TherapyHero
                    image="https://images.unsplash.com/photo-1571407921677-4c3d4a413157?w=1920&q=80"
                    title="Unlock Your Potential with Expert Guidance"
                    subtitle="Ready to take control of your life? Our qualified psychologists will help you set clear goals, build practical strategies, and develop the skills you need to thrive."
                    ctaText="Download App on iOS"
                    ctaLink="#"
                />

                <TherapyFeatures features={COACHING_FEATURES} />

                <Testimonials />

                <WhyLoveSection
                    title="Why Choose Coaching?"
                    points={COACHING_POINTS}
                />

                <ExpertsGrid />

                <FitSection />

                {/* VentingBanner hidden as per requirements */}

                <RelatedBlogs title="Coaching & Leadership" />

                <FAQ items={[
                    { q: "How is coaching different from therapy?", a: "Coaching is often more goal-oriented and focused on the future/performance, while therapy often addresses past trauma and deep-seated emotional patterns." },
                    { q: "Can I choose my coach?", a: "Yes, you can browse through our expert grid and select a coach that resonates with you." }
                ]} />

                <SpecializationsChallenges />
            </main>
        </div>
    );
};

export default Coaching;
