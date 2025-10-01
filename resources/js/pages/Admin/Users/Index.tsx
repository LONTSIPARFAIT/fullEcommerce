import { usePage } from "@inertiajs/react";

export default function UserIndex(){
    const {users, filters, can } = usePage().props;
    const columns = [
        {
            'key': "index",
        }
    ]
}