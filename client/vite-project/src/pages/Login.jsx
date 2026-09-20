import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from '../axiosCalls/axios';
import { useAuth } from '../context/AuthContext.jsx';


function Login() {
    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
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
        setIsLoading(true)
        try {
            const res = await axiosInstance.post('/users/login', form)
            setUser(res.data.userData);
            setForm({
                email: '',
                password: ''
            })
            console.log('User Logged In')
            setError('');
        }
        catch (err) {
            setError(err.response.data.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-background texture-noise flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-card p-10 border border-border">
                
                <div className="mb-12">
                    <h1 className="text-4xl font-playfair tracking-tight text-foreground mb-2">
                        Log In
                    </h1>
                    <p className="text-sm font-mono text-mutedForeground tracking-widest uppercase">
                        Authenticate session
                    </p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-4 bg-foreground text-background text-sm font-mono tracking-wide">
                            {error}
                        </div>
                    )}

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
                            placeholder="Enter password"
                            className="w-full bg-transparent border-b-2 border-border text-foreground placeholder:text-mutedForeground placeholder:italic py-3 text-lg transition-all duration-100 outline-none focus:border-b-[4px] focus:outline-none focus-visible:outline-none rounded-none"
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-foreground text-background font-mono uppercase tracking-widest text-sm hover:bg-background hover:text-foreground border-2 border-foreground transition-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Authenticating..." : "Submit"}
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-8 border-t border-borderLight text-center">
                    <p className="text-xs font-mono text-mutedForeground tracking-wide uppercase">
                        New user?{' '}
                        <Link
                            to="/signup"
                            className="text-foreground hover:underline underline-offset-4 decoration-1 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-foreground"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
