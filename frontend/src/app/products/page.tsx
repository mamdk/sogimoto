"use client"

import {useSearchParams} from 'next/navigation';
import apiClient from "src/utils/axios";
import ProductCard from "src/components/ui/product_card";
import Pagination from "src/components/ui/pagination";
import useSWR from "swr";
import Loading from "src/app/loading";
import EmptyState from "src/components/ui/empty_state";
import Error from "src/app/error";

function ProductsPage() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const { data, isLoading, error } = useSWR(
        `/products${(parseInt(page, 10) || 1) > 1 ? `?page=${page}` : ''}`,
        (url) => apiClient.get(url)
    );

    if(isLoading) {
        return (
            <main className={'p-4 mb-4'}>
                <Loading />
            </main>
        )
    }

    if(data.status === 404) {
        return <EmptyState />
    }

    if(error || data.status !== 200) {
        return <Error />
    }

    const productsData = data.data

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