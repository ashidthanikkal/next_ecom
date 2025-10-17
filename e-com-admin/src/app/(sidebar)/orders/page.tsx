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

// 🧱 Updated Type with productName
export type Order = {
  orderId: string;
  productName: string; // ✅ Added
  customerName: string;
  email: string;
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Paid" | "Unpaid" | "Refunded";
  orderDate: number;
};

// 🧱 Sample Data with Product Names
export const ordersData: Order[] = [
  {
    orderId: "ORD-001",
    productName: "Nike Air Max 90",
    customerName: "John Doe",
    email: "john@example.com",
    totalAmount: 299.99,
    status: "Delivered",
    paymentStatus: "Paid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-002",
    productName: "Adidas Ultraboost",
    customerName: "Jane Smith",
    email: "jane@example.com",
    totalAmount: 149.5,
    status: "Shipped",
    paymentStatus: "Paid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-003",
    productName: "Apple AirPods Pro",
    customerName: "Michael Johnson",
    email: "michael@example.com",
    totalAmount: 89.99,
    status: "Pending",
    paymentStatus: "Unpaid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-004",
    productName: "Sony WH-1000XM5",
    customerName: "Emily Davis",
    email: "emily@example.com",
    totalAmount: 450,
    status: "Delivered",
    paymentStatus: "Paid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-005",
    productName: "Samsung Galaxy Watch 6",
    customerName: "Robert Wilson",
    email: "robert@example.com",
    totalAmount: 75.49,
    status: "Cancelled",
    paymentStatus: "Refunded",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-006",
    productName: "Puma Running Shoes",
    customerName: "Sophia Martinez",
    email: "sophia@example.com",
    totalAmount: 220.75,
    status: "Shipped",
    paymentStatus: "Paid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-007",
    productName: "MacBook Air M3",
    customerName: "Liam Brown",
    email: "liam@example.com",
    totalAmount: 120.99,
    status: "Delivered",
    paymentStatus: "Paid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-008",
    productName: "Logitech MX Master 3S",
    customerName: "Olivia Taylor",
    email: "olivia@example.com",
    totalAmount: 55.25,
    status: "Pending",
    paymentStatus: "Unpaid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-009",
    productName: "Dell XPS 13",
    customerName: "Ethan Lee",
    email: "ethan@example.com",
    totalAmount: 799.99,
    status: "Delivered",
    paymentStatus: "Paid",
    orderDate: 1760677839612,
  },
  {
    orderId: "ORD-010",
    productName: "Apple iPhone 15",
    customerName: "Ava White",
    email: "ava@example.com",
    totalAmount: 349.0,
    status: "Cancelled",
    paymentStatus: "Refunded",
    orderDate: 1760677839612,
  },
];

// 🧮 Columns (with Product Name column added)
export const orderColumns: ColumnDef<Order>[] = [
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

  { accessorKey: "orderId", header: "Order ID", size: 80 },

  {
    accessorKey: "productName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("email")}
      </span>
    ),
  },

  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      return (
        <span className="font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "Delivered"
          ? "bg-green-100 text-green-700"
          : status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : status === "Shipped"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700";
      return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const payment = row.getValue("paymentStatus") as string;
      const color =
        payment === "Paid"
          ? "bg-green-100 text-green-700"
          : payment === "Unpaid"
          ? "bg-gray-100 text-gray-700"
          : "bg-red-100 text-red-700";
      return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
          {payment}
        </span>
      );
    },
  },

  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate"));
      const formatted = date.toISOString().split("T")[0];
      return <div>{formatted}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
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
              onClick={() => navigator.clipboard.writeText(order.orderId)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 🧭 Component
const Orders = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: ordersData,
    columns: orderColumns,
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
          placeholder="Filter orders..."
          value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("customerName")?.setFilterValue(event.target.value)
          }
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
                <TableCell colSpan={orderColumns.length} className="h-24 text-center">
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

export default Orders;
