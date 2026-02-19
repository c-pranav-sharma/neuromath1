import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';

const DraggableItem = ({ id }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { type: 'item' }
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
            className={`w-12 h-12 bg-amber-400 rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform ${isDragging ? 'opacity-50 z-50' : ''}`}
        >
            <Cookie size={24} className="text-amber-800" />
        </div>
    );
};

const Plate = ({ id, items }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: { type: 'plate' }
    });

    return (
        <div
            ref={setNodeRef}
            className={`w-40 h-40 rounded-full border-4 flex flex-wrap content-center justify-center gap-2 transition-colors p-4 ${isOver ? 'border-focus-ring bg-focus-ring/10' : 'border-gray-200 bg-white'}`}
        >
            {items.map(item => (
                <div key={item} className="w-8 h-8 bg-amber-400 rounded-full shadow-sm flex items-center justify-center">
                    <Cookie size={16} className="text-amber-800" />
                </div>
            ))}
        </div>
    );
};

const DivisionModule = () => {
    const navigate = useNavigate();
    const [dividend, setDividend] = useState(6); // Total cookies
    const [divisor, setDivisor] = useState(2);   // Total plates
    const [jarItems, setJarItems] = useState([]);
    const [plates, setPlates] = useState({});
    const [feedback, setFeedback] = useState({ visible: false, correct: false });

    useEffect(() => {
        generateLevel();
    }, []);

    const generateLevel = () => {
        // Generate random clean division (e.g., 6/2, 8/4, 9/3)
        const possibleDivisors = [2, 3, 4];
        const newDivisor = possibleDivisors[Math.floor(Math.random() * possibleDivisors.length)];
        const maxQuotient = 4; // Keep numbers small
        const quotient = Math.floor(Math.random() * (maxQuotient - 1)) + 1; // 1 to 3
        const newDividend = newDivisor * quotient;

        // Ensure at least some items
        if (newDividend === 0) return generateLevel();

        setDivisor(newDivisor);
        setDividend(newDividend);

        // Populate Jar
        const items = Array.from({ length: newDividend }).map((_, i) => `cookie-${i}-${Date.now()}`);
        setJarItems(items);

        // Init Plates
        const initialPlates = {};
        for (let i = 0; i < newDivisor; i++) {
            initialPlates[`plate-${i}`] = [];
        }
        setPlates(initialPlates);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && over.data.current.type === 'plate') {
            // Move from Jar to Plate
            setJarItems(prev => prev.filter(id => id !== active.id));
            setPlates(prev => ({
                ...prev,
                [over.id]: [...prev[over.id], active.id]
            }));
        }
    };

    // Check Win Condition
    useEffect(() => {
        if (jarItems.length === 0) {
            const counts = Object.values(plates).map(p => p.length);
            const target = dividend / divisor;
            const allCorrect = counts.every(c => c === target);

            if (allCorrect) {
                setFeedback({ visible: true, correct: true });
                setTimeout(() => {
                    setFeedback({ visible: false, correct: false });
                    generateLevel();
                }, 2000);
            }
        }
    }, [jarItems, plates, dividend, divisor]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <Mascot message={`Share ${dividend} cookies equally among ${divisor} friends!`} />

                {/* The Jar (Source) */}
                <div className="mt-8 p-6 bg-white/50 rounded-3xl border-2 border-white min-h-[150px] min-w-[300px] flex flex-wrap gap-4 justify-center items-center shadow-inner">
                    {jarItems.map(id => (
                        <DraggableItem key={id} id={id} />
                    ))}
                    {jarItems.length === 0 && (
                        <span className="text-gray-400 font-bold">Empty!</span>
                    )}
                </div>

                {/* The Plates (Targets) */}
                <div className="mt-12 flex flex-wrap gap-8 justify-center">
                    {Object.entries(plates).map(([id, items]) => (
                        <div key={id} className="flex flex-col items-center gap-2">
                            <Plate id={id} items={items} />
                            <span className="text-gray-400 font-bold">Friend {id.split('-')[1] * 1 + 1}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-xl text-soft-charcoal font-bold">
                    Goal: {dividend} ÷ {divisor} = ?
                </div>

                <FeedbackModal
                    isVisible={feedback.visible}
                    isCorrect={feedback.correct}
                    onClose={() => setFeedback({ ...feedback, visible: false })}
                />
            </div>
        </DndContext>
    );
};

export default DivisionModule;
