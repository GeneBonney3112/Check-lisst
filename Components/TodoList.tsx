import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { TrashIcon, EditIcon, CheckIcon } from './icons';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center gap-3 p-4 rounded-xl shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md animated-gradient bg-gradient-to-r from-white/30 via-transparent to-white/30 dark:from-gray-800/30 dark:via-transparent dark:to-gray-800/30 transition-all duration-300">
      <div 
        onClick={() => toggleTodo(todo.id)}
        className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center cursor-pointer border-2 transition-all duration-300
        ${todo.completed 
          ? 'bg-green-400 border-green-400 dark:bg-green-500 dark:border-green-500' 
          : 'bg-transparent border-gray-400 dark:border-gray-500 hover:border-green-400'
        }`}
      >
        {todo.completed && <CheckIcon className="w-4 h-4 text-white" />}
      </div>
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent p-1 -m-1 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-sky-400 text-gray-800 dark:text-gray-100"
        />
      ) : (
        <span 
          className={`flex-grow text-gray-800 dark:text-gray-100 transition-all duration-300 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
        >
          {todo.text}
        </span>
      )}
      
      <div className="flex gap-2">
        {!isEditing && (
          <button 
            onClick={handleEdit} 
            className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:scale-110 transition-transform" 
            aria-label="Edit todo"
          >
            <EditIcon className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={() => deleteTodo(todo.id)} 
          className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:scale-110 transition-transform" 
          aria-label="Delete todo"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};


export default TodoItem;
