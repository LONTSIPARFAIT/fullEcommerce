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
    rows,
}:{
    data: any[];
    columns: TableColumn[];
    resourceName: string;
    singularName: string;
    pluralName: string;
    filters: any;
    viewRoute: string;
    canViewResources: boolean;
    canCreateResources: boolean;
    rows: React.ReactNode;
}) {
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