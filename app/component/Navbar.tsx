'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../Lib/firebase'; // ✅ FIXED

import { RiGraduationCapFill } from 'react-icons/ri';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && (!fullName || !confirmPassword))) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Register
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // ✅ Redirect to dashboard after login/signup
      router.push('/dashboard');

      // Clear form
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowAuth(false);
    } catch (err: any) {
      alert(err.message || 'Authentication failed');
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-4 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <RiGraduationCapFill size={36} className="text-green-600" />
          E Study
        </div>

        <ul className="hidden md:flex gap-6 text-sm text-gray-700 font-semibold">
          <li onClick={() => scrollToSection('home')} className="hover:text-green-600 cursor-pointer">Home</li>
          <li onClick={() => scrollToSection('about')} className="hover:text-green-600 cursor-pointer">About Us</li>
          <li onClick={() => scrollToSection('contact')} className="hover:text-green-600 cursor-pointer">Contact Us</li>
          <li onClick={() => scrollToSection('services')} className="hover:text-green-600 cursor-pointer">Services</li>
          <li onClick={() => scrollToSection('faq')} className="hover:text-green-600 cursor-pointer">FAQ</li>
        </ul>

        <button
          onClick={() => setShowAuth(true)}
          className="hidden md:inline-block bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition font-semibold"
        >
          Join Now
        </button>

        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-lg flex flex-col items-start p-6 md:hidden z-40">
            <ul className="flex flex-col gap-6 w-full text-base text-gray-800 font-medium">
              <li onClick={() => scrollToSection('home')} className="hover:text-green-600 cursor-pointer">Home</li>
              <li onClick={() => scrollToSection('curses')} className="hover:text-green-600 cursor-pointer">Curses</li>
              <li onClick={() => scrollToSection('contact')} className="hover:text-green-600 cursor-pointer">Contact Us</li>
              <li onClick={() => scrollToSection('testimonial')} className="hover:text-green-600 cursor-pointer">Testimonial</li>
              <li onClick={() => scrollToSection('faq')} className="hover:text-green-600 cursor-pointer">FAQ</li>
            </ul>

            <button
              onClick={() => {
                setShowAuth(true);
                setMenuOpen(false);
              }}
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-semibold"
            >
              Join Now
            </button>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl flex overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-700 text-2xl z-50"
              onClick={() => setShowAuth(false)}
            >
              &times;
            </button>

            <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
              <Image
                src="/images/student.svg"
                alt="Visual"
                width={350}
                height={350}
                className="object-contain"
              />
            </div>

            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                      required
                    />
                  </>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4 text-center">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-600 font-semibold ml-1 hover:underline"
                >
                  {isLogin ? 'Create one' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
