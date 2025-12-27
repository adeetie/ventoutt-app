/**
 * Theme Switcher for A/B Testing
 * Allows dynamic theme switching between mood variations
 */

export type ThemeMode = 'light' | 'dark' | 'calm' | 'energetic' | 'warm' | 'fresh';

export const setTheme = (theme: ThemeMode): void => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ventoutt-theme', theme);
};

export const getTheme = (): ThemeMode => {
    const stored = localStorage.getItem('ventoutt-theme') as ThemeMode | null;
    return stored || 'light';
};

export const initTheme = (): void => {
    const theme = getTheme();
    setTheme(theme);
};

// For A/B testing: Randomly assign theme on first visit
export const randomThemeForAB = (): ThemeMode => {
    const themes: ThemeMode[] = ['light', 'calm', 'energetic', 'warm', 'fresh'];
    const randomIndex = Math.floor(Math.random() * themes.length);
    return themes[randomIndex];
};

export const applyABTestTheme = (): void => {
    if (!localStorage.getItem('ventoutt-theme')) {
        const randomTheme = randomThemeForAB();
        setTheme(randomTheme);

        // Track which theme was assigned (for analytics)
        if (window.localStorage) {
            localStorage.setItem('ventoutt-ab-theme', randomTheme);
            localStorage.setItem('ventoutt-ab-timestamp', new Date().toISOString());
        }
    }
};
