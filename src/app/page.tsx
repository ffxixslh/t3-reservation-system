import Link from "next/link";
import { LeftNav } from "~/components/left-nav";
import Navbar from "~/components/navbar";
import { RightNav } from "~/components/right-nav";
import { getServerAuthSession } from "~/server/auth";

const HomePage = async () => {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar mainNav={<LeftNav />} subNav={<RightNav />} />
      <div className="container flex flex-col gap-12 px-4 py-16 ">
        <div className="text-center text-2xl text-white">
          {session && (
            <>
              <span>Logged in as {session.user.name}</span>
              <div className="flex gap-4 p-2">
                <Link
                  href={`/user/${session.user.id}`}
                  className="border-b border-b-blue-400"
                >
                  User Space
                </Link>
                {session.user.role === "DOCTOR" && (
                  <Link
                    href={`/doctor/${session.user.doctorId}`}
                    className="border-b border-b-blue-400"
                  >
                    Doctor Space
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <Link
            href={
              session ? "/auth/signout" : "/auth/signin"
            }
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "注销" : "登录"}
          </Link>
          {session && (
            <Link
              href={"/auth/signup"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {"注册"}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
export default HomePage;
