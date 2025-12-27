import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileBackdropRef = useRef<HTMLDivElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    // Constants
    const logoUrl = "https://www.ventoutt.com/wp-content/uploads/2025/06/cropped-cropped-cropped-cropped-cropped-cropped-Ventoutt-Logo-1-3-1.png";

    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Simplified theme (always light backdrop for now to match the vo-bg)
    const textColorClass = 'text-vo-black';

    // Desktop Dropdown Animation
    useGSAP(() => {
        if (isDropdownActive) {
            gsap.to(dropdownMenuRef.current, {
                display: 'flex',
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(dropdownMenuRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    if (dropdownMenuRef.current) dropdownMenuRef.current.style.display = 'none';
                }
            });
        }
    }, [isDropdownActive]);

    // Mobile Menu Animation
    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                display: 'flex',
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.to(mobileBackdropRef.current, {
                display: 'block',
                opacity: 1,
                duration: 0.3
            });
            document.body.style.overflow = 'hidden';
        } else {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    if (mobileMenuRef.current) mobileMenuRef.current.style.display = 'none';
                }
            });
            gsap.to(mobileBackdropRef.current, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    if (mobileBackdropRef.current) mobileBackdropRef.current.style.display = 'none';
                }
            });
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* Desktop Header */}
            <header className="hidden lg:block fixed top-5 left-0 w-full z-[10000] px-[5%]">
                <div
                    className="max-w-[1400px] mx-auto h-[70px] flex items-center justify-between px-10 rounded-[60px] shadow-sm backdrop-blur-[10px] transition-all duration-300"
                    style={{
                        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)',
                        boxShadow: isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.08)' : '0 4px 20px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logoUrl} alt="Ventoutt Logo" className="h-[40px] w-auto" />
                    </Link>

                    {/* Navigation */}
                    <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8">
                        <Link to="/" className={`font-body text-xs font-bold uppercase tracking-[1px] hover:text-primary transition-colors ${textColorClass}`}>Home</Link>

                        {/* Services Dropdown */}
                        <div
                            className="relative flex items-center"
                            onMouseEnter={() => setIsDropdownActive(true)}
                            onMouseLeave={() => setIsDropdownActive(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer">
                                {/* Changed from span to Link for direct access */}
                                <Link to="/services" className={`font-body text-xs font-bold uppercase tracking-[1px] hover:text-primary transition-colors ${textColorClass}`}>
                                    Services
                                </Link>
                                <svg className={`w-3 h-3 transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            <div
                                ref={dropdownMenuRef}
                                className="absolute top-[calc(100%+0px)] left-1/2 -translate-x-1/2 w-[200px] bg-white rounded-base p-2 shadow-xl border border-black/5 flex-col hidden opacity-0"
                                style={{ transformOrigin: 'top center' }}
                            >
                                <Link to="/therapy" className="font-body text-xs text-black py-3 px-5 hover:bg-[#F57F17]/10 hover:text-[#F57F17] font-bold text-center rounded-lg transition-colors" onClick={() => setIsDropdownActive(false)}>Online Therapy</Link>
                                <hr className="border-black/5 mx-4" />
                                <Link to="/venting" className="font-body text-xs text-black py-3 px-5 hover:bg-[#F57F17]/10 hover:text-[#F57F17] font-bold text-center rounded-lg transition-colors" onClick={() => setIsDropdownActive(false)}>Instant Venting</Link>
                                <hr className="border-black/5 mx-4" />
                                <Link to="/coaching" className="font-body text-xs text-black py-3 px-5 hover:bg-[#F57F17]/10 hover:text-[#F57F17] font-bold text-center rounded-lg transition-colors" onClick={() => setIsDropdownActive(false)}>Expert Coaching</Link>
                            </div>
                        </div>

                        <Link to="/" className={`font-body text-xs font-bold uppercase tracking-[1px] hover:text-primary transition-colors ${textColorClass}`}>Join Us</Link>
                        <Link to="/about" className={`font-body text-xs font-bold uppercase tracking-[1px] hover:text-primary transition-colors ${textColorClass}`}>About Us</Link>
                        <Link to="/" className={`font-body text-xs font-bold uppercase tracking-[1px] hover:text-primary transition-colors ${textColorClass}`}>Blog</Link>
                    </nav>

                    {/* Empty div for flex spacing - no Get Started button on desktop */}
                    <div className="w-[100px]"></div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-5 left-[5%] w-[90%] h-[70px] z-[10000] flex items-center justify-between px-5 rounded-[50px] shadow-sm backdrop-blur-[12px] transition-all duration-300"
                style={{
                    background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
                    boxShadow: isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.12)' : '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
            >
                <Link to="/" className="flex items-center">
                    <img src={logoUrl} alt="Ventoutt Logo" className="h-10 w-auto" />
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative w-[25px] h-[20px] flex flex-col justify-between p-0"
                    aria-label="Toggle Menu"
                >
                    <span className={`block w-full h-[3px] bg-[#000000] rounded-[2px] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8.5px]' : ''}`}></span>
                    <span className={`block w-full h-[3px] bg-[#000000] rounded-[2px] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-full h-[3px] bg-[#000000] rounded-[2px] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8.5px]' : ''}`}></span>
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className="lg:hidden fixed top-[110px] left-[5%] w-[90%] max-h-[calc(100vh-130px)] bg-white/60 backdrop-blur-[12px] z-[9998] rounded-[30px] shadow-lg flex-col p-[30px] overflow-y-auto hidden opacity-0 translate-y-[10px]"
            >
                <nav className="flex flex-col w-full space-y-2">
                    <Link to="/" className="font-body font-medium text-[1.1rem] text-vo-black py-3 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>

                    {/* Mobile Services Accordion */}
                    <div className="w-full">
                        <div className={`w-full flex justify-between items-center py-3 font-body font-medium text-[1.1rem] ${isDropdownActive ? 'text-accent-rust' : 'text-vo-black'}`}>
                            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsDropdownActive(!isDropdownActive);
                                }}
                                className="p-2 -mr-2"
                                aria-label="Toggle Services Menu"
                            >
                                <span className={`block transition-transform duration-300 ${isDropdownActive ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                        </div>
                        <div className={`pl-5 space-y-2 overflow-hidden transition-all duration-300 ${isDropdownActive ? 'max-h-[200px] mt-2' : 'max-h-0'}`}>
                            <Link to="/therapy" className="block text-vo-text-muted py-3 text-base" onClick={() => setIsMenuOpen(false)}>Online Therapy</Link>
                            <Link to="/venting" className="block text-vo-text-muted py-3 text-base" onClick={() => setIsMenuOpen(false)}>Online Venting</Link>
                            <Link to="/coaching" className="block text-vo-text-muted py-3 text-base" onClick={() => setIsMenuOpen(false)}>Career Coaching</Link>
                        </div>
                    </div>

                    <Link to="/join" className="font-body font-medium text-[1.1rem] text-vo-black py-3 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Join Us</Link>
                    <Link to="/internships" className="font-body font-medium text-[1.1rem] text-vo-black py-3 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Internships</Link>
                    <Link to="/about" className="font-body font-medium text-[1.1rem] text-vo-black py-3 hover:text-primary" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link to="/help" className="font-body font-medium text-[1.1rem] text-vo-black py-3 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Help</Link>
                    <Link to="/blog" className="font-body font-medium text-[1.1rem] text-vo-black py-3 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                </nav>

                <button className="w-full max-w-[250px] mt-10 btn-primary py-3.5 px-5 rounded-[50px] shadow-md text-center" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                </button>
            </div>

            {/* Mobile Backdrop */}
            <div
                ref={mobileBackdropRef}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-[9995] hidden opacity-0"
            ></div>
        </>
    );
};

export default Header;
