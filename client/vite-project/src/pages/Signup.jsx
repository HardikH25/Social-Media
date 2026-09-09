import { Link } from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from '../axiosCalls/axios'

function Signup() {
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const { name, username, email, password } = form

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value // key value pair
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/users/register', form) // payload - form data
            //add validation checks
            console.log("User Registered")
        } catch (error) {
            console.log(error)
        }

        setForm({
            name: '',
            username: '',
            email: '',
            password: ''
        })
    }

    return (
        <div className="relative min-h-screen w-full bg-[#050507] text-zinc-100 flex items-center justify-center px-4 py-12 selection:bg-zinc-800 selection:text-white overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-zinc-700/10 blur-[130px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

            {/* Card Container */}
            <div className="relative w-full max-w-[420px]">
                <div className="relative rounded-3xl bg-zinc-950/85 border border-zinc-800/80 shadow-[0_0_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl p-8 sm:p-10 before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-3xl before:bg-gradient-to-r before:from-transparent before:via-zinc-500/25 before:to-transparent">

                    {/* Top Logo / Icon */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/70 flex items-center justify-center shadow-lg shadow-black/60 mb-4">
                            <span className="text-sm font-extrabold tracking-tight text-white">sst</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Join sst social
                        </h1>
                        <p className="mt-1 text-xs text-zinc-400">
                            Connect seamlessly. Share effortlessly.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={name}
                                placeholder="e.g. Alex Morgan"
                                className="w-full bg-zinc-900/60 hover:bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 focus:bg-zinc-900 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-1 focus:ring-zinc-600"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                value={username}
                                placeholder="@ alexmorgan"
                                className="w-full bg-zinc-900/60 hover:bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 focus:bg-zinc-900 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-1 focus:ring-zinc-600"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={email}
                                placeholder="alex@example.com"
                                className="w-full bg-zinc-900/60 hover:bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 focus:bg-zinc-900 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-1 focus:ring-zinc-600"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={password}
                                placeholder="Create a password"
                                className="w-full bg-zinc-900/60 hover:bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 focus:bg-zinc-900 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-1 focus:ring-zinc-600"
                            />
                        </div>

                        {/* Register Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_-3px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_-2px_rgba(255,255,255,0.4)] active:scale-[0.99] cursor-pointer"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Footer Link to Login */}
                    <div className="mt-6 text-center text-xs text-zinc-400">
                        Already part of the community?{' '}
                        <Link
                            to="/login"
                            className="text-white font-medium hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
