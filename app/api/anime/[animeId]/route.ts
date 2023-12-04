import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

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
        chapters: {
          orderBy: {
            createdAt: "asc",
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(anime);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { animeId: string } }
) {
  try {
    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, description, thumbnail } = await req.json();

    if (!name || !description || !thumbnail) {
      return new NextResponse("Request Missing Data", { status: 400 });
    }

    const anime = await db.anime.findUnique({
      where: {
        id: params.animeId,
      },
    });

    if (!anime) {
      return new NextResponse("Anime not found!", { status: 404 });
    }

    const updateAnime = await db.anime.update({
      where: {
        id: params.animeId,
      },
      data: {
        name,
        description,
        thumbnail,
        author: userId,
      },
    });

    return NextResponse.json(updateAnime, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
