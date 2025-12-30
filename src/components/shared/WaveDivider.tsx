import React from 'react';

interface WaveDividerProps {
    className?: string; // For text color (fill) and z-index overrides
    position?: 'top' | 'bottom';
}

const WaveDivider: React.FC<WaveDividerProps> = ({ className = "text-white", position = "bottom" }) => {

    // Rotate 180deg for top to flip the 'bottom' wave shape upwards
    const transformClass = position === 'top' ? 'rotate-180' : '';
    const positionClass = position === 'top' ? 'top-[-1px]' : 'bottom-[-1px]';

    return (
        <div className={`absolute left-0 w-full overflow-hidden leading-[0] ${positionClass} ${transformClass} ${className} pointer-events-none`}>
            <svg
                className="relative block w-[calc(110%+1.3px)] h-[60px] lg:h-[120px] scale-y-[-1]"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="fill-current"
                ></path>
            </svg>
        </div>
    );
};

export default WaveDivider;
