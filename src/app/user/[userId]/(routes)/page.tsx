"use client";

import { useUserInfoContext } from "~/providers/user/user-info-provider";

const UserPage = () => {
  const user = useUserInfoContext();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h1>Space</h1>
        <p className="w-[800px] ">Hello, {user?.name}</p>
      </div>
    </div>
  );
};

export default UserPage;
