import EcomLayout from '@/layouts/ecom-layout';
import { Link } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react'

interface VariationOption {
    id: number;
    name: string;
    images: string[];
}

interface VariationType {
    id: number;
    name: string;
    type: string;
    options: VariationOption[];
}

interface Variation {
    id: number;
    variation_type_option_ids: string;
    quantity: number;
    price: string;
}

interface ProductDetailProps {
    product : {
        id: number;
        name: string;
        slug: string;
        description?: string;
        price: string;
        quantity: number | null;
        image: string;
        images: string[];
        variationTypes: VariationType[];
        variation: Variation[];
    };
    variationOptions: Record<string, string>;
    relatedProducts: any[];
}

const ProductDetail = ({product, variationOptions, relatedProducts}: ProductDetailProps) => {
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationOption>>({});

    // computer product detail based on selected variation
    const computerProduct = useMemo(()=>{
        const selectedOptionIds = Object.values(selectedOptions).map((op)=>op.id).sort((a,b)=> a - b);
        const matchingVariation = product.variation.find((variation)=>{
            const variationIds = JSON.parse(variation.variation_type_option_ids).sort((a: number, b: number)=> a - b);
            return JSON.stringify(selectedOptionIds) === JSON.stringify(variationIds);
        });

        return {
            price: matchingVariation?.price || product.price,
            quantity: matchingVariation?.quantity || product.quantity,
            variation: matchingVariation,
        };
    }, [product, selectedOptions]);

    // initilize with default options
    useEffect(() => {
        if (product.variationTypes.length > 0 ){
            const initialOptions: Record<number, VariationOption> = {};
            product.variationTypes.forEach((type)=>{
                initialOptions[type.id] = type.options[0];
            });
            setSelectedOptions(initialOptions);
        }
    }, [product.variationTypes]);

    const handleOptionSelect = (typeId: number, option: VariationOption) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [typeId]: option,
        }));
    };

    const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
    const savings = product.original_price ? (product.original_price - product.price).toFixed(2) : 0;

  return (
    <EcomLayout >
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Link href="/" className='hover:text-indigo-600'>Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/products" className='hover:text-indigo-600'>Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800">{product.name}</span>
                </div>
            </div>
        </div>
    </EcomLayout>
  )
}

export default ProductDetail
