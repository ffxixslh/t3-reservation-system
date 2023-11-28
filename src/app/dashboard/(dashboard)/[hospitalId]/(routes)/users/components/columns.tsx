"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { zhCN } from "date-fns/locale";

import { CellAction } from "./cell-action";
import type { TPatient } from "~/types";
import { dateFormatter, roleFormatter } from "~/lib/utils";

export const columns: ColumnDef<TPatient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "email",
    header: "邮箱",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.email === null
          ? "无"
          : row.original?.email}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "电话",
  },
  {
    accessorKey: "role",
    header: "角色",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {roleFormatter(row.original?.role)}
      </div>
    ),
  },
  {
    accessorKey: "appointment",
    header: "预约",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.appointments.length}
      </div>
    ),
  },
  {
    accessorKey: "medicalRecord",
    header: "医疗记录",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.medicalRecords.length}
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
