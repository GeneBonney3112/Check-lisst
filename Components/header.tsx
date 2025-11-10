import React from 'react';
import { Theme } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 dark:from-sky-400 dark:via-rose-400 dark:to-lime-400">
        Chroma Checklist
      </h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-700 dark:text-gray-200 bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm shadow-md hover:scale-110 transition-transform duration-200"
        aria-label="Toggle theme"
      >
        {theme === Theme.Light ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>
    </header>
  );
};

export default Header;
