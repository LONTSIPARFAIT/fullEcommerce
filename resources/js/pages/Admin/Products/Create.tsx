import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Diamond, File } from 'lucide-react';
import React, { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Product', href: 'admin/Product/index' },
//   { title: 'Product', href: route('admin.product.index') },
  { title: 'Create Product', href: '' },
];

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // post(route('admin.product.store'), {
    post(('admin/Product/store'), {
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
      <Head title="Create Brand" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
        <Card className='overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800'>
            <CardHeader className=''>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 dark:bg-primary/30 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                            <Diamond className='text-primary dark:text-primary' size={24}/>
                        </div>
                        <div className="">
                            <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Create Product</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Add new product to your store</p>
                        </div>
                    </div>

                    <Link href='#'>
                    {/* <Link href={route('admin.products.index')}> */}
                        <Button
                          variant='ghost'
                          size='sm'  
                          className='flex items-center gap-2 text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'                      
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Button>
                    </Link>
                </div>
            </CardHeader>

            <CardContent className="p-1">
                <form onSubmit={handleSubmit} className='p-6'>
                    <div className="mx-auto max-w-3xl space-y-6">
                        {/* for the name field */}
                        <div className="space-y-2">
                            <Label htmlFor='name' className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                                <File size={14} className='text-primary dark:text-primary-foreground'/>
                                Product Name
                            </Label>
                            <div className="group relative">
                                <Input 
                                  id='name'
                                  value={data.name}
                                  onChange={(e)=>setData('name', e.target.value)}
                                  className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
                                  placeholder='Enter product name'
                                />
                                <File
                                size={18}
                                className="group-hover:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500 dark:group-hover:text-primary-foreground"
                            />
                            </div>

                            {errors.name && (
                                <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                    <AlertCircle size={14} />
                                    <span>{errors.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
