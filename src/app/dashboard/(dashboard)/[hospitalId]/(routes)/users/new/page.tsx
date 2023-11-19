import { UserForm } from "../[userId]/components/user-form";

const UsersPage = async () => {
  await Promise.resolve();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={null} />
      </div>
    </div>
  );
};

export default UsersPage;
