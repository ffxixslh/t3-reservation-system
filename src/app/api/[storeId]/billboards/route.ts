import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    //   const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", {
    //     status: 403,
    //   });
    // }

    if (!label) {
      return new NextResponse("Label is required", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    // const storeByUserId = await api.store.findFirst({
    //   where: {
    //     id: params.storeId,
    //     userId,
    //   },
    // });

    // if (!storeByUserId) {
    //   return new NextResponse("Unauthorized", {
    //     status: 405,
    //   });
    // }

    // const billboard = await api.billboard.create({
    //   data: {
    //     label,
    //     imageUrl,
    //     storeId: params.storeId,
    //   },
    // });

    const billboard = await Promise.resolve({
      id: "1",
      label: "Label 1",
      imageUrl: "Image URL 1",
      storeId: "1",
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    // const billboards = await api.billboard.findMany({
    //   where: {
    //     storeId: params.storeId,
    //   },
    // });
    const billboards = await Promise.resolve([
      {
        id: "1",
        label: "Label 1",
        imageUrl: "Image URL 1",
        storeId: "1",
      },
    ]);

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
