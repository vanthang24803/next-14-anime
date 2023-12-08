import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    if (!params.seasonId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const { thumbnail, href , name } = await req.json();

    if (!thumbnail || !href || !name) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const updateSeason = await db.season.update({
      where: {
        id: params.seasonId,
      },
      data: {
        name,
        thumbnail,
        href,
      },
    });

    return NextResponse.json(updateSeason, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    if (!params.seasonId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const banner = await db.banner.findUnique({
      where: {
        id: params.seasonId,
      },
    });

    if (!banner) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    await db.banner.delete({
      where: {
        id: params.seasonId,
      },
    });

    return new NextResponse("Banner delete successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
