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
import { type TDoctor } from "~/types";
import { doctorUpdateSchema } from "~/schemas";
import { addDays } from "date-fns";
import { TimeRangePicker } from "~/components/ui/time-range-picker";
import { DatePickerWithRange } from "~/components/ui/date-range-picker";

type SettingsFormValues = z.infer<
  typeof doctorUpdateSchema
>;

interface SettingsFormProps {
  initialData: TDoctor;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const doctorUpdateMutation =
    api.doctor.updateDoctor.useMutation();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(doctorUpdateSchema),
    defaultValues: {
      ...initialData,
      dateRange: initialData?.dateRange ?? {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    } ?? {
      id: "",
      name: "",
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await doctorUpdateMutation.mutateAsync(data);
      toast.success(`医生设置已更新。`);
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
          title={`医生设置`}
          description={`管理医生首选项`}
        />
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
                      placeholder={`医生名称`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`可预约日期`}</FormLabel>
                  <FormControl>
                    <DatePickerWithRange
                      defaultDateRange={field.value}
                      setDefaultDateRange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`可预约时段`}</FormLabel>
                  <FormControl>
                    <TimeRangePicker
                      defaultTimeRange={field.value}
                      setDefaultTimeRange={field.onChange}
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
