"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center tracking-tight">
          Upload Your Short Video
        </h1>
        <p className="text-gray-400 mb-6 sm:mb-8 text-center text-sm sm:text-base">
          Share your creativity with the world. Upload a video under 60 seconds.
        </p>

        <VideoUploadForm />
        <button type="submit">Go to <a href="/feed">Feed</a></button>
      </div>
    </div>
  );
}
