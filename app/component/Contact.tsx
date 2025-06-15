'use client';

import {
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  User,
  MessageCircle,
} from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // submission logic
  };

  return (
    <div id="Contact" className="min-h-screen bg-white  via-green-50 to-green-100 py-20 px-6 flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 text-center">
        Let's Get in Touch
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        We'd love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
      </p>

      {/* Social Links */}
      <div className="flex gap-6 mb-10 text-green-600 text-3xl">
        <a href="#" className="hover:text-green-800 transition"><Facebook /></a>
        <a href="#" className="hover:text-green-800 transition"><Twitter /></a>
        <a href="#" className="hover:text-green-800 transition"><Instagram /></a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full relative">
            <User className="absolute left-4 top-5 text-green-400" size={24} />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>

          <div className="w-full relative">
            <Mail className="absolute left-4 top-5 text-green-400" size={24} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>
        </div>

        <div className="relative">
          <MessageCircle className="absolute left-4 top-5 text-green-400" size={24} />
          <textarea
            name="message"
            rows={6}
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full pl-14 pr-4 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-green-600 text-white text-lg py-4 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
        >
          <Send size={20} />
          Send Message
        </button>
      </form>
    </div>
  );
}
