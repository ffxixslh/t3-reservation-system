"use client";

import { MainNav } from "~/components/main-nav";
import { ThemeToggle } from "~/components/theme-toggle";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <MainNav className="mx-6" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
