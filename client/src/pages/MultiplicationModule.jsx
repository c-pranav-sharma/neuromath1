import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Mascot from '../components/common/Mascot';
import FeedbackModal from '../components/feedback/FeedbackModal';
import { useUserProgress } from '../context/UserProgressContext';
import axios from 'axios';

const LatticeCell = ({ digit1, digit2, isActive, onInput, values, status }) => {
    // values = { tens: '', ones: '' }
    // status = 'correct' | 'error' | 'neutral'

    return (
        <div className="relative w-32 h-32 border-4 border-soft-charcoal bg-white">
            {/* Diagonal Line */}
            <div className="absolute inset-0 border-l-2 border-soft-charcoal transform -rotate-45 scale-150 origin-center pointer-events-none opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom left, transparent 49%, #2D3436 49%, #2D3436 51%, transparent 51%)' }}></div>

            {/* Tens Input (Top Left Triangle) */}
            <div className="absolute top-1 left-1 w-1/2 h-1/2 flex items-center justify-center">
                <input
                    type="text"
                    maxLength={1}
                    value={values.tens}
                    onChange={(e) => onInput('tens', e.target.value)}
                    disabled={!isActive}
                    className={`w-10 h-10 text-center text-3xl font-bold bg-transparent outline-none focus:text-air-force-blue ${status === 'error' ? 'text-red-500' : 'text-soft-charcoal'}`}
                    placeholder={isActive ? "?" : ""}
                />
            </div>

            {/* Ones Input (Bottom Right Triangle) */}
            <div className="absolute bottom-1 right-1 w-1/2 h-1/2 flex items-center justify-center">
                <input
                    type="text"
                    maxLength={1}
                    value={values.ones}
                    onChange={(e) => onInput('ones', e.target.value)}
                    disabled={!isActive}
                    className={`w-10 h-10 text-center text-3xl font-bold bg-transparent outline-none focus:text-air-force-blue ${status === 'error' ? 'text-red-500' : 'text-soft-charcoal'}`}
                    placeholder={isActive ? "?" : ""}
                />
            </div>

            {/* Top Digit Display */}
            <div className="absolute -top-12 left-0 w-full text-center text-4xl font-bold text-soft-charcoal">
                {digit1}
            </div>
        </div>
    );
};

