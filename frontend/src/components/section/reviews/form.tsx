"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiClient from 'src/utils/axios';
import {useParams} from "next/navigation";
import { mutate } from "swr";
import {useState} from "react";
import {AxiosResponse} from "axios";

const reviewSchema = yup.object({
    rating: yup.number()
        .typeError('rating is a required field')
        .min(1)
        .max(5)
        .test(
            "is-decimal",
            "The score can be up to one decimal place.",
            (value) => {
                if (!value) return false;
                return /^\d+(\.\d{1})?$/.test(value.toString());
            }
        )
        .required(),
    comment: yup.string().required(),
});

function ReviewForm() {
    const {id: productId} = useParams()
    const [mainError, setMainError] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
        setError
    } = useForm({
        resolver: yupResolver(reviewSchema),
    });

    const onSubmit = async (data) => {
        const result: AxiosResponse & Record<string, AxiosResponse> = await apiClient.post(`/products/${productId}/reviews`, data);

        if(result.status === 201) {
            reset();
            mutate(`/products/${productId}/reviews`)
        } else if(result.status === 400) {
            const apiErrors = result.response.data.errors
            Object.keys(apiErrors).forEach((key: 'comment' | 'rating') => {
                setError(key, { message: apiErrors[key].msg })
            })
        } else {
            const apiError = result.response.data.error
            setMainError(apiError.message)
        }

    };

    return (
        <section className="mt-12 bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col align-center border-b border-gray-200 pb-2 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Write your feedback</h2>
                {mainError && <p className="text-red-500 text-sm mt-1">{mainError}</p>}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="rating" className="block mb-1">
                    Rating *
                </label>
                <input
                    id="rating"
                    className="w-full p-2 border border-gray-400 rounded"
                    type={'number'}
                    step="0.1"
                    min="1"
                    max="5"
                    {...register('rating')}
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div>

            <div>
                <label htmlFor="comment" className="block mb-1">
                    Comment *
                </label>
                <textarea id="comment" rows={4} {...register('comment')} className="w-full p-2 border border-gray-400 rounded" />
                {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                {isSubmitting ? 'Sending...' : 'Send'}
            </button>
        </form>
        </section>

    );
}

export default ReviewForm