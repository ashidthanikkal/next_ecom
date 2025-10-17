"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

// 🧠 Types
export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Customer" | "Guest";
  status: "Active" | "Inactive" | "Pending";
  joinedAt: number;
  image: string;
};

// 🧱 Sample Data
export const usersData: User[] = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
    joinedAt: 1760677839612,
   image :"/user_avatar.jpg",
  },
  {
    id: "USR-003",
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Customer",
    status: "Pending",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Customer",
    status: "Active",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-005",
    name: "Robert Wilson",
    email: "robert@example.com",
    role: "Guest",
    status: "Inactive",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-006",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    role: "Customer",
    status: "Active",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-007",
    name: "Liam Brown",
    email: "liam@example.com",
    role: "Manager",
    status: "Active",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-008",
    name: "Olivia Taylor",
    email: "olivia@example.com",
    role: "Customer",
    status: "Inactive",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-009",
    name: "Ethan Lee",
    email: "ethan@example.com",
    role: "Admin",
    status: "Active",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
  {
    id: "USR-010",
    name: "Ava White",
    email: "ava@example.com",
    role: "Customer",
    status: "Pending",
    joinedAt: 1760677839612,
    image: "/user_avatar.jpg",
  },
];

// 🧮 Columns
export const userColumns: ColumnDef<User>[] = [
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
    size: 30,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "User ID",
    size: 80,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "Active"
          ? "bg-green-100 text-green-700"
          : status === "Inactive"
          ? "bg-gray-100 text-gray-700"
          : "bg-yellow-100 text-yellow-700";
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedAt"));
      const formatted = date.toISOString().split("T")[0];
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Deactivate User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 🧭 Component
const Users = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: usersData,
    columns: userColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter users..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Users;
