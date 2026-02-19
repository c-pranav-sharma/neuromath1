import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';
import { useUserProgress } from '../context/UserProgressContext';
import axios from 'axios';
import TouchNumber from '../components/math/TouchNumber';
import MouseTrail from '../components/interaction/MouseTrail';
import ScreenCapture from '../components/common/ScreenCapture';

// --- Draggable Number Card ---
const DraggableNumber = ({ id, number }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `drag-${number}`,
        data: { number }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center text-4xl font-bold cursor-grab active:cursor-grabbing hover:scale-105 transition-transform border-4 border-b-8 border-air-force-blue/20 text-soft-charcoal ${isDragging ? 'opacity-50 z-50' : ''}`}
        >
            {number}
        </div>
    );
};

// --- Drop Zone ---
const DropZone = ({ expected, onDrop }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'answer-zone',
        data: { expected }
    });

    return (
        <div
            ref={setNodeRef}
            className={`w-32 h-32 rounded-2xl border-4 border-dashed flex items-center justify-center transition-colors ${isOver ? 'border-focus-ring bg-focus-ring/10' : 'border-gray-300 bg-gray-50'}`}
        >
            <span className="text-gray-300 text-5xl font-bold">?</span>
        </div>
    );
};

const AppleIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="inline-block animate-pop">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#F56565" />
        <path d="M12 3V6" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 6L14 4" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const AdditionModule = () => {
    const navigate = useNavigate();
    const [num1, setNum1] = useState(2);
    const [num2, setNum2] = useState(3);
    const [feedback, setFeedback] = useState({ visible: false, correct: false });
    const { userId } = useUserProgress();
    const [shake, setShake] = useState(false);

    // Initial random numbers
    useEffect(() => {
        setNum1(Math.floor(Math.random() * 5) + 1);
        setNum2(Math.floor(Math.random() * 4) + 1);
    }, []);

    // Keyboard Interaction
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = parseInt(e.key);
            if (!isNaN(key)) {
                checkAnswer(key);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [num1, num2]); // Re-bind when numbers change

    const checkAnswer = (answer) => {
        const correctSum = num1 + num2;
        if (answer === correctSum) {
            handleSuccess();
        } else {
            handleFailure();
        }
    };

    const handleSuccess = () => {
        setFeedback({ visible: true, correct: true });
        if (userId) axios.post('http://localhost:5000/api/math/addition', { userId, score: 1, totalQuestions: 1, timeTaken: 10 });

        // Play success sound if available
        // const audio = new Audio('/sounds/success.mp3');
        // audio.play().catch(e => console.log("Audio play failed"));

        setTimeout(() => {
            setFeedback({ visible: false, correct: false });
            // Generate new problem
            const n1 = Math.floor(Math.random() * 5) + 1;
            const n2 = Math.floor(Math.random() * 4) + 1;
            setNum1(n1);
            setNum2(n2);
        }, 2000);
    };

    const handleFailure = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && over.id === 'answer-zone') {
            const droppedNumber = active.data.current.number;
            checkAnswer(droppedNumber);
        }
    };

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const sum = num1 + num2;
        const newOptions = [sum];
        while (newOptions.length < 3) {
            const r = Math.floor(Math.random() * 10) + 1;
            if (!newOptions.includes(r)) newOptions.push(r);
        }
        setOptions(newOptions.sort(() => Math.random() - 0.5));
    }, [num1, num2]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <MouseTrail />
            <div id="addition-module-content" className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <Mascot message="Drag the correct number to the box!" />

                <div className={`mt-12 bg-white rounded-3xl shadow-xl p-12 w-full max-w-4xl flex flex-col items-center gap-12 ${shake ? 'animate-shake' : ''}`}>

                    {/* Visual Zone (Dual Coding) */}
                    <div className="flex gap-4 md:gap-16 items-center justify-center flex-wrap">
                        <div className="flex flex-col items-center gap-4">
                            <TouchNumber number={num1} />
                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: num1 }).map((_, i) => <AppleIcon key={i} />)}
                            </div>
                        </div>

                        <span className="text-6xl text-gray-300 font-light">+</span>

                        <div className="flex flex-col items-center gap-4">
                            <TouchNumber number={num2} />
                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: num2 }).map((_, i) => <AppleIcon key={i} />)}
                            </div>
                        </div>

                        <span className="text-6xl text-gray-300 font-light">=</span>

                        {/* Drop Zone */}
                        <DropZone expected={num1 + num2} />
                    </div>
                </div>

                {/* Options Zone - The "Tray" */}
                <div className="mt-12 bg-white/50 p-6 rounded-2xl flex gap-8 backdrop-blur-sm border-2 border-white">
                    {options.map((opt, i) => (
                        <DraggableNumber key={i} id={`drag-${i}`} number={opt} />
                    ))}
                </div>

                <FeedbackModal
                    isVisible={feedback.visible}
                    isCorrect={feedback.correct}
                    onClose={() => setFeedback({ ...feedback, visible: false })}
                />

                <ScreenCapture targetId="addition-module-content" />
            </div>
        </DndContext>
    );
};

export default AdditionModule;
