import EcomLayout from "@/layouts/ecom-layout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CustomerLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    }); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    }

    return (
        <EcomLayout title="Custumer Login - ShopMart">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                    {/* Login Form */}
                    <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                            <div className="border-b p-6">
                                <h2 className="text-lg font-semibold">Login</h2>
                                <p className="mt-1 text-gray-600">Welcome back! Sign in to your account.</p>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="">
                                    <div className="mb-4">
                                        <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                                        <input 
                                          type="email"
                                          id="login-email"
                                          value={data.email}
                                          onChange={(e) => setData('email', e.target.value)}
                                          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                          placeholder="your@gmail.com"
                                          required />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EcomLayout>
    )
}