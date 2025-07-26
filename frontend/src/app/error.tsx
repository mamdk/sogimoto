"use client"

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
    title?: string;
    description?: string;
}

function ErrorPage({
    title = 'Error',
    description = 'Unfortunately, there was a problem processing your request.',
}: ErrorPageProps) {
    return (
        <div className="min-h-screen flex justify-center items-start p-4 sm:items-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6">
                    <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
                <p className="text-gray-600 mb-8">{description}</p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default ErrorPage