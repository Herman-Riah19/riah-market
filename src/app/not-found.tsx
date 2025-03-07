// NotFoundPage.tsx
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg">Sorry, the page you are looking for could not be found.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;