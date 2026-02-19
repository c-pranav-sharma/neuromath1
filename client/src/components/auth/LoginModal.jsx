import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProgress } from '../../context/UserProgressContext';
import { useNavigate } from 'react-router-dom';
import Mascot from '../common/Mascot';

const LoginModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const { login } = useUserProgress();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (name.trim()) {
            await login(name);
            onClose();
            navigate('/dashboard');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8"
                    >
                        <form onSubmit={handleLogin} className="flex flex-col gap-6 items-center">
                            <Mascot message="What is your name?" happy={true} />

                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-center text-3xl p-4 rounded-2xl border-2 border-gray-200 focus:border-air-force-blue focus:ring-4 focus:ring-air-force-blue/20 outline-none transition-all bg-white"
                                autoFocus
                            />

                            <button
                                type="submit"
                                className="w-full py-4 text-xl font-bold text-white bg-air-force-blue rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                            >
                                Let's Go!
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
