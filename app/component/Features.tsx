// components/FeaturesSection.tsx

import { Lightbulb, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="w-8 h-8 text-green-600 z-10" />,
    title: "Expert Tutors",
    description: "Learn from top instructors who make complex topics easy to understand.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600 z-10" />,
    title: "Trusted by Thousands",
    description: "Over 20k students trust our platform for academic excellence.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600 z-10" />,
    title: "Collaborative Learning",
    description: "Join a community of learners, share ideas, and grow together.",
  },
];

export default function Features() {
  return (
    <section id="FeaturesSection" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-900 sm:text-4xl mb-6">
          Why Students Choose Us
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-12">
          Our mission is to make learning accessible, engaging, and effective for all.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl shadow-md p-6 overflow-hidden text-left transition duration-300"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-100 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-0" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
      </div>
      </div>
    </section>
  );
}
