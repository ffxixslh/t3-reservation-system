import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");
  // if (!roomId) {
  //   return NextResponse.json({
  //     message: "no roomId provided",
  //   });
  // }

  return NextResponse.json({
    roomId,
  });
}

export async function POST(request: NextRequest) {}
