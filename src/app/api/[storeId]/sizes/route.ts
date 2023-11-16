import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

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

    const size = await api.size.create({
      data: {
        name,
        value,
        hospitalId: params.hospitalId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
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

    const sizes = await api.size.findMany({
      where: {
        hospitalId: params.hospitalId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
