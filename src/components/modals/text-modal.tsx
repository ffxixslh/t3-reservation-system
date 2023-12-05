"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { Modal } from "~/components/ui/modal";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

import { useTextModal } from "~/hooks/use-text-modal";
import { textUpdateSchema } from "~/schemas";
import { useRouter } from "next/navigation";
import { type TText } from "~/types";
import { api } from "~/trpc/react";
import { useTextUpdated } from "~/hooks/use-text-updated";

interface TextModalProps {
  initialValue: TText;
}

export const TextModal: React.FC<TextModalProps> = ({
  initialValue,
}) => {
  const textModal = useTextModal();
  const router = useRouter();
  const [isTextUpdated, setIsTextUpdated] =
    useTextUpdated();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof textUpdateSchema>>({
    resolver: zodResolver(textUpdateSchema),
    defaultValues: initialValue,
    values: initialValue,
  });

  const createTextMutation =
    api.text.createText.useMutation();
  const updateTextMutation =
    api.text.updateText.useMutation();
  const deleteTextMutation =
    api.text.deleteText.useMutation();

  const title =
    initialValue?.id !== ""
      ? "更新文本记录"
      : "创建文本记录";
  const description =
    initialValue?.id !== ""
      ? "更新该文本记录。"
      : "创建一个新的文本记录。";
  const toastMessage =
    initialValue?.id !== ""
      ? "该文本记录已更新。"
      : "该文本记录已创建。";

  const onSubmit = async (
    values: z.infer<typeof textUpdateSchema>,
  ) => {
    try {
      setLoading(true);
      if (initialValue?.id !== "") {
        await updateTextMutation.mutateAsync(values);
      } else {
        await createTextMutation.mutateAsync(values);
      }
      setIsTextUpdated(true);
      textModal.onClose();
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("出了些问题");
    } finally {
      setLoading(false);
      setIsTextUpdated(false);
      form.reset();
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteTextMutation.mutateAsync({
        id: initialValue?.id,
      });
      router.refresh();
      textModal.onClose();
      toast.success("该文本记录已删除。");
    } catch (error) {
      toast.error("出了些问题");
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (error: unknown) =>
    console.error(error);

  return (
    <Modal
      title={title}
      description={description}
      isOpen={textModal.isOpen}
      onClose={textModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                return form.handleSubmit(
                  onSubmit,
                  onInvalid,
                )(e);
              }}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`文本标题`}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={`标题需要多于4个字。`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`文本内容`}</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder={`内容需要多于8个字。`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  type="button"
                  disabled={loading}
                  variant="outline"
                  onClick={textModal.onClose}
                >
                  {`取消`}
                </Button>
                <Button disabled={loading} type="submit">
                  {`上传`}
                </Button>
                <Button
                  disabled={loading}
                  type="button"
                  variant="destructive"
                  color="red"
                  onClick={onDelete}
                >
                  {`删除`}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
