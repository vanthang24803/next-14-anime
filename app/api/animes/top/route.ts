import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const topAnimes = await db.anime.findMany({
      orderBy: {
        views: "desc",
      },
      take: 20,
    });

    return NextResponse.json(topAnimes);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
