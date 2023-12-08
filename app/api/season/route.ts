import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { thumbnail, href, name } = await req.json();

    if (!thumbnail) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const newSeason = await db.season.create({
      data: {
        name,
        thumbnail,
        href,
      },
    });

    return NextResponse.json(newSeason, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const listSeason = await db.season.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 9,
    });

    return NextResponse.json(listSeason, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
