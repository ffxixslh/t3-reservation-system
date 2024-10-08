"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
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
import { AlertModal } from "~/components/modals/alert-modal";
import { api } from "~/trpc/react";
import { hospitalUpdateSchema } from "~/schemas";

type SettingsFormValues = z.infer<
  typeof hospitalUpdateSchema
>;

interface SettingsFormProps {
  initialData: {
    id: string;
    name: string;
  };
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const hospitalDeleteMutation =
    api.hospital.deleteHospital.useMutation();
  const hospitalUpdateMutation =
    api.hospital.updateHospital.useMutation();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(hospitalUpdateSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await hospitalUpdateMutation.mutateAsync(data);
      toast.success(`医院设置已更新。`);
      router.refresh();
    } catch (error) {
      toast.error(`出了些问题`);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await hospitalDeleteMutation.mutateAsync({
        id: initialData.id,
      });
      router.replace("/dashboard");
      toast.success(`医院数据已删除。`);
    } catch (error) {
      toast.error(`请先删除医院内所有内容再执行此操作。`);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={`医院设置`}
          description={`管理医院首选项`}
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`名称`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={`医院名称`}
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
