import Link from 'next/link';
import React from 'react';

const notFound = () => {
    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
                <h1 className="text-6xl font-bold">404</h1>

                <p className="mt-3 text-xl font-semibold">Page Not Found</p>

                <p className="mt-2 text-gray-500">
                    Sorry, the page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-6 rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
                >
                    Go Home
                </Link>
            </main>
        </div>
    );
};

export default notFound;