import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const files = data.getAll("files");

  if (files.length === 0) {
    return NextResponse.json({ success: false, message: "No files provided" });
  }

  const uploadPromises = files.map(async (file) => {
    if (file instanceof File) {
      await fs.mkdir("public/imguploads", { recursive: true });
      const filePath = `public/imguploads/${crypto.randomUUID()}-${file.name}`;
      await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
      console.log(`Uploaded file path: ${filePath}`);
    }
  });

  await Promise.all(uploadPromises);

  return NextResponse.json({ success: true });
};
