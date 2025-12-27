import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Expert {
    name: string;
    title: string;
    rating: string;
    image: string;
    specialties: string[];
    education: string;
    experience: string;
}

const EXPERTS: Expert[] = [
    {
        name: "Pulkita W.",
        title: "Psychoanalytic Therapist",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        specialties: ["Psychoanalytic Therapy", "Sexual & Identity Issues"],
        education: "Masters Psychology | Psychoanalytic Fellowship",
        experience: "USA-trained"
    },
    {
        name: "Muskan K.",
        title: "CBT & Couples Counselor",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
        specialties: ["Solution-Focused Therapy", "Couples Counseling"],
        education: "90% satisfaction rate",
        experience: ""
    },
    {
        name: "Nishi",
        title: "Clinical Psychiatrist",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        specialties: ["LGBTQ+ Affirming", "Trauma & Grief"],
        education: "MSc Clinical Psychology",
        experience: "3+ years US exp"
    },
    {
        name: "Dr. Sarah M.",
        title: "Clinical Psychiatrist",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
        specialties: ["Anxiety & Depression", "Mindfulness"],
        education: "Certified Professional",
        experience: "8+ years exp"
    }
];

const EXPERT_POINTERS = [
    { label: "Clinical Diagnosis", desc: "Official medical diagnoses for anxiety, depression, ADHD, and more." },
    { label: "Medication Management", desc: "Licensed psychiatrists can prescribe and manage medication when necessary." },
    { label: "Long-term Recovery", desc: "Structured, long-term therapy plans designed for sustainable recovery." }
];

const TherapyExperts: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Marquee Animation
        if (marqueeRef.current) {
            const track = marqueeRef.current;
            const items = track.children;
            const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth + 20, 0); // 20 gap

            // Duplicate content for infinite loop if needed, or just animate
            // For true infinite loop we typically clone.
            // Simplified: simple tween
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

    const renderCard = (expert: Expert) => (
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
                <div className="vo-experts-v2-job">{expert.title}</div>
                <div className="vo-experts-v2-details">
                    <div className="vo-experts-v2-detail-item">{expert.education}</div>
                    <div className="vo-experts-v2-detail-item">
                        <strong>Expertise:</strong>
                        <ul>
                            {expert.specialties.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                    {expert.experience && <div className="vo-experts-v2-detail-item"><strong>{expert.experience}</strong></div>}
                </div>
            </div>
        </div>
    );

    return (
        <section ref={containerRef} className="vo-experts-v2-section" id="verified-partners">
            <div className="vo-experts-v2-container">
                {/* Left Column */}
                <div className="vo-experts-v2-col">
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
                <div className="vo-experts-v2-col">
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
