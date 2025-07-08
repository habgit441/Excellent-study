'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  FiBell,
  FiMessageSquare,
  FiUserPlus,
  FiSettings,
  FiPlus,
  FiTrash,
} from 'react-icons/fi';
import { BsSun, BsMoon, BsChevronLeft } from 'react-icons/bs';
import clsx from 'clsx';

export default function Rightbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<string[]>([]);
  const [eventInput, setEventInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleAddEvent = () => {
    if (eventInput.trim()) {
      setEvents(prev => [...prev, eventInput]);
      setEventInput('');
    }
  };

  const handleDeleteEvent = (index: number) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const renderCalendar = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= lastDate; d++) days.push(d);

    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">
          {now.toLocaleString('default', { month: 'long' })}, {year}
        </h2>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 dark:text-gray-400">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm mt-2">
          {days.map((day, idx) =>
            day ? (
              <div
                key={idx}
                className="p-1 rounded hover:bg-green-500 hover:text-white transition"
              >
                {day}
              </div>
            ) : (
              <div key={idx}></div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <aside
          className={clsx(
            'h-[92vh] fixed top-[64px] right-0 z-40 w-72 p-4 flex flex-col gap-6 shadow-lg transition-all duration-300 overflow-y-auto',
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
          )}
        >
          <h2 className="text-lg font-semibold mt-6">Create Event</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Add event"
              className="flex-1 p-2 rounded-md border dark:bg-gray-800"
            />
            <button
              onClick={handleAddEvent}
              className="p-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
            >
              <FiPlus />
            </button>
          </div>

          <ul className="mt-2 space-y-2 text-sm">
            {events.map((event, idx) => (
              <li
                key={idx}
                className="p-2 rounded bg-green-100 dark:bg-gray-800 flex justify-between items-center"
              >
                <span>{event}</span>
                <FiTrash
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDeleteEvent(idx)}
                />
              </li>
            ))}
          </ul>

          {/* Calendar */}
          <h2 className="text-lg font-semibold mt-6">Calendar</h2>
          {renderCalendar()}

          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className="mt-6 flex items-center gap-4 p-3 rounded-md hover:bg-green-100 dark:hover:bg-gray-800 cursor-pointer transition"
          >
            
          </div>
        </aside>
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed top-1/2 right-0 transform -translate-y-1/2 z-50 p-2 rounded-l-md shadow-md transition',
          theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-green-500 text-white'
        )}
      >
        <BsChevronLeft
          className={clsx('transition-transform', !isOpen && 'rotate-180')}
        />
      </button>
    </>
  );
}
