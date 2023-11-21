import { redirect } from "next/navigation";

const HomePage = async () => {
  await Promise.resolve();
  redirect("/dashboard");

  return (
    <div className="flex h-screen w-screen flex-col place-items-center justify-center">
      <div className="text-5xl font-bold">Home Page</div>
    </div>
  );
};
export default HomePage;
