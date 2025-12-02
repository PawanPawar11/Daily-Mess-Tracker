import { useState } from 'react'

const Signup = () => {

    const [form, setForm] = useState({ name: "", email: "", password: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        localStorage.setItem("token", data.token);

        alert("Signup successful");
    }
    return (
        <div>
            <h2>Signup Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange} />
                <br /><br />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange} />
                <br /><br />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange} />
                <br /><br />
                <button>Sign up</button>
            </form>
        </div>
    )
}

export default Signup;