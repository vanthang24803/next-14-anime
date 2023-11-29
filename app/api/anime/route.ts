import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name, type, categories, episode, thumbnail, description } = body;

    const anime = await db.anime.create({
      data: {
        name,
        type,
        categories,
        episode,
        thumbnail,
        description,
        author: userId,
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const animes = await db.anime.findMany();
    return NextResponse.json(animes);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
