"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.string().min(2, "Category is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock must be at least 0"),
  status: z.enum(["Active", "Inactive"]),
  image: z.string().url("Please provide a valid image URL"),
});

export type ProductForm = z.infer<typeof productSchema>;

type ProductFormProps = {
  initialData?: ProductForm; // If provided, form is in edit mode
  onSubmit: (data: ProductForm) => Promise<void>;
};

const ProductFormPage = ({ initialData, onSubmit }: ProductFormProps) => {
  const router = useRouter();

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "Active",
      image: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  // If you’re editing, prefill data when `initialData` changes
  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof ProductForm, value);
      });
    }
  }, [initialData, setValue]);

  return (
    <div className="w-full  p-6">
      <div>
        <Button
          variant="link"
          size="default"
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
         <ArrowLeft/> Back
        </Button>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Product Name</Label>
            <Input {...register("name")} placeholder="Enter product name" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Category</Label>
            <Input {...register("category")} placeholder="Enter category" />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) =>
                setValue("status", value as "Active" | "Inactive")
              }
              defaultValue={form.getValues("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              {...register("image")}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Product"
              : "Create Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ProductFormPage;
