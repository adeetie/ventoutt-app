import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ITEMS = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400&q=80',
        label: 'Learning',
        shape: 'right-d'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=400&q=80', // Wellness placeholder
        label: 'Wellness',
        shape: 'arch'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
        label: 'Meditation',
        shape: 'left-d'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80',
        label: 'Support',
        shape: 'circle'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80', // Healing placeholder
        label: 'Healing',
        shape: 'right-d'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=80',
        label: 'Happiness',
        shape: 'arch'
    }
];

const AboutImageCarousel: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        // Duplicate items for infinite loop

        const duration = 20; // Seconds for full loop

        gsap.to(track, {
            x: "-50%",
            duration: duration,
            ease: "none",
            repeat: -1
        });

    }, { scope: containerRef });

    // Helper to get shape classes
    const getShapeClass = (shape: string) => {
        switch (shape) {
            case 'right-d': return 'rounded-r-[100px]';
            case 'left-d': return 'rounded-l-[100px]';
            case 'arch': return 'rounded-t-[100px]';
            case 'circle': return 'rounded-full';
            default: return 'rounded-2xl';
        }
    };

    return (
        <section ref={containerRef} className="py-24 bg-[#FAF7F2] overflow-hidden">
            <div className="relative w-full">
                <div ref={trackRef} className="flex gap-6 w-max px-4">
                    {/* Render Double for seamless loop */}
                    {[...ITEMS, ...ITEMS].map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className={`relative group w-[320px] h-[320px] flex-shrink-0 overflow-hidden ${getShapeClass(item.shape)}`}
                        >
                            <img
                                src={item.image}
                                alt={item.label}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <a href="#" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-xl">↗</span>
                                </div>
                                <span className="text-white font-heading font-bold text-xl tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {item.label}
                                </span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutImageCarousel;
