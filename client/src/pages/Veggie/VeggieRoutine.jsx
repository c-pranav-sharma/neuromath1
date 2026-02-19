import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, Sun, Sunset, Moon } from 'lucide-react';

const VeggieRoutine = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        timeOfDay: 'morning',
        veggieCount: '3',
        reminder: 'yes'
    });
    const [submitted, setSubmitted] = useState(false);

    // Load saved routine on mount
    useEffect(() => {
        const savedRoutine = localStorage.getItem('veggie_routine');
        if (savedRoutine) {
            setFormData(JSON.parse(savedRoutine));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save to localStorage
        localStorage.setItem('veggie_routine', JSON.stringify(formData));
        console.log('Routine Saved:', formData);

        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-calm-cream p-4 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12"
            >
                <div className="text-center mb-10">
                    <div className="text-6xl mb-4">📅</div>
                    <h2 className="text-3xl font-bold text-soft-charcoal mb-2">Daily Learning Routine</h2>
                    <p className="text-gray-500">Set a goal to become a veggie expert!</p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Time of Day */}
                        <div className="space-y-3">
                            <label className="block font-bold text-soft-charcoal text-lg">When do you want to learn?</label>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { val: 'morning', label: 'Morning', icon: <Sun className="text-orange-400" /> },
                                    { val: 'afternoon', label: 'Afternoon', icon: <Sunset className="text-red-400" /> },
                                    { val: 'evening', label: 'Evening', icon: <Moon className="text-purple-400" /> }
                                ].map(opt => (
                                    <label
                                        key={opt.val}
                                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all ${formData.timeOfDay === opt.val ? 'border-pink-400 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="timeOfDay"
                                            value={opt.val}
                                            checked={formData.timeOfDay === opt.val}
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        {opt.icon}
                                        <span className="font-bold text-sm text-gray-600">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Veggie Count */}
                        <div className="space-y-3">
                            <label className="block font-bold text-soft-charcoal text-lg">How many vegetables today?</label>
                            <select
                                name="veggieCount"
                                value={formData.veggieCount}
                                onChange={handleInputChange}
                                className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-pink-400 focus:bg-white outline-none transition-all text-lg"
                            >
                                <option value="1">1 Veggie</option>
                                <option value="2">2 Veggies</option>
                                <option value="3">3 Veggies</option>
                            </select>
                        </div>

                        {/* Reminder Toggle */}
                        <div className="space-y-3">
                            <label className="block font-bold text-soft-charcoal text-lg">Send me a reminder?</label>
                            <div className="flex gap-6">
                                <label className={`flex items-center gap-3 cursor-pointer px-6 py-3 rounded-xl border-2 transition-all ${formData.reminder === 'yes' ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 text-gray-400'}`}>
                                    <input
                                        type="radio"
                                        name="reminder"
                                        value="yes"
                                        checked={formData.reminder === 'yes'}
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                    <Bell size={20} />
                                    <span className="font-bold">Yes, please!</span>
                                </label>
                                <label className={`flex items-center gap-3 cursor-pointer px-6 py-3 rounded-xl border-2 transition-all ${formData.reminder === 'no' ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 text-gray-400'}`}>
                                    <input
                                        type="radio"
                                        name="reminder"
                                        value="no"
                                        checked={formData.reminder === 'no'}
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                    <BellOff size={20} />
                                    <span className="font-bold">No thanks</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-4 bg-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-pink-600 transition-all transform hover:-translate-y-1">
                            Save Routine
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-8 animate-pop">
                        <div className="text-6xl mb-6">✅</div>
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Routine Saved!</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            We'll help you stick to your goal of learning {formData.veggieCount} veggies in the {formData.timeOfDay}!
                        </p>
                        <button
                            onClick={() => navigate('/veggie')}
                            className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                )}

                {!submitted && (
                    <div className="mt-8 text-center bg-gray-50 border-t border-gray-100 p-8 rounded-b-[2rem] -mx-8 -mb-8 md:-mx-12 md:-mb-12">
                        <button
                            onClick={() => navigate('/veggie')}
                            className="flex items-center gap-2 mx-auto text-gray-400 hover:text-soft-charcoal font-bold transition-colors"
                        >
                            <ArrowLeft size={20} /> Cancel
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default VeggieRoutine;
