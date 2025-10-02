import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Admins', href: route('admin.admins.index') },
  { title: 'Create Admin', href: '' },
];

export default function Create() {
  const { data, setData, post, processing, error } = useForm({
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
      onProgress: (progress) => {
        if (progress.percentage) {
          setUploadProgress(progress.percentage);
        }
      },
       onSuccess: () => {
        setIsUploading(false);
        setUploadProgress(0);
      },
      onError: () => {
        setIsUploading(false);
        setUploadProgress(0);
      },
    });
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setData('image', null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Admin" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
        <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
          <CardHeader>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
              <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-primary/20 p-3 shadow-sm backdrop-blur-sm dark:bg-primary/20">
                        <User
                          className="dark:text-primary-light text-primary"
                          size={24}
                        />
                      </div>
                      <div className="">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Create Admin
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                          Add new admin
                        </p>
                      </div>
                    </div>

                    <Link
                      href={route('admin.admins.index')}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <ArrowLeft size={16}>
                          Back
                        </ArrowLeft>
                      </Button>
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <form
                    onSubmit={handleSubmit}
                    className="p-6"
                  >
                    <div className="mx-auto max-w-xl space-y-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          <User
                            size={14}
                            className="dark:primary-light text-primary"
                          />
                            Name
                        </label>

                        <div className="group relative">
                          <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) =>
                              setData('name', e.target.value,)
                            }
                            className="h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground dark:focus:ring-primary-foreground/20"
                            placeholder={t('Entrer le nom',)}
                            required
                            autoFocus
                          />
                            <User
                              size={18}
                              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-primary dark:text-gray-500 dark:group-hover:text-primary-foreground"
                            />
                        </div>
                      </div>
                    </div>
                  </form>
                                </CardContent>
                            </Card>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
