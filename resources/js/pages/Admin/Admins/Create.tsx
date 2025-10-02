import { BreadcrumbItem } from "@/types";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: 'dashboard' },
    { title: 'Admins', href: route('admin.admins.index') },
    { title: 'Create Admin', href: '' },
];

export default function Create(){
    const {data, setData, post, processing, error } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        avatar: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
                      viewRoute="admin.admins.show"
                      editRoute="admin.admins.edit"
                      onDelete={handleDelete}
                      icon={Users}
                      createRoute="admin.admins.create"
                    />                    
                </div>
            </div>
        </AppLayout>
    )
}