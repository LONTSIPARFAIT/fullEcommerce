import { Link, usePage } from "@inertiajs/react";
import { ProductCard } from "../ProductCard";


export default function BestSeller() {
    const { bestSellingProducts } = usePage().props as any;
    // console.log('bestSellingProducts',bestSellingProducts);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="container flex justify-between items-center mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Best Sellers</h2>
          <Link prefetch href="#" className="text-indigo-600 hover:text-indigo-800">View All</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bestSellingProducts.length > 0 ?
                (bestSellingProducts.map((product:any)=> <ProductCard key={produc.id} {...product} />)
            ) : (
                <div className="col-span-4 text-center text-gray-500">No best Seller available at the moment.</div>
            )}
        </div>
      </div>
    </div>
  );
}
