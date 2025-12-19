import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, Moon, Sun, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder: hook up to real auth later
        console.log("Login attempt", { email, password });
    };

    return (
        // Changed bg gradient to a simpler light gray for light mode
        <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            
            {/* 🔴 THIS DIV WAS REMOVED: 
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_20%_20%,#60a5fa,transparent_25%),radial-gradient(circle_at_80%_0%,#c084fc,transparent_20%),radial-gradient(circle_at_50%_80%,#38bdf8,transparent_20%)]"></div> 
            */}

            <div className={`relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                <div className={`hidden lg:flex flex-col justify-between rounded-3xl p-10 border ${darkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/70 border-gray-200 shadow-xl backdrop-blur-lg"}`}>
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-700 flex items-center justify-center text-white shadow-lg">
                                <ShieldCheck size={26} />
                            </div>
                            <div>
                                <p className="text-sm opacity-80">HR Management</p>
                                <h2 className="text-2xl font-bold">Welcome Back</h2>
                            </div>
                        </div>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Streamline your workforce, track performance, and stay compliant — all in one place. Sign in to access your dashboard and keep everything moving.
                        </p>
                    </div>

                    <div className="mt-12 space-y-4">
                        {[
                            "Single dashboard for HR insights",
                            "Secure access with role-based controls",
                            "Real-time updates across teams"
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-cyan-400/10 text-cyan-500 flex items-center justify-center border border-cyan-500/20">
                                    <ShieldCheck size={18} />
                                </div>
                                <p className="text-sm">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`relative rounded-3xl border p-8 sm:p-10 shadow-2xl ${darkMode ? "bg-gray-900/80 border-gray-800 backdrop-blur" : "bg-white/80 border-gray-200 backdrop-blur-lg"}`}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-sm opacity-70">Sign in</p>
                            <h1 className="text-2xl font-bold">Access your account</h1>
                        </div>
                        <button
                            aria-label="Toggle theme"
                            onClick={() => setDarkMode((prev) => !prev)}
                            className={`p-2 rounded-full border transition-colors ${darkMode ? "bg-gray-800 border-gray-700 text-amber-300" : "bg-white border-gray-200 text-blue-600"}`}
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Work Email</label>
                            <div className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${darkMode ? "bg-gray-800 border-gray-700 focus-within:border-cyan-400" : "bg-white border-gray-200 focus-within:border-fuchsia-700"}`}>
                                <Mail size={18} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className={`flex-1 bg-transparent outline-none text-sm ${darkMode ? "text-gray-100 placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-500"}`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${darkMode ? "bg-gray-800 border-gray-700 focus-within:border-cyan-400" : "bg-white border-gray-200 focus-within:border-fuchsia-700"}`}>
                                <Lock size={18} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`flex-1 bg-transparent outline-none text-sm ${darkMode ? "text-gray-100 placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-500"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Remember me</span>
                            </label>
                            <Link to="#" className="text-blue-600 hover:underline text-sm">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            // Updated gradient to cyan-400 to fuchsia-700
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-700 text-white font-semibold shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* <p className={`mt-6 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        By continuing you agree to our{" "}
                        <Link to="#" className="text-blue-600 hover:underline">Terms</Link> and{" "}
                        <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    </p> */}
                </div>
            </div>
        </div>
    );
}