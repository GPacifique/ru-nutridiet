import React from "react";
import LearnerDashboardLayout from "@/Layouts/LearnerDashboardLayout";


export default function Index({ certificates }) {

    return (
        <LearnerDashboardLayout>

            <div className="p-6">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    My Certificates
                </h1>


                {certificates.data.length === 0 ? (

                    <div className="bg-white rounded-lg shadow p-6 text-center">

                        <p className="text-gray-500">
                            You have not earned any certificates yet.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">

                        {certificates.data.map((certificate) => (

                            <div
                                key={certificate.id}
                                className="bg-white rounded-xl shadow p-6"
                            >

                                <h2 className="text-xl font-semibold">
                                    Certificate
                                    {" "}
                                    {certificate.certificate_number}
                                </h2>


                                <p className="mt-3 text-gray-600">
                                    Issued:
                                    {" "}
                                    {certificate.issued_at}
                                </p>


                                {certificate.file && (

                                    <a
                                        href={`/storage/${certificate.file}`}
                                        target="_blank"
                                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Download Certificate
                                    </a>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </LearnerDashboardLayout>
    );
}