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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EcomLayout>
    )
}