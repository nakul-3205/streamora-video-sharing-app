"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setPasswordError("");
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/feed");
    } catch (error) {
      setPasswordError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-[#1b1b1b] to-[#2c2c2c]">
      <motion.div
        className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] text-white flex flex-col md:flex-row overflow-hidden"
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Side (Form) */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center animate-slide-in-left">
          <motion.h2
            className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Streamora
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            <motion.input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 placeholder:text-gray-400"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            />

            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 placeholder:text-gray-400"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            />

            <motion.input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 placeholder:text-gray-400"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            />

            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:brightness-110 font-semibold text-white rounded-xl transition-all"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Register"}
              </button>
            </motion.div>

            {passwordError && (
              <motion.p
                className="text-center text-sm text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {passwordError}
              </motion.p>
            )}

            <motion.p
              className="text-sm text-center text-white/60 mt-4"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              Already have an account?{" "}
              <a href="/login" className="text-fuchsia-400 hover:underline">
                Login
              </a>
            </motion.p>
          </motion.form>
        </div>

        {/* Right Side (Visual) */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-fuchsia-600 to-purple-800 relative overflow-hidden animate-slide-in-right">
          <div className="absolute inset-0 opacity-90"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 px-6">
            <h2 className="text-white text-4xl font-extrabold mb-3 animate-fade-in-slow">Streamora</h2>
            <p className="text-white text-sm max-w-sm mx-auto animate-fade-in-slow delay-200">
              Create. Connect. Captivate. Your platform to express through videos – anytime, anywhere.
            </p>
          </div>
          <div className="absolute w-64 h-64 bg-white/10 backdrop-blur-md rounded-full top-10 left-10 animate-pulse"></div>
          <div className="absolute w-48 h-48 bg-white/10 backdrop-blur-md rounded-full bottom-10 right-10 animate-ping"></div>
        </div>
      </motion.div>
    </div>
  );
}
