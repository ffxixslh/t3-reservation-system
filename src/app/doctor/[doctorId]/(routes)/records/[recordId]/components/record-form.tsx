"use client";

import type z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { api } from "~/trpc/react";
import { recordUpdateSchema } from "~/schemas";
import { type TRecord } from "~/types";

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
import TextUpload from "~/components/ui/text-upload";
import { useSession } from "next-auth/react";

type DoctorRecordFormValues = z.infer<
  typeof recordUpdateSchema
>;

interface DoctorRecordFormProps {
  initialData: TRecord | null;
}

export const DoctorRecordForm: React.FC<
  DoctorRecordFormProps
> = ({ initialData }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams<{
    doctorId: string;
    recordId: string;
  }>();
  const searchParams = useSearchParams()
  const patientId = searchParams.get('patientId')

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const recordCreateMutation =
    api.record.createRecord.useMutation();
  const recordUpdateMutation =
    api.record.updateRecord.useMutation();
  const recordDeleteMutation =
    api.record.deleteRecord.useMutation();

  const title = initialData ? "编辑病历" : "创建病历";
  const description = initialData
    ? "编辑该病历信息"
    : "添加该新的病历";
  const toastMessage = initialData
    ? "该病历信息已更新。"
    : "该病历信息已创建。";
  const action = initialData ? "保存" : "创建";

  const defaultValues: DoctorRecordFormValues =
    initialData ?? {
      id: "",
      hospitalId: session?.user.hospitalId ?? "",
      patientId: patientId ?? "",
      doctorId: session?.user.doctorId ?? "",
      texts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

  const form = useForm<DoctorRecordFormValues>({
    resolver: zodResolver(recordUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: DoctorRecordFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await recordUpdateMutation.mutateAsync(data);
      } else {
        await recordCreateMutation.mutateAsync(data);
      }
      router.push(`/doctor/${params.doctorId}/records`);
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
      await recordDeleteMutation.mutateAsync({
        id: params.recordId,
      });
      router.push(`/doctor/${params.doctorId}/records`);
      toast.success("病历数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该病历的相关数据。",
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
          <div className="gap-8 md:grid md:grid-cols-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`患者 ID`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`ID`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-8 md:grid">
            <FormField
              control={form.control}
              name="texts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`文本记录`}</FormLabel>
                  <FormControl>
                    <TextUpload
                      textsValue={field.value}
                      onCreate={(textValue) =>
                        field.onChange([
                          ...field.value,
                          textValue,
                        ])
                      }
                      onChange={(textValue) =>
                        field.onChange([
                          ...field.value.map((current) =>
                            current.id === textValue.id
                              ? textValue
                              : current,
                          ),
                        ])
                      }
                      onRemove={(textValue) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) =>
                              current.id !== textValue.id,
                          ),
                        ])
                      }
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
