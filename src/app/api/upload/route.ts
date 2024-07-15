import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  await fs.mkdir("public/imguploads", { recursive: true });
  const filePath = `public/imguploads/${crypto.randomUUID()}-${file.name}`;
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  console.log(`Uploaded file path: ${filePath}`);
  return NextResponse.json({ success: true });
};
