import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vegetables } from './data';
import VeggieImage from './VeggieImage';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';

function VeggieQuiz() {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [quizOptions, setQuizOptions] = useState([]);
    const [feedback, setFeedback] = useState("");

    // Routine Logic State
    const [goal, setGoal] = useState(null);
    const [progress, setProgress] = useState(0);
    const [goalReached, setGoalReached] = useState(false);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    // Initialize quiz & Load Goal
    useEffect(() => {
        const savedRoutine = localStorage.getItem('veggie_routine');
        if (savedRoutine) {
            const parsed = JSON.parse(savedRoutine);
            setGoal(parseInt(parsed.veggieCount));
        }
        generateQuestion();
    }, []);

    // Effect to speak the question when it changes
    useEffect(() => {
        if (currentQuestion && !goalReached) {
            const timer = setTimeout(() => {
                speak(`Find the ${currentQuestion.name}`);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, goalReached]);

    // Effect to speak feedback when it changes
    useEffect(() => {
        if (feedback === "Correct!") {
            speak("Good job!");
        } else if (feedback === "Try Again") {
            speak("Try again");
        }
    }, [feedback]);

    const generateQuestion = () => {
        const randomVeg = vegetables[Math.floor(Math.random() * vegetables.length)];

        // Logic: Get 3 distinct wrong options
        const distractors = vegetables
            .filter(v => v.id !== randomVeg.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const options = [randomVeg, ...distractors].sort(() => 0.5 - Math.random());

        setCurrentQuestion(randomVeg);
        setQuizOptions(options);
        setFeedback("");
    };

    const handleAnswer = (selectedName) => {
        // Load existing stats
        const stats = JSON.parse(localStorage.getItem('veggie_stats') || '{}');
        const vegName = currentQuestion.name;

        // Initialize if not exists
        if (!stats[vegName]) {
            stats[vegName] = { correct: 0, wrong: 0 };
        }

        if (selectedName === currentQuestion.name) {
            stats[vegName].correct += 1; // Increment correct

            const newScore = score + 1;
            const newProgress = progress + 1;

            setScore(newScore);
            setFeedback("Correct!");
            setProgress(newProgress);

            // Check Routine Goal
            if (goal && newProgress >= goal) {
                setTimeout(() => {
                    setGoalReached(true);
                    speak(`Goal complete! You found ${goal} vegetables!`);
                }, 1000);
            } else {
                setTimeout(generateQuestion, 1500);
            }
        } else {
            stats[vegName].wrong += 1; // Increment wrong
            setFeedback("Try Again");
        }

        // Save updated stats
        localStorage.setItem('veggie_stats', JSON.stringify(stats));
    };

    if (goalReached) {
        return (
            <div className="min-h-screen bg-calm-cream flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-8xl mb-6"
                >
                    🏆
                </motion.div>
                <h1 className="text-4xl font-bold text-soft-charcoal mb-4">Daily Goal Met!</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Amazing! You found <b>{goal}</b> vegetables just like you planned!
                </p>
                <button
                    onClick={() => navigate('/veggie')}
                    className="px-8 py-3 bg-air-force-blue text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                >
                    Back Home
                </button>
            </div>
        );
    }

    if (!currentQuestion) return <div className="min-h-screen grid place-items-center bg-calm-cream">Loading Quiz...</div>;

    return (
        <div className="min-h-screen bg-calm-cream p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
                    {goal ? (
                        <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-bold border border-green-200">
                            Goal: {progress} / {goal}
                        </div>
                    ) : <div></div>}

                    <div className="text-xl font-bold text-soft-charcoal">
                        Score: {score}
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-soft-charcoal">
                        Where is the <span className="text-pink-500">{currentQuestion.name}</span>?
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {quizOptions.map((veg) => (
                        <motion.div
                            key={veg.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white rounded-3xl p-6 shadow-md border-2 border-gray-100 cursor-pointer flex items-center justify-center aspect-square"
                            onClick={() => handleAnswer(veg.name)}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <VeggieImage src={veg.image} alt={veg.name} emoji={veg.emoji} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className={`text-center mt-8 h-8 text-2xl font-bold ${feedback === "Correct!" ? "text-green-600" : "text-red-500"}`}>
                    {feedback}
                </div>

                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => navigate('/veggie')}
                        className="flex items-center gap-2 text-gray-500 hover:text-soft-charcoal transition-colors font-bold"
                    >
                        <ArrowLeft size={20} /> Quit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VeggieQuiz;
