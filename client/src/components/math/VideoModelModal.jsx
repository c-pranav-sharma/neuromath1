import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

const VideoModelModal = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Timeline of the "Video"
        const timeline = [
            setTimeout(() => setStep(1), 1000), // Move to slice 1
            setTimeout(() => setStep(2), 2000), // Click slice 1
            setTimeout(() => setStep(3), 3000), // Move to slice 2
            setTimeout(() => setStep(4), 4000), // Click slice 2
            setTimeout(() => setStep(5), 5000), // Show Success
            setTimeout(() => onComplete(), 7000) // End
        ];

        return () => timeline.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm"
        >
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
                <h2 className="text-2xl font-bold text-center text-soft-charcoal mb-8">
                    {step < 5 ? "👀 Watch me solve it first!" : "✨ Now you try!"}
                </h2>

                {/* Simulated Game Area */}
                <div className="relative w-64 h-64 mx-auto bg-gray-100 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Slices */}
                    <div className="absolute inset-0 flex">
                        <div className={`w-1/2 h-full border-r-2 border-white ${step >= 2 ? 'bg-muted-green' : 'bg-gray-200'} transition-colors duration-300`} />
                        <div className={`w-1/2 h-full ${step >= 4 ? 'bg-muted-green' : 'bg-gray-200'} transition-colors duration-300`} />
                    </div>
                    {/* Divider for 2nd slice visual (simplified 2 parts) */}
                    <div className="absolute inset-0 border-b-2 border-white transform rotate-90" />

                    {/* Text */}
                    <span className="relative z-10 text-3xl font-bold text-soft-charcoal bg-white/80 px-4 py-2 rounded-xl">
                        {step >= 4 ? '2/2' : step >= 2 ? '1/2' : '0/2'}
                    </span>
                </div>

                {/* Cursor Animation */}
                <motion.div
                    initial={{ x: 200, y: 200, opacity: 0 }}
                    animate={{
                        x: step === 1 ? 80 : step === 3 ? 180 : step === 5 ? 300 : 200,
                        y: step === 1 ? 80 : step === 3 ? 80 : step === 5 ? 300 : 200,
                        opacity: step === 5 ? 0 : 1,
                        scale: (step === 2 || step === 4) ? 0.8 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 pointer-events-none text-air-force-blue"
                >
                    <MousePointer2 size={48} fill="#5D8AA8" />
                </motion.div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onComplete}
                        className="text-gray-400 hover:text-soft-charcoal font-bold text-sm underline"
                    >
                        Skip Video
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default VideoModelModal;
