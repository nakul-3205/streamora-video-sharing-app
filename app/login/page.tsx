"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res || !res.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-800 transition-all duration-500 animate-fade-in">
      <div className="w-full max-w-5xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-in-left">
        
        {/* Left Side - Login Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Log in to your account to explore Streamora and share your creativity.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-medium py-2 rounded-lg transform hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Side - Purple Gradient with Floating Animations */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-md z-0" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 px-6">
            <h2 className="text-white text-4xl font-extrabold mb-3 animate-fade-in-slow hover:drop-shadow-glow transition duration-300">
              Streamora
            </h2>
            <p className="text-white text-sm max-w-sm mx-auto animate-fade-in-slow delay-200">
              Create. Connect. Captivate. A platform for creators to share, explore, and inspire through short videos.
            </p>
          </div>

          {/* Floating animated circles */}
          <div className="absolute w-64 h-64 bg-white/10 backdrop-blur-md rounded-full top-10 left-10 animate-float-slow"></div>
          <div className="absolute w-48 h-48 bg-white/10 backdrop-blur-md rounded-full bottom-10 right-10 animate-float-fast"></div>
        </div>
      </div>
    </div>
  );
}
