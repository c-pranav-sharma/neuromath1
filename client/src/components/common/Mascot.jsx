import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Mascot = ({ message, happy = true }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
            <AnimatePresence>
                {/* Speech Bubble */}
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        style={{
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                            marginBottom: '1rem',
                            maxWidth: '280px',
                            textAlign: 'center',
                            position: 'relative',
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#4a5568'
                        }}
                    >
                        {message}
                        {/* Triangle */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '10px solid white'
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Robot SVG */}
            <motion.svg
                width="180"
                height="180" // Slightly larger
                viewBox="0 0 200 200"
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }} // Floating effect
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
                {/* Body */}
                <rect x="50" y="80" width="100" height="80" rx="20" fill="#63B3ED" />
                <rect x="60" y="90" width="80" height="60" rx="10" fill="#BEE3F8" />

                {/* Head */}
                <rect x="60" y="20" width="80" height="55" rx="15" fill="#63B3ED" />
                <rect x="70" y="30" width="60" height="35" rx="10" fill="white" />

                {/* Antenna */}
                <line x1="100" y1="20" x2="100" y2="5" stroke="#4A5568" strokeWidth="4" />
                <motion.circle
                    cx="100" cy="5" r="8" fill="#F6E05E"
                    animate={{ fill: ["#F6E05E", "#ECC94B", "#F6E05E"] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                />

                {/* Eyes */}
                <motion.circle cx="85" cy="45" r="5" fill="#2D3748"
                    animate={{ scaleY: [1, 0.1, 1], transition: { delay: 2, duration: 0.2 } }}
                />
                <motion.circle cx="115" cy="45" r="5" fill="#2D3748"
                    animate={{ scaleY: [1, 0.1, 1], transition: { delay: 2, duration: 0.2 } }}
                />

                {/* Mouth */}
                {happy ? (
                    <path d="M 85 58 Q 100 68 115 58" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
                ) : (
                    <path d="M 85 62 Q 100 52 115 62" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
                )}

                {/* Arms - Waving */}
                <motion.path
                    d="M 50 100 Q 20 120 10 90"
                    stroke="#63B3ED" strokeWidth="12" strokeLinecap="round" fill="none"
                    animate={{ d: ["M 50 100 Q 20 120 10 90", "M 50 100 Q 20 80 10 50", "M 50 100 Q 20 120 10 90"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <path d="M 150 100 Q 180 120 190 90" stroke="#63B3ED" strokeWidth="12" strokeLinecap="round" fill="none" />

            </motion.svg>
        </div>
    );
};

export default Mascot;
