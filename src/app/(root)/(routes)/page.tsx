import CRUD from "./components/temp";

export default async function Home({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  await Promise.resolve();
  //return an empty div
  return (
    <>
      <CRUD />
    </>
  );
}
