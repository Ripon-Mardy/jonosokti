import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-9xl font-extrabold text-gray-800 mb-4">404</h2>
        <p className="text-2xl font-semibold text-gray-700 mb-6">
          Oops! Page not found.
        </p>
        <p className="text-lg text-gray-500 mb-8">
          It seems the page you’re looking for doesn’t exist.
        </p>
        <Link href="/" className="px-6 py-3 text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition">
            Go Back Home
        </Link>
      </div>
    </div>
  );
}