const MultiplicationModule = () => {
    const navigate = useNavigate();
    const { userId } = useUserProgress();
    const [num1, setNum1] = useState(123);
    const [num2, setNum2] = useState(4);

    // State for grid inputs: 3 cells, each has { tens: '', ones: '' }
    const [cellInputs, setCellInputs] = useState([
        { tens: '', ones: '' },
        { tens: '', ones: '' },
        { tens: '', ones: '' }
    ]);

    // State for diagonal sums [thousands, hundreds, tens, ones]
    // 3 cells implies max 4 diagonals (1st cell tens, 1st ones+2nd tens, 2nd ones+3rd tens, 3rd ones)
    // Actually for 123 * 4:
    // Cell 0 (1*4=04), Cell 1 (2*4=08), Cell 2 (3*4=12)
    // Diagonals:
    // 0: Cell0 Tens (0)
    // 1: Cell0 Ones + Cell1 Tens (4+0=4)
    // 2: Cell1 Ones + Cell2 Tens (8+1=9)
    // 3: Cell2 Ones (2)
    // Result: 0492 -> 492.

    const [finalInputs, setFinalInputs] = useState(['', '', '', '']);

    const [step, setStep] = useState(0); // 0-2: Filling cells, 3-6: Adding diagonals
    const [feedback, setFeedback] = useState({ visible: false, correct: false });

    // Init
    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        setNum1(Math.floor(Math.random() * 800) + 100);
        setNum2(Math.floor(Math.random() * 7) + 3);
        setCellInputs([
            { tens: '', ones: '' },
            { tens: '', ones: '' },
            { tens: '', ones: '' }
        ]);
        setFinalInputs(['', '', '', '']);
        setStep(0);
    };

    const digits = num1.toString().split('').map(Number);

    const handleCellInput = (colIndex, type, val) => {
        // Validate input is number
        if (!/^\d*$/.test(val)) return;

        const newInputs = [...cellInputs];
        newInputs[colIndex][type] = val;
        setCellInputs(newInputs);

        // Check if correct
        const digit = digits[colIndex];
        const product = digit * num2;
        const expectedTens = Math.floor(product / 10).toString();
        const expectedOnes = (product % 10).toString();

        // Check if both filled correctly
        const currentTens = type === 'tens' ? val : newInputs[colIndex].tens;
        const currentOnes = type === 'ones' ? val : newInputs[colIndex].ones;

        if (currentTens === expectedTens && currentOnes === expectedOnes) {
            // Move to next step
            if (step < 2) {
                setTimeout(() => setStep(step + 1), 500);
            } else {
                setTimeout(() => setStep(3), 500); // Start diagonals
            }
        }
    };

    const handleDiagonalInput = (diagIndex, val) => {
        if (!/^\d*$/.test(val)) return;
        const newFinals = [...finalInputs];
        newFinals[diagIndex] = val;
        setFinalInputs(newFinals);

        // Calculate expected sum for this diagonal
        // Cell 0 (Hundreds place of num1), Cell 1 (Tens), Cell 2 (Ones)
        // Diagonals from Left to Right? No, usually Right to Left.
        // Let's index diagonals 0 (Rightmost) to 3 (Leftmost).
        // Diag 0: Cell 2 Ones.
        // Diag 1: Cell 2 Tens + Cell 1 Ones.
        // Diag 2: Cell 1 Tens + Cell 0 Ones.
        // Diag 3: Cell 0 Tens.

        // Wait, carries! Interaction is tricky with simple inputs.
        // For simplicity in this demo, we'll assume no carries across diagonals or simplified validation
        // Actually, let's calculate the FULL expected result and map digits.
        const fullProduct = num1 * num2;
        const productStr = fullProduct.toString().padStart(4, '0'); // "0492"
        // Diag 0 is last char, Diag 3 is first char.
        // Let's match visual layout.
        // The input boxes should be aligned with the diagonals.

        // If `val` matches the expected digit at that position:
        // diagIndex 0 -> productStr[3]
        // diagIndex 1 -> productStr[2] ...

        const expectedDigit = productStr[3 - diagIndex];

        if (val === expectedDigit) {
            if (step - 3 === diagIndex) {
                if (step < 6) {
                    setTimeout(() => setStep(step + 1), 200);
                } else {
                    // Done
                    setFeedback({ visible: true, correct: true });
                    setTimeout(() => {
                        setFeedback({ visible: false, correct: false });
                        generateProblem();
                    }, 2500);
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-calm-cream p-6 flex flex-col items-center">
            <button
                onClick={() => navigate('/dashboard')}
                className="self-start mb-8 p-3 rounded-full bg-white text-soft-charcoal shadow-sm hover:bg-gray-50 flex items-center gap-2 font-bold"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <Mascot message={
                step < 3 ? "Multiply each number to fill the box!" : "Now add the numbers in the diagonal lanes!"
            } />

            <div className="mt-12 flex items-center gap-4">
                {/* The Grid */}
                <div className="flex relative">
                    {/* Side Number (Multiplier) */}
                    <div className="absolute -right-12 top-0 h-32 flex items-center text-4xl font-bold text-soft-charcoal">
                        {num2}
                    </div>

                    {digits.map((d, i) => (
                        <LatticeCell
                            key={i}
                            digit1={d}
                            digit2={num2}
                            values={cellInputs[i]}
                            isActive={step === i}
                            onInput={(type, val) => handleCellInput(i, type, val)}
                            status={step > i ? 'correct' : 'neutral'}
                        />
                    ))}
                </div>
            </div>

            {/* Diagonal Sums Inputs */}
            {step >= 3 && (
                <div className="mt-8 flex gap-12 pl-8">
                    {/* Inputs for 4 diagonals. 
                        Visual positioning is roughly under the "lanes". 
                        To keep it simple, we just line them up and label "Thousands, Hundreds..." or just boxes.
                     */}
                    {[3, 2, 1, 0].map((diagIdx) => (
                        <div key={diagIdx} className="flex flex-col items-center">
                            <div className={`w-1 h-8 bg-gray-300 mb-2 ${step - 3 === diagIdx ? 'animate-bounce bg-air-force-blue' : ''}`} />
                            <input
                                value={finalInputs[diagIdx]}
                                onChange={(e) => handleDiagonalInput(diagIdx, e.target.value)}
                                disabled={step - 3 !== diagIdx}
                                className={`w-16 h-16 text-center text-3xl font-bold border-2 rounded-xl outline-none ${step - 3 === diagIdx ? 'border-air-force-blue bg-white' : 'border-gray-200 bg-gray-50'}`}
                            />
                        </div>
                    ))}
                </div>
            )}

            <FeedbackModal
                isVisible={feedback.visible}
                isCorrect={feedback.correct}
                onClose={() => setFeedback({ ...feedback, visible: false })}
            />
        </div>
    );
};

export default MultiplicationModule;
