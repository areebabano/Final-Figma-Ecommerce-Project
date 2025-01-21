'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname(); // Get the current path
  const pathParts = pathname.split('/').filter((part) => part); // Split path into parts

  return (
    <div className="bg-[#F9F9FF] py-10 pl-20 max-w-7xl mx-auto"> {/* Added left alignment */}
      <h1 className="text-3xl font-bold text-[#151875] capitalize text-left">
        {pathParts[pathParts.length - 1]?.replace('-', ' ') || 'Home'}
      </h1>
      <p className="text-base text-gray-500 mt-2 text-left"> {/* Adjusted font size and alignment */}
        {pathParts.length > 0 ? (
          <>
            <Link href="/" className="text-gray-600 hover:text-pink-500">
              Home
            </Link>{' '}
            &gt;{' '}
            <Link href="/" className="text-gray-600 hover:text-pink-500">
              Pages
            </Link>{' '}
            &gt;{' '}
            {pathParts.map((part, index) => {
              const pathTo = '/' + pathParts.slice(0, index + 1).join('/');
              return index === pathParts.length - 1 ? (
                <span key={index} className="text-pink-500 capitalize">
                  {part.replace('-', ' ')}
                </span>
              ) : (
                <Link
                  key={index}
                  href={pathTo}
                  className="text-gray-600 hover:text-pink-500 capitalize"
                >
                  {part.replace('-', ' ')}
                </Link>
              );
            })}
          </>
        ) : (
          <span className="text-pink-500">Home</span>
        )}
      </p>
    </div>
  );
};

export default Breadcrumb;