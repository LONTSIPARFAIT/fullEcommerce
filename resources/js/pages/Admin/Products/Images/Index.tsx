import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import JoditEditor from 'jodit-react';
import {  ArrowLeft, Grid, Images, Layers, Pencil, TagIcon, } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProductLayout from '../ProductLayout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Products', href: 'admin/Products/index' },
//   { title: 'Products', href: route('admin.products.index') },
  { title: 'Edit Product', href: '' },
];
interface Product{
    id: number;
    name: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export default function ProductImages({product,}: {product: Product}) {
  const { data, setData, post, processing, errors } = useForm({
    _method:'PUT',
    id: product.id,
    image: null as File | null,
  });
 
  console.log('data',data);
  
  const [imagePreview, setImagePreview] = useState<string | null>(product.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('images');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[])=>{
    setSelectedFiles((prev)=>[...prev, ...acceptedFiles]);

    // generate previews
    acceptedFiles.forEach((file)=>{
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviews((prev)=>[...prev, e.target?.result as string])
        };
        reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ondrop,
    accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxSize: 5242880, // 5MB
  });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsUploading(true);
//   };

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

    const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prev)=> [...prev, ...files]);

        // generate previews for new files
        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews((prev)=> [...prev, e.target?.result as string])
            };
            reader.readAsDataURL(file);

        })
    }

    const removeImage = (index: number) => {
       setSelectedFiles((prev)=>prev.filter((_,i)=>i !== index));
       setPreviews((prev)=>prev.filter((_,i)=>i !== index));
    }

    const handleUpload = ()=>{
        if(selectedFiles.length === 0) return ;

        setIsUploading(true);
        const formData = new FormData();
        selectedFiles.forEach((file, index)=>{
            formData.append(`image[${index}]`, file)
        });
        formData.append('product_id', product.id.toString())

            // router.post(route('admin.products.images.store', product.id), formData, {
            router.post(('admin/products/images'), formData, {
            onProgress: (progress) => {
                if (progress.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onSuccess: () => {
                setIsUploading(false);
                setSelectedFiles([]);
                setPreviews([]);
            },
            onError: () => {
                setIsUploading(false);
            },
        });
    }

    const handleDelete = (id: number) => {
        router.delete(route('admin.products.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
            // toast.success('User delete sucessfuly')
        },
            onError: ()=>{
                // toast.success('User deletion failed')
            }
        })
    }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
            {/* Main content -9 column */}
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
                    dfd
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
    </AppLayout>
  );
}
