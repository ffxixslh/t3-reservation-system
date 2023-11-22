"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { zhCN } from "date-fns/locale";

import { CellAction } from "./cell-action";
import type { TDoctor } from "~/types";
import { dateFormatter, levelFormatter } from "~/lib/utils";

export const columns: ColumnDef<TDoctor>[] = [
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "departmentId",
    header: "部门 ID",
  },
  {
    accessorKey: "role",
    header: "级别",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {levelFormatter(row.original?.level)}
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
