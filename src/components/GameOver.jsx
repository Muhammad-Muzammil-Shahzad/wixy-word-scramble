import React from 'react';
import { Trophy, RotateCcw, Home, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GameOver = ({ score, highScore, onRestart, onHome, difficulty }) => {
    const isNewHighScore = score > 0 && score >= highScore;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-3xl p-12 w-full max-w-lg text-center border-slate-700/50 shadow-2xl relative"
            >
                {isNewHighScore && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: -50, opacity: 1 }}
                        className="absolute -top-10 left-0 right-0 mx-auto w-max bg-yellow-500 text-slate-950 font-black px-6 py-2 rounded-full shadow-lg text-sm tracking-widest uppercase"
                    >
                        New High Score!
                    </motion.div>
                )}

                <div className="mb-8">
                    <Trophy className={`w-24 h-24 mx-auto ${isNewHighScore ? 'text-yellow-500' : 'text-slate-600'} mb-6`} />
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Time's Up!</h2>
                    <p className="text-slate-400 font-medium">Game Over - {difficulty} mode</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Final Score</p>
                        <p className="text-4xl font-black text-white">{score}</p>
                    </div>
                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">High Score</p>
                        <p className="text-4xl font-black text-white">{highScore}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onRestart}
                        className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer"
                    >
                        <RotateCcw size={20} /> Play Again
                    </button>

                    <div className="flex gap-4">
                        <button
                            onClick={onHome}
                            className="flex-1 glass border-slate-700 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                            <Home size={18} /> Menu
                        </button>
                        <button
                            className="glass border-slate-700 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center transition-all cursor-pointer"
                            onClick={() => {
                                alert("Score shared (mockup)");
                            }}
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GameOver;
