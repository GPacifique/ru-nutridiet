import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Award,
} from 'lucide-react';

import AdminLayout from '@/Layouts/AdminLayout';


function currency(value = 0) {
    return Number(value ?? 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
}


function Delta({ value = 0, direction = 'up' }) {

    const positive = direction === 'up';

    const Icon = positive
        ? ArrowUpRight
        : ArrowDownRight;

    return (
        <span
            className={`inline-flex items-center gap-1 text-xs ${
                positive
                    ? 'text-green-700'
                    : 'text-red-600'
            }`}
        >
            <Icon size={14} />
            {value}%
        </span>
    );
}


function StatCard({
    title,
    value,
    subtitle,
    delta,
    direction
}) {

    return (
        <div className="flex-1 px-6 py-5">

            <p className="text-xs uppercase tracking-wide text-gray-500">
                {title}
            </p>


            <div className="mt-2 text-2xl font-semibold text-gray-900">

                {value}

                {subtitle && (
                    <span className="ml-1 text-sm text-gray-500">
                        {subtitle}
                    </span>
                )}

            </div>


            {delta !== undefined && (
                <Delta
                    value={delta}
                    direction={direction}
                />
            )}

        </div>
    );
}



export default function Dashboard({

    stats = {},

    recentCourses = [],

    recentEnrollments = [],

}) {


    /*
    Normalize backend data
    */

    const revenue =
        stats.revenue?.value ??
        stats.revenue ??
        0;


    const learners =
        stats.activeLearners?.value ??
        stats.learners ??
        0;


    const courses =
        stats.courses ??
        recentCourses.length ??
        0;


    const certificates =
        stats.certificates ??
        0;



    const today =
        new Date().toLocaleDateString(
            'en-US',
            {
                month:'short',
                day:'numeric',
                year:'numeric'
            }
        );



    return (

        <AdminLayout title="Dashboard">


            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <p className="text-xs text-gray-500">
                    As of {today}
                </p>


                <Link
                    href="/admin/courses/create"
                    className="
                    inline-flex items-center gap-2
                    rounded bg-green-700
                    px-4 py-2 text-sm
                    text-white hover:bg-green-800
                    "
                >

                    <Plus size={16}/>
                    New Course

                </Link>

            </div>





            {/* Statistics */}

            <div
                className="
                mb-10 flex flex-col
                divide-y rounded border
                bg-white md:flex-row
                md:divide-x md:divide-y-0
                "
            >


                <StatCard

                    title="Revenue"

                    value={currency(revenue)}

                />


                <StatCard

                    title="Learners"

                    value={learners}

                />


                <StatCard

                    title="Courses"

                    value={courses}

                />


                <StatCard

                    title="Certificates"

                    value={certificates}

                />


            </div>






            <div className="grid gap-8 lg:grid-cols-3">



                {/* Courses */}


                <div className="lg:col-span-2">


                    <div className="mb-3 flex justify-between">

                        <h2 className="text-lg font-semibold">
                            Recent Courses
                        </h2>


                        <Link
                            href="/admin/courses"
                            className="text-sm text-green-700"
                        >
                            View All
                        </Link>


                    </div>



                    <div className="
                    overflow-hidden
                    rounded border
                    bg-white
                    ">


                    <table className="w-full text-sm">


                    <thead>

                    <tr className="border-b text-left text-gray-500">


                    <th className="p-3">
                        Title
                    </th>


                    <th>
                        Price
                    </th>


                    <th>
                        Status
                    </th>


                    </tr>


                    </thead>



                    <tbody>


                    {recentCourses.length === 0 ? (

                        <tr>

                        <td
                        colSpan="3"
                        className="p-5 text-center text-gray-500"
                        >
                            No courses found
                        </td>

                        </tr>

                    ) : (


                    recentCourses.map(course => (


                        <tr
                        key={course.id}
                        className="border-b"
                        >


                        <td className="p-3">

                        <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="font-medium hover:text-green-700"
                        >

                        {course.title}

                        </Link>

                        </td>



                        <td>

                        {currency(course.price)}

                        </td>



                        <td>


                        <span
                        className="
                        rounded-full
                        bg-gray-100
                        px-2 py-1
                        text-xs
                        "
                        >

                        {
                            course.status ??
                            (
                            course.is_published
                            ? 'published'
                            : 'draft'
                            )
                        }


                        </span>


                        </td>


                        </tr>


                    ))

                    )}



                    </tbody>



                    </table>


                    </div>


                </div>







                {/* Enrollments */}


                <div>


                    <div className="mb-3">

                        <h2 className="text-lg font-semibold">

                            Recent Enrollments

                        </h2>

                    </div>




                    <div className="
                    rounded border
                    bg-white
                    ">


                    {
                    recentEnrollments.length === 0 ?


                    (

                    <p className="p-5 text-gray-500">

                        No enrollments yet.

                    </p>


                    )


                    :

                    recentEnrollments.map(item=>(


                        <div
                        key={item.id}
                        className="
                        flex gap-3
                        border-b p-4
                        "
                        >


                        <Award
                        size={18}
                        className="text-green-700"
                        />


                        <div>


                        <p className="font-medium">

                        {
                        item.user?.name ??
                        'Learner'
                        }

                        </p>


                        <p className="text-sm text-gray-500">

                        {
                        item.course?.title ??
                        'Course'
                        }

                        </p>


                        </div>


                        </div>


                    ))


                    }



                    </div>


                </div>




            </div>



        </AdminLayout>

    );
}