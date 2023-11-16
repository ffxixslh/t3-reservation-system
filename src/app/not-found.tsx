import { EyeNoneIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <EyeNoneIcon
        width="40px"
        height="40px"
        className="text-gray-400"
      />
      <h2 className="text-xl font-semibold">
        404 Not Found
      </h2>
      <p>{`找不到请求的页面。`}</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        {`返回首页`}
      </Link>
    </main>
  );
}
