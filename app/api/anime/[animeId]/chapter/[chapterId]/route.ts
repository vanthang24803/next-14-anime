import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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

export async function GET(
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        animeId: params.animeId,
      },
    });

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
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

    const { name, title, thumbnail, url } = await req.json();

    if (!name || !title || !thumbnail || !url) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const anime = await db.anime.findUnique({
      where: {
        id: params.animeId,
      },
    });

    if (!anime) {
      return new NextResponse("Anime not found", { status: 404 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    const updateChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        animeId: params.animeId,
      },
      data: {
        name,
        title,
        thumbnail,
        url,
      },
    });

    return NextResponse.json(updateChapter, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
