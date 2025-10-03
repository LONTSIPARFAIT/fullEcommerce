import DataTable from "@/components/DataTables/DataTable";
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";
import { Users } from "lucide-react";

export default function AdminIndex(){
    const {admins, filters, can } = usePage().props;
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
        { key: 'avatar', label: 'Avatar', sortable: false, type: 'image', design: 'circle' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'created_at', type: 'date', label: 'Create At', sortable: true },
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
    console.log(admins);
    console.log(can);


    return (
        <AppLayout>
            <Head title="Admins" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                      data={admins}
                      columns={columns}
                      resourceName="Admins"
                      singularName="Admin"
                      routeName="admin.admins.index"
                      filters={filters}
                      canViewResource={false}
                      canCreateResource={true}
                      canEditResource={true}
                      canDeleteResource={true}
                    //   viewRoute="admin.admins.show"
                      editRoute="admin.admins.edit"
                      onDelete={handleDelete}
                      icon={Users}
                      createRoute="admins/create"
                    //   createRoute="admin.admins.create"
                    />
                </div>
            </div>
        </AppLayout>
    )
}
