"use client";

import {
  Copy,
  Edit,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { api } from "~/trpc/react";
import { type TPatient } from "~/types";

interface CellActionProps {
  data: TPatient;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams<{ hospitalId: string }>();

  const userDeleteMutation =
    api.user.deleteUser.useMutation();

  const onConfirm = () => {
    try {
      setLoading(true);
      userDeleteMutation.mutate({
        id: data.id,
      });
      toast.success(`用户数据删除成功。`);
      router.refresh();
    } catch (error) {
      toast.error(`出了些问题`);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("用户 ID 已复制到剪贴板。");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{`打开菜单`}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{`操作`}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            <span>{`复制 Id`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/${params.hospitalId}/users/${data.id}`,
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>{`编辑`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>{`删除`}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
