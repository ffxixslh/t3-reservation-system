"use client";

import type z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
import { DatetimePicker } from "~/components/ui/datetime-picker";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

import { api } from "~/trpc/react";
import { appointmentUpdateSchema } from "~/schemas";
import {
  type TDepartment,
  type TAppointment,
} from "~/types";
import { selectTimeConstraintMap } from "~/constants";
import { timeParser } from "~/lib/utils";

type AppointmentFormValues = z.infer<
  typeof appointmentUpdateSchema
>;

interface AppointmentFormProps {
  initialData: TAppointment | null;
  departments: TDepartment[];
}

export const AppointmentForm: React.FC<
  AppointmentFormProps
> = ({ initialData, departments }) => {
  const params = useParams<{
    appointmentId: string;
  }>();
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departmentId, setDepartmentId] = useState(
    initialData?.doctor.departmentId ?? "",
  );

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

  const doctors =
    departments.filter(
      (department) => department.id === departmentId,
    )[0]?.doctors ?? [];

  const defaultValues: AppointmentFormValues =
    initialData ?? {
      id: "",
      status: "PENDING",
      time: new Date(),
      description: "",
      hospitalId: session?.user.hospitalId ?? "",
      patientId: session?.user.id ?? "",
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
    const [minHours] = timeParser(
      selectTimeConstraintMap.MIN,
    );
    const [maxHours] = timeParser(
      selectTimeConstraintMap.MAX,
    );

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
      router.push(`/user/${session?.user.id}/appointments`);
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
      router.push(`/user/${session?.user.id}/appointments`);
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

  const onDepartmentSelect = (departmentId: string) => {
    setDepartmentId(departmentId);
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
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-[5px] pb-2 pt-1.5">
                  <FormLabel>{`预约时间`}</FormLabel>
                  <DatetimePicker
                    defaultDate={field.value}
                    setDefaultDate={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-y-[5px] space-y-2 pb-2 pt-1.5">
              <Label>{`预约科目`}</Label>
              <Select
                disabled={loading}
                onValueChange={onDepartmentSelect}
                value={departmentId}
                required={true}
              >
                <SelectTrigger>
                  <SelectValue
                    defaultValue={""}
                    placeholder="选择科目"
                  />
                </SelectTrigger>
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
            </div>
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
          </div>
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`病情描述`}</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={`病情描述`}
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
