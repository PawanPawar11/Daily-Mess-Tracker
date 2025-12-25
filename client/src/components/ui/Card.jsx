import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white dark:bg-secondary-900 rounded-xl shadow-lg border border-secondary-100 dark:border-secondary-800 p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
