import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaMapMarkerAlt,
} from "react-icons/fa";

export default function PropertyAutoSlider({ properties = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slide
    useEffect(() => {
        if (!properties.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === properties.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [properties]);

    // Previous Slide
    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? properties.length - 1 : prev - 1
        );
    };

    // Next Slide
    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === properties.length - 1 ? 0 : prev + 1
        );
    };

    // Get Image
    const getImage = (property) => {
        if (property?.images?.length > 0) {
            return `/storage/${property.images[0].image}`;
        }

        return "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
    };

    if (!properties.length) {
        return (
            <div className="text-center py-10 text-gray-500">
                No featured properties available
            </div>
        );
    }

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-xl">
            {/* Slides */}
            {properties.map((property, index) => (
                <div
                    key={property.id}
                    className={`absolute w-full h-full transition-opacity duration-1000 ${
                        index === currentIndex
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0"
                    }`}
                >
                    {/* Image */}
                    <img
                        src={getImage(property)}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Property Info */}
                    <div className="absolute bottom-10 left-10 text-white max-w-lg">
                        <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                            Featured Property
                        </span>

                        <h2 className="text-4xl font-bold mt-4">
                            {property.title}
                        </h2>

                        <p className="flex items-center gap-2 mt-3 text-lg">
                            <FaMapMarkerAlt />
                            {property.location}
                        </p>

                        <p className="text-3xl font-bold mt-4 text-yellow-400">
                            ${property.price}
                        </p>

                        <Link
                            href={`/properties/${property.id}`}
                            className="inline-block mt-5 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition z-20"
            >
                <FaChevronLeft />
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition z-20"
            >
                <FaChevronRight />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {properties.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index
                                ? "bg-white"
                                : "bg-white/40"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
}