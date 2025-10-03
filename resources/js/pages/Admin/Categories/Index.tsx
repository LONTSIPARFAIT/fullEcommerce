import DataTable from "@/components/DataTables/DataTable";
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";
import { TagIcon } from "lucide-react";

export default function CategoryIndex(){
    const { categories, filters, can } = usePage().props;
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
        { key: 'image', label: 'image', sortable: false, type: 'image', design: 'rec' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'slug', label: 'Slug', sortable: false },
        { key: 'parent_name', label: 'Parent Name', sortable: true },
        { key: 'created_at', type: 'date', label: 'Create At', sortable: true },
        // { Key: 'action', label: 'Action', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('admin.categories.destroy', id), {
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
            <Head title="Categories" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                      data={categories}
                      columns={columns}
                      resourceName="Categories"
                      singularName="Category"
                      routeName="admin.categories.index"
                      filters={filters}
                      canViewResource={false}
                      canCreateResource={true}
                      canEditResource={true}
                      canDeleteResource={true}
                    //   viewRoute="admin.categories.show"
                      editRoute="admin.categories.edit"
                      onDelete={handleDelete}
                      icon={TagIcon}
                      createRoute="categories/create"
                    //   createRoute="admin.categories.create"
                    />
                </div>
            </div>
        </AppLayout>
    )
}
