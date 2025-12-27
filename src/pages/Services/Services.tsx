import React from 'react';
import ServicesHero from './components/ServicesHero';
import DetailedServicesSection from './components/DetailedServicesSection';
import ServiceCarousel from '../Home/components/ServiceCarousel';
import ExpertsGrid from '../Home/components/ExpertsGrid';
import FAQ from '../../components/shared/FAQ';
import RelatedBlogs from '../../components/shared/RelatedBlogs';
import SpecializationsChallenges from '../../components/shared/SpecializationsChallenges';
import FindYourRightFit from '../Home/components/FitSection';

const SERVICES_FAQ = [
    { q: "What services do you offer?", a: "We offer Individual Therapy, Couple Therapy, Venting sessions, and Expert Coaching." },
    { q: "How do I choose the right service?", a: "You can use our 'Find Your Right Fit' section to compare services, or take our quick quiz to get a personalized recommendation." },
    { q: "Are the sessions online?", a: "Yes, all our services are provided online via secure video or chat platforms." },
    { q: "Can I switch between services?", a: "Absolutely. Many of our users start with venting and move to coaching or therapy as their needs evolve." }
];


const Services: React.FC = () => {
    return (
        <div className="vo-services-page">
            <ServicesHero />
            <DetailedServicesSection />
            <ServiceCarousel />
            <FindYourRightFit />
            <ExpertsGrid />
            {/* <Testimonials /> */}
            <RelatedBlogs />
            <SpecializationsChallenges />
            <FAQ items={SERVICES_FAQ} />
        </div>
    );
};

export default Services;
