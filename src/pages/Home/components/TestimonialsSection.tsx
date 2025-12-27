import React, { useRef, useEffect } from 'react';

const TESTIMONIALS = [
    {
        type: 'text',
        name: 'Emma, England',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        text: "Ventoutt is my go-to place when I need to vent. The anonymous chat feature allows me to express my feelings freely without judgment. It's incredible how talking to strangers online has helped me manage my stress and anxiety."
    },
    {
        type: 'video',
        name: 'Iya, Bosnia and Herzegovina',
        videoUrl: 'https://www.youtube.com/embed/fFk_z0jpqjo?enablejsapi=1&rel=0&modestbranding=1'
    },
    {
        type: 'text',
        name: 'Jennifer R., USA',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: "I struggled with anxiety for years and was skeptical about finding the right support. Then I connected with my therapist, and everything shifted. They really understood what I was going through, made me feel heard, and gave me tools that actually worked in my daily life."
    },
    {
        type: 'text',
        name: 'Sarah M., USA',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        text: "I was honestly really unsure about trying online therapy at first especially with a therapist from another country. But honestly, my therapist was amazing. They were there 24/7 whenever I needed support, and the cost was something I could actually afford."
    },
    {
        type: 'video',
        name: 'Ewa, France',
        videoUrl: 'https://www.youtube.com/embed/t3D9OqoxLpM?enablejsapi=1&rel=0&modestbranding=1'
    }
];

const TestimonialsMarquee: React.FC = () => {
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);

    useEffect(() => {
        const marqueeInner = marqueeInnerRef.current;
        if (!marqueeInner) return;

        // Clone cards for infinite scroll
        const originals = Array.from(marqueeInner.querySelectorAll('.vo-testimonial-card:not(.clone)'));

        // Clone 3 times for smooth loop
        for (let i = 0; i < 3; i++) {
            originals.forEach(card => {
                const clone = card.cloneNode(true) as HTMLElement;
                clone.classList.add('clone');
                marqueeInner.appendChild(clone);
            });
        }

        let currentTx = 0;
        const speed = 0.5; // pixels per frame

        const animate = () => {
            if (!isPausedRef.current && marqueeInner) {
                const itemWidth = originals[0]?.getBoundingClientRect().width || 0;
                const gap = 24; // from CSS
                const resetPoint = -(itemWidth + gap) * originals.length;

                currentTx -= speed;

                if (currentTx <= resetPoint) {
                    currentTx = 0;
                }

                marqueeInner.style.transform = `translate3d(${currentTx}px, 0, 0)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            // Clean up clones
            marqueeInner.querySelectorAll('.clone').forEach(c => c.remove());
        };
    }, []);

    return (
        <section
            className="vo-testimonials-section py-16 lg:py-24 bg-white overflow-hidden"
            onMouseEnter={() => isPausedRef.current = true}
            onMouseLeave={() => isPausedRef.current = false}
        >
            <h2 className="vo-testimonials-title text-center font-heading text-3xl lg:text-5xl font-bold text-[#2D2D2D] max-w-4xl mx-auto px-6 mb-12 lg:mb-16 leading-tight">
                Great conversations begin with great listeners and trusted support
            </h2>

            <div className="marquee relative w-full">
                <div
                    ref={marqueeInnerRef}
                    className="marquee-inner flex gap-6 will-change-transform"
                >
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className={`vo-testimonial-card flex-shrink-0 w-[300px] lg:w-[400px] ${testimonial.type === 'video' ? 'vo-video-card' : ''}`}
                        >
                            {testimonial.type === 'text' ? (
                                <>
                                    <div className="vo-testimonial-name flex items-center gap-3 mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                            loading="lazy"
                                        />
                                        <span className="font-body font-semibold text-[#2D2D2D]">
                                            {testimonial.name}
                                        </span>
                                    </div>
                                    <p className="font-body text-base text-[#5a5a5a] leading-[1.6]">
                                        {testimonial.text}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="vo-video-container aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 mb-3">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={testimonial.videoUrl}
                                            title={`${testimonial.name} Testimonial`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            loading="lazy"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="vo-video-caption font-body text-sm font-semibold text-[#2D2D2D] text-center">
                                        {testimonial.name}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsMarquee;
