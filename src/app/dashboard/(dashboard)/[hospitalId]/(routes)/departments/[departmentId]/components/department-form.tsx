"use client";

import type * as z from "zod";
// import axios from "axios";
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
import { departmentUpdateSchema } from "~/schemas";
import { type TDepartment } from "~/types";
import { api } from "~/trpc/react";
// import ImageUpload from "~/components/ui/image-upload";

type DepartmentFormValues = z.infer<
  typeof departmentUpdateSchema
>;

interface DepartmentFormProps {
  initialData: TDepartment | null;
}

export const DepartmentForm: React.FC<
  DepartmentFormProps
> = ({ initialData }) => {
  const params = useParams<{
    hospitalId: string;
    departmentId: string;
  }>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const departmentCreateMutation =
    api.department.createDepartment.useMutation();
  const departmentUpdateMutation =
    api.department.updateDepartment.useMutation();
  const departmentDeleteMutation =
    api.department.deleteDepartment.useMutation();

  const title = initialData ? "编辑部门" : "创建部门";
  const description = initialData
    ? "编辑该部门信息"
    : "添加该新的部门";
  const toastMessage = initialData
    ? "该部门信息已更新。"
    : "该部门信息已创建。";
  const action = initialData ? "保存" : "创建";

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentUpdateSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          description: initialData?.description ?? "",
        }
      : {
          id: "",
          name: "",
          description: "",
          hospitalId: params.hospitalId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
  });

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await departmentUpdateMutation.mutateAsync(data);
      } else {
        await departmentCreateMutation.mutateAsync(data);
      }
      router.push(
        `/dashboard/${params.hospitalId}/departments`,
      );
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
      await departmentDeleteMutation.mutateAsync({
        id: params.departmentId,
      });
      router.push(
        `/dashboard/${params.hospitalId}/departments`,
      );
      toast.success("部门数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该部门的相关数据。",
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
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
                  <FormLabel>{`部门名称`}</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`部门描述`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`描述`}
                      {...field}
                    />
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
