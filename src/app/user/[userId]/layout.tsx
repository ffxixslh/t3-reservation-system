import UserNavbar from "~/components/user/user-navbar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  return (
    <>
      <UserNavbar />
      {children}
    </>
  );
}
