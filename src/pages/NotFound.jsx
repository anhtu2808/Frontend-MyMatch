import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout 
      title="Trang không tìm thấy"
      description="404 - Page Not Found"
    >
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Không tìm thấy trang
          </h2>
          <p className="text-gray-600 mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <div className="space-y-4">
            <Link 
              to="/dashboard"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              Về trang chủ
            </Link>
            <Link 
              to="/teachers"
              className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
            >
              Xem danh sách giảng viên
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound; 