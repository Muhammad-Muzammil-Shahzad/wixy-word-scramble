import React from 'react';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import GameOver from './components/GameOver';
import { useGameEngine } from './hooks/useGameEngine';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const engine = useGameEngine();
  const { gameState, startGame, resetGame, score, highScore, difficulty } = engine;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-600/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {gameState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage onStart={startGame} highScore={highScore} />
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GameScreen engine={engine} />
            </motion.div>
          )}

          {gameState === 'gameOver' && (
            <motion.div
              key="gameOver"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GameOver
                score={score}
                highScore={highScore}
                onRestart={() => startGame(difficulty)}
                onHome={resetGame}
                difficulty={difficulty}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-slate-800/50">
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">
          Build with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
