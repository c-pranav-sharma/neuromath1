import React from 'react';
import html2canvas from 'html2canvas';
import { Camera } from 'lucide-react';

const ScreenCapture = ({ targetId = 'root' }) => {
    const handleCapture = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                backgroundColor: null, // Transparent background if possible, or use computed
                logging: false,
                useCORS: true // Handle external images (like badges)
            });

            const link = document.createElement('a');
            link.download = `neuro-math-achievement-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Optional: Play a camera sound
            const audio = new Audio('/sounds/camera-shutter.mp3'); // Placeholder
            // Fallback audio
        } catch (error) {
            console.error("Capture failed:", error);
        }
    };

    return (
        <button
            onClick={handleCapture}
            className="fixed bottom-6 left-6 p-4 bg-white rounded-full shadow-lg border-2 border-soft-charcoal hover:bg-air-force-blue hover:text-white transition-all transform hover:scale-110 z-50 group"
            title="Save My Work"
        >
            <Camera size={24} />
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-soft-charcoal text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Save My Work 📸
            </span>
        </button>
    );
};

export default ScreenCapture;
