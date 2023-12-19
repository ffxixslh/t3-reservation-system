import { api } from "~/trpc/server";

import { UserForm } from "./components/user-form";

const UserPage = async ({
  params,
}: {
  params: { userId: string; hospitalId: string };
}) => {
  const user = await api.user.getOneById.query({
    id: params.userId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default UserPage;
