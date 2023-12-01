import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(
  req: Request,
  { params }: { params: { animeId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const { name, title, thumbnail, url } = await req.json();

    const anime = await db.anime.findUnique({
      where: {
        id: params.animeId,
      },
    });

    if (!anime) {
      return new NextResponse("Anime not found", { status: 404 });
    }

    const chapter = await db.chapter.create({
      data: {
        name,
        title,
        thumbnail,
        url,
        animeId: params.animeId,
      },
    });

    await db.anime.update({
      where: {
        id: params.animeId,
      },
      data: {
        episode: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
