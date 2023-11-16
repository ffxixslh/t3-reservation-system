import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", {
        status: 400,
      });
    }

    // const billboard = await api.billboard.findUnique({
    //   where: {
    //     id: params.billboardId,
    //   },
    // });

    const billboard = await Promise.resolve({
      id: "1",
      label: "Label 1",
      imageUrl: "Image URL 1",
      hospitalId: "1",
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string; hospitalId: string };
  },
) {
  try {
    //   const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", {
    //     status: 403,
    //   });
    // }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", {
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

    // const billboard = await api.billboard.delete({
    //   where: {
    //     id: params.billboardId,
    //   },
    // });

    const billboard = await Promise.resolve({
      id: "1",
      label: "Label 1",
      imageUrl: "Image URL 1",
      hospitalId: "1",
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string; hospitalId: string };
  },
) {
  try {
    //   const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

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

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", {
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

    // const billboard = await api.billboard.update({
    //   where: {
    //     id: params.billboardId,
    //   },
    //   data: {
    //     label,
    //     imageUrl,
    //   },
    // });

    const billboard = await Promise.resolve({
      id: "1",
      label: "Label 1",
      imageUrl: "Image URL 1",
      hospitalId: "1",
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
