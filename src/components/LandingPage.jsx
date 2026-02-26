import React from 'react';
import { Trophy, HelpCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = ({ onStart, highScore }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500 drop-shadow-sm">
                    WORD SCRAMBLE
                </h1>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Test your vocabulary and speed! Unscramble the letters before the time runs out.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                {['easy', 'medium', 'hard'].map((level, index) => (
                    <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onStart(level)}
                        className={`glass p-8 rounded-2xl flex flex-col items-center space-y-4 group transition-all duration-300 hover:border-primary-500/50 cursor-pointer`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${level === 'easy' ? 'bg-green-500/20 text-green-400' :
                                level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                            }`}>
                            <Play className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold capitalize">{level}</h3>
                        <p className="text-sm text-gray-500 text-center">
                            {level === 'easy' ? 'Short words, more time. Perfect for beginners!' :
                                level === 'medium' ? 'Common words with a bit of a challenge.' :
                                    'Long, complex words. For the pros!'}
                        </p>
                    </motion.button>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-y-2 p-6 glass rounded-xl"
            >
                <div className="flex flex-col items-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                    <span className="text-gray-400 text-sm uppercase tracking-widest">High Score</span>
                    <span className="text-3xl font-bold text-white">{highScore}</span>
                </div>
            </motion.div>

            <div className="mt-8 text-gray-500 flex items-center gap-2">
                <HelpCircle size={16} />
                <span className="text-xs">How to play: Choose a difficulty and start unscrambling!</span>
            </div>
        </div>
    );
};

export default LandingPage;
