import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface PopupsProps {
    onOpenChatbot: () => void;
}

const Popups: React.FC<PopupsProps> = ({ onOpenChatbot }) => {
    const [isEntryModalActive, setIsEntryModalActive] = useState(false);
    const [isScrollPopupShown, setIsScrollPopupShown] = useState(false);
    const [scrollPopupDismissed, setScrollPopupDismissed] = useState(false);

    const location = useLocation();
    const entryModalRef = useRef<HTMLDivElement>(null);
    const scrollPopupRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-open chatbot on service pages
    useEffect(() => {
        const servicePaths = ['/services', '/venting', '/coaching', '/therapy'];
        const isServicePage = servicePaths.includes(location.pathname);

        if (isServicePage) {
            // Small delay to ensure page has loaded
            const timer = setTimeout(() => {
                onOpenChatbot();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [location.pathname, onOpenChatbot]);

    // Entry Modal Logic
    useEffect(() => {
        const isHome = location.pathname === '/' || location.pathname === '/index.html';
        if (!isHome) return;

        if (sessionStorage.getItem('voEntryModalShown')) return;

        const timer = setTimeout(() => {
            setIsEntryModalActive(true);
            sessionStorage.setItem('voEntryModalShown', 'true');
        }, 2000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Scroll Popup Logic
    useEffect(() => {
        const handleScroll = () => {
            if (scrollPopupDismissed || isScrollPopupShown || isEntryModalActive) return;

            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (scrollTotal <= 0) return;

            const scrollPercent = window.scrollY / scrollTotal;
            if (scrollPercent > 0.8) {
                setIsScrollPopupShown(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollPopupDismissed, isScrollPopupShown, isEntryModalActive]);

    // GSAP Animations
    useGSAP(() => {
        // Entry Modal
        if (isEntryModalActive) {
            gsap.to(entryModalRef.current, {
                display: 'flex',
                opacity: 1,
                pointerEvents: 'auto', // Enable clicks
                duration: 0.4
            });
            gsap.fromTo(entryModalRef.current?.querySelector('.vo-modal-card'),
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        } else {
            gsap.to(entryModalRef.current, {
                opacity: 0,
                pointerEvents: 'none', // Disable clicks
                duration: 0.3,
                onComplete: () => {
                    if (entryModalRef.current) entryModalRef.current.style.display = 'none';
                }
            });
        }

        // Scroll Popup
        if (isScrollPopupShown) {
            gsap.to(scrollPopupRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'back.out(1.7)'
            });
        } else {
            gsap.to(scrollPopupRef.current, {
                y: '120%',
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
            });
        }
    }, { scope: containerRef, dependencies: [isEntryModalActive, isScrollPopupShown] });

    const handleCTAClick = () => {
        setIsEntryModalActive(false);
        setIsScrollPopupShown(false);
        onOpenChatbot();
    };

    return (
        <div ref={containerRef}>
            {/* Scroll Popup */}
            <div
                ref={scrollPopupRef}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 translate-y-[120%] opacity-0 w-[440px] max-w-[94%] bg-white flex flex-col p-5 gap-3 rounded-md shadow-xl z-[1000]"
            >
                <h3 className="font-heading text-lg font-semibold italic text-center text-vo-text-primary">
                    Still not sure what kind of support would help?
                </h3>
                <p className="font-body text-sm text-center text-vo-text-primary leading-normal">
                    You don’t have to decide alone. Let our chatbot help you explore Venting, Coaching, or Therapy safely.
                </p>
                <div className="flex flex-col gap-3 mt-2">
                    <button
                        onClick={handleCTAClick}
                        className="w-full bg-[#F57F17] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                        Help me choose
                    </button>
                    <button
                        onClick={() => { setIsScrollPopupShown(false); setScrollPopupDismissed(true); }}
                        className="bg-none border-none text-vo-text-muted text-xs underline cursor-pointer font-body"
                    >
                        Not now
                    </button>
                    <div className="text-[10px] text-vo-text-muted text-center opacity-70">You can explore without commitment.</div>
                </div>
            </div>

            {/* Entry Modal */}
            <div
                ref={entryModalRef}
                className="fixed inset-0 bg-black/50 z-[1050] flex items-center justify-center opacity-0 pointer-events-none hidden"
            >
                <div className="vo-modal-card w-[440px] max-w-[90%] bg-white p-8 rounded-xl shadow-2xl text-center flex flex-col gap-4">
                    <h3 className="font-heading text-2xl font-semibold italic text-vo-text-primary">
                        Still not sure what kind of support would help?
                    </h3>
                    <p className="font-body text-base text-vo-text-primary leading-normal">
                        You don’t have to decide alone. Let our chatbot help you explore Venting, Coaching, or Therapy safely.
                    </p>
                    <div className="flex flex-col gap-3 mt-2">
                        <button
                            onClick={handleCTAClick}
                            className="w-full bg-[#F57F17] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                        >
                            Help me choose
                        </button>
                        <button
                            onClick={() => setIsEntryModalActive(false)}
                            className="bg-none border-none text-vo-text-muted text-xs underline cursor-pointer font-body"
                        >
                            Not now
                        </button>
                        <div className="text-[10px] text-vo-text-muted text-center opacity-70">You can explore without commitment.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popups;
