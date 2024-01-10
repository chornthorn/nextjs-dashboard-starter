"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus } from "@phosphor-icons/react";
import { DataTablePagination } from "@/components/data-table-paginate";
import { toast } from "sonner";
import salesInvoices from "@/lib/data/sales-invoices.json";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { SalesInvoicesService } from "@/lib/services/sales-invoices.service";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-8 md:min-w-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "invoice_no",
    header: "Invoice No.",
    cell: ({ row }) => (
      <div className="w-[100px] truncate">
        <Link
          href={`/sales-invoices/detail/${row.getValue("id")}`}
          passHref
          className="hover:underline"
        >
          {row.getValue("invoice_no")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="w-[100px] truncate">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "base_grand_total",
    header: "Base Grand Total",
    cell: ({ row }) => (
      <div className="min-w-32 md:min-w-5 truncate">
        {row.getValue("base_grand_total")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: boolean = row.getValue("status");

      return (
        <Badge
          variant={status ? "default" : "destructive"}
          className="capitalize"
          aria-label={status ? "Paid" : "Unpaid"}
        >
          {status ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>Delete </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogTitle>Delete </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium">
                ({data.id}) {data.name}
              </span>
              ?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  toast.success("deleted successfully");
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

async function fetchSalesInvoices() {
  try {
    const salesInvoicesService = SalesInvoicesService.getInstance();
    return await salesInvoicesService.finds();
  } catch (error) {
    console.error(error);
  }
}

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // const data = useMemo(() => salesInvoices, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["sales-invoices"],
    queryFn: () => fetchSalesInvoices(),
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter by invoice no."
            value={
              (table.getColumn("invoice_no")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("invoice_no")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {table.getRowModel().rows?.length ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {table
                  .getRowModel()
                  .rows.some((row) => row.getIsSelected()) && (
                  <Button variant="destructive" className="ml-2">
                    Delete
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Delete positions</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-medium">
                    {
                      table
                        .getRowModel()
                        .rows.filter((row) => row.getIsSelected()).length
                    }{" "}
                    positions
                  </span>
                  ?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      toast.success("Positions deleted successfully");
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
        </div>
        <Link href={`/sales-invoices/create`} passHref>
          <Button>
            <Plus className="text-2xl mr-2" />
            Add New
          </Button>
        </Link>
      </div>
      {isLoading ? (
        // center the loader
        <div className="flex items-center justify-center h-24">
          <div
            className="
            animate-spin
            rounded-full
            h-6
            w-6
            border-t-2
            border-b-2
            border-gray-900
          "
          />
        </div>
      ) : (
        <>
          <div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="py-4">
            <DataTablePagination table={table} />
          </div>
        </>
      )}
    </div>
  );
}
