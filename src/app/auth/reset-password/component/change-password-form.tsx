"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const changePasswordSchema = z.object({
  phone: z.string().length(11),
});

export function ChangePasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<
    z.infer<typeof changePasswordSchema>
  >({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof changePasswordSchema>,
  ) => {
    try {
      setLoading(true);

      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        toast.error("无效的电话");
        return;
      }

      toast.success("重置密码成功");
      router.refresh();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (error: unknown) =>
    console.error(error);

  return (
    <div className="relative flex-col items-center justify-center">
      <div className="font-300 text-xl">{"重置密码"}</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="w-[360px] space-y-6"
        >
          <div className="gap-4 md:grid ">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"电话"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入11位电话"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {"重置密码"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-sm font-thin">
        想起您的密码了吗?
        <Link href="/auth/signin">
          <span className="ml-4 w-full text-right text-blue-500 hover:border-b">
            前往登录
          </span>
        </Link>
      </div>
    </div>
  );
}
