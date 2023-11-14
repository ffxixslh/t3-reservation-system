import { api } from "~/trpc/server";

import { ColorForm } from "./components/color-form";

const data = {
  name: "",
  value: "",
};

const ColorPage = async ({
  params,
}: {
  params: { colorId: string };
}) => {
  await Promise.resolve(1);
  // const color = await api.color.findUnique({
  //   where: {
  //     id: params.colorId,
  //   },
  // });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={data} />
      </div>
    </div>
  );
};

export default ColorPage;
