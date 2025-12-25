import { Link } from 'react-router-dom';
import Button from './components/ui/Button';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-secondary-900 dark:text-white">
          Track Your Daily <br />
          <span className="text-primary-600 dark:text-primary-400">Mess Expenses</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
          Simplifying mess management for students and hostels. Track daily meals, manage expenses, and generate reports effortlessly.
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/signup">
          <Button variant="primary" className="px-8 py-3 text-lg">
            Get Started
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary" className="px-8 py-3 text-lg">
            Login
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left w-full max-w-5xl px-4">
        <div className="p-6 bg-white dark:bg-secondary-900 rounded-xl shadow-sm border border-secondary-100 dark:border-secondary-800">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-900 dark:text-white">Real-time Tracking</h3>
          <p className="text-secondary-600 dark:text-secondary-400">Log your daily meals and keep track of your consumption history.</p>
        </div>
        <div className="p-6 bg-white dark:bg-secondary-900 rounded-xl shadow-sm border border-secondary-100 dark:border-secondary-800">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-900 dark:text-white">Prepaid Plans</h3>
          <p className="text-secondary-600 dark:text-secondary-400">Manage prepaid thali plans and track remaining balance.</p>
        </div>
        <div className="p-6 bg-white dark:bg-secondary-900 rounded-xl shadow-sm border border-secondary-100 dark:border-secondary-800">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-900 dark:text-white">Easy Management</h3>
          <p className="text-secondary-600 dark:text-secondary-400">Simple tools for mess managers to handle student records and billing.</p>
        </div>
      </div>
    </div>
  );
}

export default App;