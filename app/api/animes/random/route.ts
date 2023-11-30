import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const listIdAlimes = await db.anime.findMany({
      select: { id: true },
    });

    // Hoán vị danh sách một cách ngẫu nhiên
    for (let i = listIdAlimes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listIdAlimes[i], listIdAlimes[j]] = [listIdAlimes[j], listIdAlimes[i]];
    }

    let randomAlimes = [];

    for (let i = 0; i < Math.min(6, listIdAlimes.length); i++) {
      const anime = await db.anime.findUnique({
        where: {
          id: listIdAlimes[i].id,
        },
      });

      if (anime) {
        randomAlimes.push(anime);
      }
    }

    return NextResponse.json(randomAlimes);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
