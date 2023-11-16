import { NextResponse } from "next/server";

import { api } from "~/trpc/server";
// import { auth } from "@clerk/nextjs";

export async function POST(
  req: Request,
  { params }: { params: { hospitalId: string } },
) {
  try {
    //   const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!value) {
      return new NextResponse("Value is required", {
        status: 400,
      });
    }

    if (!params.hospitalId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const storeByUserId = await api.store.findFirst({
      where: {
        id: params.hospitalId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 405,
      });
    }

    const color = await api.color.create({
      data: {
        name,
        value,
        hospitalId: params.hospitalId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { hospitalId: string } },
) {
  try {
    if (!params.hospitalId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const colors = await api.color.findMany({
      where: {
        hospitalId: params.hospitalId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
