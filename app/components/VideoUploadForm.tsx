"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadCloud, Loader2 } from "lucide-react";

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setError("File must be under 100MB");
        setVideo(null);
      } else {
        setVideo(file);
        setError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !video) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Upload file to ImageKit
      const formData = new FormData();
      formData.append("file", video);

      const uploadRes = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      const videoUrl = uploadData.url;

      // Save metadata to MongoDB
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          Description: description,
          videoUrl,
          thumbnailUrl: "/placeholder.jpg", // change if you use real thumbnails
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      // Reset + redirect
      setTitle("");
      setDescription("");
      setVideo(null);
      router.push("/feed");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Title*"
        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="text-white"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex justify-center items-center gap-2"
        whileTap={{ scale: 0.97 }}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" /> Uploading...
          </>
        ) : (
          <>
            <UploadCloud className="h-5 w-5" /> Upload Video
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
