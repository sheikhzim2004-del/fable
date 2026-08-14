'use client';

const error = ({ reset }) => {
    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
                <h1 className="text-3xl font-bold">Something went wrong!</h1>

                <p className="mt-2 text-gray-500">
                    An unexpected error occurred. Please try again.
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-6 rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
                >
                    Try Again
                </button>
            </main>
        </div>
    );
};

export default error;