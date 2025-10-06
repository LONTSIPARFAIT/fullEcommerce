import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, File, TagIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Products', href: 'admin/Products/index' },
//   { title: 'Products', href: route('admin.products.index') },
  { title: 'Edit Product', href: '' },
];
interface Product{
    id: number;
    name: string;
    slug: string; 
    category_id: number;
    brand_id: number;
    description: string;
    price: number;
    sku: string;
    barcode: string;
    status: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}


interface Category{
    id: number;
    path: string;
    name: string;
    level: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Props {
    product: Product;
    categories: Category[];
    brands: Brand[];
}

export default function Edit({product,categories,brands}: Props) {
  const { data, setData, post, processing, errors } = useForm({
    _method:'PUT',
    name: product.name,
    category_id: product.category_id,
    brand_id: product.brand_id,
    description: product.description,
    sku: product.sku,
    price: product.price,
    barcode: product.barcode,
    status: product.status,
    quantity: product.quantity,
  });

  const editor = useRef(null);
  const [activeTab, setActiveTab] = useState('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // post(route('admin.products.update'), {
    post(('admin/Products/update'), {
      data: {
        ...data,
      },
      preserveScroll: true,
      onSuccess: () => {
      },
      onError: () => {
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-9">
            <Card className="border-none bg-white shadow-xl dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 dark:bg-primary/20 rounded-xl ml-2 p-2 shadow-sm backdrop-blur-sm">
                      <TagIcon className="text-primary dark:text-primary-foreground" size={25}/>
                    </div>
                    <div className="">
                      <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Product</h1>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Update product details</p>
                    </div>
                  </div>
                  <Link 
                    // href={route('admin.products.index')} 
                    href="#" 
                    prefetch
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <ArrowLeft size={16}/>
                      Back
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        {/* for the name field */}
                        <div className="space-y-2">
                            <Label 
                              htmlFor='name' 
                              className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                                <File size={14} 
                                className='text-primary dark:text-primary-foreground'
                                />
                                Product Name
                            </Label>
                            <div className="group relative">
                              <Input 
                                id='name'
                                value={data.name}
                                onChange={(e)=>setData('name', e.target.value)}
                                className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
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
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3">
            <Card>
              d
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
