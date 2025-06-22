import { IKVideo } from "imagekitio-react";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-neutral-800">
      {/* Video Thumbnail Preview */}
      <Link href={`/videos/${video._id}`} className="block group">
        <div
          className="relative w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.015]"
          style={{ aspectRatio: "9/16" }}
        >
          <IKVideo
            path={video.videoUrl}
            transformation={[
              {
                height: "1920",
                width: "1080",
                quality: "auto",
              },
            ]}
            controls={video?.controls ?? true}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Title + Description */}
      <div className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="block hover:opacity-90 transition-opacity"
        >
          <h2 className="text-base font-semibold text-white truncate">
            {video.title}
          </h2>
        </Link>
        <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
          {video.Description}
        </p>
      </div>
    </div>
  );
}
