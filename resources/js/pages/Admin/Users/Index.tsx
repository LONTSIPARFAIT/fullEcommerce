import { usePage } from "@inertiajs/react";
import { Key } from "lucide-react";

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
        { Key: 'action', label: 'Action', sortable: true },
    ]
}