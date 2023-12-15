"use client";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import toast from "react-hot-toast";

import { userSchema } from "~/schemas";
import { api } from "~/trpc/react";
import { type THospital } from "~/types";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { TRPCClientError } from "@trpc/client";
import { signIn } from "next-auth/react";
import { TRPCError } from "@trpc/server";

interface SignUpFormProps {
  hospitals: THospital[];
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  hospitals,
}) => {
  const router = useRouter();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") ?? "/";

  const createNewUserMutation =
    api.user.createNewUser.useMutation();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      hospitalId: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof userSchema>,
  ) => {
    // debugger;
    try {
      setLoading(true);

      const newUser =
        await createNewUserMutation.mutateAsync({
          ...values,
        });

      if (!newUser) {
        toast.error("无效的电话或密码");
        return;
      }

      if (newUser instanceof TRPCError) {
        toast.error(newUser.message);
        return;
      }

      toast.success("注册成功");
      await signIn("credentials", {
        redirect: false,
        phone: newUser.phone,
        password: newUser.password,
        callbackUrl,
      });
      router.push(callbackUrl);
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error(error.message);
      } else {
        toast.error(error as string);
      }
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (error: unknown) =>
    console.error(error);

  const onRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatPassword(event.target.value);
  };

  return (
    <div className="relative flex-col items-center justify-center">
      <div className="font-300 text-xl">{"注册"}</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="w-[360px] space-y-6"
        >
          <div className="gap-4 md:grid md:grid-rows-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"姓名"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入姓名"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`用户邮箱（选填）`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`请输入邮箱`}
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
            <div className="space-y-2">
              <Label htmlFor="sign-up-form-repeat-password">
                {"确认密码"}
              </Label>
              <Input
                id="sign-up-form-repeat-password"
                placeholder="请再次输入密码"
                value={repeatPassword}
                onChange={onRepeatPasswordChange}
              />
            </div>
            <FormField
              control={form.control}
              name="hospitalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`医院`}</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="选择医院"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hospitals.map((hospital) => (
                          <SelectItem
                            key={hospital.id}
                            value={hospital.id}
                          >
                            {hospital.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {"注册"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
