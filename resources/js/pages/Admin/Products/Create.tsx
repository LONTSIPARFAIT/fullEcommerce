import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/texarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Diamond, File, List, Save, TagIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Product', href: 'admin/Product/index' },
//   { title: 'Product', href: route('admin.product.index') },
  { title: 'Create Product', href: '' },
];

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
    categories: Category[];
    brands: Brand[];
}

const statusOptions = [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
]

export default function Create({categories, brands}: Props) {
    // console.log(categories);
    // console.log(brands);
    
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    category_id: '',
    brand_id: '',
    description: '',
    price: '',
    sku: '',
    barcode: '',
    status: 'draft',
    quantity: '',
    image: null as File | null,
  });

  const editor = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // post(route('admin.product.store'), {
    post(('admin/Product/store'), );
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
                        {/* category & brand section */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* category */}
                            <div className="space-y-2">
                                <Label htmlFor='category_id' className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                                    <List size={14} className='text-primary dark:text-primary-foreground'/>
                                    Category
                                </Label>

                                <Select value={data.category_id} onValueChange={(value)=>setData('category_id', value)}>
                                    <SelectTrigger className='h-12 w-full dark:border-gray-800 dark:bg-gray-800/80'>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category)=>(
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.path}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                
                                {errors.category_id && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.category_id}</span>
                                    </div>
                                )}
                            </div>
                            {/* brands */}
                            <div className="space-y-2">
                                <Label htmlFor='brand_id' className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                                    <TagIcon size={14} className='text-primary dark:text-primary-foreground'/>
                                    Brand
                                </Label>

                                <Select value={data.brand_id} onValueChange={(value)=>setData('brand_id', value)}>
                                    <SelectTrigger className='h-12 w-full dark:border-gray-800 dark:bg-gray-800/80'>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands.map((brand)=>(
                                            <SelectItem key={brand.id} value={brand.id.toString()}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                
                                {errors.brand_id && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.brand_id}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Pricing & quantity & status */}
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* price */}
                            <div className="space-y-2">
                                <Label
                                  htmlFor="price" 
                                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    <TagIcon size={14} className="text-primary dark:text-primary-foreground" />
                                    Price
                                </Label>

                                <div className="group relative">
                                    <Input 
                                    id='price'
                                    type='number'
                                    value={data.price}
                                    onChange={(e)=>setData('price', e.target.value)}
                                    //   step='0.01'
                                    className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
                                    placeholder='0'
                                    />
                                    <File
                                    size={18}
                                    className="group-hover:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500 dark:group-hover:text-primary-foreground"
                                    />
                                </div>

                                {errors.price && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.price}</span>
                                    </div>
                                )}
                            </div>
                            {/* quantity */}
                            <div className="space-y-2">
                                <Label
                                  htmlFor="quantity" 
                                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    <TagIcon size={14} className="text-primary dark:text-primary-foreground" />
                                    Quantity
                                </Label>

                                <div className="group relative">
                                    <Input 
                                    id='quantity'
                                    value={data.quantity }
                                    onChange={(e)=>setData('quantity', e.target.value)}
                                    //   step='0.01'
                                    className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
                                    placeholder='Available quantity'
                                    />
                                    <File
                                    size={18}
                                    className="group-hover:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500 dark:group-hover:text-primary-foreground"
                                    />
                                </div>

                                {errors.quantity && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.quantity}</span>
                                    </div>
                                )}
                            </div>
                            {/* status */}
                            <div className="space-y-2">
                                <Label htmlFor='status' className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                                    <List size={14} className='text-primary dark:text-primary-foreground'/>
                                    Status
                                </Label>

                                <Select value={data.status} onValueChange={(value)=>setData('status', value)}>
                                    <SelectTrigger className='h-12 w-full dark:border-gray-800 dark:bg-gray-800/80'>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((option)=>(
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                
                                {errors.status && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.status}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* SKU and barcode */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* SKU */}
                            <div className="space-y-2">
                                <Label
                                  htmlFor="sku" 
                                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    <TagIcon size={14} className="text-primary dark:text-primary-foreground" />
                                    SKU
                                </Label>

                                <div className="group relative">
                                    <Input 
                                    id='sku'
                                    value={data.sku}
                                    onChange={(e)=>setData('sku', e.target.value)}
                                    className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
                                    placeholder='Enter SKU'
                                    />
                                    <File
                                    size={18}
                                    className="group-hover:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500 dark:group-hover:text-primary-foreground"
                                    />
                                </div>

                                {errors.sku && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.sku}</span>
                                    </div>
                                )}
                            </div>
                            {/* barcode */}
                            <div className="space-y-2">
                                <Label
                                  htmlFor="barcode" 
                                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    <TagIcon size={14} className="text-primary dark:text-primary-foreground" />
                                    Barcode
                                </Label>

                                <div className="group relative">
                                    <Input 
                                    id='barcode'
                                    value={data.barcode }
                                    onChange={(e)=>setData('barcode', e.target.value)}
                                    className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
                                    placeholder='Enter barcode'
                                    />
                                    <File
                                    size={18}
                                    className="group-hover:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500 dark:group-hover:text-primary-foreground"
                                    />
                                </div>

                                {errors.barcode && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.barcode}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                            {/* description */}
                            <div className="space-y-2">
                                <Label
                                  htmlFor='description'
                                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    <TagIcon size={14} className="text-primary dark:text-primary-foreground" />
                                    Description
                                </Label>

                                <JoditEditor  
                                  ref={editor}
                                  value={data.description}
                                  config={{
                                    readonly:false,
                                    placeholder:'Enter product description...',
                                    height:400,
                                    toolbarButtonSize:'medium',
                                    theme:'default',
                                  }}
                                />
                                
                                {/* <Textarea 
                                    id='description'
                                    value={data.description }
                                    onChange={(e)=>setData('barcode', e.target.value)}
                                    className='focus:border-primary focus:ring-primary/20 dark:focus:ring-primary-foreground/20 h-32 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500 dark:focus:border-primary-foreground'
                                    placeholder='Enter product description'
                                /> */}

                                {errors.description && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.description}</span>
                                    </div>
                                )}
                            </div>
                            {/* button */}
                            <div className="pt-4 flex items-center justify-center" >
                                <Button type='submit' className='' disabled={processing} >
                                    <Save size={16} className='mr-2' />
                                    {processing ? 'Saving...' : 'Save Product'}
                                </Button>
                            </div>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
