import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ 
  children, 
  title = 'My Match',
  description = '',
  className = ''
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content with left margin for sidebar */}
      <div className="ml-64">
        <div className="min-h-screen overflow-y-auto">
          <div className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 ${className}`}>
            {/* Page Header */}
            {(title || description) && (
              <div className="mb-10">
                <div className="max-w-3xl">
                  {title && (
                    <h1 className="text-3xl font-semibold text-primary-500 mb-3">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-lg font-medium text-primary-500">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Page Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 