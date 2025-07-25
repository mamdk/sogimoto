"use client";

import { Star, StarHalf } from 'lucide-react';
import Pagination from "src/components/ui/pagination";
import apiClient from "src/utils/axios";
import useSWR from "swr";
import {useParams, useSearchParams} from "next/navigation";
import Loading from "src/app/products/[id]/loading";

export default function ReviewsList() {
    const {id} = useParams()
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const { data: reviewsResponse, isLoading } = useSWR(
        `/products/${id}/reviews${page > 1 ? `?page=${page}` : ''}`,
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
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => {
                                                const starValue = i + 1;
                                                return (
                                                    <span key={i}>
												{review.rating >= starValue ? (
                                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                ) : review.rating >= starValue - 0.5 ? (
                                                    <div className={'relative'}>
                                                        <StarHalf className="absolute w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                        <Star className="w-5 h-5 text-gray-300" />
                                                    </div>
                                                ) : (
                                                    <Star className="w-5 h-5 text-gray-300" />
                                                )}
											</span>
                                                );
                                            })}
                                            <span className={'text-gray-500 ml-2 text-sm'}>{review.rating}</span>
                                        </div>
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
