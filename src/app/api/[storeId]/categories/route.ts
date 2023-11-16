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

    const { name, billboardId } = body;

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

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", {
        status: 400,
      });
    }

    if (!params.hospitalId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    // const storeByUserId = await api.store.findFirst({
    //   where: {
    //     id: params.hospitalId,
    //     userId,
    //   },
    // });

    // if (!storeByUserId) {
    //   return new NextResponse("Unauthorized", {
    //     status: 405,
    //   });
    // }

    // const category = await api.category.create({
    //   data: {
    //     name,
    //     billboardId,
    //     hospitalId: params.hospitalId,
    //   },
    // });
    const category = await Promise.resolve({
      id: "1",
      name: "Category 1",
      billboardId: "1",
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
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

    // const categories = await api.category.findMany({
    //   where: {
    //     hospitalId: params.hospitalId,
    //   },
    // });

    const categories = await Promise.resolve([
      {
        id: "1",
        name: "Category 1",
      },
    ]);

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
