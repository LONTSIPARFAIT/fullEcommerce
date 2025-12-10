import React from 'react'

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

const ProductDetail = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProductDetail
