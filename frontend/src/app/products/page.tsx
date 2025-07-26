"use client"

import {notFound, useSearchParams} from 'next/navigation';
import apiClient from "src/utils/axios";
import ProductCard from "src/components/ui/product_card";
import Pagination from "src/components/ui/pagination";
import useSWR from "swr";
import Loading from "src/app/loading";
import EmptyState from "src/components/ui/empty_state";

function ProductsPage() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const { data: productsData, isLoading, error } = useSWR(
        `/products${parseInt(page || '1', 10) > 1 ? `?page=${page}` : ''}`,
        (url) => apiClient.get(url).then(res => res.data)
    );

    if(error || productsData?.total === 0) {
        return <EmptyState description={error ? 'Unfortunately, there was a problem processing your request.' : undefined} />
    }

    if(isLoading) {
        return (
            <main className={'p-4 mb-4'}>
                <Loading />
            </main>
        )
    }

    return (
        <main className={'p-4 mb-4'}>
            <h2 className={'mb-4 font-semibold text-lg text-gray-800'}>Products</h2>

            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                {productsData.products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>


            <div className={'flex justify-center align-center'}>
                <Pagination totalPages={productsData.totalPages} currentPage={productsData.page} />
            </div>
        </main>
    );
}

export default ProductsPage