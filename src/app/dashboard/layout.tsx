export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await Promise.resolve();
  return <div className="h-full w-full">{children}</div>;
}
