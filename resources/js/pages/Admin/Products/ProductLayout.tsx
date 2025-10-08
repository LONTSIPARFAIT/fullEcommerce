import DeleteDialog from '@/components/DeleteDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import JoditEditor from 'jodit-react';
import { AlertCircle, ArrowLeft, File, Grid, Images, Layers, List, Pencil, Save, TagIcon, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface ProductLayoutProps {
    title: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
    children: React.ReactNode;
    backUrl: string;
    icon?: React.ReactNode;
    productId?: number;
    activeTab?: 'edit' | 'images' | 'variation-types' | 'variations';
}

export default function ProductLayout({
    title,
    description,
    breadcrumbs,
    children,
    backUrl,
    icon,
    productId,
    activeTab = 'edit',
}: ProductLayoutProps) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {/* main content */}
          <div className="col-span-9">
            <Card className="border-none bg-white shadow-xl dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 dark:bg-primary/20 rounded-xl ml-2 p-2 shadow-sm backdrop-blur-sm">
                      {icon}
                    </div>
                    <div className="">
                      <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
                    </div>
                  </div>
                  <Link 
                    href={backUrl}
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
                    
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3">
            <Card className='sticky top-4 border-none bg-white shadow-xl dark:bg-gray-800'>
              <CardContent className='p-0'>
                <div className="border-b border-gray-200 p-4 dark:bg-gray-700">
                  <h1 className="fond-medium text-gray-900 dark:text-white">Product Setting</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product details</p>
                </div>
                <nav className="flex flex-col space-y-1 p-2">
                  <Link
                    prefetch
                    href='admin.products.edit'
                    // href={route('admin.products.edit', product.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      activeTab === 'details'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    <Pencil size={16} />
                    Edit Product
                  </Link>
                  <Link
                    prefetch
                    href='admin.products.images.index'
                    // href={route('admin.products.images.index', product.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      activeTab === 'images'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    <Images size={16} />
                    Product Images
                  </Link>
                  <Link
                    prefetch
                    href='admin.products.variation-types.index'
                    // href={route('admin.products.variation-types.index', product.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      activeTab === 'variation-types'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    <Layers size={16} />
                    Variation Types
                  </Link>
                  <Link
                    prefetch
                    href='admin.products.variations.index'
                    // href={route('admin.products.variations.index', product.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      activeTab === 'variations'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    <Grid size={16} />
                    Variation
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => handleDelete(product.id)}
        title="Delete Item"
        message="Are you sure to delete this items? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />      
    </AppLayout>
  );
}
