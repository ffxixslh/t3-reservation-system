"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

const UserPage = () => {
  const params = useParams<{ userId: string }>();
  const { data: user, isLoading } =
    api.user.getById.useQuery({
      id: params.userId,
    });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h1>Space</h1>
        <p className="w-[800px] ">
          {isLoading
            ? "Loading..."
            : "Hello, " + user?.name}
        </p>
      </div>
    </div>
  );
};

export default UserPage;
