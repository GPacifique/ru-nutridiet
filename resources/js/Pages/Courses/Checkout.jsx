import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle2,
    Clock,
    CreditCard,
    Lock,
    ShieldCheck,
    Smartphone,
    User,
    Wallet,
} from 'lucide-react';


export default function Checkout({ course, user }) {
    const [paymentMethod, setPaymentMethod] = useState('card');

    const { data, setData, post, processing, errors } = useForm({
        course_id: course.id,

        payment_method: 'card',

        billing_name: user?.name || '',
        billing_email: user?.email || '',

        phone: user?.phone || '',

        country: user?.country || '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('courses.checkout.process', course.id));
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return '$0.00';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(price));
    };

    const paymentMethods = [
        {
            id: 'card',
            name: 'Credit / Debit Card',
            description: 'Pay securely using your bank card.',
            icon: CreditCard,
        },
        {
            id: 'mobile_money',
            name: 'Mobile Money',
            description: 'Pay using your mobile money account.',
            icon: Smartphone,
        },
        {
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Pay directly from your bank account.',
            icon: Wallet,
        },
    ];

    return (
        <DashboardLayout>
            <Head title={`Checkout - ${course.title}`} />

            <div className="mx-auto max-w-7xl space-y-8">
                {/* Back */}
                <Link
                    href={route('courses.show', course.slug)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Course
                </Link>

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Complete Your Enrollment
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Review your course and complete the payment to begin
                        your professional learning journey.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                >
                    {/* Main Checkout */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Learner Information */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                                <div className="rounded-xl bg-blue-50 p-3">
                                    <User className="h-6 w-6 text-blue-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Learner Information
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Confirm your information before payment.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={data.billing_name}
                                        onChange={(e) =>
                                            setData(
                                                'billing_name',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />

                                    {errors.billing_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.billing_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={data.billing_email}
                                        onChange={(e) =>
                                            setData(
                                                'billing_email',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />

                                    {errors.billing_email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.billing_email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />

                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Country
                                    </label>

                                    <input
                                        type="text"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData('country', e.target.value)
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />

                                    {errors.country && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.country}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                                <div className="rounded-xl bg-green-50 p-3">
                                    <CreditCard className="h-6 w-6 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Payment Method
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Select your preferred payment method.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;

                                    const selected =
                                        paymentMethod === method.id;

                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => {
                                                setPaymentMethod(method.id);
                                                setData(
                                                    'payment_method',
                                                    method.id
                                                );
                                            }}
                                            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                                                selected
                                                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div
                                                className={`rounded-lg p-3 ${
                                                    selected
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">
                                                    {method.name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {method.description}
                                                </p>
                                            </div>

                                            <div
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                    selected
                                                        ? 'border-blue-600'
                                                        : 'border-gray-300'
                                                }`}
                                            >
                                                {selected && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {errors.payment_method && (
                                <p className="mt-3 text-sm text-red-600">
                                    {errors.payment_method}
                                </p>
                            )}

                            {/* Card Details */}
                            {paymentMethod === 'card' && (
                                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Lock className="h-4 w-4 text-green-600" />
                                        Secure card payment
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500">
                                        You will be redirected to the secure
                                        payment gateway to enter your card
                                        details.
                                    </p>
                                </div>
                            )}

                            {/* Mobile Money */}
                            {paymentMethod === 'mobile_money' && (
                                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Smartphone className="h-4 w-4 text-green-600" />
                                        Mobile Money Payment
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500">
                                        You will receive payment instructions
                                        after continuing.
                                    </p>
                                </div>
                            )}

                            {/* Bank Transfer */}
                            {paymentMethod === 'bank_transfer' && (
                                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Wallet className="h-4 w-4 text-green-600" />
                                        Bank Transfer
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Bank payment instructions will be
                                        provided after creating your order.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Security */}
                        <div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-5">
                            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />

                            <div>
                                <h3 className="font-semibold text-green-800">
                                    Secure Checkout
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-green-700">
                                    Your payment information is handled securely.
                                    We do not store your complete card details.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="sticky top-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            {/* Course */}
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Order Summary
                                </h2>

                                <div className="mt-5 flex gap-4">
                                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-blue-50">
                                        {course.thumbnail ? (
                                            <img
                                                src={`/storage/${course.thumbnail}`}
                                                alt={course.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <BookOpen className="h-8 w-8 text-blue-300" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="line-clamp-3 font-semibold text-gray-900">
                                            {course.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">
                                            {course.credit_hours || 0} Credit
                                            Hours
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="border-b border-gray-200 p-6">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Included with your enrollment
                                </h3>

                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        Course lessons
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        Professional credit hours
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        Final examination
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        Certificate after completion
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Course Price
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        {formatPrice(course.price)}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                                    <span className="text-lg font-bold text-gray-900">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-blue-600">
                                        {formatPrice(course.price)}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Lock className="h-5 w-5" />

                                    {processing
                                        ? 'Processing...'
                                        : 'Proceed to Payment'}
                                </button>

                                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                                    By completing your purchase, you agree to
                                    our terms and conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}