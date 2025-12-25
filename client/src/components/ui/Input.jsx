import React from 'react';

const Input = ({
    label,
    id,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`
          w-full px-3 py-2 rounded-lg border 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors
          ${error
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-secondary-300 bg-white text-secondary-900 placeholder-secondary-400 dark:bg-secondary-900 dark:border-secondary-700 dark:text-secondary-100 dark:placeholder-secondary-500'
                    }
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export default Input;
