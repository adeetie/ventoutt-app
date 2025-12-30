import React from 'react';

export interface FAQItem {
    q: string;
    a: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
    description?: string;
    className?: string;
}

const FAQ: React.FC<FAQProps> = ({
    items,
    title = "Frequently Asked Questions",
    description,
    className = ""
}) => {
    return (
        <section className={`py-24 px-[5%] bg-[#F5F5F5] ${className}`}>
            <div className="max-w-[800px] mx-auto space-y-12">
                {title && (
                    <div className="text-center space-y-4">
                        <h2 className="font-heading text-4xl font-bold text-vo-text-primary italic">{title}</h2>
                        {description && <p className="font-body text-vo-text-secondary max-w-2xl mx-auto">{description}</p>}
                    </div>
                )}
                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <details
                            key={idx}
                            className="group glass-card rounded-2xl overflow-hidden transition-all duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)'
                            }}
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-heading font-bold text-vo-text-primary hover:bg-vo-bg transition-colors list-none [&::-webkit-details-marker]:hidden">
                                {item.q}
                                <span className="text-primary group-open:rotate-180 transition-transform duration-300">▼</span>
                            </summary>
                            <div className="p-6 pt-0 font-body text-vo-text-secondary leading-relaxed animate-fade-in">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
