import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import {  Images, Trash2, Upload, } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProductLayout from '../ProductLayout';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Products', href: 'admin/Products/index' },
//   { title: 'Products', href: route('admin.products.index') },
  { title: 'Variation Types', href: '' },
];
interface ImagePreview{
  id: number;
  url: string;
}

interface Product{
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface VariationType{
    id?: number;
    name: string;
    type: 'select' | 'radio' | 'image';
    options: {
      id?: number;
      name: string;
      image: File[];
      imagePreviews: ImagePreview[];
      existingImages?: {
        id: number;
        url: string;
      }[];
    }[];
}

export default function VariationType({product, variationTypesLists }: {product: Product; variationTypesLists: VariationType[] }) {
  
  const { 
    data, 
    setData, post, processing, progress, reset } = useForm({
    image: [] as File[],
  });
  const [productImages, setProductImages] = useState<ProductImage[]>(images || []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
      title='Variation Types'
      description='Configure your variations and options.'
      breadcrumbs={breadcrumbs}
      // backUrl={route('admin.products.edit')}
      backUrl='admin/products/edit'
      icon={<Images size={20} className='text-primary dark:text-primary-foreground'/>}
      productId={product.id}
      activeTab='images'
    >
      <CardContent>
        <div className="space-y-6 p-4">
          {/* Image upload section */}
          <div className="space-y-4">
            <Label className='text-sm font-medium text-gray-700 dark:text-gray-200' >Upload New Images</Label>
            <div 
              {...getRootProps()}
              className={cn(
                'cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all',
                isDragActive ? 'border-primary bg-primary/5' : 'hover:border-primary border-gray-300 dark:border-gray-600'
              )}
            >
              <input {...getInputProps} />
              <Upload 
                className={cn(
                  'mx-auto mb-4 h-12 w-12 transition-colors',
                  isDragActive ? 'text-primary' : 'text-gray-400 dark:text-gray-300'
                )}
              />
              {isDragActive ? (
                <p className="text-primary font-medium">Drop the files here</p>
              ) : (
                <>
                  <p className="font-medium text-gray-600 dark:text-gray-300">Drag & drop images here, or click to select</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Supports: JPG, PNG, GIF, (Max: 5MB)</p>
                </>
              )}
              {/* Divine */}
            </div>
          </div>

          {/* Combined Previews and Existing Images Section */}
          { (productImages.length > 0 || selectedFiles.length > 0) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                  Images ({productImages.length + selectedFiles.length})
                </h3>
                {selectedFiles.length > 0 && (
                  <Button onClick={handleUpload} disabled={processing} className='bg-primary hover:bg-primary/90'>
                    <Upload className='mr-2 h-4 w-4' />
                    {processing ? 'Uploading...' : 'Upload All'}
                  </Button>
                )}
              </div>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
                {/* Existing Product Images */}
                {productImages.map((img)=>(
                  <div key={`existing-${img.id}`} className='group relative' >
                    <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <img 
                        src={img.url} 
                        alt="Product image" 
                        className='h-full w-full object-cover transition-transform group-hover:scale-105'
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:hover:opacity-100">
                      <Button
                        variant="destructive" size="sm" className='rounded-full' onClick={()=>{handleDelete(img.id)}}
                      >
                        <Trash2 className='h-4 w-4'/> 
                      </Button>
                    </div>
                    <p className="mt-2 truncate text-sm text-gray-500">{img.url.split('/').pop()}</p>
                  </div>
                ))}

                {/* selected/Previews Images */}
                {previews.map((preview, index)=>(
                  <div key={`previews-${index + 1}`} className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <img 
                        src={preview} 
                        alt={`previews-${index + 1}`} 
                        className='h-full w-full object-cover transition-transform group-hover:scale-105'
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:hover:opacity-100">
                      <Button
                        variant="destructive" size="sm" className='rounded-full' onClick={()=>{removeSelectedImage(index)}}
                      >
                        <Trash2 className='h-4 w-4'/> 
                      </Button>
                    </div>
                    <p className="mt-2 truncate text-sm text-gray-500">{selectedFiles[index]?.name }</p>
                  </div>
                ))}

                {/* upload progress */}
                {processing && progress && (
                  <div className="mr-4">
                    <Progress value={progress.percentage} className='h-2 w-full'/> 
                    <p className="mt-2 truncate text-sm text-gray-500">{progress.percentage}% uploaded</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>   
    </ProductLayout>
  );
}
