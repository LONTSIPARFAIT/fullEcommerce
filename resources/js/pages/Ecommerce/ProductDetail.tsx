import EcomLayout from '@/layouts/ecom-layout';
import { Link } from '@inertiajs/react';
import { Heart, Minus, Plus, RefreshCcw, Shield, ShoppingCart, Star, StarHalf, Zap } from 'lucide-react';
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
        rating: number;
        review_count: number;
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

    // const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
    // const savings = product.original_price ? (product.original_price - product.price).toFixed(2) : 0;
    const discount = 0;

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

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="flex flex-cols lg:flex-row">
                    {/* Product Images */}
                    <div className="w-full p-6 lg:w-2/5">
                        <div className="relative mb-4">
                            {discount > 0 && (
                                <div className="absolute top-2 left-0 z-10">
                                    <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">-{discount}%</span>
                                </div>
                            )}
                            <img src={product.images[activeImage]} alt={product.name} className='h-96 w-full rounded-lg object-contain' />
                        </div>


                        {/* Thumbail images */}
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((image, index) => (
                                <button 
                                  key={index}
                                  onClick={()=>setActiveImage(index)}
                                  className={`overflow-hidden rounded-md border-2 ${
                                    activeImage === index ? 'border-indigo-600' : 'border-transparent'
                                  }`}>
                                    <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-20 w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="w-full border-l p-6 lg:w-3/5">
                        {/* Basic info */}
                        <div className="mb-6">
                            <h1 className="mb-2 text-2xl font-bold text-gray-800">{product.name}</h1>

                            {/* Rating */}
                            <div className="mb-4 flex items-center">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_,index) => {
                                        const rating = product.rating;
                                        if (index + 1 <= Math.floor(rating)) {
                                            return <Star key={index} className='fill-current' size={16}/>;
                                        } else if (index < rating) {
                                            return <StarHalf key={index} className='fill-current' size={16} />
                                        }
                                        return <Star key={index} size={16}/>
                                    })}
                                </div>
                                <span className="ml-2 text-gray-600"> {product.rating} - {product.review_count} Review</span>
                            </div>

                            {/* Price and stock status */}
                            <div className="mb-4 flex items-center">
                                <span className="text-3xl font-bold text-indigo-600">{computerProduct.price}FCFA</span>
                                {computerProduct.variation && <span className='ml-2 text-sm text-gray-500'>(Selected variation)</span>}
                            </div>
                            
                            <div className="mb-4 flex items-center text-sm text-gray-500">
                                <span className="mr-4 flex items-center">
                                    <Shield className='mr-1 text-green-500' size={16} />
                                    {computerProduct.quantity ? `In Stock (${computerProduct.quantity} available)` : 'Out of Stock'}
                                </span>
                                <span className="flex items-center">
                                    <RefreshCcw className='mr-1 text-blue-500' size={16} /> Free Shipping
                                </span>
                            </div>
                            <p className="mb-4 text-gray-600">{product.description}</p>
                        </div>

                        {/* Variation options */}
                        {product.variationTypes.map((type) => (
                            <div key={type.id} className="mb-6">
                                <h3 className='mb-2 font-semibold text-gray-800'>{type.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {type.options.map((option) => (
                                        <button 
                                          key={option.id}
                                          onClick={()=>handleOptionSelect(type.id, option)}
                                          className={`rounded-md border px-4 py-2 ${
                                          selectedOptions[type.id]?.id === option.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                                        }`}>
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantite a selectionner */}
                        <div className="mb-6">
                            <h3 className='mb-2 font-semibold text-gray-800'>Quantité</h3>
                            <div className="flex w-32 items-center rounded-md border">
                                <button
                                  onClick={()=>setQuantity((q)=>Math.max(1, q - 1))}
                                  className="px-3 py-1 text-gray-600 hover:text-indigo-600">
                                    <Minus size={16} />
                                </button>
                                <input type="number" min="1" value={quantity} onChange={(e)=>setQuantity(Math.max(1, parseInt(e.target.value)))} className="w-12 border-none text-center focus:ring-0" />
                                <button
                                  onClick={()=>setQuantity((q)=>Math.max(1, q + 1))}
                                  className="px-3 py-1 text-gray-600 hover:text-indigo-600">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                            <button
                              onClick={()=>setQuantity((q)=>Math.max(1, q + 1))}
                              className="flex flex-1 items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white hover:text-indigo-700">
                                <ShoppingCart className='mr-2' size={20} /> Add to Card
                            </button>
                            <button
                              onClick={()=>setQuantity((q)=>Math.max(1, q + 1))}
                              className="flex flex-1 items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-white hover:text-gray-900">
                                <Zap className='mr-2' size={20} /> Buy Now
                            </button>
                            <button
                              onClick={()=>setQuantity((q)=>Math.max(1, q + 1))}
                              className="rounded-md border border-gray-300 p-3 text-gray-600 hover:bg-gray-100">
                                <Heart size={20} /> Add to Card
                            </button>
                            <button
                              onClick={()=>setQuantity((q)=>Math.max(1, q + 1))}
                              className="rounded-md border border-gray-300 p-3 text-gray-600 hover:bg-gray-100">
                                <RefreshCcw size={20} /> Add to Card
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-8">
                <div className="border-b">
                    <div className="-mb-px flex flex-wrap"></div>
                </div>
            </div>
        </div>
    </EcomLayout>
  )
}

export default ProductDetail
