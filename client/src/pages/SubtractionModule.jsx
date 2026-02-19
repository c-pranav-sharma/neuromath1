import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame } from 'lucide-react'; // Using Flame for "extinguish" metaphor
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';
import { useUserProgress } from '../context/UserProgressContext';
import axios from 'axios';
import ScreenCapture from '../components/common/ScreenCapture';
import MouseTrail from '../components/interaction/MouseTrail';

const SubtractionModule = () => {
    const navigate = useNavigate();
    const { userId } = useUserProgress();

    const [total, setTotal] = useState(5); // Start with 5
    const [subtract, setSubtract] = useState(2); // Subtract 2
    const [extinguished, setExtinguished] = useState([]); // Indices of extinguished items
    const [feedback, setFeedback] = useState({ visible: false, correct: false });

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const newTotal = Math.floor(Math.random() * 9) + 1; // 1-10
        const newSubtract = Math.floor(Math.random() * newTotal) + 1; // 1 to total
        setTotal(newTotal);
        setSubtract(newSubtract);
        setExtinguished([]);
    };

    const handleItemClick = (index) => {
        if (extinguished.includes(index)) return; // Already extinguished

        if (extinguished.length < subtract) {
            const newExtinguished = [...extinguished, index];
            setExtinguished(newExtinguished);

            // Text to Speech or Sound could go here

            // Check if done
            if (newExtinguished.length === subtract) {
                // Success!
                setTimeout(() => {
                    handleSuccess();
                }, 500);
            }
        } else {
            // User trying to subtract too many? 
            // Or maybe they just clicked wrong.
            // For now, let's limit clicks to 'subtract' amount to avoid confusion?
            // Actually, "Click exactly X items" implies if they click more it might be wrong.
            // But let's just cap it for positive reinforcement.
        }
    };

    const handleSuccess = () => {
        setFeedback({ visible: true, correct: true });
        if (userId) axios.post('http://localhost:5000/api/math/subtraction', { userId, score: 1, totalQuestions: 1, timeTaken: 15 });

        setTimeout(() => {
            setFeedback({ visible: false, correct: false });
            generateProblem();
        }, 2500);
    };

    return (
        <div id="subtraction-module" className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
            <MouseTrail />
            <button
                onClick={() => navigate('/dashboard')}
                className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <Mascot message={`We have ${total}. Click to extinguish ${subtract} flames!`} />

            <div className="mt-12 flex flex-col items-center gap-8">
                {/* Equation Display */}
                <div className="text-6xl font-bold text-soft-charcoal flex gap-4 items-center bg-white px-8 py-4 rounded-3xl shadow-md">
                    <span>{total}</span>
                    <span className="text-air-force-blue">-</span>
                    <span>{subtract}</span>
                    <span className="text-gray-400">=</span>
                    <span className="text-air-force-blue">
                        {extinguished.length === subtract ? total - subtract : "?"}
                    </span>
                </div>

                {/* Visual Interaction Zone */}
                <div className="flex flex-wrap gap-6 justify-center max-w-2xl bg-white/50 p-8 rounded-3xl border-2 border-dashed border-gray-300">
                    {Array.from({ length: total }).map((_, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleItemClick(i)}
                            className="cursor-pointer relative"
                        >
                            <AnimatePresence>
                                {!extinguished.includes(i) ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Flame size={64} color="#F56565" fill="#F56565" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="w-16 h-16 flex items-center justify-center"
                                    >
                                        <span className="text-gray-300 text-4xl font-bold">×</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <p className="text-xl text-soft-charcoal opacity-70">
                    Remaining: {total - extinguished.length}
                </p>
            </div>

            <FeedbackModal
                isVisible={feedback.visible}
                isCorrect={feedback.correct}
                onClose={() => setFeedback({ ...feedback, visible: false })}
            />
            <ScreenCapture targetId="subtraction-module" />
        </div>
    );
};

export default SubtractionModule;
