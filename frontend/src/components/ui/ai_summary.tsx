'use client';

import useSWR from 'swr';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import apiClient from 'src/utils/axios';
import { useParams } from 'next/navigation';

function AISummary({ mood }: { mood: 'product' | 'reviews' }) {
    const { id } = useParams();

    const [userRequested, setUserRequested] = useState(false);

    const {
        data: analysis,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR(
        userRequested ? [`/AI/summary`, id, mood] : null,
        ([url, productId, mood]) => apiClient.post(url, { productId, mood }).then((res) => res.data),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const renderContent = () => {
        if (isLoading || isValidating) {
            return (
                <div className="flex justify-center items-center py-4 mt-4">
                    <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                    <span className="mr-2 text-gray-600">Analyzing...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-red-500 rounded-md mt-4">Error retrieving analysis. Please try again.</div>
            );
        }

        if (analysis) {
            return (
                <div className="mt-4 p-4 bg-white rounded-md shadow-inner border border-gray-100">
                    <h4 className="font-medium text-blue-800 mb-2">AI analysis:</h4>
                    <p className="text-gray-700 whitespace-pre-line">{analysis.summary}</p>
                    <button onClick={() => mutate()} className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Analysis update
                    </button>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="flex flex-col justify-between items-center space-y-4 sm:flex-row sm:space-y-0">
                <h3 className="text-md font-medium text-gray-800 sm:text-lg">{mood === 'reviews' ? 'Analysis and summary of comments' : 'Product analysis and summary'}</h3>
                <button
                    onClick={() => {
                        setUserRequested(true)
                        mutate()
                    }}
                    disabled={isLoading || isValidating || analysis}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        analysis ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                >
                    <Sparkles className="w-5 h-5" />
                    View AI analysis
                </button>
            </div>

            {renderContent()}
        </div>
    );
}

export default AISummary