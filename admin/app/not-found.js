'use client'
import Link from 'next/link';

export default function page() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h2 className="text-7xl font-bold text-gray-800">404</h2>
        <p className="mt-4 text-2xl font-semibold text-gray-600">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/dashboard" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
            Back to Home
        </Link>
      </div>
    </div>
  );
}
