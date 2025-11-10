import React, { useState } from 'react';
import { PlusIcon } from './icons';

interface TodoInputProps {
  addTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-sky-400 bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
      />
      <button
        type="submit"
        className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-yellow-500 dark:from-sky-400 dark:to-lime-400 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        aria-label="Add todo"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default TodoInput;
