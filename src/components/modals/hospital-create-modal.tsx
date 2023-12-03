"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "~/components/ui/modal";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useBasicModal } from "~/hooks/use-basic-modal";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { hospitalSchema } from "~/schemas";

export const HospitalCreateModal = () => {
  const createModal = useBasicModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof hospitalSchema>>({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: "",
    },
  });
  const hospitalCreateMutation =
    api.hospital.createHospital.useMutation();

  const onSubmit = async (
    values: z.infer<typeof hospitalSchema>,
  ) => {
    try {
      setLoading(true);
      await hospitalCreateMutation.mutateAsync(values, {
        onSuccess: (data) => {
          router.push(`/dashboard/${data.id}`);
          form.setValue("name", "");
          createModal.onClose();
        },
      });
    } catch (error) {
      toast.error("出了些问题");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`创建医院`}
      description={`创建一个新的医院以管理其内容。`}
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
    >
      <>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`填写医院名称`}</FormLabel>
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
                <div className="flex w-full items-center justify-end space-x-2 pt-6">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={createModal.onClose}
                  >
                    {`取消`}
                  </Button>
                  <Button disabled={loading} type="submit">
                    {`继续`}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </>
    </Modal>
  );
};
