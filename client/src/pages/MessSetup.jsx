import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const MessSetup = () => {
    const [form, setForm] = useState({
        messName: "",
        startDate: "",
        totalThalis: "",
        amountPerThali: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token")
        if (!token) {
            alert("No token found")
            setLoading(false)
            return
        }

        try {
            const res = await fetch("http://localhost:3000/api/mess/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            })

            const data = await res.json();

            if (res.ok) {
                alert("Mess Configuration Saved!")
                navigate('/dashboard')
            } else {
                alert(data.message || "Setup failed")
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Mess Configuration</h1>
                <p className="text-secondary-500 dark:text-secondary-400 mt-1">Set up your mess details and prepaid plan</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Mess Name"
                        id="messName"
                        type="text"
                        name="messName"
                        placeholder="e.g. Boys Hostel Mess"
                        value={form.messName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Start Date"
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Total Thalis (Prepaid)"
                            id="totalThalis"
                            type="number"
                            name="totalThalis"
                            placeholder="60"
                            value={form.totalThalis}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Amount Per Thali"
                            id="amountPerThali"
                            type="number"
                            name="amountPerThali"
                            placeholder="50"
                            value={form.amountPerThali}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Configuration'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default MessSetup