"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { type TDepartment } from "~/types";
import { zhCN } from "date-fns/locale";
import { dateFormatter } from "~/lib/utils";

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
        {row.original?.description === null
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
    header: "创建日期",
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
