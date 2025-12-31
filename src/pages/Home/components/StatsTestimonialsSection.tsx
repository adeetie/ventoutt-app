import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Data Types ---
type TestimonialType = 'text' | 'video';

interface Testimonial {
    id: number;
    type: TestimonialType;
    name: string;
    location: string;
    content?: string; // For text cards
    duration?: string; // For video cards
    image?: string; // For text card avatar or video thumbnail placeholder
    rating?: number;
    cardColor?: string; // For text cards
    textColor?: string; // For text cards
}

// --- Data ---
const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        type: 'video',
        name: 'Emma',
        location: 'USA',
        duration: '2:15',
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=400&h=400&fit=crop'
    },
    {
        id: 2,
        type: 'text',
        name: 'Emily',
        location: 'USA',
        content: "I was searching for affordable therapy when I found Ventoutt. My mental health guide truly listens without judgment and helps me work through things I didn't even realize were holding me back. As a student on a tight budget, having professional support at $35/session instead of $200+ has made all the difference.",
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        rating: 5,
        cardColor: 'bg-[#2D2D2D]',
        textColor: 'text-white'
    },
    {
        id: 3,
        type: 'video',
        name: 'Naman',
        location: 'USA',
        duration: '2:45',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    },
    {
        id: 4,
        type: 'text',
        name: 'Sakura',
        location: 'Japan',
        content: "The anonymity gave me courage to open up about things I could never share with friends or family. When I was ready, transitioning to professional guidance was seamless. My guide helps me navigate challenges and see patterns I couldn't see myself. The support has been incredible.",
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 5,
        cardColor: 'bg-[#F5F5DC]', // Beige
        textColor: 'text-[#2D2D2D]'
    },
    {
        id: 5,
        type: 'video',
        name: 'Iya',
        location: 'Bosnia',
        duration: '2:08',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
    },
    {
        id: 6,
        type: 'text',
        name: 'Dakota',
        location: 'USA',
        content: "Ventoutt has been my sanctuary during tough times. The affordable sessions gave me a safe space to deal with stress and anxiety without financial pressure. The support I received turned out to be more valuable than I imagined—and I can actually afford to do it consistently.",
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        rating: 5,
        cardColor: 'bg-[#F3F4F6]', // Light Grey
        textColor: 'text-[#2D2D2D]'
    },
    {
        id: 7,
        type: 'video',
        name: 'Ewa',
        location: 'France',
        duration: '3:02',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
        id: 8,
        type: 'text',
        name: 'Emma',
        location: 'England',
        content: "I was honestly unsure about getting support from someone in another country. But my guide has been amazing—culturally aware, available 24/7, and the experience has been far better than I expected. I feel genuinely supported and understood here.",
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        cardColor: 'bg-[#FFFDD0]', // Cream
        textColor: 'text-[#2D2D2D]'
    },
    {
        id: 9,
        type: 'video',
        name: 'Maya',
        location: 'USA',
        duration: '2:35',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
        id: 10,
        type: 'text',
        name: 'Megha',
        location: 'UK',
        content: "As a college student struggling with anxiety, affordability really matters. Ventoutt made quality mental health support accessible without adding financial stress. Having someone who actually gets what I'm going through has made a huge difference in my daily life.",
        image: 'https://randomuser.me/api/portraits/women/24.jpg',
        rating: 5,
        cardColor: 'bg-[#E5E5E5]', // Another Light Grey
        textColor: 'text-[#2D2D2D]'
    },
    {
        id: 11,
        type: 'video',
        name: 'Carlos',
        location: 'Canada',
        duration: '2:52',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
        id: 12,
        type: 'text',
        name: 'Alex',
        location: 'USA',
        content: "I thought I needed therapy, but professional guidance was exactly what I needed. My guide helps me with relationship issues, career stress, and building confidence. Three months in and I feel like a completely different person—more grounded and clear about my direction.",
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        cardColor: 'bg-[#2D2D2D]',
        textColor: 'text-white'
    }
];

