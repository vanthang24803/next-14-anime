import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url, href } = await req.json();

    if (!url) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const newBanner = await db.banner.create({
      data: {
        url,
        href,
      },
    });

    return NextResponse.json(newBanner, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const listBanner = await db.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json(listBanner, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
