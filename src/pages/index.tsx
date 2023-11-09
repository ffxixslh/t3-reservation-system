import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  const { data, error } = api.user.getByName.useQuery({
    name: "John Doe",
  });

  return (
    <>
      <Head>
        <title>Reservation System</title>
        <meta name="description" content="Reservation System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <p className="text-2xl text-white">
            {error ? (
              <span className="mb-8 text-red-500">
                {error?.data?.zodError?.fieldErrors.title}
              </span>
            ) : data ? (
              data.map((user) => <p key={user.id}>{user.name}</p>)
            ) : (
              "Loading..."
            )}
          </p>
        </div>
      </main>
    </>
  );
}
