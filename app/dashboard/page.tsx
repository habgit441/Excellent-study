'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, auth } from '../Lib/firebase'; 
import DashboardNavbar from './Element/Navbar';
import Leftbar from './Element/Leftbar';
// import Rightbar from './Element/Rightbar';
 
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('');
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <DashboardNavbar />
      <Leftbar />
      {/* <Rightbar/> */}
    </main>
  );
}
