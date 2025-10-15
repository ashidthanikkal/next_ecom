"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/services/authService"

const registerSchema = z.object({
    username: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().optional(),
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: { username: string, email: string; password: string, role?: string }) => {
        try {
            const res = await authService.register(data)
            console.log("Login success:", res.data)

            // store token in localStorage
            localStorage.setItem("token", res.data.token)

            // redirect to dashboard
            window.location.href = "/"
        } catch (err: any) {
            console.error(err.response?.data || err.message)
            alert(err.response?.data?.message || "Login failed")
        }
    }


    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <CardContent>
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col gap-[5px]">
                            <Label>Name</Label>
                            <Input {...register("username")} />
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <Label>Email</Label>
                            <Input type="email" {...register("email")} />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <Label>Password</Label>
                            <Input type="password" {...register("password")} />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">Register</Button>
                    </form>
                </CardContent>
                <p className="text-sm text-gray-600 mt-2">
                    Already have an account? <a href="/auth/login" className="text-blue-600">Login</a>
                </p>
            </Card>

        </div>
    )
}
