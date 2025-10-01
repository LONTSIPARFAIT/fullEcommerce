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
    viewRoute: string;
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
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: any) => {
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
                {canViewResource && (
                    <button 
                        onClick={()=>router.visit(route(viewRoute, item.id))}
                        className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                    >
                        View
                    </button>
                )}
                {canEditResource && (
                    <button 
                        onClick={()=>router.visit(route(editRoute, item.id))}
                        className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                    >
                        Edit
                    </button>
                )}
                {canDeleteResource && (
                    <button 
                        onClick={()=>{
                            setItemToDelete(item);
                            setShowDeleteDialog(true);
                        }}
                        className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                    >
                        Delete
                    </button>
                )}
            </div>
        );
    };

    let tableColumns:TableColumn[] = [];
    tableColumns = [...columns];

    if (canEditResource || canDeleteResource || canViewResource) {
        tableColumns.push({
            key: 'actions',
            label: 'Actions',
            type: 'custom',
            sortable: false,
            render: renderActions,
        });
    }

    return (
        <div className="w-full bg-white dark:bg-gray-900">
            <div className="px-6 py-4">
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center">
                        {Icon && <Icon className='mr-3 h-6 w-6 text-blue-600 dark:text-blue-400'/>}
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200"> {resourceName} </h2>
                    </div>
                    {}
                </div>
            </div>
        </div>

    );
}