import Navbar from "~/components/navbar";
import { IconNav } from "~/components/icon-nav";
import { LeftNav } from "~/components/left-nav";
import { RightNav } from "~/components/right-nav";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = async ({
  children,
}) => {
  return (
    <section className="min-h-screen w-full">
      <Navbar
        mainNav={<LeftNav />}
        subNav={<RightNav />}
        iconNav={<IconNav />}
      />
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="rounded-xl px-8 py-6 dark:bg-opacity-10 dark:text-white">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
