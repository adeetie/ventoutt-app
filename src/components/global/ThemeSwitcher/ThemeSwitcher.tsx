import React, { useState, useEffect, useRef } from 'react';
import { setTheme, getTheme, type ThemeMode } from '../../../utils/theme';
import { Palette, X, Sparkles, Moon, Sun, Leaf, Coffee, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const THEMES: { mode: ThemeMode; label: string; icon: React.ReactNode; color: string }[] = [
    { mode: 'light', label: 'Classic', icon: <Sun size={16} />, color: '#F4EDE4' },
    // Dark mode hidden as per "Hero must be light" rule, but available in logic
    // { mode: 'dark', label: 'Dark', icon: <Moon size={16} />, color: '#212121' }, 
    { mode: 'calm', label: 'Calm', icon: <Sparkles size={16} />, color: '#E8EDEB' },
    { mode: 'energetic', label: 'Energetic', icon: <Zap size={16} />, color: '#FFFDE7' },
    { mode: 'warm', label: 'Warm', icon: <Coffee size={16} />, color: '#F9EBE8' },
    { mode: 'fresh', label: 'Fresh', icon: <Leaf size={16} />, color: '#E8F5E9' },
];

const ThemeSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const theme = getTheme();
        setCurrentTheme(theme);
    }, []);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(panelRef.current, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.2)"
            });
        } else {
            gsap.to(panelRef.current, {
                autoAlpha: 0,
                y: 20,
                scale: 0.9,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    const handleThemeChange = (mode: ThemeMode) => {
        setTheme(mode);
        setCurrentTheme(mode);
    };

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-[9999] font-body">
            <div
                ref={panelRef}
                className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-64 mb-2 border border-gray-100 dark:border-gray-700 overflow-hidden opacity-0 invisible transform translate-y-5 scale-90 origin-bottom-right"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Pick a Mood</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.mode}
                            onClick={() => handleThemeChange(theme.mode)}
                            className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 border-2 ${currentTheme === theme.mode
                                    ? 'border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-700'
                                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                                style={{ backgroundColor: theme.color, color: '#333' }}
                            >
                                {theme.icon}
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-200">{theme.label}</span>
                            {currentTheme === theme.mode && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center"
            >
                <Palette size={24} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
