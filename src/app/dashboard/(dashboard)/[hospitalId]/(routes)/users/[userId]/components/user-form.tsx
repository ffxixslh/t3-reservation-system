"use client";

import type z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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
import { AlertModal } from "~/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
// import ImageUpload from "~/components/ui/image-upload";

import { api } from "~/trpc/react";
import { userUpdateSchema } from "~/schemas";
import { type TPatient } from "~/types";
import { roleFormatter } from "~/lib/utils";
import { ROLE } from "~/constants";

type UserFormValues = z.infer<typeof userUpdateSchema>;

interface UserFormProps {
  initialData: TPatient | null;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
}) => {
  const params = useParams<{
    hospitalId: string;
    userId: string;
  }>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userCreateMutation =
    api.user.createUser.useMutation();
  const userUpdateMutation =
    api.user.updateUser.useMutation();
  const userDeleteMutation =
    api.user.deleteUser.useMutation();

  const title = initialData ? "编辑用户" : "创建用户";
  const description = initialData
    ? "编辑该用户信息"
    : "添加该新的用户";
  const toastMessage = initialData
    ? "该用户信息已更新。"
    : "该用户信息已创建。";
  const action = initialData ? "保存" : "创建";

  const defaultValues: UserFormValues = initialData
    ? {
        ...initialData,
        email: initialData.email ?? "",
      }
    : {
        id: "",
        name: "",
        password: "123456",
        email: "",
        phone: "",
        role: "PATIENT",
        hospitalId: params.hospitalId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await userUpdateMutation.mutateAsync(data);
      } else {
        await userCreateMutation.mutateAsync(data);
      }
      router.push(`/dashboard/${params.hospitalId}/users`);
      toast.success(toastMessage);
      router.refresh();
    } catch (error) {
      toast.error("出了些问题。");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await userDeleteMutation.mutateAsync({
        id: params.userId,
      });
      router.push(`/dashboard/${params.hospitalId}/users`);
      toast.success("用户数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该用户的相关数据。",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onInvalid = (error: unknown) =>
    console.error(error);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="w-full space-y-8"
        >
          {/* <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map(
                        (image) => image.url,
                      )}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([
                          ...field.value,
                          { url },
                        ])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) =>
                              current.url !== url,
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          <div className="gap-8 md:grid md:grid-cols-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`用户名称`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`名称`}
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
                  <FormLabel>{`用户邮箱`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`邮箱`}
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
                  <FormLabel>{`用户电话`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`电话`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`用户角色`}</FormLabel>
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
                            placeholder="选择角色"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE.map((role) => (
                          <SelectItem
                            key={role}
                            value={role}
                          >
                            {roleFormatter(role)}
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
          <div className="flex w-fit gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="ml-auto"
            >
              {action}
            </Button>
            <Button
              variant="secondary"
              type="button"
              disabled={loading}
              className="ml-auto"
              onClick={() => router.back()}
            >
              {`取消`}
            </Button>
            <Button
              variant="ghost"
              type="reset"
              disabled={loading}
              className="ml-auto"
              onClick={() => form.reset()}
            >
              {`重置`}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
