import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import {  useForm } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Images, Layers, Plus, Save, Trash2, } from 'lucide-react';
import React, {  useEffect, useState } from 'react';
import ProductLayout from '../ProductLayout';;
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { log } from 'console';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: 'dashboard' },
  { title: 'Products', href: 'admin/Products/index' },
  //   { title: 'Products', href: route('admin.products.index') },
  { title: 'Variation Types', href: '' },
];

interface Product {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface VariationType {
  id?: number;
  name: string;
  label: string;
}

interface Variation {
  [key: string]: VariationType | string | number;
  quantity: string | number;
  price: string | number;
}

export default function ProductVariations({ product, variationLists }: { product: Product; variationLists: Variation[] }) {

  const { data, setData, post, processing, errors, } = useForm({
    variations: variationLists.map((v)=>({
        ...v,
        quantity: String(v.quantity),
        price: String(v.price),
    })),
  });

//   get all variation type fields from a variation
  const getVariationTypeFields = (variation: Variation) =>{
    return Object.entries(variation).filter(([key])=>key.startsWith('variation_type')).map(([key, value])=>({
        key,
        value: value as VariationType,
    }));
  };

//   handler for updating variation fields
  const handleChange = (index: number, field: string, value: string | number |VariationType ) => {
    const updatedVariations = [...data.variations];
    updatedVariations[index] = {
        ...updatedVariations[index],
        [field]: value,
    };
    setData('variations', updatedVariations);
  };
  
  const handleSubmit = () => {
    post(route('admin.products.variations.update', product.id), {
        preserveScroll: true,
        onSuccess: () => {
            // handle sucessful submission
        },
        onError: (errors) => {
            console.log('Validation errors:', errors);            
        },
    });
  }

  return (
    <ProductLayout
      title='Types de Variations'
      description='Gérez les types et options de variations des produits.'
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-while">Variation de Produit</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configurez vos variations de produit et options</p>
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
                <p className="font-medium">Please fix the following errors:</p>
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
                                  <Button
                                    type='button'
                                    variant='destructive'
                                    size="sm"
                                    onClick={() => handleRemoveOption(typeIndex,optionIndex)}
                                    className='bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400'
                                  >
                                    <Trash2 size={16} className='mr-1' />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                                {expandedOptions[`${typeIndex}-${optionIndex}`] && (
                                  <div className="space-y-4 p-4">
                                    <div className="">
                                      <Input 
                                        placeholder='Enter option name'
                                        value={option.name}
                                        onChange={(e) =>{
                                          const newTypes = [...variationTypes];
                                          newTypes[typeIndex].options[optionIndex].name = e.target.value;
                                          setVariationTypes(newTypes);
                                        }}
                                        className='h-11'
                                      />
                                    </div>
                                    {renderImageUpload(typeIndex, optionIndex)}
                                  </div>
                                )}
                            </motion.div>
                          ))}
                        </div>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => handleAddOption(typeIndex)}
                          className='w-full border-dashed'
                        >
                          <Plus size={16} className='mr-@' />
                          Add New Option
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <Button
              type='button'
              variant='outline'
              onClick={handleAddVariationType}
              className='h-16 w-full border-2 border-dashed bg-gray-50/50 hover:bg-gray-100/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/50'
            >
              <Plus size={16} className='mr-3' />
              Add New Variation Type
            </Button>
            <div className="sticky bottom-4 flex justify-end rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-gray-*00/80">
              <Button type='submit' className='bg-primary hover:bg-primary/90 min-w-[120px]'>
                <Save size={16} className='mr-2' />
                Enreigistrer
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </ProductLayout>
  );
}
