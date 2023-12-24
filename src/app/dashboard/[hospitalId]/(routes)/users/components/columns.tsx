"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import type { TPatient } from "~/types";
import { dateFormatter, roleFormatter } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
        {[null, ""].includes(row.original?.email)
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        {"角色"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
        {row.original?.appointments?.length ?? 0}
      </div>
    ),
  },
  {
    accessorKey: "medicalRecord",
    header: "病历",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.medicalRecords?.length ?? 0}
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
        {dateFormatter(row.original?.createdAt)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
