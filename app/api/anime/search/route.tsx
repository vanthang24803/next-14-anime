import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
