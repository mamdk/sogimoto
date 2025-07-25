import { notFound } from 'next/navigation';
import apiClient from "src/utils/axios";
import ProductCard from "src/components/ui/product_card";
import Pagination from "src/components/ui/pagination";

export default async function ProductsPage({searchParams}) {
    const {page} = await searchParams

    const {data, statusText, status} = await apiClient(`/products${page > 1 ? `?page=${page}` : ''}`);

    if (status !== 200 || statusText !== 'OK') {
        notFound();
    }

    // TODO: Loading

    return (
        <main className={'p-4 mb-4'}>
            <h2 className={'mb-4 font-semibold text-lg text-gray-800'}>Products</h2>

            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                {data.products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>


            <div className={'flex justify-center align-center'}>
                <Pagination totalPages={data.totalPages} currentPage={data.page} />
            </div>
        </main>
    );
}