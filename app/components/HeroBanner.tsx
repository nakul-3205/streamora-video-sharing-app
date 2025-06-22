"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-center py-10 mb-10 shadow-lg"
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow">
        Watch & Share Your Shorts 🎬
      </h1>
      <p className="text-lg text-white/80 mt-2 max-w-xl mx-auto">
        The ultimate place to upload, explore, and enjoy short-form videos.
      </p>
    </motion.section>
  );
}
