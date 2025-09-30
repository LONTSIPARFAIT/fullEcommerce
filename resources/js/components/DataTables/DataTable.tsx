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
    canViewResources = false,
    canCreateResources = false,
    canEditResources = false,
    canDeleteResources = false,
    icon: Icon,
    createRoute = '',
    editRoute = '',
    onDelete,
}: {
    data : any;
    columns: TableColumns[];
    resourceName: string;
    singularName: string;
    routeName: string;
    filters: any;
    canViewResources: boolean;
    canCreateResources: boolean;
    canEditResources: boolean;
    canDeleteResources: boolean;
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

    const upadateRoute = (newParams = {}) =>{
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