"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "./Notification";
import { Upload } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] border-b border-neutral-800 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
            Streamora
          </span>
        </Link>

        <button
          onClick={() => {
            showNotification("Redirecting to upload...", "info");
            setTimeout(() => router.push("/upload"), 1000);
          }}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>
    </header>
  );
}
