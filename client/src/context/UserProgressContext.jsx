import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserProgressContext = createContext();

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userId) {
            // Ideally fetch user details here to confirm validity
            // For now, we trust the local storage ID for simplicity in this demo
        }
    }, [userId]);

    const login = async (username) => {
        try {
            const res = await axios.post('http://localhost:5000/api/reports/user', { username });
            const userData = res.data.data;
            setUserId(userData._id);
            setUser(userData);
            localStorage.setItem('userId', userData._id); // Persist login
        } catch (err) {
            console.error("Login/Register failed", err);
        }
    };

    const logout = () => {
        setUserId(null);
        setUser(null);
        localStorage.removeItem('userId');
    };

    return (
        <UserProgressContext.Provider value={{ userId, user, login, logout }}>
            {children}
        </UserProgressContext.Provider>
    );
};
