{/* FEATURED */}
<section className="py-12 bg-white px-6">
    <h2 className="text-2xl font-bold mb-6">
        Featured Properties
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
        {featured.map((property) => (
            <div
                key={property.id}
                className="bg-gray-100 rounded-lg overflow-hidden shadow"
            >
                <img
                    src={getImage(property)}
                    alt={property.title}
                    className="h-48 w-full object-cover"
                />

                <div className="p-4">
                    <h3 className="font-bold text-lg">
                        {property.title}
                    </h3>

                    <p className="text-gray-600">
                        {property.location}
                    </p>

                    <p className="text-blue-600 font-bold mt-2">
                        ${property.price}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Review
                        </button>

                        <button
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Save
                        </button>

                        <button
                            className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Recommend
                        </button>

                        <button
                            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Rate
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</section>