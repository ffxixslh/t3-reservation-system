"use client";

import { signIn } from "next-auth/react";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

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
import { credentialsSchema } from "~/schemas";
import toast from "react-hot-toast";

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") ?? "/";

  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof credentialsSchema>,
  ) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        phone: values.phone,
        password: values.password,
        callbackUrl,
      });
      if (!res) {
        toast.error("无效的电话或密码");
        return;
      }

      router.push(callbackUrl);
      toast.success("登录成功");
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
      <div className="font-300 text-xl">{"登录"}</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="w-[360px] space-y-6"
        >
          <div className="gap-4 md:grid md:grid-rows-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"电话"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入11位电话号码"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"密码"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入个人密码"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {"登录"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
