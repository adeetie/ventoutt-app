import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { THEMES } from '../config/themes.config';
import type { ThemeConfig, ThemeName, SectionColors, ThemeColors } from '../config/themes.config';

interface ThemeContextType {
    currentTheme: ThemeConfig;
    setTheme: (themeName: ThemeName) => void;
    // Helper to get colors for a visible section type
    getSectionColors: (type: keyof ThemeColors) => SectionColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default to 'calm' or load from local storage
    const [currentThemeId, setCurrentThemeId] = useState<ThemeName>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('ventoutt-theme') as ThemeName;
            if (savedTheme && THEMES[savedTheme]) {
                return savedTheme;
            }
        }
        return 'calm';
    });

    const setTheme = (themeName: ThemeName) => {
        if (THEMES[themeName]) {
            setCurrentThemeId(themeName);
            localStorage.setItem('ventoutt-theme', themeName);
        } else {
            console.warn(`Theme ${themeName} not found.`);
        }
    };

    const currentTheme = THEMES[currentThemeId];

    const getSectionColors = (type: keyof ThemeColors): SectionColors => {
        return currentTheme.colors[type];
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, getSectionColors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Helper hook for individual sections to consume their specific colors easily
export const useSection = (type: keyof ThemeColors) => {
    const { getSectionColors } = useTheme();
    return getSectionColors(type);
};
