"use client";

import React from "react";

interface IVideo {
  _id: string;
  title: string;
  Description: string;
  videoUrl: string;
  createdAt: string;
}

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  if (!videos.length) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-gray-400">No videos to display yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-950 min-h-screen text-white">
      {videos.map((video) => (
        <div key={video._id} className="bg-gray-800 p-4 rounded-lg shadow">
          <video src={video.videoUrl} controls className="w-full rounded mb-2" />
          <h2 className="text-lg font-bold">{video.title}</h2>
          <p className="text-sm text-gray-400">{video.Description}</p>
        </div>
      ))}
    </div>
  );
}
