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
      title='Variations de Produit'
      description='Gérez les variations des produits.'
      breadcrumbs={breadcrumbs}
      // backUrl={route('admin.products.edit', product.id)}
      backUrl='admin/products/edit'
      icon={<Layers size={20} className='text-primary dark:text-primary-foreground' />}
      productId={product.id}
      activeTab='variations'
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Variations de Produit</h2>
        </div>

        {data.variations.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700"></div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </ProductLayout>
  );
}
