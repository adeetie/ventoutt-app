import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_DATA = [
    {
        id: 'venting',
        title: 'Instant Venting',
        desc: "Need to let it all out right now? Talk to trained empathetic listeners anonymously, 24/7. No judgment, just someone who's here to hear you.",
        price: "Plan starts with $5 per session",
        cta: "Start Venting",
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
        link: '/venting',
        isPopular: false
    },
    {
        id: 'guidance',
        title: 'Mental Health Guidance',
        desc: 'Work with MA Psychology professionals who guide you through stress, relationships, career decisions, and personal growth. Get the expert support and clarity you need to move forward.',
        price: 'Plan starts with $35 per session | First 50 texts FREE',
        cta: "Get Started",
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=1600&auto=format&fit=crop',
        link: '/guidance',
        isPopular: true
    },
    {
        id: 'therapy',
        title: 'Professional Therapy',
        desc: 'Structured sessions with licensed mental health professionals for clinical support and deep healing.',
        price: 'Plans available',
        cta: "Learn More",
        image: 'https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?q=80&w=1600&auto=format&fit=crop',
        link: '/therapy',
        isPopular: false
    }
];

const ExpandingGallery: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (

        <section className="vo-expanding-gallery-section pt-12 pb-20 px-[5%] bg-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-8 space-y-4">
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vo-text-primary leading-tight">
                        How Can We Help You Today?
                    </h2>
                    <p className="font-body text-lg text-vo-text-secondary max-w-2xl mx-auto">
                        We provide a wide range of mental health support designed to meet you wherever you are in your journey—from immediate relief to ongoing guidance to structured therapy.
                    </p>
                </div>

                {/* Container: Flex Row on All Devices (Horizontal Accordion) */}
                <div className="flex flex-row h-[400px] lg:h-[500px] gap-2 lg:gap-4 overflow-hidden">
                    {GALLERY_DATA.map((card, idx) => (
                        <div
                            key={card.id}
                            className={`relative overflow-hidden rounded-2xl lg:rounded-[2rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeIndex === idx ? 'flex-[4] lg:flex-[2.5]' : 'flex-[1]'}`}
                            onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(idx)}
                            onClick={() => setActiveIndex(idx)}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                                style={{
                                    backgroundImage: `url(${card.image})`,
                                    transform: activeIndex === idx ? 'scale(1.0)' : 'scale(1.1)'
                                }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${activeIndex === idx ? 'opacity-100' : 'opacity-70'}`} />

                            <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end text-white">
                                <div className={`transition-all duration-500 transform ${activeIndex === idx ? 'translate-y-0' : 'translate-y-2'}`}>
                                    <h3 className={`font-heading font-bold mb-1 sm:mb-2 leading-tight shadow-sm text-white transition-all duration-300 ${activeIndex === idx ? 'text-lg sm:text-3xl' : 'text-sm sm:text-2xl [writing-mode:vertical-rl] rotate-180 sm:rotate-0 sm:[writing-mode:horizontal-tb]'}`}>
                                        <span className={activeIndex !== idx ? '' : ''}>
                                            {card.title}
                                        </span>
                                        {card.isPopular && activeIndex === idx && (
                                            <span className="ml-3 inline-block bg-[#E68638] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded align-middle">
                                                MOST POPULAR
                                            </span>
                                        )}
                                    </h3>

                                    <div className={`grid transition-all duration-700 ease-out ${activeIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <p className="font-body text-white/90 mb-4 sm:mb-6 max-w-md text-xs sm:text-lg leading-relaxed shadow-sm block">
                                                {card.desc}
                                            </p>
                                            <div className="mb-4 text-sm font-semibold text-white/80">
                                                {card.price}
                                            </div>
                                            <Link
                                                to={card.link}
                                                className="inline-flex items-center gap-2 text-white font-heading font-bold hover:underline text-sm sm:text-lg group"
                                            >
                                                {card.cta}
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-sm font-semibold text-vo-text-secondary mb-4">
                    Prefer texting or talking it out? All sessions come with chat, audio, and video options.
                </div>

                <div className="text-center">
                    <p className="font-body text-vo-text-secondary">
                        Not sure what you want?{' '}
                        <button
                            className="text-primary font-bold hover:underline cursor-pointer"
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('open-chatbot'));
                            }}
                        >
                            Talk to our chatbot.
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ExpandingGallery;
