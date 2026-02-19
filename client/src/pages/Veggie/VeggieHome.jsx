import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function VeggieHome() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-8 py-12 min-h-screen bg-calm-cream/50">
            {/* HERO SECTION */}
            <div className="text-center mb-4 animate-fade-in px-4">
                <div className="text-[6rem] mb-4 drop-shadow-md animate-bounce">🥦</div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-4">
                    Welcome to Veggie Learn!
                </h1>
                <p className="text-xl text-gray-500">The fun way to learn about healthy eating.</p>
            </div>

            {/* FEATURE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-6">

                {/* Learn Card */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-2 border-transparent hover:border-green-400 cursor-pointer"
                    onClick={() => navigate('/veggie/learn')}
                >
                    <div className="text-6xl mb-4 bg-green-50 p-4 rounded-full">📚</div>
                    <h3 className="text-2xl font-bold text-soft-charcoal mb-2">Start Learning</h3>
                    <p className="text-gray-400">Explore 15 amazing vegetables.</p>
                </motion.div>

                {/* Quiz Card */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-2 border-transparent hover:border-purple-400 cursor-pointer"
                    onClick={() => navigate('/veggie/quiz')}
                >
                    <div className="text-6xl mb-4 bg-purple-50 p-4 rounded-full">🎮</div>
                    <h3 className="text-2xl font-bold text-soft-charcoal mb-2">Play Quiz</h3>
                    <p className="text-gray-400">Test your knowledge!</p>
                </motion.div>

                {/* Routine Card */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-2 border-transparent hover:border-pink-400 cursor-pointer"
                    onClick={() => navigate('/veggie/routine')}
                >
                    <div className="text-6xl mb-4 bg-pink-50 p-4 rounded-full">📅</div>
                    <h3 className="text-2xl font-bold text-soft-charcoal mb-2">My Routine</h3>
                    <p className="text-gray-400">Set goals & get reminders.</p>
                </motion.div>

                {/* Support Card */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-2 border-transparent hover:border-yellow-400 cursor-pointer"
                    onClick={() => navigate('/veggie/support')}
                >
                    <div className="text-6xl mb-4 bg-yellow-50 p-4 rounded-full">🧡</div>
                    <h3 className="text-2xl font-bold text-soft-charcoal mb-2">Parents Corner</h3>
                    <p className="text-gray-400">Help & FAQs for parents.</p>
                </motion.div>

            </div>

            <button
                onClick={() => navigate('/dashboard')}
                className="mt-8 px-8 py-3 bg-air-force-blue text-white rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity"
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default VeggieHome;
