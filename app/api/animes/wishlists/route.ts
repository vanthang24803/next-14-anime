import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { animeId } = await req.json();

    const existingRecord = await db.wishlist.findFirst({
      where: {
        userId,
        animeId,
      },
    });

    if (existingRecord) {
      return NextResponse.json({ message: "Record already exists" });
    }

    const wishlist = await db.wishlist.create({
      data: {
        userId,
        animeId,
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const wishlists = await db.wishlist.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(wishlists);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
