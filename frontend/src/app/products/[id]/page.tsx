import { notFound } from 'next/navigation';
import apiClient from 'src/utils/axios';
import Link from 'next/link';
import { Star, ChevronLeft } from 'lucide-react';
import Image from "next/image";
import ReviewsList from "src/components/section/reviews/list";
import ReviewForm from "src/components/section/reviews/form";
import Rating from "src/components/ui/rating";
import AISummary from "src/components/ui/ai_summary";

export default async function ProductPage({ params, searchParams }) {
    const { id } = await params;
    const {page} = await searchParams

    const productResponse = await apiClient(`/products/${id}`)

    const { data: product, status: productStatus, statusText: productStatusText } = productResponse;

    if (productStatus !== 200 || productStatusText !== 'OK') {
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <Link href={'/products'} className="text-gray-600 hover:text-indigo-600 flex items-center w-fit">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="mr-2">back to Products</span>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                            <div className="relative aspect-square">
                                <Image src={product.image} alt={product.title} fill className="object-contain" priority />
                            </div>
                        </div>

                        <div className="md:w-1/2 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">{product.category}</span>
                                <span className="text-xs text-gray-500">{new Date(product.created_at).toLocaleDateString()}</span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                            <div className="flex items-center mb-6">
                                <Rating rating={product.rating} showScore={false}/>
                                <span className="text-sm text-gray-500 ml-2">({product.count.toLocaleString()})</span>
                            </div>

                            <div className="mb-6">
                                <span className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                            </div>

                            {/*TODO: sizes and colors*/}
                            {/*<div className="flex space-x-3 rtl:space-x-reverse">*/}
                            {/*    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors">*/}
                            {/*        <ShoppingCart className="w-5 h-5 ml-2" />*/}
                            {/*        Add to Card*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <AISummary mood={'product'} />

                <ReviewsList />
                <AISummary mood={'reviews'} />

                <ReviewForm />
            </main>
        </div>
    );
}
