import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Grid2X2, PieChart, Shapes } from 'lucide-react';
import Mascot from '../components/common/Mascot';

const MainMenu = () => {
    const modules = [
        { name: 'Addition', path: '/addition', icon: <Calculator size={64} color="white" />, color: '#63B3ED', bg: 'linear-gradient(135deg, #63B3ED 0%, #4299E1 100%)' },
        { name: 'Multiplication', path: '/multiplication', icon: <Grid2X2 size={64} color="white" />, color: '#48BB78', bg: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)' },
        { name: 'Fractions', path: '/fractions', icon: <PieChart size={64} color="white" />, color: '#9F7AEA', bg: 'linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)' },
        { name: 'Shapes', path: '/shapes', icon: <Shapes size={64} color="white" />, color: '#ECC94B', bg: 'linear-gradient(135deg, #ECC94B 0%, #D69E2E 100%)' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                <Mascot message="Pick a game to start learning!" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2.5rem',
                    padding: '1rem',
                }}
            >
                {modules.map((mod) => (
                    <motion.div key={mod.name} variants={itemVariants}>
                        <Link to={mod.path} style={{ textDecoration: 'none' }}>
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: mod.bg,
                                    padding: '2rem',
                                    borderRadius: '30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    height: '220px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Decorative Circles */}
                                <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                <div style={{ position: 'absolute', bottom: -30, right: -10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />

                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                >
                                    {mod.icon}
                                </motion.div>
                                <h2 style={{
                                    marginTop: '1.5rem',
                                    fontSize: '1.8rem',
                                    fontFamily: 'Verdana',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    {mod.name}
                                </h2>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MainMenu;
