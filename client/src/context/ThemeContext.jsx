import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const theme = {
        colors: {
            background: '#f0f4f8', // Soft blue-grey
            primary: '#90cdf4', // Soft blue
            secondary: '#bcd0c7', // Sage green
            accent: '#d6bcfa', // Lavender
            text: '#2d3748', // Dark grey (not black)
            success: '#9ae6b4', // Soft green
            error: '#feb2b2', // Soft red
            card: '#ffffff'
        },
        fonts: {
            main: '"Verdana", sans-serif',
            dyslexic: '"OpenDyslexic", "Verdana", sans-serif'
        },
        spacing: {
            small: '0.5rem',
            medium: '1rem',
            large: '2rem'
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
