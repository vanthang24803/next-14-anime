import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const page =
      req.query && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;

    const limitItems = 20;
    const totalItems = await db.anime.count({
      where: {
        categories: {
          has: "HORROR",
        },
      },
    });
    const totalPages = Math.ceil(totalItems / limitItems);

    if (page > totalPages) {
      return new NextResponse("Page Not Found", { status: 404 });
    }

    const listAnimes = await db.anime.findMany({
      where: {
        categories: {
          has: "HORROR",
        },
      },
      orderBy: {
        creatAt: "desc",
      },
      skip: (page - 1) * limitItems,
      take: limitItems,
    });

    return NextResponse.json({
      page,
      totalPages,
      totalItems,
      items: listAnimes,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
