import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vegetables } from './data';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2 } from 'lucide-react'; // Assuming lucide-react is available as per NeuroMath package.json

import VeggieImage from './VeggieImage';


function VeggieLearn() {
    const navigate = useNavigate();

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen bg-calm-cream p-6 pb-24">
            <header className="flex items-center gap-4 mb-8 max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/veggie')}
                    className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="text-soft-charcoal" />
                </button>
                <h1 className="text-3xl font-bold text-soft-charcoal">Learn Vegetables</h1>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {vegetables.map((veg) => (
                    <motion.div
                        key={veg.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-3xl p-6 shadow-md cursor-pointer flex flex-col items-center justify-center gap-4 transition-shadow hover:shadow-xl relative overflow-hidden"
                        style={{ backgroundColor: veg.color }} // Keeping original specific colors as they are nice pastels
                        onClick={() => speak(veg.name)}
                    >
                        <div className="absolute top-3 right-3 opacity-50">
                            <Volume2 size={20} />
                        </div>

                        <div className="w-full flex justify-center h-32 items-center">
                            <VeggieImage src={veg.image} alt={veg.name} emoji={veg.emoji} />
                        </div>

                        <h3 className="text-xl font-bold text-soft-charcoal text-center">{veg.name}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="fixed bottom-8 right-8">
                <button
                    onClick={() => navigate('/veggie')}
                    className="px-6 py-3 bg-white text-soft-charcoal rounded-full font-bold shadow-lg hover:shadow-xl border border-gray-100"
                >
                    Back Home
                </button>
            </div>
        </div>
    );
}

export default VeggieLearn;
