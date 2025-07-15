import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1">
        <div className="h-full">
          {/* Header */}
          {(title || description) && (
            <div className="bg-white border-b border-gray-200 px-6 pt-4">
              <div className="max-w-7xl mx-auto">
                {title && (
                  <h1 className="text-2xl font-bold text-gray-900 mb-0">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-gray-600 max-w-2xl">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout; 