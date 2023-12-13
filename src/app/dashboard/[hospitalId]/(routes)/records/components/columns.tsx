"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { zhCN } from "date-fns/locale";

import { CellAction } from "./cell-action";
import type { TRecord } from "~/types";
import { dateFormatter } from "~/lib/utils";

export const columns: ColumnDef<TRecord>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "texts",
    header: "文本记录",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.texts?.length ?? 0}
      </div>
    ),
  },
  {
    accessorKey: "doctorId",
    header: "医生",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.doctor?.name}
      </div>
    ),
  },
  {
    accessorKey: "patientId",
    header: "患者",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.patient?.name}
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
