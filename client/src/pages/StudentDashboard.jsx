import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Grid2X2, PieChart, Shapes, Sun, Moon, Carrot, Minus, Scale } from 'lucide-react';
import { useUserProgress } from '../context/UserProgressContext';

const Dashboard = () => {
    const { user } = useUserProgress();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCalmMode, setIsCalmMode] = useState(false); // Calm Breathing Mode

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const modules = [
        { name: 'Addition', path: '/addition', icon: <Calculator size={48} className="text-air-force-blue" />, progress: 40 },
        { name: 'Subtraction', path: '/subtraction', icon: <Minus size={48} className="text-warm-apricot" />, progress: 0 },
        { name: 'Multiplication', path: '/multiplication', icon: <Grid2X2 size={48} className="text-muted-green" />, progress: 20 },
        { name: 'Division', path: '/division', icon: <PieChart size={48} className="text-purple-400 rotate-180" />, progress: 0 },
        { name: 'Odd & Even', path: '/odd-even', icon: <Scale size={48} className="text-cool-mint" />, progress: 0 },
        { name: 'Fractions', path: '/fractions', icon: <PieChart size={48} className="text-soft-amber" />, progress: 0 },
        { name: 'Shapes', path: '/shapes', icon: <Shapes size={48} className="text-pink-400" />, progress: 10 },
        { name: 'Veggie Learn', path: '/veggie', icon: <Carrot size={48} className="text-orange-400" />, progress: 0 }
    ];

    if (isCalmMode) {
        return (
            <div className="fixed inset-0 z-50 bg-air-force-blue flex items-center justify-center flex-col text-white">
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-64 h-64 bg-white/20 rounded-full mb-8 shadow-2xl backdrop-blur-md"
                />
                <h1 className="text-4xl font-bold mb-4">Breathe In... Breathe Out...</h1>
                <button
                    onClick={() => setIsCalmMode(false)}
                    className="mt-8 px-8 py-3 bg-white text-air-force-blue rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                >
                    I'm Ready
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-sensory-dark text-white' : 'bg-calm-cream text-soft-charcoal'}`}>
            <div className="max-w-6xl mx-auto p-6 md:p-12">

                {/* Header */}
                <header className="flex justify-between items-center mb-16">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Hello, {user?.username || 'Learner'}!</h1>
                        <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ready to play?</p>
                    </div>

                    <div className="flex gap-6 items-center">
                        {/* Day/Night Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-4 rounded-full neumorphism-btn ${isDarkMode ? 'bg-gray-800 shadow-none ring-2 ring-gray-600' : ''}`}
                        >
                            {isDarkMode ? <Moon className="text-yellow-300" /> : <Sun className="text-orange-400" />}
                        </button>

                        {/* Calm Corner Button */}
                        <button
                            onClick={() => setIsCalmMode(true)}
                            className="bg-air-force-blue text-white px-6 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity"
                        >
                            Calm Corner
                        </button>

                        {/* Logout / Home Button */}
                        <Link to="/" className="text-sm font-bold text-gray-400 hover:text-air-force-blue transition-colors">
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Activity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((mod) => (
                        <Link to={mod.path} key={mod.name}>
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`neumorphism p-8 rounded-3xl flex flex-col items-center justify-center text-center h-64 gap-6 cursor-pointer border-2 border-transparent hover:border-focus-ring transition-all ${isDarkMode ? 'bg-gray-800 shadow-none border-gray-700' : ''}`}
                            >
                                <motion.div
                                    whileHover={{ rotate: 10 }}
                                    className="p-4 bg-white rounded-2xl shadow-sm"
                                >
                                    {mod.icon}
                                </motion.div>

                                <div className="w-full">
                                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-soft-charcoal'}`}>{mod.name}</h3>

                                    {/* Progress Ring / Bar */}
                                    <div className="w-24 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                                        <div
                                            className="h-full bg-muted-green rounded-full"
                                            style={{ width: `${mod.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
