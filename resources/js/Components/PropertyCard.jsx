import React from 'react';

export default function PropertyCard({ property, agentNote }) {
  if (!property) return null;

  return (
    <div className="border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold">{property.title}</h3>

      <p className="text-gray-600">{property.description}</p>

      <p className="mt-2 font-bold">${property.price}</p>

      <p className="text-sm text-gray-500">
        Location: {property.location}
      </p>

      {property.images?.length > 0 && (
        <div className="mt-2">
          <img
            src={`/storage/${property.images[0].image}`}
            alt={property.title}
            className="w-full h-48 object-cover rounded"
          />
        </div>
      )}

      {agentNote && (
        <p className="mt-2 text-sm italic text-blue-600">
          Agent’s Note: {agentNote}
        </p>
      )}
    </div>
  );
}