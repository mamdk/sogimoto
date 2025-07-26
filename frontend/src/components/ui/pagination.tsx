'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onChange?: (newPage: number) => void
}

function Pagination({ totalPages, currentPage, onChange }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const maxVisiblePages = 3;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

        if(onChange instanceof Function) {
            onChange(page)
        }
    };

    const getVisiblePages = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div className="flex items-center justify-between mt-8 border border-gray-200 rounded-sm p-2">
            <button
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-md ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'
                }`}
            >
                <ArrowLeft className="w-4 h-4 ml-1" />
            </button>

            <div className="flex space-x-1 rtl:space-x-reverse">
                {getVisiblePages().map((page) => (
                    <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                            currentPage === page ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-md ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'
                }`}
            >
                <ArrowRight className="w-4 h-4 mr-1" />
            </button>
        </div>
    );
}

export default Pagination