'use client';

import { useState } from 'react';
import {
  RiDashboardLine,
  
} from 'react-icons/ri';
import {
  MdOutlineAnnouncement,
  MdOutlinePayment
} from 'react-icons/md';
import { PiExamLight } from 'react-icons/pi';
import { LuClipboardList } from 'react-icons/lu';
import {
  
  FiHelpCircle
} from 'react-icons/fi';
import { BsChevronRight } from 'react-icons/bs';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { label: 'Dashboard', icon: <RiDashboardLine />, active: true },
    { label: 'Announcements', icon: <MdOutlineAnnouncement /> },
    { label: 'Courses', icon: <LuClipboardList /> },
    { label: 'Exams & Result', icon: <PiExamLight /> },
    { label: 'Attendance', icon: <LuClipboardList /> },
    { label: 'Payments', icon: <MdOutlinePayment /> },
  ];

  const footerLinks = [
    { label: 'Saved', icon: <LuClipboardList /> },
    { label: 'Help & Support', icon: <FiHelpCircle /> },
  ];

  return (
    <div
      className={clsx(
        'h-screen fixed left-0 z-40 flex flex-col justify-between transition-all duration-300 shadow-lg',
        isOpen ? 'w-64' : 'w-20',
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      )}
    >
    
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {links.map(({ label, icon, active }) => (
            <div
              key={label}
              className={clsx(
                'flex items-center gap-4 py-2 px-3 cursor-pointer rounded-md hover:bg-green-500 transition',
                active ? 'bg-green-600 text-white font-semibold' : ''
              )}
            >
              {icon}
              {isOpen && <span>{label}</span>}
            </div>
          ))}
        </nav>
      </div>
      

 
      <div className="space-y-2 px-2 pb-4">
        {footerLinks.map(({ label, icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700 rounded-md transition"
          >
            {icon}
            {isOpen && <span>{label}</span>}
          </div>

        ))}
    </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-full shadow-md hover:bg-green-600 transition"
      >
        <BsChevronRight className={clsx('transition-transform', isOpen && 'rotate-180')} />
      </button>
    </div>
    
  );
}
