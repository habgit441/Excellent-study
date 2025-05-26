'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [count, setCount] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText =
    "Ex Study is your top destination for mastering IQ tests and academic challenges. Track your progress, sharpen your skills, and prepare confidently for any exam — no matter the course or subject.";

  // Counter animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current >= 20) {
        clearInterval(interval);
        setCount(20);
      } else {
        current += 1;
        setCount(current);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Typing effect animation
  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText[i]);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 25);
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="bg-white text-black font-sans min-h-screen transition-all duration-500 ease-in-out">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-3 shadow-md bg-white transition-all duration-500">
        <div className="text-2xl font-bold text-green-600 flex items-center gap-2 transition-all">
          <span> <Image
            src="/images/Vector.svg"
            alt="Student"
            width={400}
            height={500}
            className="rounded-3xl w-full h-auto shadow-lg transition-all duration-500"
          /></span> Schooly
        </div>
        <ul className="hidden md:flex gap-6 text-sm text-gray-700 font-medium transition-all">
          <li className="hover:text-green-600 cursor-pointer transition-all duration-300">About us</li>
          <li className="hover:text-green-600 cursor-pointer transition-all duration-300">Contact Us</li>
          <li className="hover:text-green-600 cursor-pointer transition-all duration-300">Services</li>
          <li className="hover:text-green-600 cursor-pointer transition-all duration-300">FAQ</li>
        </ul>
        <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-all duration-300">
          Join Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between px-6 md:px-10 py-12 gap-12 items-center transition-all duration-500 ease-in-out">
        <div className="max-w-xl text-center md:text-left transition-all">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 transition-all duration-500">
            The{' '}
            <span className="inline-block bg-green-100 text-green-700 px-2 skew-x-[-10deg] transition-all">
              best
            </span>{' '}
            academy for you!
          </h1>
          <p className="text-gray-700 text-base leading-relaxed min-h-[120px] transition-all duration-500">
            {typedText}
            <span className="animate-pulse"></span>
          </p>
          <button className="mt-6 bg-green-600 hover:bg-green-700 transition-all duration-300 px-6 py-3 font-semibold text-white rounded">
            Join Us
          </button>
        </div>

        <div className="relative max-w-sm w-full transition-all duration-500">
          <Image
            src="/images/sophie.svg"
            alt="Student"
            width={400}
            height={500}
            className="rounded-4xl w-full h-auto shadow-lg transition-all duration-500"
          />

          <div className="absolute top-5 left-5 bg-blue text-white text-sm font-sm px-4 py-2 rounded-lg shadow transition-all duration-500">
            {count}k+<br />Total students
          </div>

          <div className="absolute bottom-5 left-[-60px] bg-white text-black text-sm px-3 py-2 rounded-xl border border-gray-300 shadow transition-all duration-500">
            <strong>Your Score!!</strong>
            <br />
            <small className="text-blue-600">Click to view ➝</small>
          </div>

          <div className="absolute bottom-5 right-0 bg-green-600 text-white px-3 py-2 rounded-xl flex items-center gap-2 shadow transition-all duration-500">
            <Image
              src="https://randomuser.me/api/portraits/women/1.jpg"
              width={30}
              height={30}
              className="rounded-full transition-all"
              alt="User1"
            />
            <Image
              src="https://randomuser.me/api/portraits/men/2.jpg"
              width={30}
              height={30}
              className="rounded-full transition-all"
              alt="User2"
            />
            <Image
              src="https://randomuser.me/api/portraits/women/3.jpg"
              width={30}
              height={30}
              className="rounded-full transition-all"
              alt="User3"
            />
            <Image
              src="https://randomuser.me/api/portraits/men/4.jpg"
              width={30}
              height={30}
              className="rounded-full transition-all"
              alt="User4"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
