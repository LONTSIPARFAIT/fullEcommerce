import DataTable from "@/components/DataTables/DataTable";
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";
import { TagIcon } from "lucide-react";

export default function ProductIndex(){
    const { products, filters, can } = usePage().props;
    const columns = [
        {
            key: "index",
            label: "#",
            sortable: false,
            type: 'IndexColumn',
            width: '80px',
            render: (item: any, index: number) => {
                return (filters.page - 1) * filters.perPage + index + 1; // Correction ici
                // return (filters.page - 1) * filters.page + index + 1 ;
            }
        },
        { key: 'image', label: 'Image', sortable: false, type: 'image', design: 'rec' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'slug', label: 'Slug', sortable: false },
        { key: 'created_at', type: 'date', label: 'Create At', sortable: true },
        // { Key: 'action', label: 'Action', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('admin.products.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                // toast.success('User delete sucessfuly')
            },
            onError: ()=>{
                // toast.success('User deletion failed')
            }
        })
    }

    console.log(can);


    return (
        <AppLayout>
            <Head title="Products" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                      data={products}
                      columns={columns}
                      resourceName="Products"
                      singularName="Product"
                      routeName="admin.products.index"
                      filters={filters}
                      canViewResource={false}
                      canCreateResource={true}
                      canEditResource={true}
                      canDeleteResource={true}
                      viewRoute="admin.products.show"
                      editRoute="admin.products.edit"
                      onDelete={handleDelete}
                      icon={TagIcon}
                      createRoute="products/create"
                    //   createRoute="admin.products.create"
                    />
                </div>
            </div>
        </AppLayout>
    )
}
