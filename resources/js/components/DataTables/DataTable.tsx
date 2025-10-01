import { usePage, router } from "@inertiajs/react";
import React, { useState } from "react";

interface TableColumn {
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'custom';
    sortable?: boolean;
    render?: (row: any) => React.ReactNode;
}

export default function DataTable({
    data,
    columns = [],
    resourceName = '',
    singularName = '',
    pluralName = '',
    filters = {},
    viewRoute = '',
    canViewResource = false,
    canCreateResource = false,
    canEditResource = false,
    canDeleteResource = false,
    icon: Icon,
    createRoute = '',
    editRoute = '',
    onDelete,
}: {
    data : any;
    columns: TableColumn[];
    resourceName: string;
    singularName: string;
    routeName: string;
    filters: any;
    canViewResource: boolean;
    canCreateResource: boolean;
    canEditResource: boolean;
    canDeleteResource: boolean;
    icon: React.ElementType;
    createRoute: string;
    editRoute: string;
    onDelete: (id: string) => void;
}) {
    const { errors } = usePage().props;

    const [search, setSearch] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.perPage || 10);
    const [sort, setSort] = useState(filters?.sort || 'id');
    const [direction, setDirection] = useState(filters?.direction || 'desc');
    
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const updateRoute = (newParams = {}) =>{
        const params = {
            search,
            perPage,
            sort,
            direction,
            page: 1,
            ...newParams
        };
        
        router.get(route(routeName),params, {
            preserveState: true;
            preserveScroll: true;
        });
    };

    const handleSearch = (e:any) => {
        e.preventDefault();
        updateRoute();
    }

    const handlePerPageChange = (e:any) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        updateRoute({ perPage: newPerPage });
    }

    const handleSort = (column:any) => {
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        updateRoute({ sort: column, direction:newDirection });
    }

    const formatDate = (dateString: any) =>{
        const options = { year: 'numeric', month:'short', day:'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const formatDate2 = (dateString: any) =>{
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const renderCell= ( item: any, column: any, index:number ) => {
        if (!column.key) return null;

        const getValue = (obj: any, path: any) => {
            return path.split('.').reduce((acc: any, path:any) => acc && acc[path], obj);
        }

        const value = getValue(item, column.key);

        if(column.type === 'date' && value) {
            return formatDate(value);
        }
        if(column.type === 'date2' && value) {
            return formatDate2(value);
        }
        if(column.type === 'badge') {
            return (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {value}
                </span>
            );
        }

        if(column.type === 'image' && column.design === 'rec'){
            return (
                <img 
                    src={value} 
                    alt={item.name} 
                    onError={(e)=>{
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/placeholder.png'
                    }}
                    className="h-10 w-10" 
                />
            )
        }

        if(column.type === 'image' && column.design === 'circle'){
            return (
                <img 
                    src={value} 
                    alt={item.name} 
                    onError={(e)=>{
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/placeholder.png'
                    }}
                    className="h-10 w-10 rounded-full" 
                />
            );
        }

        if(column.type === 'boolean'){
            return value ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Yes
                </span>
            ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                    No
                </span>
            );
        }
        if (column.type === 'custum' && column.render) {
            return column.render(item);
        }
        if (column.type === 'IndexColumn' && column.render) {
            return column.render(item, index);
        }

        return value;
        
    }

    const renderActions = (item: any) => {
        return (
            <div className="flex space-x-2">
                {canViewResource}
            </div>
        )
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{resourceName}</h2>
                {canCreateResources && (
                    <a
                        href={`/${resourceName}/create`}
                        className="inline-flex items-center px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                    >
                        Create {singularName}
                    </a>
                )}
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">  </thead>   
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>

    );
}