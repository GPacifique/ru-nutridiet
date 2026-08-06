import React from "react";
import { Link, useForm } from "@inertiajs/react";

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/contact", {
            onSuccess: () => reset(),
        });
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">
                        Contact Us
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Get In Touch
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Have questions, suggestions, or need assistance?
                        Our team is here to help you succeed on SharpTechLearners.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            Let's Talk
                        </h3>

                        <div className="space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    📍
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Address
                                    </h4>
                                    <p className="text-gray-600">
                                        Kigali, Rwanda
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    📧
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Email
                                    </h4>
                                    <p className="text-gray-600">
                                        support@sharptechlearners.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    📞
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Phone
                                    </h4>
                                    <p className="text-gray-600">
                                        +250 786163963
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                    ⏰
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Working Hours
                                    </h4>
                                    <p className="text-gray-600">
                                        Monday - Friday
                                        <br />
                                        8:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Support Box */}
                        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border">
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Need Immediate Help?
                            </h4>

                            <p className="text-gray-600 mb-4">
                                Browse our help center or submit a support ticket
                                for faster assistance.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/help-center"
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Help Center
                                </Link>

                                <Link
                                    href="/support"
                                    className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                                >
                                    Support Ticket
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Send a Message
                        </h3>

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Message
                                </label>

                                <textarea
                                    rows="6"
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                {processing
                                    ? "Sending..."
                                    : "Send Message"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}