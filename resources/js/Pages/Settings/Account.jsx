import React from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Account() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            {/* Profile Update */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="font-semibold mb-3">Profile</h2>

                <input
                    className="w-full mb-2 p-2 border"
                    value={profileForm.data.name}
                    onChange={(e) =>
                        profileForm.setData("name", e.target.value)
                    }
                />

                <input
                    className="w-full mb-2 p-2 border"
                    value={profileForm.data.email}
                    onChange={(e) =>
                        profileForm.setData("email", e.target.value)
                    }
                />

                <button
                    onClick={() =>
                        profileForm.put("/settings/profile")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Update Profile
                </button>
            </div>

            {/* Password Update */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-3">Change Password</h2>

                <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full mb-2 p-2 border"
                    onChange={(e) =>
                        passwordForm.setData("current_password", e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full mb-2 p-2 border"
                    onChange={(e) =>
                        passwordForm.setData("password", e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full mb-2 p-2 border"
                    onChange={(e) =>
                        passwordForm.setData("password_confirmation", e.target.value)
                    }
                />

                <button
                    onClick={() =>
                        passwordForm.put("/settings/password")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
}