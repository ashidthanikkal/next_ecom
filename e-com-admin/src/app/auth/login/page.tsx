"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/services/authService"



const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

     const onSubmit = async (data: { email: string; password: string }) => {        
         try {
             const res = await authService.login(data)
             console.log("Login success:", res.data)
             
 
             // store token in localStorage
             localStorage.setItem("token", res.data.refreshToken)
 
             // redirect to dashboard
                window.location.href = "/dashboard"
         } catch (err: any) {
             console.error(err.response?.data || err.message)
             alert(err.response?.data?.message || "Login failed")
         }
     }
 

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <CardContent>
                    <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </CardContent>
                <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-600 mt-2">
                        Don’t have an account? <a href="/auth/register" className="text-blue-600">Register</a>
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                        <a href="/auth/forgot-password" className="text-blue-600">forgot Password.?</a>
                    </p>
                </div>
            </Card>


        </div>
    )
}
