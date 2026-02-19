import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUserProgress } from '../context/UserProgressContext';

const ParentDashboard = () => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [reportData, setReportData] = useState(null);
    const { userId } = useUserProgress();

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            setIsAuthenticated(true);
            fetchReport();
        } else {
            alert('Incorrect PIN');
        }
    };

    const fetchReport = async () => {
        // Fallback to local storage if context is lost on refresh (though context tries to init from local storage)
        const targetId = userId || localStorage.getItem('userId');

        if (!targetId) {
            alert("No user logged in to track.");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/reports/${targetId}`);
            setReportData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Parent Access</h2>
                <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN (1234)"
                        style={{ padding: '0.8rem', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e0' }}
                    />
                    <button type="submit" style={{ padding: '0.8rem', cursor: 'pointer', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: '8px' }}>Unlock</button>
                </form>
            </div>
        );
    }

    if (!reportData) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div style={{ fontSize: '1.5rem', color: '#718096' }}>Loading data...</div>
        </div>
    );

    const chartData = [
        { name: 'Addition', success: reportData.progress.addition.successCount, attempts: reportData.progress.addition.attempts },
        { name: 'Multiplication', success: reportData.progress.multiplication.successCount, attempts: reportData.progress.multiplication.attempts }
    ];

    // Simple logic to determine strongest/weakest area
    const addScore = reportData.progress.addition.attempts > 0 ? (reportData.progress.addition.successCount / reportData.progress.addition.attempts) : 0;
    const multiScore = reportData.progress.multiplication.attempts > 0 ? (reportData.progress.multiplication.successCount / reportData.progress.multiplication.attempts) : 0;

    const strongest = addScore >= multiScore ? 'Addition' : 'Multiplication';
    const weak = addScore >= multiScore ? 'Multiplication' : 'Addition';

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Verdana' }}>
            <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>Parent Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#718096', marginBottom: '0.5rem' }}>Strongest Skill</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#48bb78' }}>{strongest}</p>
                </div>
                <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#718096', marginBottom: '0.5rem' }}>Needs Practice</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f56565' }}>{weak}</p>
                </div>
            </div>

            <div style={{ marginTop: '3rem', height: '400px', backgroundColor: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#4a5568' }}>Progress Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barSize={60}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 14 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 14 }} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: '#f7fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                        <Legend />
                        <Bar dataKey="success" fill="#63b3ed" name="Successful Answers" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="attempts" fill="#cbd5e0" name="Total Attempts" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ParentDashboard;
