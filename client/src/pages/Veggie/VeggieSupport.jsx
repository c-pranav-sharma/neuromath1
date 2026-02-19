import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, HelpCircle, BarChart2 } from 'lucide-react';

const VeggieSupport = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('contact');
    const [formData, setFormData] = useState({
        name: '',
        parentName: '',
        email: '',
        message: '',
        category: 'general'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);

        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    parentName: '',
                    email: '',
                    message: '',
                    category: 'general'
                });
            }, 3000);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-calm-cream p-4 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden"
            >
                <div className="bg-yellow-50 p-8 text-center border-b border-yellow-100">
                    <div className="text-5xl mb-4">🥕</div>
                    <h2 className="text-3xl font-bold text-soft-charcoal mb-2">Veggie Support Center</h2>
                    <p className="text-gray-500">We're here to help you and your little learner!</p>
                </div>

                <div className="flex border-b border-gray-100">
                    {[
                        { id: 'contact', label: 'Write to Us', icon: <MessageCircle size={18} /> },
                        { id: 'faq', label: 'Common Questions', icon: <HelpCircle size={18} /> },
                        { id: 'progress', label: 'Progress', icon: <BarChart2 size={18} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === tab.id ? 'bg-white text-yellow-600 border-b-2 border-yellow-400' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-8">
                    {activeTab === 'contact' && (
                        <div className="max-w-xl mx-auto">
                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-pop">
                                    <div className="text-4xl mb-4">🎉</div>
                                    <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                                    <p className="text-green-600">Thanks for reaching out! We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Kid's Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Timmy"
                                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Parent's Name</label>
                                            <input
                                                type="text"
                                                name="parentName"
                                                required
                                                value={formData.parentName}
                                                onChange={handleInputChange}
                                                placeholder="Your Name"
                                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="parent@example.com"
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Topic</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all bg-white"
                                        >
                                            <option value="general">General Question</option>
                                            <option value="technical">App Issue</option>
                                            <option value="content">Content Suggestion</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="How can we help?"
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                                        />
                                    </div>

                                    <button type="submit" className="w-full py-3 bg-yellow-400 text-yellow-900 font-bold rounded-xl shadow-md hover:bg-yellow-500 transition-colors">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {activeTab === 'faq' && (
                        <div className="grid gap-4">
                            {[
                                { q: "🔊 Sound not working?", a: "Make sure your device volume is up. Sometimes browsers block auto-play until you interact with the page." },
                                { q: "🥦 Can I add more vegetables?", a: "Currently, the vegetable list is fixed, but we plan to add a 'Custom Veggie' feature in the next update!" },
                                { q: "📱 Does this work on iPad?", a: "Yes! Veggie Learn is fully responsive and works great on tablets and phones." },
                                { q: "🔒 Is my data safe?", a: "Absolutely. We don't store any personal data. This app runs entirely in your browser." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white border-2 border-gray-50 rounded-2xl p-6 hover:border-yellow-100 transition-colors">
                                    <h4 className="font-bold text-soft-charcoal mb-2">{item.q}</h4>
                                    <p className="text-gray-500 text-sm">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'progress' && <ProgressTab />}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                        onClick={() => navigate('/veggie')}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-soft-charcoal font-bold transition-colors"
                    >
                        <ArrowLeft size={18} /> Back Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const ProgressTab = () => {
    const statsJSON = localStorage.getItem('veggie_stats');
    const stats = statsJSON ? JSON.parse(statsJSON) : {};
    const entries = Object.entries(stats);

    const stars = entries.filter(([, data]) => data.correct >= data.wrong && data.correct > 0);
    const practice = entries.filter(([, data]) => data.wrong > data.correct);

    const clearStats = () => {
        if (window.confirm("Are you sure you want to reset all progress?")) {
            localStorage.removeItem('veggie_stats');
            window.location.reload();
        }
    };

    if (entries.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-4xl mb-4">🧐</div>
                <h3 className="text-xl font-bold text-gray-700">No Data Yet!</h3>
                <p className="text-gray-500">Play the Quiz to start tracking progress.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-bold text-yellow-500 mb-4 flex items-center gap-2"><span className="text-2xl">🌟</span> Super Star Veggies</h3>
                {stars.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {stars.map(([veg, data]) => (
                            <span key={veg} className="px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full font-bold text-sm">
                                {veg} <span className="ml-1 opacity-75">({data.correct}✅)</span>
                            </span>
                        ))}
                    </div>
                ) : <p className="text-gray-400 text-sm italic">Keep practicing to get stars!</p>}
            </div>

            <div>
                <h3 className="font-bold text-red-500 mb-4 flex items-center gap-2"><span className="text-2xl">💪</span> Needs Practice</h3>
                {practice.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {practice.map(([veg, data]) => (
                            <span key={veg} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-full font-bold text-sm">
                                {veg} <span className="ml-1 opacity-75">({data.wrong}❌)</span>
                            </span>
                        ))}
                    </div>
                ) : <p className="text-gray-400 text-sm italic">Wow! No tricky veggies found yet.</p>}
            </div>

            <button
                onClick={clearStats}
                className="text-sm text-gray-400 hover:text-red-500 underline mt-4"
            >
                Reset Progress
            </button>
        </div>
    );
};

export default VeggieSupport;
