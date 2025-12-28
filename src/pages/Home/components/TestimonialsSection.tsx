import React, { useRef, useEffect } from 'react';

const TESTIMONIALS = [
    {
        type: 'text',
        name: 'Emily, USA',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        text: "I was skeptical about online mental health support at first, but Ventoutt changed everything for me. My professional guide truly listens without judgment. As a student on a tight budget, I could never afford the expensive therapy platforms, so having access to professional support that's both expert and affordable has made all the difference."
    },
    {
        type: 'text',
        name: 'Naman, USA',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: "The trained listeners were not only understanding but also offered valuable insights. When I felt ready, moving on to professional guidance through Ventoutt was seamless. My guide, Nikita, has been incredible—she listens with so much patience and helps me look at my challenges in a completely new light."
    },
    {
        type: 'text',
        name: 'Sakura, Japan',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        text: "The anonymity on Ventoutt gave me the courage to open up about personal challenges I could never share with friends. When I was ready to take the next step, transitioning to professional mental health guidance was seamless."
    },
    {
        type: 'text',
        name: 'Emma, England',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: "Ventoutt has become my go-to place for mental health support. The services are not only effective but also affordable. Honestly, in the beginning, I was a bit unsure since my guide was from another country, but to my surprise, the experience was far better than I expected."
    },
    {
        type: 'text',
        name: 'Dakota, USA',
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        text: "Ventoutt has truly been my sanctuary. The affordable mental health sessions gave me the safe space I desperately needed to deal with stress and anxiety. I wasn't sure what to expect at first, but the support I received turned out to be even more valuable than I imagined."
    },
    {
        type: 'text',
        name: 'Megha, UK',
        image: 'https://randomuser.me/api/portraits/women/24.jpg',
        text: "Using Ventoutt has truly been life-changing. As someone who struggles with anxiety, the affordable professional support options have made a huge difference. Being a college student, affordability really matters to me."
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
            <h2 className="vo-testimonials-title text-center font-heading text-3xl lg:text-5xl font-bold text-[#2D2D2D] max-w-4xl mx-auto px-6 mb-4 lg:mb-6 leading-tight">
                Great conversations begin with great listeners and trusted support
            </h2>
            <div className="text-center mb-12 text-sm text-gray-500 flex items-center justify-center gap-2">
                <span className="text-yellow-500">💡</span> Tip: Click on any card to pause the carousel and read it.
            </div>

            <div
                ref={marqueeInnerRef}
                className="marquee-inner flex gap-6 will-change-transform"
            >
                {TESTIMONIALS.map((testimonial, idx) => (
                    <div
                        key={idx}
                        className="vo-testimonial-card flex-shrink-0 w-[300px] lg:w-[400px]"
                    >
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
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsMarquee;
