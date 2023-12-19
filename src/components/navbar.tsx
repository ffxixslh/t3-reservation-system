import { ThemeToggle } from "~/components/theme-toggle";

interface NavbarProps {
  mainNav?: React.ReactNode;
  subNav?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = async ({
  mainNav,
  subNav,
}) => {
  await Promise.resolve();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {mainNav && <div className="px-4">{mainNav}</div>}
        <div className="ml-auto flex items-center space-x-4">
          {subNav && <div className="px-2">{subNav}</div>}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
