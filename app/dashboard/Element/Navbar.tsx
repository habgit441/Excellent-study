'use client';

import { useState, useEffect, useRef } from 'react';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { useTheme } from 'next-themes';
import { RiGraduationCapFill } from 'react-icons/ri';
import Image from 'next/image';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const dropdownRef = useRef(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const image = localStorage.getItem('userProfileImage');
    if (image) {
      setProfileImage(image);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-6 py-3 shadow bg-white dark:bg-gray-900 flex items-center justify-between relative">

      <div className="flex items-center gap-2 font-bold text-green-600 text-xl">
        <RiGraduationCapFill size={28} />
        <span className="text-2xl">E Study</span>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FiUser size={20} />
          )}
          <span className="hidden md:inline text-sm font-medium">Profile</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FiUser className="mr-2" /> Profile
                </button>
              </li>
              <li>
                <button className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <HiOutlineShieldCheck className="mr-2" /> Privacy & Policy
                </button>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? (
                    <>
                      <BsSun className="mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <BsMoon className="mr-2" /> Dark Mode
                    </>
                  )}
                </button>
              </li>
              <li>
                <button className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FiSettings className="mr-2" /> Settings
                </button>
              </li>
              <li>
                <button className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-600 dark:hover:text-white">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
