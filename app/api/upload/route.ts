import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ConnectToDbs } from "@/lib/db";
import Video from "@/models/Video";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectToDbs();

    const body = await req.json();
    const { title, Description, videoUrl, thumbnailUrl } = body;

    if (!title || !videoUrl || !thumbnailUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newVideo = await Video.create({
      title,
      Description,
      videoUrl,
      thumbnailUrl,
      createdAt: new Date(),
    });

    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save video data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectToDbs();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(videos || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
