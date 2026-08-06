import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import {
    FaHeart,
    FaStar,
    FaComment,
    FaShare,
    FaMapMarkerAlt,
} from "react-icons/fa";


export default function RecentProperties() {
    const { recentProperties = [] } = usePage().props;


    const properties = Array.isArray(recentProperties)
        ? recentProperties
        : [];


    const [activeChat, setActiveChat] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [activeRating, setActiveRating] = useState(null);


    const getImage = (property) => {
        if (property?.images?.length > 0) {
            return `/storage/${property.images[0].image}`;
        }


        return "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
    };


    /*
    |--------------------------------------------------------------------------
    | LIKE PROPERTY
    |--------------------------------------------------------------------------
    */
    const handleLike = (propertyId) => {
        router.post(`/properties/${propertyId}/like`);
    };


    /*
    |--------------------------------------------------------------------------
    | COMMENT PROPERTY
    |--------------------------------------------------------------------------
    */
    const handleComment = (propertyId) => {
        if (!commentText.trim()) return;


        router.post(`/properties/${propertyId}/comment`, {
            comment: commentText,
        });


        setCommentText("");
        setActiveChat(null);
    };


    /*
    |--------------------------------------------------------------------------
    | RATE PROPERTY
    |--------------------------------------------------------------------------
    */
    const handleRating = (propertyId, rating) => {
        router.post(`/properties/${propertyId}/rate`, {
            rating,
        });


        setActiveRating(null);
    };


    /*
    |--------------------------------------------------------------------------
    | RECOMMEND PROPERTY
    |--------------------------------------------------------------------------
    */
    const handleRecommend = (propertyId) => {
        router.post(`/properties/${propertyId}/recommend`);
    };


    /*
    |--------------------------------------------------------------------------
    | SHARE PROPERTY
    |--------------------------------------------------------------------------
    */
    const handleShare = async (property) => {
        const url = `${window.location.origin}/properties/${property.id}`;


        if (navigator.share) {
            try {
                await navigator.share({
                    title: property.title,
                    text: property.description,
                    url,
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            navigator.clipboard.writeText(url);
            alert("Property link copied!");
        }
    };


    return (
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {properties.map((property) => (
        <div
            key={property.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100"
        >
            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden">
                <img
                    src={getImage(property)}
                    alt={property.title}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Favorite Button */}
                <button
                    onClick={() => handleLike(property.id)}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition"
                >
                    <FaHeart
                        className={`text-lg ${
                            property.liked_by_user
                                ? "text-red-500"
                                : "text-white"
                        }`}
                    />
                </button>

                {/* Price */}
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-white font-bold">
                    ${property.price}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    {property.location}
                </div>

                {/* Features */}
                <div className="flex justify-between bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="text-center">
                        <p className="font-bold text-gray-800">
                            {property.bedrooms || 0}
                        </p>
                        <span className="text-xs text-gray-500">Beds</span>
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-gray-800">
                            {property.bathrooms || 0}
                        </p>
                        <span className="text-xs text-gray-500">Baths</span>
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-gray-800">
                            {property.average_rating || 0}
                        </p>
                        <span className="text-xs text-gray-500">Rating</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => handleRecommend(property.id)}
                        className="flex-1 mx-1 py-2 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition flex justify-center"
                    >
                        <FaStar className="text-yellow-500" />
                    </button>

                    <button
                        onClick={() => handleShare(property)}
                        className="flex-1 mx-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition flex justify-center"
                    >
                        <FaShare className="text-blue-500" />
                    </button>

                    <button
                        onClick={() => setActiveChat(property.id)}
                        className="flex-1 mx-1 py-2 rounded-xl bg-green-50 hover:bg-green-100 transition flex justify-center"
                    >
                        <FaComment className="text-green-500" />
                    </button>
                </div>

                {/* Likes + Comments */}
                <div className="flex justify-between text-sm text-gray-500 mb-4 border-t border-b py-3">
                    <span>❤️ {property.likes_count || 0}</span>
                    <span>💬 {property.comments_count || 0}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            onClick={() =>
                                handleRating(property.id, star)
                            }
                            className="cursor-pointer text-yellow-400 hover:scale-125 transition"
                        />
                    ))}
                </div>

                {/* Comment Box */}
                {activeChat === property.id && (
                    <div className="mb-4">
                        <textarea
                            value={commentText}
                            onChange={(e) =>
                                setCommentText(e.target.value)
                            }
                            className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your comment..."
                        />

                        <button
                            onClick={() =>
                                handleComment(property.id)
                            }
                            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            Submit Comment
                        </button>
                    </div>
                )}

                {/* CTA */}
                <Link
                    href={`/properties/${property.id}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                    View Property
                </Link>
            </div>
        </div>
    ))}
</div>
    );
}



