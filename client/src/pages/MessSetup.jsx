import { useState, useEffect } from 'react'

const MessSetup = () => {
    const [form, setForm] = useState({
        messName: "",
        startDate: "",
        totalThalis: "",
        amountPerThali: ""
    });

    let token = localStorage.getItem("token");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/mess/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        })

        const data = await res.json();

        alert(data.message);
    }

    useEffect(() => {
        const fetchMessData = async () => {
            const res = await fetch("http://localhost:3000/api/mess/details", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json();

            if (data && data.messName) setForm(data)
        }

        fetchMessData();
    }, [])
    return (
        <div>
            <h2>Mess Setup</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="messName"
                    placeholder="Enter your mess name"
                    value={form.messName}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    type="date"
                    name="startDate"
                    value={form.startDate?.slice(0, 10)}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    type="number"
                    name="totalThalis"
                    placeholder="Total Thalis"
                    value={form.totalThalis}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    type="number"
                    name="amountPerThali"
                    placeholder="Amount Per Thali"
                    value={form.amountPerThali}
                    onChange={handleChange}
                />
                <br /><br />
                <button>Save Mess Info</button>
            </form>
        </div>
    )
}

export default MessSetup