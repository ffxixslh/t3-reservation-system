import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export async function PATCH(
  req: Request,
  { params }: { params: { hospitalId: string } },
) {
  try {
    //   const { userId } = auth();
    const body = await req.json();

    const { name } = body;

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

    if (!params.hospitalId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const store = await api.store.updateMany({
      where: {
        id: params.hospitalId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hospitalId: string } },
) {
  try {
    //   const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.hospitalId) {
      return new NextResponse("Store id is required", {
        status: 400,
      });
    }

    const store = await api.store.deleteMany({
      where: {
        id: params.hospitalId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
