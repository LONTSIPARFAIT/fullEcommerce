import DataTable from "@/components/DataTables/DataTable";
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";

export default function UserIndex(){
    const {users, filters, can } = usePage().props;
    const columns = [
        {
            key: "index",
            label: "#",
            sortable: false,
            type: 'IndexColumn',
            width: '80px',
            render: (item: any, index: number) => {
                return (filters.page - 1) * filters.page + index + 1 ;
            }
        },
        { Key: 'name', label: 'Name', sortable: true },
        { Key: 'email', label: 'Email', sortable: true },
        { Key: 'phone', label: 'Phone', sortable: true },
        { Key: 'create_at', label: 'Create At', sortable: true },
        // { Key: 'action', label: 'Action', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('admin.users.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                // toast.success('User delete sucessfuly')
            },
            onError: ()=>{
                // toast.success('User deletion failed')                
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                      data={users}
                      columns={columns}
                      resourceName="Users"
                      singularName="User"
                      routeName="admin.users.index"
                      filters={filters}
                      canViewResource={false}
                      canCreateResource={false}
                      canEditResource={false}
                      canDeleteResource={false}
                      viewRoute={route('admin.users.show')}
                      editRoute={route('admin.users.edit')}
                      onDelete={handleDelete}
                    />                    
                </div>
            </div>
        </AppLayout>
    )
}