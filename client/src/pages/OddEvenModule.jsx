import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User2, Users } from 'lucide-react';
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';
import { useUserProgress } from '../context/UserProgressContext';
import axios from 'axios';
import ScreenCapture from '../components/common/ScreenCapture';
import MouseTrail from '../components/interaction/MouseTrail';

const OddEvenModule = () => {
    const navigate = useNavigate();
    const { userId } = useUserProgress();

    const [number, setNumber] = useState(7);
    const [feedback, setFeedback] = useState({ visible: false, correct: false });

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const newNumber = Math.floor(Math.random() * 9) + 1; // 1-10
        setNumber(newNumber);
    };

    const handleChoice = (choice) => {
        const isOdd = number % 2 !== 0;
        const isCorrect = (choice === 'odd' && isOdd) || (choice === 'even' && !isOdd);

        if (isCorrect) {
            handleSuccess();
        } else {
            // Shake or feedback
            setFeedback({ visible: true, correct: false });
            setTimeout(() => {
                setFeedback({ visible: false, correct: false });
            }, 1000);
        }
    };

    const handleSuccess = () => {
        setFeedback({ visible: true, correct: true });
        if (userId) axios.post('http://localhost:5000/api/math/odd-even', { userId, score: 1, totalQuestions: 1, timeTaken: 10 });

        setTimeout(() => {
            setFeedback({ visible: false, correct: false });
            generateProblem();
        }, 2000);
    };

    return (
        <div id="odd-even-module" className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
            <MouseTrail />
            <button
                onClick={() => navigate('/dashboard')}
                className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <Mascot message={`Look at the pairs! Is ${number} Odd or Even?`} />

            <div className="mt-12 flex flex-col items-center gap-12 w-full max-w-4xl">

                {/* Visualizer Zone (Partner Up) */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-soft-charcoal flex gap-4 flex-wrap justify-center min-w-[300px]">
                    {/* 
                        We want pairs. 
                        If number is 7: 
                        [XX]
                        [XX]
                        [XX]
                        [X ] -> Odd Man Out
                     */}
                    {Array.from({ length: Math.ceil(number / 2) }).map((_, rowIdx) => {
                        // Items in this row
                        const isLastRow = rowIdx === Math.ceil(number / 2) - 1;
                        const itemsInRow = (isLastRow && number % 2 !== 0) ? 1 : 2;

                        return (
                            <div key={rowIdx} className="flex gap-4 p-2 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 items-center justify-center w-32 h-20">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-air-force-blue"
                                >
                                    <User2 size={40} />
                                </motion.div>

                                {itemsInRow === 2 ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-air-force-blue"
                                    >
                                        <User2 size={40} />
                                    </motion.div>
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center opacity-30">
                                        <span className="text-sm font-bold text-red-400">?</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <h2 className="text-6xl font-bold text-soft-charcoal">{number}</h2>

                {/* Choices */}
                <div className="flex gap-8">
                    <button
                        onClick={() => handleChoice('odd')}
                        className="w-40 h-20 rounded-2xl bg-white border-b-4 border-gray-300 text-3xl font-bold hover:bg-orange-100 hover:border-orange-300 transition-all active:scale-95"
                    >
                        ODD
                    </button>
                    <button
                        onClick={() => handleChoice('even')}
                        className="w-40 h-20 rounded-2xl bg-white border-b-4 border-gray-300 text-3xl font-bold hover:bg-green-100 hover:border-green-300 transition-all active:scale-95"
                    >
                        EVEN
                    </button>
                </div>
            </div>

            <FeedbackModal
                isVisible={feedback.visible}
                isCorrect={feedback.correct}
                onClose={() => setFeedback({ ...feedback, visible: false })}
            />
            <ScreenCapture targetId="odd-even-module" />
        </div>
    );
};

export default OddEvenModule;
