import React from 'react';
import WaveBackground from './WaveBackground';
import WaveDivider from './WaveDivider';

interface WaveSectionProps {
    children: React.ReactNode;
    bgColor?: string;      // Tailwind class e.g. "bg-white", "bg-[#faf7f2]"
    nextColor?: string;    // Tailwind class of the NEXT section
    className?: string;    // Extra classes
    id?: string;
}

const WaveSection: React.FC<WaveSectionProps> = ({
    children,
    bgColor = "bg-white",
    nextColor,
    className = "",
    id
}) => {

    // 1. Helper to extract hex/color from tailwind class string
    // This is simple logic: if "bg-white", use "text-white". If "bg-[#...]", use "text-[#...]".
    // We assume the input is exactly like "bg-white" or "bg-[#123456]"
    const getTextColorClass = (bgClass?: string) => {
        if (!bgClass) return null;
        if (bgClass.includes('bg-white')) return 'text-white';
        if (bgClass.includes('bg-[#')) {
            // Extract the hex part and replace bg with text
            return bgClass.replace('bg-', 'text-');
        }
        // Fallback or named colors
        return bgClass.replace('bg-', 'text-');
    };

    // 2. Determine Texture color based on background darkness
    // Simple heuristic: "bg-[#1a1a1a]" or "bg-black" -> Dark.
    const isDarkSection = bgColor.includes('#1a1a1a') || bgColor.includes('bg-black') || bgColor.includes('bg-gray-900');

    const textureClass = isDarkSection
        ? "text-white opacity-5"
        : "text-gray-300 opacity-40";

    const waveColorClass = getTextColorClass(nextColor);

    return (
        <div id={id} className={`relative w-full overflow-hidden ${bgColor} ${className}`}>
            {/* 1. Global Texture (WaveBackground) - REMOVED per user request ("remove the lines") */}
            {/* <WaveBackground variant="bottom" className={`z-20 ${textureClass}`} /> */}

            {/* 2. Content - Highest Z-30 */}
            <div className="relative z-30">
                {children}
            </div>

            {/* 3. Transition Wave (WaveDivider) - DISABLED per user request */}
            {/* {waveColorClass && (
                <WaveDivider position="bottom" className={`${waveColorClass} z-10`} />
            )} */}
        </div>
    );
};

export default WaveSection;
