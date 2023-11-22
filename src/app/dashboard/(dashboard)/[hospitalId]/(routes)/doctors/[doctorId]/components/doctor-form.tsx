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
import { doctorUpdateSchema } from "~/schemas";
import { type TDepartment, type TDoctor } from "~/types";
import { levelFormatter } from "~/lib/utils";
import { LEVEL } from "~/constants";

type DoctorFormValues = z.infer<typeof doctorUpdateSchema>;

interface DoctorFormProps {
  initialData: TDoctor | null;
  departments: TDepartment[];
}

export const DoctorForm: React.FC<DoctorFormProps> = ({
  initialData,
  departments,
}) => {
  const params = useParams<{
    hospitalId: string;
    doctorId: string;
  }>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const doctorCreateMutation =
    api.doctor.createDoctor.useMutation();
  const doctorUpdateMutation =
    api.doctor.updateDoctor.useMutation();
  const doctorDeleteMutation =
    api.doctor.deleteDoctor.useMutation();

  const title = initialData ? "编辑医生" : "创建医生";
  const description = initialData
    ? "编辑该医生信息"
    : "添加该新的医生";
  const toastMessage = initialData
    ? "该医生信息已更新。"
    : "该医生信息已创建。";
  const action = initialData ? "保存" : "创建";

  const defaultValues: DoctorFormValues = initialData ?? {
    id: "",
    name: "",
    hospitalId: params.hospitalId,
    departmentId: "",
    level: "RESIDENT",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: DoctorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await doctorUpdateMutation.mutateAsync(data);
      } else {
        await doctorCreateMutation.mutateAsync(data);
      }
      router.push(
        `/dashboard/${params.hospitalId}/doctors`,
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
      await doctorDeleteMutation.mutateAsync({
        id: params.doctorId,
      });
      router.push(
        `/dashboard/${params.hospitalId}/doctors`,
      );
      toast.success("医生数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该医生的相关数据。",
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
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`医生名称`}</FormLabel>
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
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`部门`}</FormLabel>
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
                            placeholder="选择部门"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem
                            key={department.id}
                            value={department.id}
                          >
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`医生角色`}</FormLabel>
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
                        {LEVEL.map((level) => (
                          <SelectItem
                            key={level}
                            value={level}
                          >
                            {levelFormatter(level)}
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
