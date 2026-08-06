import React, { useEffect, useMemo, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Flag,
    Lock,
    Send,
} from 'lucide-react';

import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Take({
    exam,
    attempt,
}) {
    const questions = exam.questions || [];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState({});

    const [timeLeft, setTimeLeft] = useState(
        exam.time_limit ? exam.time_limit * 60 : null
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSubmitConfirmation, setShowSubmitConfirmation] =
        useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const { post } = useForm();

    /*
    |--------------------------------------------------------------------------
    | Timer
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (timeLeft === null || isSubmitting) {
            return;
        }

        if (timeLeft <= 0) {
            submitExam(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitting]);

    /*
    |--------------------------------------------------------------------------
    | Format Timer
    |--------------------------------------------------------------------------
    */

    const formattedTime = useMemo(() => {
        if (timeLeft === null) {
            return 'No Time Limit';
        }

        const hours = Math.floor(timeLeft / 3600);

        const minutes = Math.floor((timeLeft % 3600) / 60);

        const seconds = timeLeft % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        return `${String(minutes).padStart(2, '0')}:${String(
            seconds
        ).padStart(2, '0')}`;
    }, [timeLeft]);

    /*
    |--------------------------------------------------------------------------
    | Timer Warning
    |--------------------------------------------------------------------------
    */

    const isTimeRunningOut =
        timeLeft !== null && timeLeft <= 300;

    /*
    |--------------------------------------------------------------------------
    | Answer Handling
    |--------------------------------------------------------------------------
    */

    const handleSingleAnswer = (questionId, optionId) => {
        setAnswers((previous) => ({
            ...previous,
            [questionId]: optionId,
        }));
    };

    const handleMultipleAnswer = (questionId, optionId) => {
        setAnswers((previous) => {
            const currentAnswers = previous[questionId] || [];

            const alreadySelected =
                currentAnswers.includes(optionId);

            return {
                ...previous,
                [questionId]: alreadySelected
                    ? currentAnswers.filter(
                          (id) => id !== optionId
                      )
                    : [...currentAnswers, optionId],
            };
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Submit Exam
    |--------------------------------------------------------------------------
    */

    const submitExam = (autoSubmit = false) => {
        if (isSubmitting) {
            return;
        }

        if (!autoSubmit) {
            setShowSubmitConfirmation(false);
        }

        setIsSubmitting(true);

        post(
            route('exam-attempts.submit', attempt.id),
            {
                answers,
                auto_submitted: autoSubmit,
            },
            {
                preserveScroll: true,
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Navigation
    |--------------------------------------------------------------------------
    */

    const goToPrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(
                currentQuestionIndex - 1
            );
        }
    };

    const goToNext = () => {
        if (
            currentQuestionIndex <
            questions.length - 1
        ) {
            setCurrentQuestionIndex(
                currentQuestionIndex + 1
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Progress
    |--------------------------------------------------------------------------
    */

    const answeredCount = Object.keys(answers).filter(
        (questionId) => {
            const answer = answers[questionId];

            return Array.isArray(answer)
                ? answer.length > 0
                : Boolean(answer);
        }
    ).length;

    const progressPercentage =
        questions.length > 0
            ? Math.round(
                  (answeredCount / questions.length) *
                      100
              )
            : 0;

    if (!currentQuestion) {
        return (
            <DashboardLayout>
                <Head title={exam.title} />

                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        No Questions Available
                    </h1>

                    <p className="mt-2 text-gray-500">
                        This examination does not have any questions yet.
                    </p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Head title={`Taking Exam - ${exam.title}`} />

            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-purple-100 p-3">
                                <Flag className="h-6 w-6 text-purple-600" />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    {exam.title}
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Attempt #{attempt.attempt_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timer */}
                    <div
                        className={`flex items-center gap-3 rounded-xl px-5 py-3 ${
                            isTimeRunningOut
                                ? 'bg-red-50 text-red-700'
                                : 'bg-blue-50 text-blue-700'
                        }`}
                    >
                        <Clock className="h-6 w-6" />

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide">
                                Time Remaining
                            </p>

                            <p className="font-mono text-2xl font-bold">
                                {formattedTime}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                {isTimeRunningOut && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                        <AlertTriangle className="h-5 w-5 shrink-0" />

                        <p className="text-sm font-medium">
                            Your exam time is almost finished. Your exam will
                            be submitted automatically when the timer reaches
                            zero.
                        </p>
                    </div>
                )}

                {/* Progress */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Exam Progress
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {answeredCount} of {questions.length}{' '}
                                questions answered
                            </p>
                        </div>

                        <p className="text-lg font-bold text-blue-600">
                            {progressPercentage}%
                        </p>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${progressPercentage}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Main Exam */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Question Navigation */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="font-semibold text-gray-900">
                                Questions
                            </h2>

                            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-4">
                                {questions.map(
                                    (question, index) => {
                                        const answer =
                                            answers[
                                                question.id
                                            ];

                                        const isAnswered =
                                            Array.isArray(
                                                answer
                                            )
                                                ? answer.length >
                                                  0
                                                : Boolean(
                                                      answer
                                                  );

                                        const isCurrent =
                                            index ===
                                            currentQuestionIndex;

                                        return (
                                            <button
                                                key={
                                                    question.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setCurrentQuestionIndex(
                                                        index
                                                    )
                                                }
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                                                    isCurrent
                                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                                        : isAnswered
                                                          ? 'bg-green-100 text-green-700'
                                                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded bg-blue-600" />
                                    Current
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded bg-green-100" />
                                    Answered
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded bg-gray-100" />
                                    Not Answered
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            {/* Question Header */}
                            <div className="border-b border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-blue-600">
                                        Question{' '}
                                        {currentQuestionIndex +
                                            1}{' '}
                                        of {questions.length}
                                    </span>

                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                                        {currentQuestion.type}
                                    </span>
                                </div>

                                <h2 className="mt-5 text-xl font-semibold leading-8 text-gray-900">
                                    {currentQuestion.question}
                                </h2>

                                <p className="mt-3 text-sm text-gray-500">
                                    {currentQuestion.type ===
                                    'multiple_choice'
                                        ? 'Select one answer.'
                                        : currentQuestion.type ===
                                            'multiple_answer'
                                          ? 'Select all correct answers.'
                                          : 'Select your answer.'}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 p-6">
                                {currentQuestion.options?.map(
                                    (option, index) => {
                                        const currentAnswer =
                                            answers[
                                                currentQuestion
                                                    .id
                                            ];

                                        const isMultiple =
                                            currentQuestion.type ===
                                            'multiple_answer';

                                        const isSelected =
                                            isMultiple
                                                ? (
                                                      currentAnswer ||
                                                      []
                                                  ).includes(
                                                      option.id
                                                  )
                                                : currentAnswer ===
                                                  option.id;

                                        return (
                                            <button
                                                key={
                                                    option.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    isMultiple
                                                        ? handleMultipleAnswer(
                                                              currentQuestion.id,
                                                              option.id
                                                          )
                                                        : handleSingleAnswer(
                                                              currentQuestion.id,
                                                              option.id
                                                          )
                                                }
                                                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                                                    isSelected
                                                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center ${
                                                        isMultiple
                                                            ? 'rounded-lg'
                                                            : 'rounded-full'
                                                    } border-2 text-sm font-bold ${
                                                        isSelected
                                                            ? 'border-blue-600 bg-blue-600 text-white'
                                                            : 'border-gray-300 text-gray-600'
                                                    }`}
                                                >
                                                    {isMultiple &&
                                                    isSelected ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : (
                                                        String.fromCharCode(
                                                            65 +
                                                                index
                                                        )
                                                    )}
                                                </div>

                                                <span className="font-medium text-gray-800">
                                                    {
                                                        option.option_text
                                                    }
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="flex flex-col gap-3 border-t border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="button"
                                    onClick={goToPrevious}
                                    disabled={
                                        currentQuestionIndex ===
                                        0
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Previous
                                </button>

                                {currentQuestionIndex <
                                questions.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowSubmitConfirmation(
                                                true
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white hover:bg-green-700"
                                    >
                                        <Send className="h-4 w-4" />
                                        Submit Exam
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="rounded-xl bg-yellow-100 p-3">
                                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Submit Examination?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    You have answered{' '}
                                    <strong>
                                        {answeredCount}
                                    </strong>{' '}
                                    out of{' '}
                                    <strong>
                                        {questions.length}
                                    </strong>{' '}
                                    questions.
                                </p>

                                {answeredCount <
                                    questions.length && (
                                    <p className="mt-2 text-sm font-medium text-red-600">
                                        You still have unanswered questions.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowSubmitConfirmation(
                                        false
                                    )
                                }
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Continue Exam
                            </button>

                            <button
                                type="button"
                                onClick={() => submitExam(false)}
                                disabled={isSubmitting}
                                className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? 'Submitting...'
                                    : 'Submit Exam'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}