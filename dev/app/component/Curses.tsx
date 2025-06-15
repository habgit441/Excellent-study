'use client';
import Image from 'next/image';

const courses = [
  { title: 'Computer Science', image: '/images/computer.jpg' },
  { title: 'Engineering', image: '/images/engineering.jpg' },
  { title: 'Accounting', image: '/images/acc.jpg' },
  { title: 'Business Management', image: '/images/business.jpg' },
  { title: 'Law', image: '/images/lawyer.jpg' },
  { title: 'Medicine', image: '/images/medicine.jpg' },
  { title: 'Psychology', image: '/images/phy.jpg' },
  { title: 'Architecture', image: '/images/arc.jpg' },
  { title: 'Education', image: '/images/edu.jpg' },
  { title: 'Political Science', image: '/images/poli.jpg' },
  { title: 'Mechanical Engineering', image: '/images/mech.jpg' },
  { title: 'Pharmacy', image: '/images/pha.jpg' },
];

export default function Curses() {
  return (
    <section className="px-6 md:px-12 py-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12 transition-all">
        Our Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="group bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
          >
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover transition-all duration-300 group-hover:brightness-90"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 transition-all group-hover:text-green-700">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 transition-all group-hover:text-gray-800">
                Learn and advance your career with top-notch content and expert guidance.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
