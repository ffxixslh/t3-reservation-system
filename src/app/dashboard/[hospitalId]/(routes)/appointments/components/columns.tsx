"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import type { TAppointment } from "~/types";
import {
  dateFormatter,
  statusFormatter,
} from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<TAppointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        {"预约状态"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {statusFormatter(row.original?.status)}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        {"预约时间"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {dateFormatter(row.original?.time)}
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
