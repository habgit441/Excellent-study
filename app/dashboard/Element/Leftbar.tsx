'use client';

import { useState } from 'react';
import {
  RiDashboardLine,
  RiMenuLine
} from 'react-icons/ri';
import { MdOutlineAnnouncement, MdOutlinePayment } from 'react-icons/md';
import { PiExamLight } from 'react-icons/pi';
import { LuClipboardList } from 'react-icons/lu';
import {
  FiLogOut,
  FiUser,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import { BsChevronRight } from 'react-icons/bs';
import clsx from 'clsx';

export default function Sidebar({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);

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
    { label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div
      className={clsx(
        'h-[92vh] fixed top-[64px] left-0 z-40 flex flex-col justify-between transition-all duration-300 shadow-lg',
        isOpen ? 'w-64' : 'w-20',
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      )}
    >
        
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-2 p-4">
          {links.map(({ label, icon, active }) => (
            <div
              key={label}
              className={clsx(
                'flex items-center gap-4 py-2 px-2 cursor-pointer hover:bg-green-500 rounded-md transition',
                active ? 'bg-green-600 text-white font-bold' : ''
              )}
            >
              {icon}
              {isOpen && <span>{label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-2 p-4">
        {footerLinks.map(({ label, icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 py-2 px-2 cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700 rounded-md transition"
          >
            {icon}
            {isOpen && <span>{label}</span>}
          </div>
        ))}

        <div
          className="flex items-center gap-4 py-2 px-2 cursor-pointer text-red-500 hover:bg-red-600 hover:text-white rounded-md transition"
        >
          <FiLogOut />
          {isOpen && <span>Logout</span>}
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <BsChevronRight className={clsx('transition-transform', isOpen && 'rotate-180')} />
      </button>
    </div>
  );
}