// --- Sub-Components ---

const VideoCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handlePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(true);
    };

    return (
        <div
            className="relative w-[300px] h-[533px] rounded-2xl overflow-hidden bg-black flex-shrink-0 cursor-pointer group shadow-lg hover:scale-[1.02] transition-transform duration-300"
            onClick={!isPlaying ? handlePlay : undefined}
        >
            {!isPlaying ? (
                <>
                    {/* Thumbnail Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                        style={{ backgroundImage: `url(${testimonial.image})` }}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white mb-2">
                            VIDEO TESTIMONIAL
                        </span>
                        <h3 className="text-white font-heading font-bold text-xl">{testimonial.name}, {testimonial.location}</h3>
                        <p className="text-gray-300 text-sm mt-1">Duration: {testimonial.duration}</p>
                    </div>
                </>
            ) : (
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/sq5S5L3F8k0?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=sq5S5L3F8k0"
                    title="Shorts Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            )}
        </div>
    );
};

const TextCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className={`w-[300px] h-[533px] rounded-2xl ${testimonial.cardColor || 'bg-white'} p-8 flex-shrink-0 flex flex-col justify-between shadow-lg relative group hover:-translate-y-1 transition-transform duration-300 border border-black/5`}>
        <div className={`text-5xl font-serif ${testimonial.textColor === 'text-white' ? 'text-white/40' : 'text-black/10'} leading-none mb-2`}>"</div>
        <div className="flex-grow flex items-center">
            <p className={`font-body text-lg leading-relaxed ${testimonial.textColor || 'text-[#5a5a5a]'} line-clamp-[12]`}>
                {testimonial.content}
            </p>
        </div>

        <div className={`pt-6 mt-4 border-t flex items-center gap-4 ${testimonial.textColor === 'text-white' ? 'border-white/10' : 'border-black/5'}`}>
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
            <div>
                <h4 className={`font-heading font-bold ${testimonial.textColor || 'text-[#2D2D2D]'}`}>{testimonial.name}, {testimonial.location}</h4>
                <div className="flex text-yellow-400 text-sm mt-0.5">
                    {'★'.repeat(testimonial.rating || 5)}
                </div>
            </div>
        </div>
    </div>
);

// --- Main Component ---

interface StatsTestimonialsSectionProps {
    showStats?: boolean;  // Default true (homepage), false for other pages
    title?: string;       // Default "You're not alone in this"
    subtitle?: string;    // Default long text, can be hidden with empty string
}

const StatsTestimonialsSection: React.FC<StatsTestimonialsSectionProps> = ({
    showStats = true,
    title = "You're not alone in this",
    subtitle = "Thousands of young adults across the globe have found support, clarity, and growth through Ventoutt. Their journeys started just like yours—with a single message, a moment of courage, and a decision to seek help."
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeAnimationRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);
    const statsContainerRef = useRef<HTMLDivElement>(null);
    const statsTrackRef = useRef<HTMLDivElement>(null);

    // Stats State (reusing logic from AboutHero)
    const [stats, setStats] = useState({ users: 36398, hours: 625331 });

    // Odometer Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                users: prev.users + (Math.random() < 0.5 ? 1 : 0),
                hours: prev.hours + (Math.random() < 0.5 ? 2 : 1)
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Marquee Animation
    useEffect(() => {
        const marqueeInner = marqueeRef.current;
        if (!marqueeInner) return;

        // Clone for infinite scroll
        const originalCards = Array.from(marqueeInner.children);
        const cloneCount = 2; // Clone sets

        for (let i = 0; i < cloneCount; i++) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true) as HTMLElement;
                clone.setAttribute('aria-hidden', 'true');
                marqueeInner.appendChild(clone);
            });
        }

        let currentTx = 0;
        const speed = 0.5;

        const animate = () => {
            if (!isPausedRef.current && marqueeInner) {
                const firstCard = originalCards[0] as HTMLElement;
                const cardWidth = firstCard.offsetWidth + 12; // width + gap (gap-3 is 12px)
                const totalWidth = cardWidth * originalCards.length;

                currentTx -= speed;
                if (Math.abs(currentTx) >= totalWidth) {
                    currentTx = 0;
                }

                marqueeInner.style.transform = `translateX(${currentTx}px)`;
            }
            marqueeAnimationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (marqueeAnimationRef.current) cancelAnimationFrame(marqueeAnimationRef.current);
        };
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Fade in Headings
        gsap.from('.st-heading', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%'
            }
        });

        // Stagger Stats Entrance (Rise Up Effect) - Desktop Only
        mm.add("(min-width: 1024px)", () => {
            gsap.from('.st-stat-card', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.st-stats-grid',
                    start: 'top 85%'
                }
            });
        });

        // Mobile: Horizontal scroll animation for stats
        mm.add("(max-width: 1023px)", () => {
            if (!statsTrackRef.current) return;

            const totalWidth = statsTrackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;

            gsap.to(statsTrackRef.current, {
                x: -(totalWidth - viewportWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: statsContainerRef.current,
                    start: "top top",
                    end: `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full py-24 lg:py-32 overflow-hidden">

            {/* --- Background Map (Inline SVG Pattern) --- */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="#000" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dotPattern)" />
                </svg>
                {/* Radial Mask for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 relative z-10">

                {/* --- Section 1: Testimonials --- */}
                <div className="text-center mb-16 st-heading">
                    <h2 className="font-heading text-4xl lg:text-6xl font-bold text-[#2D2D2D] mb-6">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="font-body text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Marquee Container */}
                <div
                    className="relative w-full overflow-hidden py-12 mask-linear-fade"
                    onMouseEnter={() => isPausedRef.current = true}
                    onMouseLeave={() => isPausedRef.current = false}
                >
                    <div
                        ref={marqueeRef}
                        className="flex gap-3 w-max will-change-transform origin-center"
                    >
                        {TESTIMONIALS.map((t) => (
                            <React.Fragment key={t.id}>
                                {t.type === 'video' ? <VideoCard testimonial={t} /> : <TextCard testimonial={t} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8 mb-24 st-heading">
                    <span className="text-gray-400 text-sm font-medium tracking-wide">
                        💡 Tip: Click any video to pause and watch their full story
                    </span>
                </div>

                {/* --- Section 2: Stats (Conditional) --- */}
                {showStats && (
                    <>
                        <div className="text-center mb-16 st-heading">
                            <h3 className="font-heading text-3xl lg:text-5xl font-bold text-[#2D2D2D] mb-4">
                                A global community of support
                            </h3>
                            <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
                                From Tokyo to Toronto, London to Los Angeles—young adults everywhere are choosing Ventoutt for accessible, affordable, and authentic mental health support.
                            </p>
                        </div>

                        <div ref={statsContainerRef} className="st-stats-section overflow-hidden">
                            {/* DESKTOP: Grid Layout */}
                            <div className="st-stats-grid hidden lg:grid grid-cols-4 gap-8 items-start">
                                {/* Stat Card 1 (Down) */}
                                <div className="st-stat-card bg-black p-8 rounded-2xl shadow-xl hover:-translate-y-4 transition-transform duration-500 border border-white/10 mt-12 group">
                                    <div className="text-5xl font-bold text-[#4DA394] mb-2 font-heading group-hover:scale-110 transition-transform duration-300 origin-left">
                                        {stats.users.toLocaleString()}+
                                    </div>
                                    <div className="text-xl font-bold text-white mb-2">Users</div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        People who found someone to talk to when they needed it most
                                    </p>
                                </div>

                                {/* Stat Card 2 (Up) */}
                                <div className="st-stat-card bg-black p-8 rounded-2xl shadow-xl hover:-translate-y-4 transition-transform duration-500 border border-white/10 group">
                                    <div className="text-5xl font-bold text-[#FF6B6B] mb-2 font-heading group-hover:scale-110 transition-transform duration-300 origin-left">
                                        100+
                                    </div>
                                    <div className="text-xl font-bold text-white mb-2">Countries</div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Spread across 170 countries and counting—supporting young adults everywhere
                                    </p>
                                </div>

                                {/* Stat Card 3 (Down) */}
                                <div className="st-stat-card bg-black p-8 rounded-2xl shadow-xl hover:-translate-y-4 transition-transform duration-500 border border-white/10 mt-12 group">
                                    <div className="text-5xl font-bold text-[#FFD93D] mb-2 font-heading group-hover:scale-110 transition-transform duration-300 origin-left">
                                        {stats.hours.toLocaleString()}
                                    </div>
                                    <div className="text-xl font-bold text-white mb-2">Hours</div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Total hours of meaningful conversation, support, and care
                                    </p>
                                </div>

                                {/* Stat Card 4 (Up) */}
                                <div className="st-stat-card bg-black p-8 rounded-2xl shadow-xl hover:-translate-y-4 transition-transform duration-500 border border-white/10 group">
                                    <div className="text-5xl font-bold text-[#6C5CE7] mb-2 font-heading group-hover:scale-110 transition-transform duration-300 origin-left">
                                        9.5★
                                    </div>
                                    <div className="text-xl font-bold text-white mb-2">Feedback</div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Loved by our community for quality, affordability, and genuine care
                                    </p>
                                </div>
                            </div>

                            {/* MOBILE: Horizontal Scrollytelling */}
                            <div className="lg:hidden w-full h-[60vh] relative flex items-center">
                                <div ref={statsTrackRef} className="flex gap-4 px-6 w-max">
                                    <div className="w-[80vw] bg-black p-8 border border-white/10 rounded-[32px] shrink-0">
                                        <div className="text-5xl font-bold text-[#4DA394] mb-3 font-heading">{stats.users.toLocaleString()}+</div>
                                        <div className="text-2xl font-bold text-white mb-3">Community Members</div>
                                        <p className="text-gray-400 text-lg leading-relaxed">People who found someone to talk to when they needed it most.</p>
                                    </div>
                                    <div className="w-[80vw] bg-black p-8 border border-white/10 rounded-[32px] shrink-0">
                                        <div className="text-5xl font-bold text-[#FF6B6B] mb-3 font-heading">100+</div>
                                        <div className="text-2xl font-bold text-white mb-3">Global Reach</div>
                                        <p className="text-gray-400 text-lg leading-relaxed">Supporting young adults across 170 countries and counting.</p>
                                    </div>
                                    <div className="w-[80vw] bg-black p-8 border border-white/10 rounded-[32px] shrink-0">
                                        <div className="text-5xl font-bold text-[#FFD93D] mb-3 font-heading">{stats.hours.toLocaleString()}</div>
                                        <div className="text-2xl font-bold text-white mb-3">Hours of Care</div>
                                        <p className="text-gray-400 text-lg leading-relaxed">Meaningful conversation and genuine human support delivered daily.</p>
                                    </div>
                                    <div className="w-[80vw] bg-black p-8 border border-white/10 rounded-[32px] shrink-0">
                                        <div className="text-5xl font-bold text-[#6C5CE7] mb-3 font-heading">9.5★</div>
                                        <div className="text-2xl font-bold text-white mb-3">Community Trust</div>
                                        <p className="text-gray-400 text-lg leading-relaxed">Loved for quality, affordability, and empathetic listening.</p>
                                    </div>
                                    <div className="w-[10vw] shrink-0"></div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>

        </section>
    );
};

export default StatsTestimonialsSection;
