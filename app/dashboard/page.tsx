'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, auth } from '../Lib/firebase'; 
import DashboardNavbar from './Element/Navbar'; // ✅ Fixed import
import Leftbar from './Element/Leftbar'

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <DashboardNavbar />
     <Leftbar/>
      
    </main>
  );
}
