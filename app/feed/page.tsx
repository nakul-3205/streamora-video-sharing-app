// app/feed/page.tsx
import VideoFeed from "../components/VideoFeed";
import Header from "../components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ConnectToDbs } from "@/lib/db";
import Video from "@/models/Video";

export default async function FeedPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await ConnectToDbs();
  const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

  return (
    <>
      <Header />
      <main className="bg-[#0d0d0d] min-h-screen px-4 py-8">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center tracking-tight">
          Trending <span className="text-pink-500">Shorts</span>
        </h1>
        <VideoFeed videos={JSON.parse(JSON.stringify(videos))} />
        <footer className="text-center mt-16 text-sm text-gray-500">
  Made with ❤️ by{"Nakul Kejriwal"}
  <a
    href="https://github.com/nakul-3205"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-white transition"
  >
    @nakul-3205
  </a>
</footer>
      </main>
    </>
  );
}
