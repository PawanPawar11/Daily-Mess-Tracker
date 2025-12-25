import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Signup = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })

            const data = await res.json();

            if (res.ok) {
                alert("Signup successful! Please login.");
                navigate('/login');
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
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
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
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