"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function SignOutPage() {
  const router = useRouter();
  const onSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <main className="grid min-h-screen w-full place-items-center">
      <div className="flex flex-col items-center gap-4 rounded-xl border p-8">
        <p className="font-400 text-xl">确定要注销吗？</p>
        <div className="flex gap-2">
          <Button onClick={onSignOut}>注销</Button>
          <Button
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            返回
          </Button>
        </div>
      </div>
    </main>
  );
}
