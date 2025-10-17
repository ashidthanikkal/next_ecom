"use client";

import * as React from "react";
import {
  ColumnDef,
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

export const data: Products[] = [
  {
    SKUid: "PRD-001",
    name: "Nike Air Max 90",
    category: "Shoes",
    price: 120,
    stock: 35,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-002",
    name: "Adidas Ultraboost 22",
    category: "Shoes",
    price: 180,
    stock: 22,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-003",
    name: "Apple AirPods Pro 2",
    category: "Electronics",
    price: 249,
    stock: 50,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-004",
    name: "Samsung Galaxy Watch 6",
    category: "Electronics",
    price: 299,
    stock: 15,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-005",
    name: "Levi’s 511 Slim Fit Jeans",
    category: "Clothing",
    price: 69,
    stock: 80,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-006",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    price: 399,
    stock: 10,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-007",
    name: "Puma Running T-Shirt",
    category: "Clothing",
    price: 35,
    stock: 60,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-008",
    name: "Apple MacBook Air M3",
    category: "Electronics",
    price: 1299,
    stock: 8,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-009",
    name: "Ray-Ban Classic Aviator",
    category: "Accessories",
    price: 159,
    stock: 25,
    status: "Inactive",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-010",
    name: "The North Face Backpack",
    category: "Bags",
    price: 99,
    stock: 40,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
  {
    SKUid: "PRD-011",
    name: "Google Pixel 9 Pro",
    category: "Electronics",
    price: 999,
    stock: 12,
    status: "Active",
    createdAt: 1760677839612,
    image: "/product_avatar.jpg",
  },
];

export type Products = {
  SKUid: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive" | "Draft" | "OutOfStock";
  createdAt: number;
  image: string;
};

export const columns: ColumnDef<Products>[] = [
  // ✅ Row Selection
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

  // ✅ Product ID
  {
    accessorKey: "SKUid",
    header: "SKU ID",
    size: 30,
    cell: ({ row }) => <div>{row.getValue("SKUid")}</div>,
  },

  // ✅ Product Name (sortable)
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-medium">{product.name}</span>
        </div>
      );
    },
    size: 230,
  },

  // ✅ Category
  {
    accessorKey: "category",
    header: "Category",
    size: 100,
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },

  // ✅ Price
  {
    accessorKey: "price",
    size: 100,
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },

  // ✅ Stock
  {
    accessorKey: "stock",
    header: "Stock",
    size: 100,
    cell: ({ row }) => <div>{row.getValue("stock")}</div>,
  },

  // ✅ Status
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
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

  // ✅ Created Date
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toISOString().split("T")[0];
      return <div>{formatted}</div>;
    },
  },

  // ✅ Actions
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.SKUid)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Product</DropdownMenuItem>
            <DropdownMenuItem>Delete Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Products = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Products..."
          value={
            (table.getColumn("name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.column.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                        cell.getContext()
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

export default Products;
