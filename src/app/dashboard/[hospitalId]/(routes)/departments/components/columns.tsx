"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { type TDepartment } from "~/types";
import { zhCN } from "date-fns/locale";
import { dateFormatter } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<TDepartment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "description",
    header: "描述",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {[null, ""].includes(row.original?.description)
          ? "无"
          : row.original?.description}
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: "医生",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.doctors.length}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        {"创建时间"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {dateFormatter(row.original?.createdAt, zhCN)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
