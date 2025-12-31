import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXPERTS = [
    {
        id: 'pulkita',
        name: 'Pulkita W.',
        role: 'Psychoanalytic Mental Health Expert',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        credentials: 'Masters Psychology | Psychoanalytic Fellowship',
        expertise: ['Psychoanalytic approaches', 'Sexual & Identity Issues', 'Family Systems work', 'Career-Related Stress'],
        meta: 'USA-trained psychoanalyst',
        mobileDetails: {
            credentials: 'Masters Psychology | Psychoanalytic Fellowship',
            expertise: ['Psychoanalytic approaches', 'Sexual & Identity Issues', 'Family Systems work'],
            meta: 'USA-trained psychoanalyst'
        }
    },
    {
        id: 'muskan',
        name: 'Muskan K.',
        role: 'CBT & Relationship Expert',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
        credentials: '90% satisfaction rate',
        expertise: ['Solution-Focused Brief work', 'Cognitive Behavioral approaches (CBT)', 'Couples & Relationship Guidance'],
        meta: null,
        mobileDetails: {
            credentials: null,
            expertise: ['Solution-Focused Brief work', 'Cognitive Behavioral approaches (CBT)', 'Couples & Relationship Guidance'],
            meta: '90% satisfaction rate'
        }
    },
    {
        id: 'nishi',
        name: 'Nishi',
        role: 'Clinical Psychology Specialist',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=400&q=80',
        credentials: 'MSc Clinical Psychology',
        expertise: ['LGBTQ+ Affirming Support', 'Adolescent & Childhood Trauma', 'Grief & Loss work'],
        meta: '3+ years serving US clients',
        mobileDetails: {
            credentials: 'MSc Clinical Psychology',
            expertise: ['LGBTQ+ Affirming Support', 'Adolescent & Childhood Trauma', 'Grief & Loss work'],
            meta: '3+ years serving US clients'
        }
    },
    {
        id: 'sarah',
        name: 'Dr. Sarah M.',
        role: 'Clinical Mental Health Expert',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80',
        credentials: 'Certified Professional | 8+ years exp',
        expertise: ['Anxiety & Depression support', 'Stress Management', 'Mindfulness-Based approaches'],
        meta: 'Certified Professional',
        mobileDetails: {
            credentials: 'Certified Professional',
            expertise: ['Anxiety & Depression', 'Stress Management', 'Mindfulness'],
            meta: '8+ years of experience'
        }
    }
];

