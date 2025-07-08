'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthForm from './AuthForm';
import Navbar from './Navbar';

export default function Hero() {
  const [count, setCount] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const fullText =
    "Ex Study is your top destination for mastering IQ tests and academic challenges. Track your progress, sharpen your skills, and prepare confidently for any exam — no matter the course or subject.";

  const words = ['best', 'smartest', 'cheapest', 'most fun', 'coolest'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current >= 200) {
        clearInterval(interval);
        setCount(200);
      } else {
        current += 1;
        setCount(current);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

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
  const greenLines = new Array(25).fill(0).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}vw`,
  delay: `${Math.random() * 10}s`,
  size: `${30 + Math.random() * 80}px`, // random height between 30 and 110px
}));

  return (
    <div
      className="bg-white text-black font-sans min-h-screen transition-all duration-500 ease-in-out"
      style={{
        backgroundImage:
          'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
<div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
  {greenLines.map((line) => (
    <div
      key={line.id}
      className="green-line"
      style={{
        left: line.left,
        height: line.size,
        animationDelay: line.delay,
      }}
    />
  ))}
</div>

</div>
      {/* Navbar */}
      <Navbar />

      {!isLogin ? (
        <section id="/" className="relative flex flex-col md:flex-row justify-between px-6 md:px-10 py-16 gap-12 items-center overflow-hidden">
          {/* Hero Content */}
          <div className="max-w-xl text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 transition duration-700">
  The{' '}
  <span
    className="inline-block  text-green-700 px-2 skew-x-[-10deg] text-center"
    style={{ display: 'inline-block', width: '300px' }} 
  >
    {words[currentWordIndex]}
  </span>{' '}
  academy for you!
</h1>
            <p className="text-gray-700 text-base leading-relaxed min-h-[120px] whitespace-pre-wrap transition-opacity duration-500 ease-in">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
            <button
              onClick={() => setIsLogin(true)}
              className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 font-semibold text-white rounded transition duration-300"
            >
              Join Us
            </button>
          </div>

          {/* Hero Image and Stats */}
          <div className="relative w-full max-w-xs md:max-w-sm">
            <Image
              src="/images/sophie.svg"
              alt="Student"
              width={400}
              height={500}
              className="rounded-2xl w-full h-auto max-h-[400px] md:max-h-[450px] object-cover shadow-lg transition duration-700 ease-in-out"
            />

            {/* Total Students */}
            <div className="absolute bottom-5 left-[-50px] bg-white text-black text-sm px-3 py-2 rounded-xl border border-gray-300 shadow">
              {count}k+<br />Total students
            </div>

            {/* Avatars */}
            <div className="absolute bottom-5 right-0 bg-green-600 text-white px-3 py-2 rounded-xl flex items-center gap-[-10px] shadow overflow-hidden">
              {[
                'https://randomuser.me/api/portraits/women/1.jpg',
                'https://randomuser.me/api/portraits/men/2.jpg',
                'https://randomuser.me/api/portraits/women/3.jpg',
                'https://randomuser.me/api/portraits/men/4.jpg',
              ].map((src, i) => (
                <div key={i} className={`z-[${5 - i}]`}>
                  <Image
                    src={src}
                    width={30}
                    height={30}
                    className="rounded-full border-2 border-white -ml-2"
                    alt={`User${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="p-4">
          <AuthForm />
        </div>
      )}
    </div>
  );
}