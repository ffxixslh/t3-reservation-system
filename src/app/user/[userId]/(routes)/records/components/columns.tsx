"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { zhCN } from "date-fns/locale";

import { CellAction } from "./cell-action";
import type { TRecord } from "~/types";
import { dateFormatter } from "~/lib/utils";
import { Button } from "~/components/ui/button";

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
