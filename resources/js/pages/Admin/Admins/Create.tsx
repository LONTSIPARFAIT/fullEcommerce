import { Card } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: 'dashboard' },
    { title: 'Admins', href: route('admin.admins.index') },
    { title: 'Create Admin', href: '' },
];

export default function Create(){
    const {data, setData, post, processing, error } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        avatar: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        post(route('admin.admins.store'), {
            data: {
                ...data,
            },
            preserveScroll: true,
            onProgress: (progress)=>{
                if (progress.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onSuccess: ()=>{
                setIsUploading(false);
                setUploadProgress(0)
            },
            onError: ()=>{
                setIsUploading(false);
                setUploadProgress(0)
            },
        })
    }

    const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string );
            };
            reader.readAsDataURL(file);
        }
    }

    const clearImage = () => {
        setData('image', null);
        setImagePreview(null);
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Admin" />
            <div className="from-gray-50 min-h-screen bg-gradient-to-br to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
                <Card className="mx-auto">
                    <CardHearder></CardHearder>
                </Card>
            </div>
        </AppLayout>
    )
}