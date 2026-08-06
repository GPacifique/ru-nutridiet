import React from "react";

export default function BuyerInquiries({ inquiries = [] }) {
    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4">My Inquiries</h2>

            {inquiries.length === 0 ? (
                <p className="text-gray-500">No inquiries yet.</p>
            ) : (
                inquiries.map((inq) => (
                    <div key={inq.id} className="border-b py-2">
                        <p className="font-semibold">{inq.property.title}</p>
                        <p className="text-sm text-gray-500">
                            {inq.message}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}