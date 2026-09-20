import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { axiosInstance } from '../axiosCalls/axios.js';

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/users/register', form)
            console.log('User Created');
            setForm({
                name:'',
                username:'',
                email:'',
                password:''
            })
            setError('');
            navigate('/login');
        }
        catch (err) {
            setError(err.response?.data?.message)
        }
    }
    return (
        <div className="min-h-screen bg-background texture-noise flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-card p-10 border border-border mt-6">
                
                <div className="mb-12">
                    <h1 className="text-4xl font-playfair tracking-tight text-foreground mb-2">
                        Register
                    </h1>
                    <p className="text-sm font-mono text-mutedForeground tracking-widest uppercase">
                        Create new identity
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-4 bg-foreground text-background text-sm font-mono tracking-wide">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase tracking-widest text-foreground">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={form.name}
                            placeholder="e.g. Alex Morgan"
                            className="w-full bg-transparent border-b-2 border-border text-foreground placeholder:text-mutedForeground placeholder:italic py-3 text-lg transition-all duration-100 outline-none focus:border-b-[4px] focus:outline-none focus-visible:outline-none rounded-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase tracking-widest text-foreground">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={form.username}
                            placeholder="@alexmorgan"
                            className="w-full bg-transparent border-b-2 border-border text-foreground placeholder:text-mutedForeground placeholder:italic py-3 text-lg transition-all duration-100 outline-none focus:border-b-[4px] focus:outline-none focus-visible:outline-none rounded-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase tracking-widest text-foreground">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            placeholder="email@example.com"
                            className="w-full bg-transparent border-b-2 border-border text-foreground placeholder:text-mutedForeground placeholder:italic py-3 text-lg transition-all duration-100 outline-none focus:border-b-[4px] focus:outline-none focus-visible:outline-none rounded-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase tracking-widest text-foreground">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="Create password"
                            className="w-full bg-transparent border-b-2 border-border text-foreground placeholder:text-mutedForeground placeholder:italic py-3 text-lg transition-all duration-100 outline-none focus:border-b-[4px] focus:outline-none focus-visible:outline-none rounded-none"
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            className="w-full py-4 bg-foreground text-background font-mono uppercase tracking-widest text-sm hover:bg-background hover:text-foreground border-2 border-foreground transition-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-3"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-8 border-t border-borderLight text-center">
                    <p className="text-xs font-mono text-mutedForeground tracking-wide uppercase">
                        Already verified?{' '}
                        <Link
                            to="/login"
                            className="text-foreground hover:underline underline-offset-4 decoration-1 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-foreground"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
