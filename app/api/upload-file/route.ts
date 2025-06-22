import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await imagekit.upload({
      file: buffer, // pass file buffer directly
      fileName: `${Date.now()}-${file.name}`,
      folder: "/streamora/videos", // optional folder in your ImageKit
      useUniqueFileName: true,
    });

    return NextResponse.json({ url: uploaded.url }); // this is what you store
  } catch (error: any) {
    console.error("ImageKit Upload Error:", error);
    return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
  }
}
