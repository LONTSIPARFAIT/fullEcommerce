import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Images, Layers, Trash2, Upload, } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProductLayout from '../ProductLayout';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Products', href: 'admin/Products/index' },
  //   { title: 'Products', href: route('admin.products.index') },
  { title: 'Variation Types', href: '' },
];
interface ImagePreview {
  id: number;
  url: string;
}

interface Product {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface VariationType {
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

export default function VariationTypes({ product, variationTypesLists }: { product: Product; variationTypesLists: VariationType[] }) {

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

  const [variationTypes, setVariationTypes] = useState<VariationType[]>(() => {
    if (variationTypesLists && variationTypesLists.length > 0) {
      return variationTypesLists.map((type) => ({
        id: type.id,
        name: type.name,
        type: type.type,
        options: type.options.map((option) => ({
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
        options: [{ name: '', images: [], imagePreviews: [] }],
      },
    ];
  });

  const [expandedTypes, setExpandedTypes] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    variationTypes.forEach((_, index) => {
      initial[index] = true;
    })
    return initial;
  });

  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    variationTypes.forEach((type, typeIndex) => {
      type.options.forEach((_, optionIndex) => {
        initial[`${typeIndex}-${optionIndex}`] = true;
      })
    })
    return initial;
  });


  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});;

  useEffect(() => {
    const clearVariationTypes = variationTypes.map((type) => ({
      id: type.id,
      name: type.name,
      type: type.type,
      options: type.options.map(({ id, name, images }) => ({
        id,
        name,
        images,
      })),
    }));
    setData('variationTypes', clearVariationTypes);
  }, [variationTypes]);

