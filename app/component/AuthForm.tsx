'use client';

import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

export default function AuthForm() {
  return (
    <div className="flex max-w-4xl w-full mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Left - Auth Options */}
      <div className="w-full md:w-1/2 p-8 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">Get Started with Excellent-study</h2>

        <button className="flex items-center justify-center gap-2 w-full py-2 border rounded hover:bg-gray-100">
          <FaGoogle className="text-red-500" /> Continue with Google
        </button>

        <button className="flex items-center justify-center gap-2 w-full py-2 border rounded hover:bg-gray-100">
          <FaFacebookF className="text-blue-600" /> Continue with Facebook
        </button>

        <button className="flex items-center justify-center gap-2 w-full py-2 border rounded hover:bg-gray-100">
          <FaApple className="text-black" /> Continue with Apple
        </button>

        <div className="flex items-center gap-2 my-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">
          Continue with Email
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.
        </p>
      </div>

      {/* Right - Banner */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white text-center p-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Excellent-study</h1>
          <p className="text-sm">Visualize Your Career Growth</p>
        </div>
      </div>
    </div>
  );
}
