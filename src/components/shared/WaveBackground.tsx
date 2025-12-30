import React from 'react';

interface WaveBackgroundProps {
    className?: string;
    variant?: 'top' | 'bottom' | 'double';
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = "", variant = 'double' }) => {
    return (
        <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>

            {/* Top Wave */}
            {(variant === 'top' || variant === 'double') && (
                <svg
                    className="absolute top-0 left-0 w-full h-auto opacity-40 text-gray-300 scale-y-[-1]"
                    viewBox="0 0 1440 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0V192Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            )}

            {/* Bottom Wave */}
            {(variant === 'bottom' || variant === 'double') && (
                <svg
                    className="absolute bottom-0 left-0 w-full h-auto opacity-40 text-gray-300 scale-y-[-1]"
                    viewBox="0 0 1440 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0V96Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            )}
        </div>
    );
};

export default WaveBackground;
