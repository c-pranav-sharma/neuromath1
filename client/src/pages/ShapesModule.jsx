import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Square, Circle, Triangle, Star, Hexagon } from 'lucide-react';
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';

const DraggableShape = ({ id, type, scale = 1 }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { type }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${isDragging ? 1.1 : scale})`,
    } : { transform: `scale(${scale})` };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:shadow-xl transition-all ${isDragging ? 'opacity-50 z-50' : ''}`}
        >
            {type === 'square' && <Square size={60} className="text-air-force-blue" fill="currentColor" />}
            {type === 'circle' && <Circle size={60} className="text-muted-green" fill="currentColor" />}
            {type === 'triangle' && <Triangle size={60} className="text-soft-amber" fill="currentColor" />}
            {type === 'star' && <Star size={60} className="text-yellow-400" fill="currentColor" />}
            {type === 'hexagon' && <Hexagon size={60} className="text-purple-400" fill="currentColor" />}
        </div>
    );
};

const DropZone = ({ type, icon }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `drop-${type}`,
        data: { type }
    });

    return (
        <div
            ref={setNodeRef}
            className={`w-40 h-40 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center transition-colors gap-2 ${isOver ? 'border-focus-ring bg-focus-ring/10' : 'border-gray-300 bg-gray-50'}`}
        >
            {icon}
            <span className="text-gray-400 font-bold capitalize">{type}s</span>
        </div>
    );
};

const ShapesModule = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ visible: false, correct: false });
    const [shapes, setShapes] = useState([]);
    const [targets, setTargets] = useState([]);

    React.useEffect(() => {
        generateLevel();
    }, []);

    const generateLevel = () => {
        const allTypes = ['square', 'circle', 'triangle', 'star', 'hexagon'];
        // Pick exactly 3 distinct target types
        const shuffledTypes = [...allTypes].sort(() => 0.5 - Math.random()).slice(0, 3);
        setTargets(shuffledTypes);

        // Generate exactly 1 shape for each target type to ensure every shape has a home
        const newShapes = shuffledTypes.map((type, index) => ({
            id: `s-${index}-${Date.now()}`,
            type,
            scale: 0.8 + Math.random() * 0.4 // Random size between 0.8x and 1.2x
        }));

        // Shuffle the shapes so they don't appear in the same order as targets
        setShapes(newShapes.sort(() => 0.5 - Math.random()));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (active.data.current.type === over.data.current.type) {
            setFeedback({ visible: true, correct: true });
            setShapes((prev) => prev.filter(s => s.id !== active.id));
            setTimeout(() => setFeedback({ visible: false, correct: false }), 1000);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <Mascot message="Sort the shapes into the correct boxes!" />

                <div className="mt-12 flex gap-8">
                    {targets.map(type => (
                        <DropZone
                            key={type}
                            type={type}
                            icon={
                                type === 'square' ? <Square size={40} /> :
                                    type === 'circle' ? <Circle size={40} /> :
                                        type === 'triangle' ? <Triangle size={40} /> :
                                            type === 'star' ? <Star size={40} /> :
                                                <Hexagon size={40} />
                            }
                        />
                    ))}
                </div>

                <div className="mt-16 flex gap-8 flex-wrap justify-center">
                    {shapes.map(s => (
                        <DraggableShape key={s.id} id={s.id} type={s.type} scale={s.scale} />
                    ))}
                </div>

                {shapes.length === 0 && targets.length > 0 && (
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <div className="text-2xl font-bold text-muted-green animate-bounce">
                            All done! Great job!
                        </div>
                        <button
                            onClick={generateLevel}
                            className="px-6 py-3 bg-air-force-blue text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            Play Again
                        </button>
                    </div>
                )}

                <FeedbackModal
                    isVisible={feedback.visible}
                    isCorrect={feedback.correct}
                    onClose={() => setFeedback({ ...feedback, visible: false })}
                />
            </div>
        </DndContext>
    );
};

export default ShapesModule;
