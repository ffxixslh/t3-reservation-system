interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = async ({
  children,
}) => {
  return (
    <section className="grid min-h-screen place-items-center">
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="rounded-xl px-8 py-6 text-white dark:bg-opacity-10">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
