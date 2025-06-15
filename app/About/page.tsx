// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="px-4 md:px-8 lg:px-16 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          About <span className="text-indigo-600">Schooly</span>
        </h1>

        <section className="mb-10">
          <p className="text-lg leading-relaxed mb-4">
            <strong>Schooly</strong> is an online learning platform designed to help students prepare for IQ tests and academic exams.
            We provide tools that help you track progress, sharpen skills, and study confidently.
          </p>
          <p className="text-lg leading-relaxed">
            Our focus is on making learning easy and accessible for everyone, regardless of the course or subject.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-700">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To support students by providing quality study materials and practice tools to help them excel academically.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-700">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Online mock tests</li>
            <li>Performance tracking</li>
            <li>Study tips and resources</li>
            <li>Student support</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-700">Contact Us</h2>
          <p className="text-lg">
            Email: <a href="mailto:contact@schooly.com" className="text-indigo-600 hover:underline">contact@schooly.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}
