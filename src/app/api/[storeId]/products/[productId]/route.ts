import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", {
        status: 400,
      });
    }

    // const product = await api.product.findUnique({
    //   where: {
    //     id: params.productId,
    //   },
    //   include: {
    //     images: true,
    //     category: true,
    //     size: true,
    //     color: true,
    //   },
    // });
    const product = await Promise.resolve({
      id: "1",
      name: "Product 1",
      category: "Category 1",
      images: ["p1.png", "p2.png"],
      size: "Size 1",
      color: "Color 1",
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { productId: string; storeId: string } },
) {
  try {
    //   const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", {
    //     status: 403,
    //   });
    // }

    if (!params.productId) {
      return new NextResponse("Product id is required", {
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

    // const product = await api.product.delete({
    //   where: {
    //     id: params.productId,
    //   },
    // });
    const product = await Promise.resolve({
      id: "1",
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { productId: string; storeId: string } },
) {
  try {
    //   const { userId } = auth();

    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      images,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", {
    //     status: 403,
    //   });
    // }

    if (!params.productId) {
      return new NextResponse("Product id is required", {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    if (!images?.length) {
      return new NextResponse("Images are required", {
        status: 400,
      });
    }

    if (!price) {
      return new NextResponse("Price is required", {
        status: 400,
      });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", {
        status: 400,
      });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", {
        status: 400,
      });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", {
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

    // await api.product.update({
    //   where: {
    //     id: params.productId,
    //   },
    //   data: {
    //     name,
    //     price,
    //     categoryId,
    //     colorId,
    //     sizeId,
    //     images: {
    //       deleteMany: {},
    //     },
    //     isFeatured,
    //     isArchived,
    //   },
    // });

    // const product = await api.product.update({
    //   where: {
    //     id: params.productId,
    //   },
    //   data: {
    //     images: {
    //       createMany: {
    //         data: [
    //           ...images.map(
    //             (image: { url: string }) => image,
    //           ),
    //         ],
    //       },
    //     },
    //   },
    // });

    const product = await Promise.resolve({
      id: "1",
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
