import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_DATA = [
    {
        id: 'venting',
        title: 'Instant Venting',
        desc: 'Say anything, anytime. No judgment, just someone to listen.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
        link: '/venting'
    },
    {
        id: 'coaching',
        title: 'Coaching',
        desc: 'Expert guidance to understand, heal, and achieve your goals.',
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=1600&auto=format&fit=crop',
        link: '/coaching'
    },
    {
        id: 'therapy',
        title: 'Therapy',
        desc: 'Private sessions with licensed professionals for deep healing.',
        image: 'https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?q=80&w=1600&auto=format&fit=crop',
        link: '/therapy'
    }
];

const ExpandingGallery: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (

        <section className="vo-expanding-gallery-section pt-12 pb-0 px-[5%] bg-vo-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-8 space-y-4">
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vo-text-primary leading-tight">
                        Transforming mental health,<br />one step at a time
                    </h2>
                    <p className="font-body text-lg text-vo-text-secondary max-w-2xl mx-auto">
                        We provide a wide range of services designed to support your mental
                        well-being at every step of your journey.
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
                                    <h3 className={`font-heading font-bold mb-1 sm:mb-2 leading-tight shadow-sm transition-all duration-300 ${activeIndex === idx ? 'text-lg sm:text-3xl' : 'text-sm sm:text-2xl [writing-mode:vertical-rl] rotate-180 sm:rotate-0 sm:[writing-mode:horizontal-tb]'}`}>
                                        <span className={activeIndex !== idx ? '' : ''}>
                                            {card.title}
                                        </span>
                                    </h3>

                                    <div className={`grid transition-all duration-700 ease-out ${activeIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <p className="font-body text-white/90 mb-4 sm:mb-6 max-w-md text-xs sm:text-lg leading-relaxed shadow-sm block">
                                                {card.desc}
                                            </p>
                                            <Link
                                                to={card.link}
                                                className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:underline text-sm sm:text-lg group"
                                            >
                                                View More
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

                <div className="mt-8 text-center">
                    <p className="font-body text-vo-text-secondary">
                        Not sure what you want?{' '}
                        <button
                            className="text-primary font-bold hover:underline cursor-pointer"
                            onClick={() => {
                                // This assumes we can trigger the chatbot somehow, 
                                // we'll need a global state or search param handling.
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
