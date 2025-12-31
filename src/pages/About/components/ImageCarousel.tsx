import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const items = [
    { src: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400&q=80", text: "Learning", shape: "rounded-[0_50%_50%_0]" }, // Right D
    { src: "https://www.ventoutt.com/wp-content/uploads/2025/06/7.png", text: "Wellness", shape: "rounded-[50%_50%_0_0]" }, // Arch
    { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", text: "Meditation", shape: "rounded-[50%_0_0_50%]" }, // Left D
    { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80", text: "Support", shape: "rounded-full" }, // Circle
    { src: "https://www.ventoutt.com/wp-content/uploads/2025/06/7.png", text: "Healing", shape: "rounded-[0_50%_50%_0]" }, // Right D
    { src: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=80", text: "Happiness", shape: "rounded-[50%_50%_0_0]" } // Arch
];

const ImageCarousel: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!trackRef.current) return;

        // Duplicate content for seamless loop
        const content = trackRef.current.innerHTML;
        trackRef.current.innerHTML = content + content;

        const width = trackRef.current.scrollWidth / 2;

        gsap.to(trackRef.current, {
            x: -width,
            duration: 40,
            ease: "none",
            repeat: -1
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="pt-12 pb-16 lg:pb-64 overflow-hidden">
            <div className="w-full">
                <div
                    ref={trackRef}
                    className="flex gap-6 w-max pl-4 items-center"
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] shrink-0 group cursor-pointer overflow-hidden ${item.shape}`}
                        >
                            <img
                                src={item.src}
                                alt={item.text}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center mb-1">
                                        <span className="text-sm text-black">↗</span>
                                    </div>
                                    <span className="text-white font-bold text-sm tracking-wide">{item.text}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImageCarousel;