  useEffect(() => {
    return () => {
      variationTypes.forEach((type) => {
        type.options.forEach((option) => {
          option.imagePreviews.forEach((preview) => {
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

    variationTypes.forEach((type, typeIndex) => {
      type.options.forEach((option, optionIndex) => {
        option.images.forEach((file, fileIndex) => {
          formData.append(`images[${typeIndex}][${optionIndex}][${fileIndex}]`, file);
        });
      });
    });

    post(route('admin.products.variation-types.store', product.id), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        setIsUploading(false);
        setValidationErrors({});
      },
      onError: (errors) => {
        setIsUploading(false);
        setValidationErrors(errors);
      },
    });
  }

  const handleAddVariationType = () => {
    const newTypeIndex = variationTypes.length;
    setVariationTypes([
      ...variationTypes,
      {
        name: '',
        type: 'image',
        options: [{ name: '', images: [], imagePreviews: [] }],
      },
    ]);
    setExpandedTypes((prev) => ({
      ...prev,
      [newTypeIndex]: true,
    }))
    setExpandedOptions((prev) => ({
      ...prev,
      [`${newTypeIndex}-0`]: true,
    }))
  }

  const handleRemoveVariationType = (index: number) => {
    const variationTypes = variationTypes[index];

    if (variationTypes.id) {
      destroy(route('admin.products.variation-types.destroy', variationTypes.id), {
        onSuccess: () => {
          setVariationTypes(variationTypes.filter((_, i) => i !== index));
          setValidationErrors({});
        },
        onError: (errors) => {
          setValidationErrors(errors);
        },
      });
    } else {
      setVariationTypes(variationTypes.filter((_, i) => i !== index));
    }
  }

  const handleAddOption = (typeIndex: number) => {
    const newVariationTypes = [...variationTypes];
    const newOptionIndex = newVariationTypes[typeIndex].options.length;
    newVariationTypes[typeIndex].options.push({ name: '', images: [], imagePreviews: [] });

    setVariationTypes(newVariationTypes);
    setExpandedOptions((prev) => ({
      ...prev,
      [`${typeIndex}-${newOptionIndex}`]: true,
    }))
  }

  const handleRemoveOption = (typeIndex: number, optionIndex: number) => {
    const newVariationTypes = [...variationTypes];
    newVariationTypes[typeIndex].options = newVariationTypes[typeIndex].options.filter((_, i) => i !== optionIndex);
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

  const toggleAllType = (expanded: boolean) => {
    const newExpandedTypes: Record<number, boolean> = {};
    variationTypes.forEach((_, index) => {
      newExpandedTypes[index] = expanded;
    });
    setExpandedTypes(newExpandedTypes);
  }

  const toggleAllOptions = (expanded: boolean) => {
    const newExpandedOPtions: Record<string, boolean> = {};
    variationTypes.forEach((type, typeIndex) => {
      type.options.forEach((_, optionIndex) => {
        newExpandedOPtions[`${typeIndex}-${optionIndex}`] = expanded;
      });
    });
    setExpandedOptions(newExpandedOPtions);
  }

  const renderImageUpload = (typeIndex: number, optionIndex: number) => (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        accept='image/*'
        onChange={(e) => handleImageUpload(typeIndex, optionIndex, e.target.files!)}
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

      {variationTypes[typeIndex].options[optionIndex].existingImages?.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {variationTypes[typeIndex].options[optionIndex].existingImages.map((image, index) => (
            <div key={image.id} className="group relative">
              <img src={image.url} alt={`Existing ${index + 1}`} className='h-24 w-full rounded-lg object-cover' />
              <button
                type='button'
                onClick={() => {
                  const newTypes = [...variationTypes];
                  newTypes[typeIndex].options[optionIndex].existingImages = newTypes[typeIndex].options[optionIndex].existingImages?.filter((img) => img.id !== image.id);
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

      {variationTypes[typeIndex].options[optionIndex].imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {variationTypes[typeIndex].options[optionIndex].imagePreviews.map((previews, index) => (
            <div key={index} className="group relative">
              <img src={previews.url} alt={`Previews ${index + 1}`} className='h-24 w-full rounded-lg object-cover' />
              <button
                type='button'
                onClick={() => {
                  const newTypes = [...variationTypes];
                  newTypes[typeIndex].options[optionIndex].images = newTypes[typeIndex].options[optionIndex].images.filter((_, i) => i !== index);
                  newTypes[typeIndex].options[optionIndex].imagePreviews = newTypes[typeIndex].options[optionIndex].imagePreviews.filter((_, i) => i !== index);
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

      {errors[`variationTypes.${typeIndex}.options.${optionIndex}.images`] && (
        <p className="mt-1 text-sm text-red-500">{errors[`variationTypes.${typeIndex}.options.${optionIndex}.images`]}</p>
      )}
      {errors[`images.${typeIndex}.${optionIndex}`] && (
        <p className="mt-1 text-sm text-red-500">{errors[`images.${typeIndex}.${optionIndex}`]}</p>
      )}
    </div>
  );

  return (
    <ProductLayout
      title='Variation Types'
      description='Manage product variations type and options.'
      breadcrumbs={breadcrumbs}
      // backUrl={route('admin.products.edit', product.id)}
      backUrl='admin/products/edit'
      icon={<Layers size={20} className='text-primary dark:text-primary-foreground' />}
      productId={product.id}
      activeTab='images'
    >
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-while">Product Variation</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure your product variations and options</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => toggleAllOptions(true)}
                  className='bg-white shadow-sm hover:bg-gray-50 dark:bg-gray-800'
                >
                  <ChevronDown size={16} className='mr-1' />
                  Expand ALL
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => toggleAllOptions(false)}
                  className='bg-white shadow-sm hover:bg-gray-50 dark:bg-gray-800'
                >
                  <ChevronDown size={16} className='mr-1' />
                  Collapse ALL
                </Button>
              </div>
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-900/20">
                <p className="font-medium">Olease fix the following errors:</p>
                <ul className="mt-2 list-disc pl-5">
                  {Object.entries(errors).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            )}

            {variationTypes.map((variationType, typeIndex) => (
              <motion.div
                key={typeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl border-gray-200 bg-white shodow-sm dark:border-gray-700 dark:bg-gray-800/50"
              >
                <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="flex h-8 w-8 items-center justify-center rounded-lg">
                          {typeIndex + 1}
                        </Badge>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-while">
                          {variationType.name || 'New Variation Type'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type='button'
                          variant='ghost'
                          size="sm"
                          onClick={() => setExpandedTypes({
                            ...expandedTypes,
                            [typeIndex]: !expandedTypes[typeIndex],
                          })}
                          className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        >
                          {expandedTypes[typeIndex] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </Button>
                        <Button
                          type='button'
                          variant='destructive'
                          size="sm"
                          onClick={() => handleRemoveVariationType(typeIndex)}
                          className='bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400'
                        >
                          <Trash2 size={16} className='mr-1' />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  {expandedTypes[typeIndex] && (
                    <div className="space-y-6 p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Type Name</label>
                          <Input
                            placeholder="Enter variation type name (eg: Color, Size)"
                            value={variationType.name}
                            onChange={(e) => {
                              const newTypes = [...variationTypes];
                              newTypes[typeIndex].name = e.target.value;
                              setVariationTypes(newTypes);
                            }}
                            className={`h-11 ${errors[`variationTypes.${typeIndex}.name`] ? 'border-red-500' : ''}`}
                          />
                          {errors[`variationTypes.${typeIndex}.name`] && (
                            <p className=" mt-1 text-sm text-red-500">
                              {errors[`variationTypes.${typeIndex}.name`]}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Selection Type</label>
                          <Select
                            value={variationType.type}
                            onValueChange={(value) => {
                              const newTypes = [...variationTypes];
                              newTypes[typeIndex].type = value;
                              setVariationTypes(newTypes);
                            }}
                          >
                            <SelectTrigger className='h-11'>
                              <SelectValue placeholder='Chose selection type' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='select'>Dropdown Select</SelectItem>
                              <SelectItem value='radio'>Radio Buttons</SelectItem>
                              <SelectItem value='image'>Images Selection</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="px-2 py-1">
                              {variationType.options.length} Options
                            </Badge>
                            <h4 className='font-medium text-gray-900 dark:text-white'>Variation Options</h4>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          {variationType.options.map((option, optionIndex) => (
                            <motion.div
                              key={optionIndex}
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: optionIndex * 0.1 }}
                              className='overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800/30'
                            >
                              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary" className="flex h-6 w-6 items-center justify-between rounded-full">
                                    {optionIndex + 1}
                                  </Badge>
                                  <h5 className=' text-sm font-medium text-gray-700 dark:text-gray-300'>{option.name || 'New Option'}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size='sm'
                                    onClick={()=>
                                      setExpandedOptions({
                                        ...expandedOptions,
                                        [`${typeIndex}-${optionIndex}`]: !expandedOptions[`${typeIndex}-${optionIndex}`],
                                      })
                                    }
                                  >
                                    {expandedOptions[`${typeIndex}-${optionIndex}`] ? (
                                      <ChevronUp size={14} />
                                    ) : (
                                      <ChevronDown size={14} />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </form>
      </CardContent>
    </ProductLayout>
  );
}
