import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Puzzle } from 'lucide-react';
import LoginModal from '../components/auth/LoginModal';

// Floating Geometric Shapes Component
const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-32 h-32 bg-air-force-blue/10 rounded-full blur-xl"
        />
        <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-muted-green/10 rounded-full blur-2xl"
        />
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 left-1/2 w-40 h-40 bg-soft-amber/10 rounded-3xl blur-xl"
        />
    </div>
);

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="min-h-screen bg-calm-cream flex flex-col relative overflow-hidden font-sans text-soft-charcoal">
            <FloatingShapes />

            {/* Navbar */}
            <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Puzzle className="text-air-force-blue w-10 h-10" />
                    <span className="text-2xl font-bold tracking-tight text-soft-charcoal">NeuroMath</span>
                </div>
                <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-6 py-3 rounded-full bg-white border-2 border-air-force-blue/20 text-air-force-blue font-bold hover:bg-air-force-blue hover:text-white transition-all shadow-sm"
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-7xl font-bold mb-6 text-soft-charcoal tracking-tight"
                >
                    Math Made Calm.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl text-gray-500 mb-12 max-w-2xl"
                >
                    Distraction-free learning designed for unique minds.
                </motion.p>

                <motion.button
                    onClick={() => setIsLoginOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-2xl font-bold text-white bg-air-force-blue px-12 py-5 rounded-full shadow-xl hover:shadow-2xl hover:bg-opacity-90 transition-all ring-4 ring-transparent hover:ring-focus-ring"
                >
                    Start Learning
                </motion.button>
            </main>

            {/* Login Modal */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
    );
};

export default LandingPage;