// --- DESKTOP CARD (Exact Legacy Rebuild) ---
const DesktopExpertCard: React.FC<{ expert: any }> = ({ expert }) => {
    return (
        <div
            className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-400 h-[420px] flex flex-col shadow-lg"
            style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
        >
            {/* Photo Container */}
            <div className="flex-1 relative overflow-hidden rounded-t-[20px]">
                <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-[20px]"
                />
            </div>

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-white rounded-xl p-2 flex flex-col items-center shadow-md z-[2] min-w-[50px]">
                <span className="text-[#E68638] text-xs mb-0.5">★</span>
                <span className="text-sm font-extrabold text-vo-black leading-none">{expert.rating}</span>
                <span className="text-[8px] font-bold text-[#888] uppercase mt-0.5 tracking-wide">SCORE</span>
            </div>

            {/* Info Box */}
            <div
                className="absolute bottom-4 left-4 right-4 p-5 rounded-[16px] z-[3] transition-all duration-400 group-hover:bottom-0 group-hover:left-0 group-hover:right-0 group-hover:rounded-t-[20px] group-hover:rounded-b-none group-hover:pb-[30px] group-hover:translate-y-0"
                style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
            >
                <h3 className="font-body font-bold text-[18px] text-vo-black mb-1">{expert.name}</h3>
                <p className="font-body text-[13px] text-[#666] uppercase tracking-[0.5px] mb-0">{expert.role}</p>

                {/* Details (Hidden by default, shown on hover) */}
                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-400 group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mt-[15px] group-hover:pt-[15px] group-hover:border-t group-hover:border-[#eee]">
                    <p className="text-[12px] text-[#555] mb-1.5 leading-[1.4]">{expert.credentials}</p>
                    <div className="text-[12px] text-[#555] mb-1.5 leading-[1.4]">
                        <strong>Expertise:</strong>
                        <ul className="list-disc pl-5 my-1">
                            {expert.expertise.map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {expert.meta && <div className="text-[12px] text-[#555] mb-1.5 font-bold">{expert.meta}</div>}
                </div>
            </div>
        </div>
    );
};

// --- MOBILE SWIPE STACK (Tinder-Style) ---
const SwipeStack: React.FC = () => {
    // Flatten data: Expert Photo -> Expert Details -> Next Expert
    const [stack, setStack] = useState(() => {
        return EXPERTS.flatMap(expert => [
            { type: 'photo', ...expert, uniqueId: `${expert.id}-photo` },
            { type: 'text', ...expert, uniqueId: `${expert.id}-text` }
        ]);
    });

    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);
    const minSwipeDistance = 5; // To distinguish click from drag
    const activeCardRef = useRef<HTMLDivElement | null>(null);

    // Initial Stack Render Styles for depth - enhanced 3D
    const getCardStyle = (index: number) => {
        if (index === 0) return { zIndex: 30, opacity: 1, transform: 'scale(1) translateY(0px) rotate(0deg)' };
        if (index === 1) return { zIndex: 20, opacity: 1, transform: 'scale(0.92) translateY(24px) rotate(6deg)' };
        if (index === 2) return { zIndex: 10, opacity: 0.9, transform: 'scale(0.85) translateY(48px) rotate(-5deg)' };
        return { zIndex: 0, opacity: 0, transform: 'scale(0.8) translateY(72px)' };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
        if (index !== 0 || isAnimating) return;
        const target = e.currentTarget;
        activeCardRef.current = target;
        startXRef.current = e.clientX;

        target.setPointerCapture(e.pointerId);
        target.style.cursor = 'grabbing';
        setIsDragging(true);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!activeCardRef.current || activeCardRef.current !== e.currentTarget) return;
        const diffX = e.clientX - startXRef.current;
        const rotate = diffX * 0.08; // More rotation on drag
        gsap.set(activeCardRef.current, { x: diffX, rotation: rotate });
    };

    const animateCardAway = (target: HTMLDivElement, direction: number) => {
        setIsAnimating(true);
        const endX = direction * window.innerWidth * 1.5;
        const endRotate = direction * 30;

        gsap.to(target, {
            x: endX,
            y: 50,
            rotation: endRotate,
            opacity: 0,
            duration: 0.4,
            ease: "power1.in",
            onComplete: () => {
                setStack(prev => {
                    const [top, ...rest] = prev;
                    return [...rest, top];
                });
                gsap.set(target, { x: 0, y: 0, rotation: 0, opacity: 1 });
                setIsAnimating(false);
                setIsDragging(false);
                activeCardRef.current = null;
            }
        });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!activeCardRef.current || activeCardRef.current !== e.currentTarget) return;
        const target = activeCardRef.current;
        target.releasePointerCapture(e.pointerId);
        target.style.cursor = 'grab';

        const currentX = gsap.getProperty(target, "x") as number;
        const diffX = Math.abs(currentX);

        if (diffX < minSwipeDistance) {
            // It was a click (tap) - Treat as "Like" (Swipe Right)
            animateCardAway(target, 1);
        } else if (diffX > 100) {
            // It was a Swipe
            const direction = currentX > 0 ? 1 : -1;
            animateCardAway(target, direction);
        } else {
            // Reset (Snap back)
            gsap.to(target, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.75)"
            });
            setIsDragging(false);
            activeCardRef.current = null;
        }
    };

    return (
        <div className="relative w-full max-w-[320px] h-[500px] mx-auto mt-6 perspective-[1000px] touch-pan-y select-none" style={{ position: 'relative' }}>
            {stack.map((item: any, index) => {
                if (index > 2) return null;
                const style = getCardStyle(index);
                const isTop = index === 0;

                return (
                    <div
                        key={item.uniqueId}
                        className={`absolute inset-0 w-full h-full rounded-[24px] bg-white shadow-2xl overflow-hidden touch-pan-y border border-black/5 ${isTop ? 'cursor-grab' : ''}`}
                        style={{
                            zIndex: style.zIndex,
                            transform: style.transform,
                            opacity: style.opacity,
                            transition: isTop && isDragging ? 'none' : 'transform 0.4s ease, opacity 0.4s ease',
                            boxShadow: index === 0 ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        onPointerDown={isTop ? (e) => handlePointerDown(e, index) : undefined}
                        onPointerMove={isTop ? handlePointerMove : undefined}
                        onPointerUp={isTop ? handlePointerUp : undefined}
                        onPointerCancel={isTop ? handlePointerUp : undefined}
                    >
                        {item.type === 'photo' ? (
                            <>
                                <div className="w-full h-[75%] relative pointer-events-none">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-t-[24px]" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl py-2 px-3 flex flex-col items-center shadow-lg min-w-[50px]">
                                        <span className="text-[#E68638] text-xs font-bold w-full text-center border-b border-gray-200 pb-1 mb-1">SCORE</span>
                                        <span className="text-lg font-extrabold text-vo-black leading-none">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="h-[25%] bg-white p-6 flex flex-col justify-center text-center pointer-events-none">
                                    <h3 className="font-heading font-bold text-2xl text-vo-black mb-1">{item.name}</h3>
                                    <p className="font-body text-sm text-vo-text-secondary uppercase tracking-widest">{item.role}</p>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full p-8 flex flex-col bg-white pointer-events-none">
                                <div className="text-center mb-6">
                                    <h3 className="font-heading font-bold text-2xl text-vo-black mb-1">{item.name}</h3>
                                    <div className="h-1 w-12 bg-primary mx-auto rounded-full mt-2"></div>
                                </div>

                                <div className="space-y-6 overflow-y-auto">
                                    {item.mobileDetails.credentials && (
                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider mb-2">Education</h4>
                                            <p className="text-sm font-medium text-gray-700">{item.mobileDetails.credentials}</p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider mb-2">Specialties</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.mobileDetails.expertise.map((tag: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {item.mobileDetails.meta && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                                {item.mobileDetails.meta}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


// --- MAIN SECTION ---
const ExpertsGrid: React.FC = () => {
    return (
        <section className="vo-experts-section py-24 bg-[#F5F5F5] relative z-20" id="verified-partners">
            <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-start relative z-10">

                {/* --- LEFT COLUMN --- */}
                <div className="flex flex-col gap-10">
                    {/* Header */}
                    <div className="text-left mb-2">
                        <div className="font-body text-sm font-semibold tracking-[2px] uppercase text-[#4E4E4E] mb-4">
                            MEET OUR EXPERTS
                        </div>
                        <h2 className="font-heading text-5xl font-bold text-vo-black leading-[1.1] italic">
                            Caring & Expert Members
                        </h2>
                    </div>

                    {/* Desktop Sub-Grid (Left) */}
                    <div className="hidden lg:grid grid-cols-2 gap-[30px]">
                        {EXPERTS.slice(0, 2).map(expert => (
                            <DesktopExpertCard key={expert.id} expert={expert} />
                        ))}
                    </div>

                    {/* Mobile Swipe Container (Visible < 1024px) */}
                    <div className="lg:hidden block w-full min-h-[550px] overflow-visible">
                        <SwipeStack />
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="flex flex-col gap-10">
                    {/* Desktop Sub-Grid (Right) - Offset nicely */}
                    <div className="hidden lg:grid grid-cols-2 gap-[30px] pt-[80px]">
                        {EXPERTS.slice(2, 4).map(expert => (
                            <DesktopExpertCard key={expert.id} expert={expert} />
                        ))}
                    </div>

                    {/* Footer Content */}
                    <div className="lg:pt-5 text-left mt-auto">
                        <p className="font-body text-vo-text-secondary text-base leading-[1.6] mb-6">
                            Our team consists of compassionate and skilled professionals dedicated to providing personalized support and effective solutions for your well-being.
                        </p>
                        <a href="#experts" className="inline-flex items-center gap-2 h-14 px-8 bg-[#E68638] text-white rounded-[10px] font-body font-medium text-lg hover:bg-white hover:text-[#E68638] hover:border hover:border-[#E68638] transition-all">
                            Learn More <span className="text-xl">→</span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ExpertsGrid;
