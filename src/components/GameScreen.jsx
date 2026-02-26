import React, { useEffect, useRef } from 'react';
import { Timer, Trophy, Lightbulb, RotateCcw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const GameScreen = ({ engine }) => {
    const {
        scrambledWord,
        userInput,
        setUserInput,
        score,
        timer,
        message,
        showHint,
        setShowHint,
        currentWord,
        level,
        checkWord,
        resetGame
    } = engine;

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [scrambledWord]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isCorrect = checkWord();
        if (isCorrect) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0ea5e9', '#8b5cf6', '#10b981']
            });
        }
    };

    const timerColor = timer < 10 ? 'text-red-500' : timer < 20 ? 'text-yellow-500' : 'text-primary-400';

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 px-4 py-8">
            {/* Header Stats */}
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl glass border-slate-700/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                        <Trophy size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Score</p>
                        <p className="text-xl font-black text-white">{score}</p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Level</p>
                    <p className="text-xl font-black text-white">{level}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${timerColor}`}>
                        <Timer size={20} className={timer < 10 ? 'animate-pulse' : ''} />
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Time</p>
                        <p className={`text-xl font-black ${timerColor}`}>{timer}s</p>
                    </div>
                </div>
            </div>

            {/* Main Game Card */}
            <motion.div
                layout
                className="glass rounded-3xl p-10 md:p-16 border-slate-700/50 relative overflow-hidden"
            >
                {/* Scrambled Word */}
                <div className="space-y-6">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                        {scrambledWord.split("").map((char, i) => (
                            <motion.div
                                key={`${scrambledWord}-${i}`}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.05, type: 'spring' }}
                                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-xl"
                            >
                                <span className="text-2xl md:text-4xl font-black text-white select-none">
                                    {char}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                                placeholder="Type your word..."
                                className="w-full bg-slate-950/50 border-2 border-slate-700 rounded-2xl py-6 px-8 text-3xl font-bold text-center tracking-widest focus:border-primary-500 focus:outline-none transition-all duration-300 placeholder:text-slate-700 uppercase"
                            />
                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`absolute -bottom-8 left-0 right-0 text-center font-bold ${message.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}
                                    >
                                        {message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                            >
                                Check <ArrowRight size={24} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowHint(!showHint)}
                                className={`w-20 rounded-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${showHint ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                            >
                                <Lightbulb size={28} />
                            </button>
                        </div>
                    </form>

                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-8 p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/30 text-yellow-200/80 italic text-lg"
                            >
                                <strong>Hint:</strong> {currentWord.hint}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Footer Actions */}
            <div className="flex justify-center">
                <button
                    onClick={resetGame}
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-sm tracking-widest font-bold cursor-pointer"
                >
                    <RotateCcw size={16} /> Exit Game
                </button>
            </div>
        </div>
    );
};

export default GameScreen;
