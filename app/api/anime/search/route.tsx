import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const item = searchParams.get("anime") || undefined;

    const anime = await db.anime.findMany({
      where: {
        name: item ? { contains: item, mode: 'insensitive'} : undefined,
      },
    });

    return NextResponse.json(anime, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
