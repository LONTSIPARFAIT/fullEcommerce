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
      <Head title={title} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-9">
            <div className="bg-white shadow-xl dark:bg-gray-800">
              <div className="pb-4">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
                    {children}
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <Card className='sticky top-4 border-none bg-white shadow-xl dark:bg-gray-800'>
              <CardContent className='p-0'>
                <div className="border-b border-gray-200 p-4 dark:bg-gray-700">
                  <h1 className="fond-medium text-gray-900 dark:text-white">Product Setting</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product details</p>
                </div>
                <nav className="flex flex-col space-y-1 p-2">
                  {activeTab === 'edit' && ()}
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>    
    </AppLayout>
  );
}
