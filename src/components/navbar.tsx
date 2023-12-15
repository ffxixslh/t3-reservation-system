import { ThemeToggle } from "~/components/theme-toggle";
import { LeftNav } from "./left-nav";
import { RightNav } from "./right-nav";

export default async function Navbar() {
  await Promise.resolve();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <LeftNav className="px-4" />
        <div className="ml-auto flex items-center space-x-4">
          <RightNav className="px-4" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
