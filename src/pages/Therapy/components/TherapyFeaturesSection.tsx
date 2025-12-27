import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Clock,
    Shield,
    Users,
    CheckCircle,
    Minimize2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface Feature {
    icon: LucideIcon;
    label: string;
    description: string;
}

export const DEFAULT_THERAPY_FEATURES: Feature[] = [
    {
        icon: CheckCircle,
        label: "Verified Therapists",
        description: "All our partners are licensed and verified professionals."
    },
    {
        icon: Minimize2,
        label: "Direct Access",
        description: "Skip the waitlist. Connect directly with providers."
    },
    {
        icon: Clock,
        label: "24hr Matching",
        description: "Get matched with a suitable therapist within 24 hours."
    },
    {
        icon: Shield,
        label: "100% Confidential",
        description: "Your privacy is our top priority. All sessions are secure."
    },
    {
        icon: Users,
        label: "Therapy for Teens, Individuals & Couples",
        description: "Specialized care for every stage of life and relationship."
    }
];

interface TherapyFeaturesProps {
    features?: Feature[];
}

const TherapyFeatures: React.FC<TherapyFeaturesProps> = ({ features = DEFAULT_THERAPY_FEATURES }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useGSAP(() => {
        const cards = gsap.utils.toArray('.feature-card');
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: scrollContainerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: scrollContainerRef });

    useEffect(() => {
        checkScroll();
        const handleResize = () => checkScroll();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="py-24 px-5 bg-vo-white">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
                    {/* Mobile Controls */}
                    <div className="md:hidden flex justify-end gap-2 w-full">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${!canScrollLeft
                                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                                : 'border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white'
                                }`}
                            aria-label="Previous feature"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${!canScrollRight
                                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                                : 'border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white'
                                }`}
                            aria-label="Next feature"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Grid / Carousel */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="
                flex md:grid md:grid-cols-5 gap-3
                overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none
                scrollbar-hide
                pb-4 md:pb-0
            "
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="
                        feature-card
                        flex-shrink-0 snap-center
                        w-[220px] md:w-full min-h-[250px] h-full
                        bg-[#212121]
                        rounded-[20px]
                        shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                        flex flex-col items-center justify-center
                        p-5 text-center
                        transition-transform hover:-translate-y-1 duration-300
                    "
                        >
                            <div className="w-20 h-20 mb-5 flex items-center justify-center">
                                <feature.icon
                                    className="w-[60px] h-[60px]"
                                    color="#F4EDE4" // matching background color for Icon as per requirement or specific hex
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className="font-body font-medium text-lg leading-[1.3] text-[#F4EDE4]">
                                {feature.label}
                            </h3>
                        </div>
                    ))}
                </div>
            </div >
        </section >
    );
};

export default TherapyFeatures;
