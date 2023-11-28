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
import { recordUpdateSchema } from "~/schemas";
import { type TDoctor, type TRecord } from "~/types";
import TextUpload from "~/components/ui/text-upload";

type RecordFormValues = z.infer<typeof recordUpdateSchema>;

interface RecordFormProps {
  initialData: TRecord | null;
  doctors: TDoctor[];
}

export const RecordForm: React.FC<RecordFormProps> = ({
  initialData,
  doctors,
}) => {
  const params = useParams<{
    hospitalId: string;
    recordId: string;
  }>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const recordCreateMutation =
    api.record.createRecord.useMutation();
  const recordUpdateMutation =
    api.record.updateRecord.useMutation();
  const recordDeleteMutation =
    api.record.deleteRecord.useMutation();

  const title = initialData
    ? "编辑医疗记录"
    : "创建医疗记录";
  const description = initialData
    ? "编辑该医疗记录信息"
    : "添加该新的医疗记录";
  const toastMessage = initialData
    ? "该医疗记录信息已更新。"
    : "该医疗记录信息已创建。";
  const action = initialData ? "保存" : "创建";

  const defaultValues: RecordFormValues = initialData ?? {
    id: "",
    hospitalId: params.hospitalId,
    patientId: "",
    doctorId: "",
    textId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const form = useForm<RecordFormValues>({
    resolver: zodResolver(recordUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: RecordFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await recordUpdateMutation.mutateAsync(data);
      } else {
        await recordCreateMutation.mutateAsync(data);
      }
      router.push(
        `/dashboard/${params.hospitalId}/records`,
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
      await recordDeleteMutation.mutateAsync({
        id: params.recordId,
      });
      router.push(
        `/dashboard/${params.hospitalId}/records`,
      );
      toast.success("医疗记录数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该医疗记录的相关数据。",
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
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`医生`}</FormLabel>
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
                            placeholder="选择医生"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.id}
                          >
                            {doctor.name}
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
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="textId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`文本记录`}</FormLabel>
                  <FormControl>
                    <TextUpload
                      initialData={
                        initialData?.text ?? null
                      }
                      onChange={(textId) =>
                        field.onChange(textId)
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
