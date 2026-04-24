import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 10;
const STORE_NAME = "jewelry-images-2";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Allowed: JPG, PNG, WEBP, GIF` },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_SIZE_MB}MB` },
        { status: 400 }
      );
    }

    // Extract extension from filename
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const blobPath = `diamonds/${Date.now()}-${safeName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const blob = await put(blobPath, buffer, {
      contentType: file.type,
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("[upload error]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
