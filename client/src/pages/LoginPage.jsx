import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserProgress } from '../context/UserProgressContext';
import Mascot from '../components/common/Mascot';

const LoginPage = () => {
    const [name, setName] = useState('');
    const { login } = useUserProgress();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim()) {
            await login(name);
            navigate('/');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #E6FFFA 0%, #EBF8FF 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decorations */}
            <motion.div
                className="float"
                style={{ position: 'absolute', top: '10%', left: '10%', width: '100px', height: '100px', borderRadius: '50%', background: '#F6E05E', opacity: 0.2 }}
            />
            <motion.div
                className="float"
                style={{ position: 'absolute', bottom: '20%', right: '10%', width: '150px', height: '150px', borderRadius: '50%', background: '#63B3ED', opacity: 0.1, animationDelay: '1s' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Mascot message="Hi! I'm Robo. What's your name?" />

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '3rem',
                        borderRadius: '30px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        width: '90%',
                        maxWidth: '450px',
                        marginTop: '2rem',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name here..."
                        style={{
                            padding: '1.2rem',
                            fontSize: '1.5rem',
                            borderRadius: '20px',
                            border: '3px solid #E2E8F0',
                            textAlign: 'center',
                            fontFamily: 'Verdana, sans-serif',
                            color: '#2D3748',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#63B3ED'}
                        onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        style={{
                            backgroundColor: '#48BB78',
                            color: 'white',
                            fontSize: '1.5rem',
                            padding: '1.2rem',
                            borderRadius: '50px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 10px 20px rgba(72, 187, 120, 0.3)'
                        }}
                    >
                        Let's Play!
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default LoginPage;
