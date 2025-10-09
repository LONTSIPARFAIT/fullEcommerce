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
import images from '@/routes/admin/products/images';

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
      images: File[];
      imagePreviews: ImagePreview[];
      existingImages?: {
        id: number;
        url: string;
      }[];
    }[];
}

export default function VariationTypes({product, variationTypesLists }: {product: Product; variationTypesLists: VariationType[] }) {

  const {
    data,
    setData,
    post,
    delete: destroy,
    processing,
    errors,
   } = useForm({
    variationTypes: [],
  });

  const [variationTypes, setVariationTypes] = useState<VariationType[]>(()=>{
    if(variationTypesLists && variationTypesLists.length > 0){
      return variationTypesLists.map((type)=>({
        id: type.id,
        name: type.name,
        type: type.type,
        options: type.options.map((option)=>({
          id: option.id,
          name: option.name,
          images: [],
          imagePreviews: [],
          existingImages: option.images || [],
        })),
      }))
    }
    return [
      {
        name: '',
        type: 'select',
        options: [{ name:'', images: [], imagePreviews: [] }],
      },
    ];
  });

  const [ expandedTypes, setExpandedTypes ] = useState<Record<number, boolean>>(() => {
    const initial:Record<number, boolean> = {};
    variationTypes.forEach((_,index) => {
      initial[index] = true;
    })
    return initial;
  });

  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>(() => {
    const initial:Record<string, boolean> = {};
    variationTypes.forEach((type,typeIndex) => {
      type.options.forEach((_,optionIndex) => {
        initial[`${typeIndex}-${optionIndex}`] = true;
      })
    })
    return initial;
  });


  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});;

  useEffect(()=>{
    const clearVariationTypes = variationTypes.map((type) => ({
      id: type.id,
      name: type.name,
      type: type.type,
      options: type.options.map(({ id, name, images })=>({
        id,
        name,
        images,
      })),
    }));
    setData('variationTypes', clearVariationTypes);
  }, [variationTypes]);

  useEffect(()=>{
    return ()=>{
      VariationTypes.forEach((type)=>{
        type.options.forEach((option)=>{
          option.imagePreviews.forEach((preview)=>{
            URL.revokeObjectURL(preview.url);
          });
        });
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append('variationTypes', JSON.stringify(data.variationTypes));

    variationTypes.forEach((type,typeIndex)=>{
      type.options.forEach((option,optionIndex)=>{
        option.images.forEach((file,fileIndex)=>{
          formData.append(`images[${typeIndex}][${optionIndex}][${fileIndex}]`, file);
        });
      });
    });

    post(route('admin.products.variation-types.store', product.id), {
      data: formData,
      forceFormData: true,
      onSuccess: ()=>{
        setIsUploading(false);
        setValidationErrors({});
      },
      onError: (errors)=>{
        setIsUploading(false);
        setValidationErrors(errors);
      },
    });
  }

  const handleAddVariationType = ()=>{
    const newTypeIndex = variationTypes.length;
    setVariationTypes([
      ...variationTypes,
      {
        name: '',
        type: 'image',
        options: [{ name: '', images: [], imagePreviews: [] }],
      },
    ]);
    setExpandedTypes((prev)=>({
      ...prev,
      [newTypeIndex]: true,
    }))
    setExpandedOptions((prev)=>({
      ...prev,
      [`${newTypeIndex}-0`]: true,
    }))
  }

  const removeSelectedVariationTypes = (index: number) => {
    const variationTypes = variationTypes[index];

    if(variationTypes.id){
      destroy(route('admin.products.variation-types.destroy',variationTypes.id),{
      onSuccess: ()=>{
        setVariationTypes(variationTypes.filter((_,i)=>i !== index));
        setValidationErrors({});
      },
      onError: (errors)=>{
        setValidationErrors(errors);
      },
      });
    }else{
      setVariationTypes(variationTypes.filter((_,i)=>i !== index));
    }
  }

  const handleAddOption = (typeIndex: number)=>{
    const newVariationTypes = [...variationTypes];
    const newOptionIndex = newVariationTypes[typeIndex].options.length;
    newVariationTypes[typeIndex].options.push({name:'',images:[], imagePreviews: []});

    setVariationTypes(newVariationTypes);
    setExpandedOptions((prev)=>({
      ...prev,
      [`${typeIndex}-${newOptionIndex}`]: true,
    }))
  }

    const handleRemoveOption = (typeIndex: number, optionIndex: number) => {
    const newVariationTypes = [...variationTypes];
    newVariationTypes[typeIndex].options = newVariationTypes[typeIndex].options.filter((_,i)=>i !== optionIndex);
    setVariationTypes(newVariationTypes);
  }

  const handleImageUpload = (typeIndex: number, optionIndex: number, files: FileList) => {
    const newVariationTypes = [...variationTypes];
    const newFiles = Array.from(files);

    const newPreviews = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        files: file,
    }));

    newVariationTypes[typeIndex].options[optionIndex].images = newFiles;
    newVariationTypes[typeIndex].options[optionIndex].imagePreviews = newPreviews;
    setVariationTypes(newVariationTypes);
  };

  const toogleAllType = (expanded: boolean) => {
    const newExpandedTypes: Record<number, boolean> = {};
    variationTypes.forEach((_, index) => {
        newExpandedTypes[index] = expanded;
    });
    setExpandedTypes(newExpandedTypes);
  }

  const toogleAllOptions = (expanded: boolean) => {
    const newExpandedOPtions: Record<string, boolean> = {};
    variationTypes.forEach((type, typeIndex) => {
        type.options.forEach((_, optionIndex) => {
            newExpandedOPtions[`${typeIndex}-${optionIndex}`] = expanded;
        });
    });
    setExpandedOptions(newExpandedOPtions);
  }

  const renderImageUpload = (typeIndex: number, optionIndex: number)=>(
    <div className="space-y-4">
        <input 
          type="file"
          multiple
          accept='image/*'
          onChange={(e)=>handleImageUpload(typeIndex, optionIndex, e.target.files!)}
          className='hidden' 
          id={`images-${typeIndex}-${optionIndex}`}
        />
        <label 
          htmlFor={`images-${typeIndex}-${optionIndex}`}
          className='group hover:border-primary relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-800/50'
        >
            <div className="absolute inset-0 flex items-center justify-center bg-white/0 transition-all group-hover:bg-white/50 dark:group-hover:bg-gray-800/20">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-gray-100/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
                            <Images className='h-8 w-8 text-gray-400 dark:text-gray-500' />
                        </div>
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload images</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG, up to 10MB</p>
                </div>
            </div>
        </label>

        {variationTypes[typeIndex].options[optionIndex].existingImages?.length C 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
                {variationTypes[typeIndex].options[optionIndex].existingImages.map((image, index) => (
                    <div key={image.id} className="group relative">
                        <img src={image.url} alt={`Existing ${index + 1}`} className='h-24 w-full rounded-lg object-cover' />
                        <button
                          type='button'
                          onClick={()=>{
                            const newType = [...variationTypes];
                            newType[typeIndex].options[optionIndex].existingImages = newType[typeIndex].options[optionIndex].existingImages?.filter((img)=>img.id !== image.id);
                            setVariationTypes(newTypes);
                          }}
                          className='absolute top-2 right-2 rounded-full bg-reg-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'], },
    maxSize: 5242880, // 5MB
  });

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
