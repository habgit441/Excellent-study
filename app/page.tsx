'use client';
import Hero from "./component/Hero";
import Curses from "./component/Curses";
import FeaturesSection from "./component/Features";
import TestimonialSection from "./component/Testimonial";
import ContactForm from "./component/Contact";
// import Signup from "./component/signup";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <Curses />

      <FeaturesSection />
      <TestimonialSection/>
          {/* <Signup /> */}

      <ContactForm />
    </div>
  );
}
