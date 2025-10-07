import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, File, Images, List, Pencil, TagIcon } from 'lucide-react';
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

const statusOptions = [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
]

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
                          {/* category */}
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
                                        <SelectValue placeholder="Status" />
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
                        {/* <div className="space-y-2">
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
                                    enableDragAndDropFileToEditor: true,
                                    statusbar: false,
                                    askBeforePasteHTML: false,
                                    askBeforePasteFromWord: false,
                                    defaultMode: 1,
                                    buttons: [
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strikethrough',
                                        '|',
                                        'font',
                                        'fontsize',
                                        'paragraph',
                                        '|',
                                        'align',
                                        '|',
                                        'ul',
                                        'ol',
                                        '|',
                                        'link',
                                        '|',
                                        'undo',
                                        'redo',
                                    ],
                                    colors: { 
                                        background: ['#ff0000', '#00ff00', '#0000ff'],
                                        text: ['#000000', '#ffffff', '#333333'],
                                    },
                                    showXPathInStatusbar: false,
                                    showCharsCounter: false,
                                    showWordsCounter: false,
                                    enter: 'p',
                                  }}
                                  tabIndex={1}
                                  onBlur={(newContent) => {
                                    if (newContent !== data.description) {
                                        setData('description', newContent);
                                    }
                                  }}
                                  onChange={(newContent) => {
                                    // setData('description', newContent);
                                  }}
                                />

                                {errors.description && (
                                    <div className="mt-2 flex items-center gap-6 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={14} />
                                        <span>{errors.description}</span>
                                    </div>
                                )}
                        </div>                                              */}
                      </div>
                    </form>
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
                <nav className="flex flex-cols space-y-1 p-2">
                  <Link
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
                    href='admin.products.variation-types'
                    // href={route('admin.products.variation-types', product.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      activeTab === 'images'
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    <Pencil size={16} />
                    Product Images
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
