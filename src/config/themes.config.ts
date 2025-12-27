export interface SectionColors {
    background: string;
    text: string;
    accent: string;
    border?: string;
}

export interface ThemeColors {
    hero: SectionColors;
    content: SectionColors;
    cards: SectionColors;
    sidebar: SectionColors;
    footer: SectionColors;
    modal: SectionColors;
    navbar: SectionColors;
}

export interface ThemeConfig {
    id: string;
    name: string;
    label: string;
    mood: 'calm' | 'energized' | 'serene' | 'warm' | 'focus' | 'gentle';
    colors: ThemeColors;
}

// Base Palette (Provided by User)
const PALETTE = {
    Primary: {
        Orange: '#F57F17',
        LightOrange: '#FDA84D',
    },
    Secondary: {
        Beige: '#F4EDE4',
        Cream: '#FFFDF7',
        Pale: '#FBF4E4',
    },
    Neutrals: {
        Black: '#212121',
        White: '#FFFFFF',
        Gray: '#4E4E4E',
        DarkGray: '#2c2c2c',
        SoftGray: '#f5f5f5'
    },
    Accents: {
        Yellow: '#FFD54F',
        Green: '#43A047',
        DarkGreen: '#3A7F56',
        Teal: '#58766A',
        Rust: '#B75F4C',
    }
};

export const THEMES: Record<string, ThemeConfig> = {
    calm: {
        id: 'calm',
        name: 'Calm & Centered',
        label: 'Calm',
        mood: 'calm', // Balanced, Default
        colors: {
            hero: {
                background: PALETTE.Secondary.Cream, // Soft Cream
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange,
            },
            content: {
                background: PALETTE.Secondary.Beige, // Grounding Beige
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Teal,
            },
            cards: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.LightOrange,
                border: '#E0E0E0'
            },
            sidebar: {
                background: PALETTE.Secondary.Pale,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust
            },
            footer: {
                background: PALETTE.Neutrals.Black,
                text: PALETTE.Neutrals.White,
                accent: PALETTE.Primary.Orange
            },
            modal: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange
            },
            navbar: {
                background: 'rgba(255, 253, 247, 0.9)', // Translucent Cream
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange
            }
        }
    },
    energized: {
        id: 'energized',
        name: 'Energized & Hopeful',
        label: 'Energized',
        mood: 'energized', // Vibrant
        colors: {
            hero: {
                background: '#FFF8F0', // Very light orange tint (derived)
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange,
            },
            content: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange,
            },
            cards: {
                background: '#FFF5E5', // Light orange tint
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange,
                border: PALETTE.Primary.LightOrange
            },
            sidebar: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange
            },
            footer: {
                background: PALETTE.Primary.Orange, // Bold Footer
                text: PALETTE.Neutrals.White,
                accent: PALETTE.Neutrals.Black
            },
            modal: {
                background: '#FFF8F0',
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange
            },
            navbar: {
                background: 'rgba(255, 248, 240, 0.9)',
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Primary.Orange
            }
        }
    },
    serene: {
        id: 'serene',
        name: 'Serene & Peaceful',
        label: 'Serene',
        mood: 'serene', // Cool, Calming
        colors: {
            hero: {
                background: '#F0F7F4', // Lightest Mint/Teal hint
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Teal,
            },
            content: {
                background: '#E8F1ED', // Slightly darker mint
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.DarkGreen,
            },
            cards: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Teal,
                border: '#D0E0D8'
            },
            sidebar: {
                background: '#F0F7F4',
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Teal
            },
            footer: {
                background: PALETTE.Accents.Teal, // Teal Footer
                text: PALETTE.Neutrals.White,
                accent: PALETTE.Secondary.Cream
            },
            modal: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Teal
            },
            navbar: {
                background: 'rgba(240, 247, 244, 0.9)',
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Teal
            }
        }
    },
    warm: {
        id: 'warm',
        name: 'Warm & Comforting',
        label: 'Warm',
        mood: 'warm', // Cozy
        colors: {
            hero: {
                background: PALETTE.Secondary.Pale, // Pale warmth
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust,
            },
            content: {
                background: '#FFF0EA', // Light peach/rust tint
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust,
            },
            cards: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust,
                border: '#F0D0C8'
            },
            sidebar: {
                background: PALETTE.Secondary.Pale,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust
            },
            footer: {
                background: PALETTE.Accents.Rust, // Rust Footer
                text: PALETTE.Neutrals.White,
                accent: PALETTE.Secondary.Beige
            },
            modal: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust
            },
            navbar: {
                background: 'rgba(251, 244, 228, 0.9)',
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Accents.Rust
            }
        }
    },
    focus: {
        id: 'focus',
        name: 'Focus & Clarity',
        label: 'Focus',
        mood: 'focus', // Minimal, High Contrast
        colors: {
            hero: {
                background: PALETTE.Neutrals.White, // Pure White
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Neutrals.Gray,
            },
            content: {
                background: PALETTE.Neutrals.SoftGray, // Slight gray for separation
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Neutrals.Black,
            },
            cards: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Neutrals.Black,
                border: PALETTE.Neutrals.Black // Strong borders
            },
            sidebar: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Neutrals.Black
            },
            footer: {
                background: PALETTE.Neutrals.Black,
                text: PALETTE.Neutrals.White,
                accent: PALETTE.Neutrals.White
            },
            modal: {
                background: PALETTE.Neutrals.White,
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Neutrals.Black
            },
            navbar: {
                background: 'rgba(255, 255, 255, 0.95)',
                text: PALETTE.Neutrals.Black,
                accent: PALETTE.Neutrals.Black
            }
        }
    },
    gentle: {
        id: 'gentle',
        name: 'Gentle & Soft',
        label: 'Gentle',
        mood: 'gentle', // Low stimulation
        colors: {
            hero: {
                background: '#FAF9F6', // Off-white, softer than white
                text: '#3E3E3E', // Softer black
                accent: PALETTE.Accents.Green,
            },
            content: {
                background: '#F0F2F0', // Very soft green/gray
                text: '#3E3E3E',
                accent: PALETTE.Accents.Green,
            },
            cards: {
                background: '#FFFFFF',
                text: '#3E3E3E',
                accent: PALETTE.Accents.Green,
                border: 'transparent' // Soft, no borders
            },
            sidebar: {
                background: '#FAF9F6',
                text: '#3E3E3E',
                accent: PALETTE.Accents.Green
            },
            footer: {
                background: '#58766A', // Gentle Teal
                text: PALETTE.Neutrals.White,
                accent: PALETTE.Secondary.Cream
            },
            modal: {
                background: '#FAF9F6',
                text: '#3E3E3E',
                accent: PALETTE.Accents.Green
            },
            navbar: {
                background: 'rgba(250, 249, 246, 0.9)',
                text: '#3E3E3E',
                accent: PALETTE.Accents.Green
            }
        }
    }
};

export type ThemeName = keyof typeof THEMES;
