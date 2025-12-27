import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EXPERTS = [
    {
        id: 'pulkita',
        name: 'Pulkita W.',
        role: 'Psychoanalytic Therapist',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        credentials: 'Masters Psychology | Psychoanalytic Fellowship',
        expertise: ['Psychoanalytic Therapy', 'Sexual & Identity Issues'],
        meta: 'USA-trained',
        mobileDetails: {
            credentials: 'Masters Psychology | Psychoanalytic Fellowship',
            expertise: ['Psychoanalytic Therapy', 'Sexual & Identity Issues', 'Family Systems Therapy'],
            meta: 'USA-trained psychoanalyst'
        }
    },
    {
        id: 'muskan',
        name: 'Muskan K.',
        role: 'CBT & Couples Counselor',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
        credentials: '90% satisfaction rate',
        expertise: ['Solution-Focused Therapy', 'Couples Counseling'],
        meta: null,
        mobileDetails: {
            credentials: null,
            expertise: ['Solution-Focused Brief Therapy', 'Cognitive Behavioral Therapy (CBT)', 'Couples & Relationship Counseling'],
            meta: '90% satisfaction rate'
        }
    },
    {
        id: 'nishi',
        name: 'Nishi',
        role: 'Clinical Psychiatrist',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=400&q=80',
        credentials: 'MSc Clinical Psychology',
        expertise: ['LGBTQ+ Affirming', 'Trauma & Grief'],
        meta: '3+ years US exp',
        mobileDetails: {
            credentials: 'MSc Clinical Psychology',
            expertise: ['LGBTQ+ Affirming Therapy', 'Adolescent & Childhood Trauma', 'Grief & Loss Counseling'],
            meta: '3+ years serving US clients'
        }
    },
    {
        id: 'sarah',
        name: 'Dr. Sarah M.',
        role: 'Clinical Psychiatrist',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80',
        credentials: 'Certified Professional',
        expertise: ['Anxiety & Depression', 'Mindfulness'],
        meta: '8+ years exp',
        mobileDetails: {
            credentials: 'Double Gold Medalist in Clinical Psychology',
            expertise: ['Anxiety & Depression Treatment', 'Stress Management', 'Mindfulness-Based Therapy'],
            meta: '8+ years of experience'
        }
    }
];

const EXPERT_POINTERS = [
    { label: "Clinical Diagnosis", desc: "Official medical diagnoses for anxiety, depression, ADHD, and more." },
    { label: "Medication Management", desc: "Licensed psychiatrists can prescribe and manage medication when necessary." },
    { label: "Long-term Recovery", desc: "Structured, long-term therapy plans designed for sustainable recovery." }
];

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
        <div className="relative w-full max-w-[320px] h-[500px] mx-auto mt-10 perspective-[1000px] touch-none select-none">
            {stack.map((item: any, index: number) => {
                if (index > 2) return null;
                const style = getCardStyle(index);
                const isTop = index === 0;

                return (
                    <div
                        key={item.uniqueId}
                        className={`absolute inset-0 w-full h-full rounded-[24px] bg-white shadow-2xl overflow-hidden touch-none border border-black/5 ${isTop ? 'cursor-grab' : ''}`}
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
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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

const TherapyExperts: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Marquee Animation
        if (marqueeRef.current) {
            const track = marqueeRef.current;
            gsap.to(track, {
                x: "-50%",
                duration: 20,
                ease: "none",
                repeat: -1
            });
        }
    }, { scope: containerRef });

    const expertsLeft = EXPERTS.slice(0, 2);
    const expertsRight = EXPERTS.slice(2, 4);

    const renderCard = (expert: any) => (
        <div key={expert.name} className="vo-experts-v2-card">
            <div className="vo-experts-v2-photo-container">
                <img src={expert.image} className="vo-experts-v2-photo" alt={expert.name} />
            </div>
            <div className="vo-experts-v2-rating">
                <span className="star">★</span>
                <span className="score">{expert.rating}</span>
                <span className="label">SCORE</span>
            </div>
            <div className="vo-experts-v2-info">
                <div className="vo-experts-v2-name">{expert.name}</div>
                <div className="vo-experts-v2-job">{expert.role}</div>
                <div className="vo-experts-v2-details">
                    <div className="vo-experts-v2-detail-item">{expert.credentials}</div>
                    <div className="vo-experts-v2-detail-item">
                        <strong>Expertise:</strong>
                        <ul>
                            {expert.expertise.map((s: string) => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                    {expert.meta && <div className="vo-experts-v2-detail-item"><strong>{expert.meta}</strong></div>}
                </div>
            </div>
        </div>
    );

    return (
        <section ref={containerRef} className="vo-experts-v2-section" id="verified-partners">
            <div className="vo-experts-v2-container">
                {/* --- MOBILE: Swipe Stack (Tinder Style) --- */}
                <div className="lg:hidden w-full mb-12">
                    <div className="vo-experts-v2-header text-left mb-6">
                        <div className="vo-experts-v2-label">VERIFIED CLINICAL PARTNERS</div>
                        <h2 className="vo-experts-v2-title">Caring & Expert Members</h2>
                        <p className="vo-experts-v2-subtitle">Expert Care, Independently Verified</p>
                    </div>
                    <SwipeStack />
                </div>

                {/* --- DESKTOP: Split Grid --- */}
                {/* Left Column */}
                <div className="vo-experts-v2-col hidden lg:flex">
                    {/* Header */}
                    <div className="vo-experts-v2-header">
                        <div className="vo-experts-v2-label">VERIFIED CLINICAL PARTNERS</div>
                        <h2 className="vo-experts-v2-title">Caring & Expert Members</h2>
                        <p className="vo-experts-v2-subtitle">Expert Care, Independently Verified</p>
                    </div>

                    {/* Desktop Sub-Grid (Left) */}
                    <div className="vo-experts-v2-subgrid">
                        {expertsLeft.map(renderCard)}
                    </div>
                </div>

                {/* Right Column */}
                <div className="vo-experts-v2-col hidden lg:flex">
                    {/* Desktop Sub-Grid (Right) */}
                    <div className="vo-experts-v2-subgrid">
                        {expertsRight.map(renderCard)}
                    </div>

                    {/* Footer Content & Therapy Pointers */}
                    <div className="vo-experts-v2-content">
                        <p className="vo-experts-v2-desc">
                            We know that finding the right clinical support is critical. That's why we've partnered with
                            top-tier licensed professionals across the country. Each partner is vetted for their
                            credentials, ethical standing, and client satisfaction records.
                        </p>

                        <div className="expert-pointers-carousel-container" style={{ overflow: 'hidden' }}>
                            <div className="expert-pointers-track" ref={marqueeRef} style={{ display: 'flex', gap: '20px', width: 'max-content' }}>
                                {/* Original + Clone for Loop */}
                                {[...EXPERT_POINTERS, ...EXPERT_POINTERS].map((ptr, idx) => (
                                    <div key={idx} className="expert-pointer-card" style={{ flexShrink: 0 }}>
                                        <div className="expert-pointer-title"><span className="expert-pointer-icon">+</span> {ptr.label}</div>
                                        <div className="expert-pointer-desc">{ptr.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TherapyExperts;
