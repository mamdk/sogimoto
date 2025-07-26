"use client";

import { Star, StarHalf } from 'lucide-react';
import Pagination from "src/components/ui/pagination";
import apiClient from "src/utils/axios";
import useSWR from "swr";
import {useParams, useSearchParams} from "next/navigation";
import Loading from "src/app/products/[id]/loading";
import Rating from "src/components/ui/rating";

export default function ReviewsList() {
    const {id} = useParams()
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const { data: reviewsResponse, isLoading } = useSWR(
        `/products/${id}/reviews${parseInt(page || '1', 10) > 1 ? `?page=${page}` : ''}`,
        (url) => apiClient.get(url).then(res => res.data)
    );

    if(isLoading) {
        return (<section className="mt-12 bg-white rounded-xl shadow-md p-6">
            <Loading />
        </section>)
    }

    return (
            <section className="mt-12 bg-white rounded-xl shadow-md p-6">
                <div className="flex align-center border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                    <p className="text-gray-500 ml-2">({reviewsResponse.total})</p>
                </div>

                <div className="bg-white rounded-lg p-2">
                    {reviewsResponse.reviews.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No Reviews</p>
                    ) : (
                        <div className="space-y-6">
                            {reviewsResponse.reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex justify-between items-center mb-3">
                                        <Rating rating={review.rating} />
                                        <span className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-700 whitespace-pre-line">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={'flex justify-center align-center'}>
                    <Pagination
                        currentPage={reviewsResponse.page}
                        totalPages={reviewsResponse.totalPages}
                    />
                </div>
            </section>
    );
}
