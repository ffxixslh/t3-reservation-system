import { api } from "~/trpc/server";

import { UsersClient } from "./components/client";

const UserPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  const users = await api.user.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={users} />
      </div>
    </div>
  );
};

export default UserPage;
