import React, { useState, useCallback } from 'react';
import { challenges } from './constants';

const SparkleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const App: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);

  const getNewChallenge = useCallback(() => {
    let newChallenge = '';
    // Ensure we don't get the same challenge twice in a row, especially with a large list.
    if (challenges.length > 1) {
        do {
            const randomIndex = Math.floor(Math.random() * challenges.length);
            newChallenge = challenges[randomIndex];
        } while (newChallenge === currentChallenge);
    } else {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        newChallenge = challenges[randomIndex];
    }
    
    setCurrentChallenge(newChallenge);
    setAnimationKey(prevKey => prevKey + 1); // This triggers the remount animation
  }, [currentChallenge]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="w-full max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
            تحدي اليوم
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">
            اضغط على الزر واحصل على تحدٍ جديد لتحفيز يومك!
          </p>
        </header>

        <main className="mb-10">
          <div className="min-h-[12rem] flex items-center justify-center bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6 transition-all duration-300">
            {currentChallenge ? (
              <p key={animationKey} className="text-2xl sm:text-3xl font-semibold text-white animate-fade-in-up">
                {currentChallenge}
              </p>
            ) : (
              <p className="text-xl text-slate-400">
                هل أنت مستعد لتحدي اليوم؟
              </p>
            )}
          </div>
        </main>

        <footer>
          <button
            onClick={getNewChallenge}
            className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {currentChallenge ? 'تحدي جديد' : 'ابدأ التحدي'}
            <SparkleIcon />
          </button>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
