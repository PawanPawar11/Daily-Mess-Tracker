import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    ...props
}) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-secondary-900';

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600',
        secondary: 'bg-white text-secondary-700 border border-secondary-300 hover:bg-secondary-50 focus:ring-secondary-500 shadow-sm dark:bg-secondary-800 dark:text-secondary-100 dark:border-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md dark:bg-red-500 dark:hover:bg-red-600',
        ghost: 'text-primary-600 hover:bg-primary-50 hover:text-primary-700 dark:text-primary-400 dark:hover:bg-secondary-800 dark:hover:text-primary-300',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
