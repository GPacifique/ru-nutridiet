import React from "react";
import { Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import DashboardModules from '@/Components/DashboardModules';

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout user={auth.user}>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Welcome */}
                <div className="bg-green-700 text-white rounded-xl p-8 mb-8">

                    <h1 className="text-3xl font-bold">
                        Welcome back, {auth.user.name}
                    </h1>

                    <p className="mt-2 text-green-100">
                        Track your nutrition journey and manage your health goals.
                    </p>

                </div>

                <DashboardModules modules={[
                    { key: 'mealplan', title: 'Meal Plan', desc: 'View your personalized meal plan', action: { href: '/student/mealplan', label: 'Open' } },
                    { key: 'appointments', title: 'Appointments', desc: 'Manage consultations', action: { href: '/student/appointments', label: 'Open' } },
                    { key: 'progress', title: 'Progress', desc: 'Track health metrics', action: { href: '/student/progress', label: 'Open' } },
                ]} />


                {/* Cards */}
                <div className="grid md:grid-cols-4 gap-6">


                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="text-green-700 text-3xl mb-3">
                            🥗
                        </div>

                        <h3 className="font-bold text-lg">
                            Meal Plan
                        </h3>

                        <p className="text-gray-600 mt-2">
                            View your personalized nutrition plan.
                        </p>


                        <Link
                            href="#"
                            className="text-green-700 mt-4 inline-block"
                        >
                            View Plan →
                        </Link>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="text-green-700 text-3xl mb-3">
                            📅
                        </div>

                        <h3 className="font-bold text-lg">
                            Appointments
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Manage your nutrition consultations.
                        </p>


                        <Link
                            href="#"
                            className="text-green-700 mt-4 inline-block"
                        >
                            View Appointments →
                        </Link>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="text-green-700 text-3xl mb-3">
                            📈
                        </div>

                        <h3 className="font-bold text-lg">
                            Progress
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Track weight and health improvements.
                        </p>


                        <Link
                            href="#"
                            className="text-green-700 mt-4 inline-block"
                        >
                            View Progress →
                        </Link>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="text-green-700 text-3xl mb-3">
                            💬
                        </div>

                        <h3 className="font-bold text-lg">
                            Consultation
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Communicate with your nutritionist.
                        </p>


                        <Link
                            href="#"
                            className="text-green-700 mt-4 inline-block"
                        >
                            Contact Nutritionist →
                        </Link>

                    </div>


                </div>



                {/* Health Summary */}
                <div className="grid md:grid-cols-2 gap-8 mt-10">


                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Health Summary
                        </h2>


                        <div className="space-y-3 text-gray-700">

                            <p>
                                Weight:
                                <span className="font-semibold ml-2">
                                    -- kg
                                </span>
                            </p>

                            <p>
                                Goal:
                                <span className="font-semibold ml-2">
                                    Weight Management
                                </span>
                            </p>

                            <p>
                                Next Consultation:
                                <span className="font-semibold ml-2">
                                    Not Scheduled
                                </span>
                            </p>

                        </div>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Health Tips
                        </h2>


                        <ul className="space-y-3 text-gray-600">

                            <li>
                                ✓ Drink enough water daily
                            </li>

                            <li>
                                ✓ Include vegetables in every meal
                            </li>

                            <li>
                                ✓ Maintain regular physical activity
                            </li>

                            <li>
                                ✓ Follow your nutrition plan consistently
                            </li>

                        </ul>

                    </div>


                </div>


            </div>

        </DashboardLayout>
    );
}