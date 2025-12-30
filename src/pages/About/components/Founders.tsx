import React from 'react';

const FOUNDERS = [
    { name: 'Tavishi', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' },
    { name: 'Nikhil', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80' },
    { name: 'Harsh', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80' }
];

const Founders: React.FC = () => {
    return (
        <section className="relative w-full py-24">
            <div className="max-w-[1300px] mx-auto px-6">

                {/* Desktop Grid (Visible lg+) */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                    {/* Card 1: Info Card (Green) */}
                    <div className="bg-[#1a403d] rounded-[24px] p-8 flex flex-col justify-between text-white h-[420px]">
                        <div>
                            <h2 className="font-serif text-4xl mb-2">Our<br />Founders</h2>
                            <p className="text-sm opacity-80 leading-relaxed mt-6">
                                Driven by personal experiences, we built Ventoutt to be the sanctuary we wished we had. We are committed to making mental health accessible to everyone.
                            </p>
                        </div>
                        <a href="#" className="inline-flex items-center gap-2 bg-white text-[#1a403d] px-6 py-3 rounded-full font-medium text-sm w-fit mt-6 hover:bg-gray-100 transition-colors">
                            All Founders <span>→</span>
                        </a>
                    </div>

                    {/* Founder Cards */}
                    {FOUNDERS.map((founder, index) => (
                        <div key={index} className="bg-white rounded-[24px] p-4 flex flex-col h-[420px] shadow-sm">
                            <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-6 bg-gray-100">
                                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2 pb-2">
                                <h3 className="font-serif text-xl font-bold text-vo-black">{founder.name}</h3>
                                <p className="text-sm text-vo-gray font-medium mt-1">{founder.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Sticky Stack (Visible < lg) */}
                <div className="lg:hidden flex flex-col gap-8 pb-20">
                    <div className="mb-8 px-2">
                        <h2 className="font-serif italic text-5xl text-vo-black mb-4 leading-tight">Our<br />Founders</h2>
                        <a href="#" className="inline-flex items-center gap-2 text-vo-primary font-bold font-sans text-lg">
                            All Founders →
                        </a>
                    </div>

                    <div className="space-y-[20vh]"> {/* Reduced spacing for tighter stack */}
                        {FOUNDERS.map((founder, index) => (
                            <div key={index} className="sticky top-24 bg-white rounded-[32px] p-6 flex flex-col shadow-2xl border border-gray-100 min-h-[500px]">
                                <div className="w-full aspect-[3/4] rounded-[24px] overflow-hidden mb-6 bg-gray-100 shadow-inner">
                                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="px-2 mt-auto">
                                    <h3 className="font-serif text-4xl font-bold text-vo-black mb-2">{founder.name}</h3>
                                    <p className="text-lg text-vo-gray font-medium font-sans">{founder.role}</p>
                                </div>
                            </div>
                        ))}

                        {/* Final filler */}
                        <div className="h-[10vh]"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Founders;
