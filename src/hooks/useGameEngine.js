import { useState, useEffect, useCallback } from 'react';
import { WORDS } from '../data/words';

export const useGameEngine = () => {
    const [difficulty, setDifficulty] = useState(null);
    const [currentWord, setCurrentWord] = useState(null);
    const [scrambledWord, setScrambledWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('scramble_high_score') || '0')
    );
    const [timer, setTimer] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [gameState, setGameState] = useState('landing'); // landing, playing, gameOver
    const [message, setMessage] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [level, setLevel] = useState(1);

    const scramble = (word) => {
        let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        if (scrambled === word && word.length > 1) return scramble(word);
        return scrambled;
    };

    const getRandomWord = useCallback((level) => {
        const list = WORDS[level];
        return list[Math.floor(Math.random() * list.length)];
    }, []);

    const startGame = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
        const wordObj = getRandomWord(selectedDifficulty);
        setCurrentWord(wordObj);
        setScrambledWord(scramble(wordObj.word));
        setScore(0);
        setLevel(1);
        setTimer(selectedDifficulty === 'easy' ? 45 : selectedDifficulty === 'medium' ? 30 : 20);
        setGameState('playing');
        setIsActive(true);
        setUserInput("");
        setMessage("");
        setShowHint(false);
    };

    const nextWord = useCallback(() => {
        const wordObj = getRandomWord(difficulty);
        setCurrentWord(wordObj);
        setScrambledWord(scramble(wordObj.word));
        setUserInput("");
        setMessage("");
        setShowHint(false);
        setLevel(prev => prev + 1);
        // Reset timer with a small bonus based on level
        setTimer(prev => prev + 5);
    }, [difficulty, getRandomWord]);

    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setGameState('gameOver');
            setIsActive(false);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('scramble_high_score', score.toString());
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timer, score, highScore]);

    const checkWord = () => {
        if (userInput.toUpperCase() === currentWord.word.toUpperCase()) {
            setScore(prev => prev + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30));
            setMessage("Correct!");
            setTimeout(() => {
                nextWord();
            }, 1000);
            return true;
        } else {
            setMessage("Try again!");
            return false;
        }
    };

    const resetGame = () => {
        setGameState('landing');
        setScore(0);
        setIsActive(false);
    };

    return {
        difficulty,
        currentWord,
        scrambledWord,
        userInput,
        setUserInput,
        score,
        highScore,
        timer,
        gameState,
        message,
        showHint,
        setShowHint,
        level,
        startGame,
        checkWord,
        resetGame
    };
};
