import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { animeId: string; commentId: string } }
) {
  try {
    if (!params.animeId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    if (!params.commentId) {
      return new NextResponse("Comment id is required", { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const anime = await db.anime.findUnique({
      where: {
        id: params.animeId,
      },
    });

    if (!anime) {
      return new NextResponse("Anime not found", { status: 404 });
    }

    const comment = await db.comments.findUnique({
      where: {
        id: params.commentId,
        author: userId,
      },
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    await db.comments.delete({
      where: {
        id: params.commentId,
      },
    });

    return NextResponse.json("Comment delete successfully!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
