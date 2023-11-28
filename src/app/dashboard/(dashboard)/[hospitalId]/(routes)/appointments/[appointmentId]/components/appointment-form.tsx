"use client";

import type z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { appointmentUpdateSchema } from "~/schemas";
import { type TAppointment, type TDoctor } from "~/types";
import {
  DatetimePicker,
  selectTimeConstraint,
  timeParser,
} from "~/components/ui/datetime-picker";
import { STATUS } from "~/constants";
import { statusFormatter } from "~/lib/utils";

type AppointmentFormValues = z.infer<
  typeof appointmentUpdateSchema
>;

interface AppointmentFormProps {
  initialData: TAppointment | null;
  doctors: TDoctor[];
}

export const AppointmentForm: React.FC<
  AppointmentFormProps
> = ({ initialData, doctors }) => {
  const params = useParams<{
    hospitalId: string;
    appointmentId: string;
  }>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const appointmentCreateMutation =
    api.appointment.createAppointment.useMutation();
  const appointmentUpdateMutation =
    api.appointment.updateAppointment.useMutation();
  const appointmentDeleteMutation =
    api.appointment.deleteAppointment.useMutation();

  const title = initialData ? "编辑预约" : "创建预约";
  const description = initialData
    ? "编辑该预约信息"
    : "添加该新的预约";
  const toastMessage = initialData
    ? "该预约信息已更新。"
    : "该预约信息已创建。";
  const action = initialData ? "保存" : "创建";

  const defaultValues: AppointmentFormValues =
    initialData ?? {
      id: "",
      status: "PENDING",
      time: new Date(),
      hospitalId: params.hospitalId,
      patientId: "",
      doctorId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentUpdateSchema),
    defaultValues,
  });

  const timeValidator = (timeValue: Date) => {
    const time = timeValue.toTimeString();
    const [selectHours] = timeParser(time);
    const [minHours] = timeParser(selectTimeConstraint.min);
    const [maxHours] = timeParser(selectTimeConstraint.max);

    return selectHours > minHours && selectHours < maxHours;
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!timeValidator(data.time)) {
      toast.error("请在可预约时段重新选择时间。");
      return void 0;
    }
    try {
      setLoading(true);
      if (initialData) {
        await appointmentUpdateMutation.mutateAsync(data);
      } else {
        await appointmentCreateMutation.mutateAsync(data);
      }
      router.push(
        `/dashboard/${params.hospitalId}/appointments`,
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
      await appointmentDeleteMutation.mutateAsync({
        id: params.appointmentId,
      });
      router.push(
        `/dashboard/${params.hospitalId}/appointments`,
      );
      toast.success("预约数据已删除。");
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该预约的相关数据。",
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`预约状态`}</FormLabel>
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
                            placeholder="选择状态"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS.map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                          >
                            {statusFormatter(status)}
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
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-[5px] pb-2 pt-1.5">
                  <FormLabel>{`预约时间`}</FormLabel>
                  <DatetimePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`预约医生`}</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      required={true}
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
                  <FormLabel>{`预约患者 ID`}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={`患者 ID`}
                      required={true}
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
