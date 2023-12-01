import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { animeId: string } }
) {
  try {
    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const anime = await db.anime.findUnique({
      where: {
        id: params.animeId,
      },
      include: {
        chapters: true,
        comments: true,
      },
    });

    return NextResponse.json(anime);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
