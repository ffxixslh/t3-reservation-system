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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
// import ImageUpload from "~/components/ui/image-upload";
// import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/react";
import { userUpdateSchema } from "~/schemas";
import { type Patient } from "~/types";

type PatientFormValues = z.infer<typeof userUpdateSchema>;

interface PatientFormProps {
  initialData: Patient | null;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  initialData,
}) => {
  const params = useParams<{
    hospitalId: string;
    patientId: string;
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

  const title = initialData ? "编辑患者" : "创建患者";
  const description = initialData
    ? "编辑该患者信息"
    : "添加该新的患者";
  const toastMessage = initialData
    ? "该患者信息已更新。"
    : "该患者信息已创建。";
  const action = initialData ? "保存" : "创建";

  const defaultValues: PatientFormValues = initialData
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

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: PatientFormValues) => {
    try {
      const transformedData: z.infer<
        typeof userUpdateSchema
      > = {
        ...data,
        role: "PATIENT" as const,
      };

      setLoading(true);
      if (initialData) {
        await userUpdateMutation.mutateAsync(
          transformedData,
        );
      } else {
        await userCreateMutation.mutateAsync(
          transformedData,
        );
      }
      router.push(
        `/dashboard/${params.hospitalId}/patients`,
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
      await userDeleteMutation.mutateAsync({
        id: params.patientId,
      });
      router.push(
        `/dashboard/${params.hospitalId}/patients`,
      );
      toast.success("患者数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error("出了些问题。");
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
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`名称`}</FormLabel>
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
                  <FormLabel>{`邮箱`}</FormLabel>
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
                  <FormLabel>{`电话`}</FormLabel>
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
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="ml-auto"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

/* <FormField
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
                          (current) => current.url !== url,
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */
