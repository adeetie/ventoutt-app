import React from 'react';

const Empower: React.FC = () => {
    return (
        <section className="relative w-full py-8 lg:py-16">
            <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Large Vertical Image */}
                <div className="w-full max-w-[360px] h-[450px] rounded-[32px] overflow-hidden shadow-xl hidden lg:block mx-auto">
                    <img
                        src="https://www.ventoutt.com/wp-content/uploads/2025/06/10.png"
                        alt="Empowering"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Column: Content + Horizontal Image */}
                <div className="flex flex-col gap-10">
                    {/* Text Content */}
                    <div className="flex flex-col items-start text-left">

                        <h2 className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-vo-black mb-4 lg:mb-6 font-medium leading-tight">
                            Empowering mental well being
                        </h2>
                        <p className="font-serif text-base md:text-xl lg:text-2xl text-vo-gray leading-relaxed">
                            Together, we can break the stigma surrounding mental health and foster a world where everyone feels heard, understood, and empowered.
                        </p>
                    </div>

                    {/* Horizontal Image */}
                    <div className="w-full h-[200px] md:h-[280px] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                            alt="Group Support"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Empower;
