import React, { forwardRef } from 'react';

const Input = forwardRef(
    (
        {
            label,
            name,
            type = 'text',
            value,
            onChange,
            error,
            hint,
            required = false,
            disabled = false,
            placeholder = '',
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={name}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        {label}

                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                )}

                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type={type}
                    value={value ?? ''}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        block w-full rounded-lg border px-4 py-2.5 text-sm
                        text-gray-900 shadow-sm
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2
                        disabled:cursor-not-allowed disabled:bg-gray-100
                        ${
                            error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        }
                        ${className}
                    `}
                    {...props}
                />

                {hint && !error && (
                    <p className="mt-1 text-sm text-gray-500">
                        {hint}
                    </p>
                )}

                {error && (
                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;