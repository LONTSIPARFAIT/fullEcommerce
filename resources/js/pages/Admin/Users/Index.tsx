import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";

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

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="py-6">
                <div className="mx-auto">
                    <Head title="Users" />                    
                </div>
            </div>
        </AppLayout>
    )
}