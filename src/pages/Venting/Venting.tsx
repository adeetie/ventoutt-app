import React, { useEffect } from 'react';
import { CheckCircle, Clock, Shield, Users, Heart } from 'lucide-react';

// Components
import TherapyHero from '../Therapy/components/TherapyHero';
import TherapyFeatures, { type Feature } from '../Therapy/components/TherapyFeaturesSection';
import WhyLoveSection, { type WhyLovePoint } from '../Therapy/components/WhyLoveSection';
import StatsTestimonialsSection from '../Home/components/StatsTestimonialsSection';
import ExpertsGrid from '../Home/components/ExpertsGrid';
import FitSection from '../Home/components/FitSection';
import RelatedBlogs from '../../components/shared/RelatedBlogs';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import FAQ from '../../components/shared/FAQ';

const VENTING_FEATURES: Feature[] = [
    {
        icon: Shield,
        label: "100% Anonymous",
        description: "Your identity is completely protected. Speak freely."
    },
    {
        icon: Users,
        label: "Trained Listeners",
        description: "Connect with empathetic listeners ready to support you."
    },
    {
        icon: Clock,
        label: "24/7 Availability",
        description: "Support is available whenever you need it, day or night."
    },
    {
        icon: Heart,
        label: "No Judgment",
        description: "A safe space where you can share without fear of judgment."
    },
    {
        icon: CheckCircle,
        label: "Instant Connection",
        description: "Wait times less than 2 minutes. Get help now."
    }
];

const VENTING_POINTS: WhyLovePoint[] = [
    { title: "Completely Private", desc: "No names, no profiles. Just you and a listener in a safe, encrypted space.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" },
    { title: "Immediate Support", desc: "Wait times are less than 2 minutes. Get help when you need it most.", image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80" },
    { title: "Heal Together", desc: "Sharing your burden is the first step towards feeling lighter.", image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&q=80" },
    { title: "Affordable", desc: "Get the support you need without the high cost of traditional therapy.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" },
    { title: "Accessible", desc: "Use text, audio, or video - whatever makes you feel most comfortable.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" }
];

const Venting: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-vo-white min-h-screen">
            <main>
                <TherapyHero
                    image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
                    title="Instant Emotional Relief"
                    subtitle="Sometimes you just need to let it out. Connect anonymously with trained listeners 24/7 whenever you feel overwhelmed."
                    ctaText="Start Chatting Now"
                    ctaLink="#"
                />

                <TherapyFeatures features={VENTING_FEATURES} />

                <StatsTestimonialsSection
                    showStats={false}
                    title="What Our Users Say"
                    subtitle=""
                />

                <WhyLoveSection
                    title="Why People Love Venting"
                    points={VENTING_POINTS}
                />

                <ExpertsGrid />

                <FitSection />

                {/* VentingBanner hidden */}

                <RelatedBlogs title="Personal Growth & Venting" />

                <FAQ items={[
                    { q: "Is it really anonymous?", a: "Yes, we don't ask for names or sensitive personal details for venting sessions." },
                    { q: "Who are the listeners?", a: "Our listeners are trained in active listening and emotional support." }
                ]} />

                <SpecializationsChallenges />
            </main>
        </div>
    );
};

export default Venting;
