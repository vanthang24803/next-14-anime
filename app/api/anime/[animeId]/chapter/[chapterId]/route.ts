import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { animeId: string; chapterId: string } }
) {
  try {
    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    if (!params.chapterId) {
      return new NextResponse("Chapter id is required", { status: 400 });
    }

    const updateView = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    await db.anime.update({
      where: {
        id: params.animeId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updateView);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
