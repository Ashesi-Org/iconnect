import { Bird } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom'; 


const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-app-background-2">
      <div className="bg-app-background-1 e p-8 rounded shadow-md text-center">
        <Bird size={100} className="text-app-hover-green text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-white">
          Oops! We do not have the page you looking for.
        </p>
        <Link
          to="/"
          className="block mt-4 text-app-brown hover:underline"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
