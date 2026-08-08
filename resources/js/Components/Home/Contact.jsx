import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Contact() {
    return (
        <GuestLayout>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Header */}
                <section className="text-center mb-12">

                    <h1 className="text-4xl font-bold text-green-700">
                        Contact RUNUTRIDIET-CPT
                    </h1>

                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Have questions about nutrition, diet plans, weight
                        management, or wellness programs? Our team is ready
                        to support your health journey.
                    </p>

                </section>


                <div className="grid md:grid-cols-2 gap-10">


                    {/* Contact Information */}
                    <div className="bg-green-50 rounded-xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Get In Touch
                        </h2>


                        <div className="space-y-5 text-gray-700">

                            <div>
                                <h3 className="font-semibold text-green-700">
                                    📍 Clinic Location
                                </h3>

                                <p>
                                    Kigali, Rwanda
                                </p>
                            </div>


                            <div>
                                <h3 className="font-semibold text-green-700">
                                    📞 Phone
                                </h3>

                                <p>
                                     +250 785 221 105
                                </p>
                            </div>


                            <div>
                                <h3 className="font-semibold text-green-700">
                                    ✉ Email
                                </h3>

                                <p>
                                    info@runutridiet.com
                                </p>
                            </div>


                            <div>
                                <h3 className="font-semibold text-green-700">
                                    🕒 Opening Hours
                                </h3>

                                <p>
                                    Monday - Saturday
                                    <br />
                                    8:00 AM - 6:00 PM
                                </p>
                            </div>

                        </div>


                        <div className="mt-8">

                            <a
                                href="#"
                                className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
                            >
                                Book Consultation
                            </a>

                        </div>

                    </div>



                    {/* Contact Form */}
                    <div className="bg-white shadow rounded-xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Send Us A Message
                        </h2>


                        <form className="space-y-5">


                            <div>
                                <label className="block mb-2 font-medium">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="Your name"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="+250..."
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="email@example.com"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    Your Message
                                </label>

                                <textarea
                                    rows="5"
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="Tell us how we can help..."
                                ></textarea>
                            </div>


                            <button
                                type="submit"
                                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
                            >
                                Send Message
                            </button>


                        </form>

                    </div>


                </div>


                {/* Emergency / Consultation CTA */}
                <section className="mt-16 bg-green-700 text-white rounded-xl p-8 text-center">

                    <h2 className="text-3xl font-bold">
                        Ready To Improve Your Health?
                    </h2>

                    <p className="mt-3">
                        Start your nutrition journey with a personalized plan
                        designed for your body and lifestyle.
                    </p>


                    <a
                        href="#"
                        className="inline-block mt-6 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold"
                    >
                        Schedule Appointment
                    </a>

                </section>


            </div>

        </GuestLayout>
    );
}