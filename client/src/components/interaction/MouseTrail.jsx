import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MouseTrail = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add new particle
            const newParticle = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now()
            };

            setTrail((prev) => [...prev.slice(-15), newParticle]); // Keep last 15
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cleanup old particles
    useEffect(() => {
        const interval = setInterval(() => {
            setTrail((prev) => prev.slice(1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {trail.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            left: particle.x,
                            top: particle.y,
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#F6Ad55', // Orange sparkle
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #F6Ad55'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default MouseTrail;
