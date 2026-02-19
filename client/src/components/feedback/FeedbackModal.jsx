import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const FeedbackModal = ({ isVisible, isCorrect, onClose }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255,255,255,0.8)', // Light overlay
                        zIndex: 1000
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        style={{
                            padding: '3rem',
                            borderRadius: '20px',
                            backgroundColor: isCorrect ? '#9ae6b4' : '#feb2b2',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isCorrect ? (
                            <>
                                <Check size={64} color="#2d3748" />
                                <h2 style={{ fontFamily: 'Verdana', marginTop: '1rem', color: '#2d3748' }}>Good Job!</h2>
                            </>
                        ) : (
                            <>
                                <X size={64} color="#2d3748" />
                                <h2 style={{ fontFamily: 'Verdana', marginTop: '1rem', color: '#2d3748' }}>Try Again</h2>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackModal;
