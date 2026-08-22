import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await get("files/Vishwang_Suthar_fs.pdf", {
      access: "private",
    });

    if (!result) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "application/pdf",
        "Content-Disposition":
          'attachment; filename="Vishwang_Suthar_Resume.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error(error);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
