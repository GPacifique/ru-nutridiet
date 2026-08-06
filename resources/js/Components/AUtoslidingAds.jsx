import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AutoSlidingAds() {
    const ads = [
        {
            id: 1,
            text: "🏡 Buy your dream home today — Explore premium listings!",
            link: "/properties",
        },
        {
            id: 2,
            text: "🔥 New apartments available in Kigali — Limited offers!",
            link: "/properties",
        },
        {
            id: 3,
            text: "👨‍💼 Connect with trusted real estate agents now!",
            link: "/agents",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ads.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [ads.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? ads.length - 1 : prev - 1
        );
    };

    return (
        <div className="bg-blue-600 text-white h-12 flex items-center justify-between px-4 text-sm md:text-base relative overflow-hidden">
            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="text-white hover:text-gray-200"
            >
                <FaChevronLeft />
            </button>

            {/* Sliding Text */}
            <div className="flex-1 text-center px-4">
                <Link
                    href={ads[currentIndex].link}
                    className="font-medium hover:underline"
                >
                    {ads[currentIndex].text}
                </Link>
            </div>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="text-white hover:text-gray-200"
            >
                <FaChevronRight />
            </button>
        </div>
    );
}
