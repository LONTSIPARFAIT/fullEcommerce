import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';  
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, ImageIcon, Save, Diamond, Trash2, Upload, User, TagIcon } from 'lucide-react';
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
              <div className="pb-4">
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
                  <Link href={route('admin.products.index')} prefetch>
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
              </div>
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
