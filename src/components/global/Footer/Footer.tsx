import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const logoUrl = "https://www.ventoutt.com/wp-content/uploads/2025/06/cropped-cropped-cropped-cropped-cropped-cropped-Ventoutt-Logo-1-3-1.png";
    const ctaBgUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80";

    return (
        <>
            {/* Start Your Healing Journey Today (Global CTA) */}
            <section
                className="relative w-full h-[600px] flex flex-col justify-end items-center text-center pb-20 text-white overflow-hidden"
                style={{
                    backgroundImage: `url(${ctaBgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-1 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(33,33,33,0) 0%, rgba(33,33,33,0.1) 20%, rgba(33,33,33,0.3) 40%, rgba(33,33,33,0.6) 60%, rgba(33,33,33,0.85) 80%, rgba(33,33,33,1) 92%, #212121 100%)'
                    }}
                ></div>

                <div className="relative z-10 max-w-[800px] px-5">
                    <h2 className="font-heading text-4xl lg:text-6xl font-bold italic mb-6 leading-tight text-white">
                        Start Your Healing<br />Journey Today
                    </h2>
                    <p className="font-body text-lg mb-10 opacity-90 max-w-[600px] mx-auto text-white">
                        Let's take the first step together toward clarity, calm, and personal growth.
                    </p>
                    <div className="flex justify-center items-center gap-5">
                        <Link to="/services" className="inline-flex items-center gap-3 bg-[#F57F17] py-3 px-8 rounded-full text-white hover:bg-[#E65100] transition-all duration-300 hover:-translate-y-0.5 group shadow-md">
                            Book Free Consultation
                            <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Global Footer */}
            <footer className="bg-[#212121] pt-20 px-[5%] pb-10 text-white relative">
                <div className="max-w-[1400px] mx-auto mb-16 border-b border-white/10 pb-10 flex flex-wrap justify-between gap-10">
                    {/* Col 1: Logo & Social */}
                    <div className="flex-[1.2] min-w-[250px] flex flex-col items-start gap-5">
                        <Link to="/">
                            <img src={logoUrl} alt="Ventoutt Logo" className="w-[120px] h-auto object-contain" />
                        </Link>
                        <div className="flex gap-4 mt-3">
                            <a href="#" aria-label="Facebook" className="w-6 h-6 hover:text-[#F57F17] transition-colors" style={{ color: '#FFFFFF', opacity: 1 }}>
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="w-6 h-6 hover:text-[#F57F17] transition-colors" style={{ color: '#FFFFFF', opacity: 1 }}>
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-6 h-6 hover:text-[#F57F17] transition-colors" style={{ color: '#FFFFFF', opacity: 1 }}>
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="flex-1 min-w-[200px] mb-5 sm:text-center lg:text-left">
                        <h4 className="font-heading font-bold text-xl text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/therapy" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">Online Therapy</Link></li>
                            <li><Link to="/venting" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">Online Venting</Link></li>
                            <li><Link to="/internships" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">Internship</Link></li>
                            <li><Link to="/about" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">About Us</Link></li>
                            <li><Link to="/blog" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">Blogs</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Therapies */}
                    <div className="flex-1 min-w-[200px] mb-5 sm:text-center lg:text-left">
                        <h4 className="font-heading font-bold text-xl text-white mb-6">Therapies</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">For Young Adults</a></li>
                            <li><a href="#" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">Family Therapy</a></li>
                            <li><a href="#" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">Couple Therapy</a></li>
                            <li><a href="#" className="text-white text-sm hover:text-[#F57F17] hover:underline transition-colors">For LGBTQ+</a></li>
                        </ul>
                    </div>

                    {/* Col 4: Contact */}
                    <div className="flex-[1.2] min-w-[250px] sm:text-center lg:text-left">
                        <h4 className="font-heading font-bold text-xl text-white mb-6">Reach Out To Us At</h4>
                        <div className="space-y-5 text-sm text-white leading-relaxed">
                            <div>
                                <p className="text-white font-semibold mb-1">Address:</p>
                                <p>Neuniverse Networks Pvt Ltd</p>
                                <p>B-218, East of Loni Road, Delhi, 110093, India</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold mb-1">Email:</p>
                                <p><a href="mailto:Connect@ventoutt.com" className="hover:text-[#F57F17]">Connect@ventoutt.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-wrap justify-center items-center gap-5 mb-10">
                    <a href="#" className="bg-[#3A7F56] border border-vo-white py-3 px-12 rounded-lg text-vo-white font-semibold text-xl leading-snug shadow-md hover:brightness-90 transition-all min-w-[300px] text-center">
                        Learn More
                    </a>
                    <a href="#" className="bg-[#3A7F56] border border-vo-white py-3 px-12 rounded-lg text-vo-white font-semibold text-xl leading-snug shadow-md hover:brightness-90 transition-all min-w-[300px] text-center">
                        Download the App
                    </a>
                </div>

                {/* Disclaimer */}
                <div className="text-center max-w-[1000px] mx-auto mb-10 text-[10px] text-white leading-relaxed opacity-70">
                    <p>This platform is not for emergencies or crisis situations. If you are in danger, experiencing severe symptoms, suicidal or self harming thoughts, call your local emergency services immediately.</p>
                    <a href="#" className="block text-red-500 underline font-semibold my-4">Click here for suicide prevention helplines across the world</a>
                    <p className="mt-4">To protect user privacy, some testimonial images are illustrative. All shared feedback and experiences are genuine.</p>
                </div>

                <div className="text-center pt-5 border-t border-white/10 text-sm text-vo-text-muted">
                    <p>© 2025 Ventoutt. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
