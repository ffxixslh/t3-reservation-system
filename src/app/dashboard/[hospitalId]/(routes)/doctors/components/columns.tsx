"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import type { TDoctor } from "~/types";
import { dateFormatter, levelFormatter } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<TDoctor>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        {"部门"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.department?.name}
      </div>
    ),
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        {"级别"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    header: "病历",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.medicalRecords.length}
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
