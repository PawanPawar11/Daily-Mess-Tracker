import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import authService from '../services/authService'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.signup({ name, email, password });
            alert("Signup Successful")
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            const message = error.response?.data?.message || "Signup failed";
            alert(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Create Account</h2>
                    <p className="text-secondary-500 dark:text-secondary-400 mt-2">Start tracking your mess expenses today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-secondary-600 dark:text-secondary-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                        Sign in
                    </Link>
                </p>
            </Card>
        </div>
    )
}

export default Signup