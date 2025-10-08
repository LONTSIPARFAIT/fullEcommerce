import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {  ArrowLeft, Grid, Images, Layers, Pencil, TagIcon, } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProductLayout from '../ProductLayout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Products', href: 'admin/Products/index' },
//   { title: 'Products', href: route('admin.products.index') },
  { title: 'Edit Uploader', href: '' },
];
interface Product{
    id: number;
    name: string;
    image: string;
    created_at: string;
    updated_at: string;
}
interface ProductImage{
    id: number;
    url: string;
}

export default function ProductImages({product, images }: {product: Product; images: ProductImage[] }) {
  
  const [productImages, setProductImages] = useState<ProductImage[]>(images || []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { data, setData, post, processing, progress, reset } = useForm({
    image: [] as File[],
  });

  useEffect(()=>{
    setProductImages(images || []);
  }, [images]);

  const onDrop = useCallback( (acceptedFiles: File[]) => {
    const newFiles = [...selectedFiles, ...acceptedFiles];
    setSelectedFiles(newFiles);

    const newPreviews = newFiles.map((file)=>URL.createObjectURL(file));
    setPreviews(newPreviews);
  }, [selectedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'], },
    maxSize: 5242880, // 5MB
  });
  const removeSelectedImage = (index: number) => {
    // revoke the previews object url to free up memory
    URL.revokeObjetURL(previews[index]);

    setSelectedFiles((prev)=>prev.filter((_,i)=>i !== index));
    setPreviews((prev)=>prev.filter((_,i)=>i !== index));
  }

  const handleUpload = ()=>{
    if(selectedFiles.length === 0) return ;

    const formData = new FormData();
    selectedFiles.forEach((file, index)=>{
      formData.append(`images[${index}]`, file);
    });

    setIsUploading(true);
    
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

  const handleDelete = (imageId: number) => {
    router.delete(route('admin.products.destroy', imageId), {
      onSuccess: () => {
        setProductImages((prev)=>prev.filter((img)=>img.id !== imageId));
        // toast.success('User delete sucessfuly')
      },
      onError: ()=>{
        // toast.success('User deletion failed')
      }
    })
  }

  return (
    <ProductLayout 
      title='Product Images'
      description='Manage Product images.'
      breadcrumbs={breadcrumbs}
      // backUrl={route('admin.products.edit')}
      backUrl='admin/products/edit'
      icon={<Images size={20} className='text-primary dark:text-primary-foreground'/>}
      productId={product.id}
      activeTab='images'
    >
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
        </div>
      </div>    
    </ProductLayout>
  );
}
