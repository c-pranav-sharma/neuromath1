import React from 'react';
import { motion } from 'framer-motion';

// TouchPoint positions for numbers 1-9 (Approximation of standard multisensory math points)
const pointPositions = {
    1: [{ top: '20%', left: '50%' }],
    2: [{ top: '20%', left: '50%' }, { top: '80%', left: '50%' }],
    3: [{ top: '20%', left: '50%' }, { top: '50%', left: '50%' }, { top: '80%', left: '50%' }],
    4: [{ top: '20%', left: '25%' }, { top: '20%', left: '75%' }, { top: '50%', left: '25%' }, { top: '50%', left: '75%' }], // Simplified 4 corners/box style
    5: [{ top: '20%', left: '25%' }, { top: '20%', left: '75%' }, { top: '50%', left: '50%' }, { top: '80%', left: '25%' }, { top: '80%', left: '75%' }],
    6: [ // 3 double taps (ringed) usually, but we'll use 6 dots for simplicity in "touching"
        { top: '20%', left: '25%' }, { top: '20%', left: '75%' },
        { top: '50%', left: '25%' }, { top: '50%', left: '75%' },
        { top: '80%', left: '25%' }, { top: '80%', left: '75%' }
    ],
    7: [ // 7 points: 123 down left side + 4 corners? Or just 7 mapped. Let's do a '7' shape mapping.
        { top: '15%', left: '20%' }, { top: '15%', left: '50%' }, { top: '15%', left: '80%' }, // Top bar
        { top: '40%', left: '65%' }, { top: '60%', left: '50%' }, { top: '80%', left: '35%' }, // Diagonal
        { top: '50%', left: '50%' } // Middle? 7 is tricky. Let's use standard counting points: 
        // 1-2-3 (top across), 4-5-6-7 (down diagonal)
    ],
    8: [
        { top: '20%', left: '25%' }, { top: '20%', left: '75%' }, // Top loop
        { top: '40%', left: '25%' }, { top: '40%', left: '75%' }, // Middle
        { top: '60%', left: '25%' }, { top: '60%', left: '75%' }, // Bottom loop
        { top: '80%', left: '50%' }, { top: '50%', left: '50%' } // Crossings? 8 is usually 4 pairs.
    ],
    9: [
        // 9 points
        { top: '15%', left: '25%' }, { top: '15%', left: '50%' }, { top: '15%', left: '75%' },
        { top: '40%', left: '25%' }, { top: '40%', left: '50%' }, { top: '40%', left: '75%' },
        { top: '70%', left: '25%' }, { top: '70%', left: '50%' }, { top: '70%', left: '75%' }
    ]
};

// Refined 8 mapping for standard '8' shape
pointPositions[8] = [
    { top: '15%', left: '50%' },
    { top: '25%', left: '25%' }, { top: '25%', left: '75%' },
    { top: '50%', left: '50%' },
    { top: '75%', left: '25%' }, { top: '75%', left: '75%' },
    { top: '85%', left: '50%' },
    { top: '50%', left: '25%' } // extra
];
// Actually, let's stick to a simpler visual map relative to the digit glyph.
// Ideally SVG would be best, but CSS relative positioning works for "Tap counting".

const TouchNumber = ({ number, size = "text-9xl" }) => {
    const points = pointPositions[number] || [];

    // Play sound on tap
    const playTap = () => {
        const audio = new Audio('/sounds/pop.mp3'); // Assuming we have generic sounds, or just synthetic
        // Fallback to synthesis
        const msg = new SpeechSynthesisUtterance("pop");
        msg.rate = 2;
        msg.volume = 0.5;
        window.speechSynthesis.speak(msg);
    };

    return (
        <div className={`relative font-bold text-soft-charcoal select-none ${size} flex items-center justify-center w-32 h-40`}>
            {number}
            {points.map((pos, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 1.5, backgroundColor: "#F6Ad55" }}
                    onClick={playTap}
                    style={{
                        position: 'absolute',
                        top: pos.top,
                        left: pos.left,
                        transform: 'translate(-50%, -50%)'
                    }}
                    className="w-6 h-6 bg-soft-charcoal/80 rounded-full border-2 border-white cursor-pointer shadow-sm hover:bg-air-force-blue transition-colors z-10"
                />
            ))}
        </div>
    );
};

export default TouchNumber;
