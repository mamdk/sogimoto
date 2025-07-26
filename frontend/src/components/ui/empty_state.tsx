import { ClipboardList, Frown } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionText?: string;
    actionHref?: string;
    icon?: 'clipboard' | 'sad';
};

function EmptyState({
   title = 'No data found.',
   description = 'There are no items in this section yet.',
   actionText,
   actionHref,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <ClipboardList className="h-8 w-8 text-gray-400" />
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mx-auto">{description}</p>

            {actionText && actionHref && (
                <Link
                    href={actionHref}
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {actionText}
                </Link>
            )}
        </div>
    );
}

export default EmptyState
