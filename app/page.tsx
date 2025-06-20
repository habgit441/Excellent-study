'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, onAuthStateChanged } from './Lib/firebase'; // ✅ FIXED
import Hero from "./component/Hero";
import Curses from "./component/Curses";
import FeaturesSection from "./component/Features";
import TestimonialSection from "./component/Testimonial";
import ContactForm from "./component/Contact";
// import Signup from "./component/signup";


export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
     <div>
      <Hero />
      <Curses />

      <FeaturesSection />
      <TestimonialSection/>
          {/* <Signup /> */}

      <ContactForm />
    </div>

      <h1>Welcome to E Study</h1>
    </div>
  );
}
