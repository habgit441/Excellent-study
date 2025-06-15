// 'use client';

// import { useState } from 'react';

// export default function AuthModal() {
//   const [isLogin, setIsLogin] = useState(false);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg flex w-full max-w-4xl overflow-hidden">
//         {/* Left - Image */}
//         <div className="hidden md:block w-1/2 bg-green-600">
//           <img
//             src="/auth-image.jpg"
//             alt="Auth Visual"
//             className="h-full w-full object-cover rounded-l-lg"
//           />
//         </div>

//         {/* Right - Form */}
//         <div className="w-full md:w-1/2 p-8 relative">
//           <button
//             onClick={() => alert('Close modal')}
//             className="absolute top-4 right-4 text-gray-500 hover:text-black"
//           >
//             &times;
//           </button>

//           <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
//             {isLogin ? 'Welcome Back' : 'Create Your Account'}
//           </h2>

//           <form className="flex flex-col gap-4">
//             {!isLogin && (
//               <>
//                 <input type="text" placeholder="Full Name" className="input" />
//                 <input type="password" placeholder="Confirm Password" className="input" />
//               </>
//             )}
//             <input type="email" placeholder="Email" className="input" />
//             <input type="password" placeholder="Password" className="input" />

//             <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
//               {isLogin ? 'Sign In' : 'Sign Up'}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm">
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <button
//               type="button"
//               className="text-green-700 font-semibold hover:underline"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? 'Sign Up' : 'Sign In'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
