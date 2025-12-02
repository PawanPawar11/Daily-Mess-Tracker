import { useState } from 'react'

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })

        const data = await res.json();

        localStorage.setItem("token", data.token);

        alert("Login successful!")
    }
    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder='Enter your email'
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    type="password"
                    name="password"
                    placeholder='Enter your password'
                    onChange={handleChange}
                />
                <br /><br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login