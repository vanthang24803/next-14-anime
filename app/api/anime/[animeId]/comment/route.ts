import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { animeId: string } }
) {
  try {
    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const { content } = await req.json();

    if (!content) {
      return new NextResponse("Missing body!", { status: 400 });
    }

    const { userId } = auth();

    const user = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await db.comments.create({
      data: {
        content,
        author: userId,
        authorName: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
        animeId: params.animeId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { animeId: string } }
) {
  try {
    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const listCommets = await db.comments.findMany({
      where: {
        animeId: params.animeId,
      },
    });

    return NextResponse.json(listCommets);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
