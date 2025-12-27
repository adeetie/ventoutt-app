import React, { useRef } from 'react';

interface BlogCard {
    title: string;
    category: string;
    image: string;
    link: string;
}

interface RelatedBlogsProps {
    blogs?: BlogCard[];
    title?: string;
}

const DEFAULT_BLOGS: BlogCard[] = [
    {
        title: "Understanding and Managing Temper Issues",
        category: "Temper",
        image: "https://images.unsplash.com/photo-1475721027766-9669d05e2f44?w=800&q=80",
        link: "#"
    },
    {
        title: "Living with ADHD-C: Strategies for Success",
        category: "ADHD-C",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        link: "#"
    },
    {
        title: "Navigating Anxious-Avoidant Attachment Styles",
        category: "Anxious-Avoidant",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
        link: "#"
    }
];

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({
    blogs = DEFAULT_BLOGS,
    title = "Related Blogs"
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = 300;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="py-24 px-[5%] bg-vo-white relative">
            <div className="max-w-[1400px] mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vo-text-primary italic">{title}</h2>
                </div>

                {/* DESKTOP GRID */}
                <div className="hidden lg:grid grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <div
                            key={idx}
                            className="group rounded-[32px] overflow-hidden transition-shadow duration-300 flex flex-col"
                            style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.06)';
                            }}
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {blog.category}
                                    </span>
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-vo-black leading-tight mb-4 flex-1">
                                    {blog.title}
                                </h3>
                                <a href={blog.link} className="inline-flex items-center text-[#F97316] font-bold text-sm tracking-wide gap-2 group-hover:gap-3 transition-all">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MOBILE SCROLL */}
                <div className="relative lg:hidden">
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar pr-[5%]"
                    >
                        {blogs.map((blog, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-[300px] sm:w-[350px] snap-center rounded-[24px] overflow-hidden flex flex-col"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)'
                                }}
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <span className="inline-block bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                            {blog.category}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-xl font-bold text-vo-black leading-tight mb-4 flex-1">
                                        {blog.title}
                                    </h3>
                                    <a href={blog.link} className="inline-flex items-center text-[#F97316] font-bold text-sm tracking-wide gap-2">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Scroll Buttons */}
                <div className="flex justify-center gap-4 mt-8 lg:hidden">
                    <button
                        onClick={() => scroll('left')}
                        className="w-12 h-12 rounded-full text-gray-600 flex items-center justify-center transition-all"
                        style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-12 h-12 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
};

export default RelatedBlogs;
