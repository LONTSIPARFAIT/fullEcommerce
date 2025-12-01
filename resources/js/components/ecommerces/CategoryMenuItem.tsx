import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface Category {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    children: Category[];
}

interface CategoryMenuItemProps {
    category: Category;
}

export default function CategoryMenuItem ({ category }: CategoryMenuItemProps){
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    return (
        <div className="nested-dropdown relative">
            {category.children?.length > 0 ? (
                <>
                    <Link href="#" className="flex items-center justify-between px-4 py-3 hover:bg-gray-100" 
                      onMouseEnter={()=> setIsSubMenuOpen(true)}
                      onMouseLeave={()=> setIsSubMenuOpen(false)} >
                        <div className="flex items-center ">
                            <span>{category.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-xs" />
                    </Link>
                    {isSubMenuOpen && (
                        <div className="nested-dropdown-menu absolute w-64 rounded-md bg-white shadow-lg" onMouseEnter={()=> setIsSubMenuOpen(true)}
                      onMouseLeave={()=> setIsSubMenuOpen(false)}>
                        {category.children.map((childCategory) => (
                            <CategoryMenuItem key={childCategory.id} category={childCategory} />
                        ))}
                      </div>
                    )}
                </>
            ) : (
                <Link href={`/category/${category.slug}`} className="flex items-center px-4 py-3 hover:bg-gray-100">
                    <span>{category.name}</span>
                </Link>
            )}
        </div>
    );
}