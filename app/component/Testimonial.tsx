// components/TestimonialCarousel.tsx

const testimonials = [
  {
    name: "Amina Yusuf",
    location: "Lagos, Nigeria",
    text: "Schooly helped me pass my college entrance exam with flying colors.",
    stars: 5,
    image: "images/amina.svg",
  },
  {
    name: "Daniel Okoro",
    location: "Abuja, Nigeria",
    text: "I love the way lessons are structured. It's easy to follow and enjoyable.",
    stars: 4,
    image: "/images/daniel.svg",
  },
  {
    name: "Chidera Onuoha",
    location: "Port Harcourt, Nigeria",
    text: "Joining Schooly boosted my confidence and helped me succeed.",
    stars: 5,
    image: "/images/chioma.svg",
  },
  {
    name: "Fatima Bello",
    location: "Kano, Nigeria",
    text: "Simple, helpful, and motivating platform. Highly recommend!",
    stars: 4,
    image: "/images/sophies.svg",
  },
  {
    name: "John Sera",
    location: "Enugu, Nigeria",
    text: "Excellent platform with accurate practice materials.",
    stars: 5,
    image: "/images/sera.svg",
  },
];

export default function Testimonial() {
  return (
    <section id="Testimonial"className="bg-white-100 py-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-900">What Students Say</h2>

      <div className="relative overflow-x-hidden">
        <div className="flex gap-4 animate-scroll whitespace-nowrap">
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={idx}
              className="w-[220px] bg-white rounded-xl shadow p-4 flex-shrink-0 text-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-2 line-clamp-4">"{item.text}"</p>
              <div className="flex gap-[2px] text-yellow-500 text-sm">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
