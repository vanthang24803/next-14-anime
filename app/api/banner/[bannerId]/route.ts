import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    if (!params.bannerId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const { url, href } = await req.json();

    if (!url || !href) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const updateBanner = await db.banner.update({
      where: {
        id: params.bannerId,
      },
      data: {
        url,
        href,
      },
    });

    return NextResponse.json(updateBanner, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    if (!params.bannerId) {
      return new NextResponse("Anime id is required", { status: 400 });
    }

    const banner = await db.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    if (!banner) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    await db.banner.delete({
      where: {
        id: params.bannerId,
      },
    });

    return new NextResponse("Banner delete successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
