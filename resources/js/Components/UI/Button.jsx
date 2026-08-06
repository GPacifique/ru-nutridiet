import React from 'react';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    onClick,
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variants = {
        primary:
            'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',

        secondary:
            'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',

        success:
            'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',

        danger:
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',

        warning:
            'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',

        info:
            'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',

        outline:
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400',

        ghost:
            'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400',

        link:
            'text-indigo-600 hover:text-indigo-800 hover:underline focus:ring-0',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;