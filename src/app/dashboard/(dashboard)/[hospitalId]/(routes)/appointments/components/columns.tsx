"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { zhCN } from "date-fns/locale";

import { CellAction } from "./cell-action";
import type { TAppointment } from "~/types";
import {
  dateFormatter,
  statusFormatter,
} from "~/lib/utils";

export const columns: ColumnDef<TAppointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "预约状态",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {statusFormatter(row.original?.status)}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: "预约时间",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {dateFormatter(row.original?.time, zhCN)}
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: "医生",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.doctor.name}
      </div>
    ),
  },
  {
    accessorKey: "patient",
    header: "患者",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.patient.name}
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
