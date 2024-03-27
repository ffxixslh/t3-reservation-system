"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Heading } from "~/components/ui/heading";

import { api } from "~/trpc/react";
import { type TUserOrigin } from "~/types";
import { userUpdateSchema } from "~/schemas";

type SettingsFormValues = z.infer<typeof userUpdateSchema>;

interface SettingsFormProps {
  initialData: TUserOrigin;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const userUpdateMutation =
    api.user.updateUser.useMutation();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      ...initialData,
      email: initialData.email ?? "",
    } ?? {
      id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await userUpdateMutation.mutateAsync(data);
      toast.success(`用户设置已更新。`);
      router.refresh();
    } catch (error) {
      toast.error(`出了些问题`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`用户设置`}
          description={`管理用户首选项`}
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`名称`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={`用户名称`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`邮箱`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={`用户邮箱`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`电话`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={`用户电话`}
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
                  <FormLabel>{`密码`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={`用户密码`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
          >
            {`保存更改`}
          </Button>
        </form>
      </Form>
    </>
  );
};
