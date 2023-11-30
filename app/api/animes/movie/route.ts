import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const movies = await db.anime.findMany({
      where: {
        type: "MOVIE",
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
