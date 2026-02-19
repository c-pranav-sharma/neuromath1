import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';

import VideoModelModal from '../components/math/VideoModelModal';

const FractionsModule = () => {
    const navigate = useNavigate();
    const [denominator, setDenominator] = useState(4);
    const [target, setTarget] = useState(3);
    const [numerator, setNumerator] = useState(0);
    const [feedback, setFeedback] = useState({ visible: false, correct: false });
    const [showVideo, setShowVideo] = useState(true);

    // Initialize with random values
    React.useEffect(() => {
        generateNewQuestion();
    }, []);

    const generateNewQuestion = () => {
        const denoms = [3, 4, 5, 6, 8];
        const newDenom = denoms[Math.floor(Math.random() * denoms.length)];
        const newTarget = Math.floor(Math.random() * (newDenom - 1)) + 1; // Ensure simpler fractions
        setDenominator(newDenom);
        setTarget(newTarget);
        setNumerator(0);
    };

    const data = [
        { name: 'Filled', value: numerator },
        { name: 'Empty', value: denominator - numerator },
    ];

    const COLORS = ['#88B04B', '#E2E8F0'];

    const handleClick = () => {
        if (numerator < denominator) {
            const next = numerator + 1;
            setNumerator(next);
            if (next === target) {
                setFeedback({ visible: true, correct: true });
                setTimeout(() => {
                    setFeedback({ visible: false, correct: false });
                    generateNewQuestion();
                }, 2000);
            }
        } else {
            setNumerator(0);
        }
    };

    return (
        <div className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
            <button
                onClick={() => navigate('/dashboard')}
                className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <Mascot message={`Tap the circle to fill ${target}/${denominator}!`} />

            <motion.div
                className="mt-12 w-80 h-80 relative cursor-pointer"
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-4xl font-bold text-soft-charcoal">{numerator}/{denominator}</span>
                </div>
            </motion.div>

            {showVideo && <VideoModelModal onComplete={() => setShowVideo(false)} />}

            <FeedbackModal
                isVisible={feedback.visible}
                isCorrect={feedback.correct}
                onClose={() => setFeedback({ ...feedback, visible: false })}
            />
        </div>
    );
};

export default FractionsModule;
