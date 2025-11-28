import { Link } from "@inertiajs/react";
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
                        .
                    </Link>
                </>
            ) : (
                <div className=""></div>
            )}
        </div>
    );
}