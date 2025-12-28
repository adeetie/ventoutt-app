import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { label: "Users", value: 36398, suffix: "", desc: "People who found someone to talk to", color: "#E68638" },
    { label: "Countries", value: 100, suffix: "+", desc: "Spread across 170 countries and counting", color: "#3D635B" }, // Using a nice green for contrast
    { label: "Hours", value: 625331, suffix: "", desc: "Total hours of conversation and care", color: "#E68638" },
    { label: "Rating", value: 9.5, decimals: 1, suffix: " stars", desc: "Loved by our community", color: "#3D635B" }
];

const StatsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        STATS.forEach((stat, idx) => {
            const el = document.getElementById(`stat-val-${idx}`);
            if (!el) return;

            gsap.from(el, {
                textContent: 0,
                duration: 2.5,
                ease: "power2.out",
                snap: { textContent: stat.decimals ? 0.1 : 1 },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: function () {
                    const val = parseFloat(this.targets()[0].textContent);
                    el.textContent = val.toLocaleString(undefined, {
                        minimumFractionDigits: stat.decimals || 0,
                        maximumFractionDigits: stat.decimals || 0
                    }) + (stat.suffix || "");
                }
            });
        });

        gsap.from('.stat-item', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="vo-stats-section py-20 bg-white">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-vo-black mb-4">
                        Here's How Far We've Come Together
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="stat-item flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div
                                id={`stat-val-${idx}`}
                                className="font-heading font-bold text-4xl lg:text-5xl mb-2"
                                style={{ color: stat.color }}
                            >
                                {stat.value.toLocaleString()}
                                {stat.suffix}
                            </div>
                            <div className="font-bold text-lg text-vo-black mb-2">{stat.label}</div>
                            <p className="text-sm text-gray-500 max-w-[200px]">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
