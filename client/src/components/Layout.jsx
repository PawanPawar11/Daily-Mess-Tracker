import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import ThemeToggle from './ui/ThemeToggle';
import authService from '../services/authService';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) => `
    text-sm font-medium transition-colors duration-200
    ${isActive(path)
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400'
        }
  `;

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50 dark:bg-secondary-950 transition-colors duration-200">
            <nav className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-secondary-200 dark:border-secondary-800 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                    MessTracker
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-8">
                            {token ? (
                                <>
                                    <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
                                    <Link to="/mess-setup" className={navLinkClass('/mess-setup')}>Setup</Link>
                                    <Link to="/logs" className={navLinkClass('/logs')}>Logs</Link>
                                    <ThemeToggle />
                                    <Button variant="ghost" onClick={handleLogout} className="text-sm">
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className={navLinkClass('/login')}>Login</Link>
                                    <ThemeToggle />
                                    <Link to="/signup">
                                        <Button variant="primary" className="text-sm">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 mt-auto transition-colors duration-200">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-secondary-500 dark:text-secondary-400">
                        © {new Date().getFullYear()} Daily Mess Tracker. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
