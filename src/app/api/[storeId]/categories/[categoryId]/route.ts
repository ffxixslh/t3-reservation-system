import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", {
        status: 400,
      });
    }

    const category = await api.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { categoryId: string; hospitalId: string } },
) {
  try {
    //   const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", {
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

    const category = await api.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { categoryId: string; hospitalId: string } },
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

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", {
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

    const category = await api.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
