import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
    // const { colors } = useTheme(); // Use theme if available, else fallback
    const colors = {
        primary: '#90cdf4',
        text: '#2d3748'
    };

    return (
        <header style={{
            backgroundColor: colors.primary,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Link to="/" style={{ textDecoration: 'none', color: colors.text, fontSize: '1.5rem', fontWeight: 'bold' }}>
                NeuroMath
            </Link>
            <nav>
                <Link to="/parents" style={{ textDecoration: 'none', color: colors.text, marginLeft: '1rem' }}>
                    Parents Corner
                </Link>
            </nav>
        </header>
    );
};

export default Header;
