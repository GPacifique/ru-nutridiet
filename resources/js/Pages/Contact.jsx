import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import PublicNavigation from "@/Components/PublicNavigation";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post("/contact", form, {
            onFinish: () => setLoading(false),
            onSuccess: () =>
                setForm({ name: "", email: "", message: "" }),
        });
    };

    return (
        <>
            <Head title="Contact Us" />

            <div className="min-h-screen bg-gray-100">

                {/* HERO */}
                <section className="bg-blue-600 text-white text-center py-20">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="mt-2">
                        We are here to help you find your dream property
                    </p>
                </section>

                {/* FORM */}
                <section className="max-w-3xl mx-auto px-6 py-12">
                    <form
                        onSubmit={submit}
                        className="bg-white p-6 rounded-xl shadow space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border p-3 rounded w-full"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border p-3 rounded w-full"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                        />

                        <textarea
                            placeholder="Your Message"
                            className="border p-3 rounded w-full h-32"
                            value={form.message}
                            onChange={(e) =>
                                setForm({ ...form, message: e.target.value })
                            }
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </section>
            </div>
        </>
    );
}