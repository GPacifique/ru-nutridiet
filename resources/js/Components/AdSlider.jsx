import React, { useEffect, useState } from "react";

const ads = [
  {
    id: 1,
    image: "/images/ad1.jpg",
    title: "Best Property Deals",
    link: "#",
  },
  {
    id: 2,
    image: "/images/ad2.jpg",
    title: "Find Your Dream Home",
    link: "#",
  },
  {
    id: 3,
    image: "/images/ad3.jpg",
    title: "Luxury Apartments Available",
    link: "#",
  },
];

const AdSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % ads.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {/* Slide */}
      <a href={ads[current].link} className="block relative">
        <img
          src={ads[current].image}
          alt={ads[current].title}
          className="w-full h-64 md:h-96 object-cover transition-all duration-500"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
          <h2 className="text-lg font-semibold">{ads[current].title}</h2>
        </div>
      </a>

      {/* Controls */}
      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white px-3 py-1 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white px-3 py-1 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdSlider;