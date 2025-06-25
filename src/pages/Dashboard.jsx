import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout 
      title="Bảng điều khiển"
      description=""
    >
      <div className="space-y-10">
        {/* Welcome Section với gradient background */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Chào mừng trở lại, Alex! 👋
            </h2>
            <p className="text-blue-100 text-lg">
              Hôm nay là ngày tuyệt vời để học tập và phát triển
            </p>
          </div>
        </div>

        {/* Summary Section với improved cards */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Tổng quan hoạt động</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
              <span>Xem tất cả</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* My Reviews Card */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-500">Đánh giá</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Đánh giá của tôi</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Xem và chỉnh sửa đánh giá của bạn</p>
              <div className="mt-4 flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10-10M7 7l10 10M7 7l-7 10" />
                </svg>
                <span className="text-xs font-medium">+2 tuần này</span>
              </div>
            </div>

            {/* Class Exchange Card */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-500">Hoạt động</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Đổi chéo lớp</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Quản lý đổi chéo lớp của bạn</p>
              <div className="mt-4 flex items-center text-orange-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium">1 đang chờ</span>
              </div>
            </div>

            {/* Document Sharing Card */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-500">Tài liệu</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Chia sẻ tài liệu</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Truy cập tài liệu bạn tải lên</p>
              <div className="mt-4 flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span className="text-xs font-medium">2.4MB sử dụng</span>
              </div>
            </div>

            {/* Notifications Card */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17h5l-5 5v-5zM12 3a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-500">Thông báo</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Thông báo</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Các thông báo hiện tại</p>
              <div className="mt-4 flex items-center text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium">2 mới</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Activities với improved design */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Hoạt động gần đây</h3>
            <button className="text-sm text-gray-500 hover:text-gray-700">Xem tất cả</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Activity Item 1 */}
            <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Đánh giá Dr. Carter</p>
                  <p className="text-sm text-gray-500">Khoa Khoa học máy tính</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">4.6</span>
                </div>
                <p className="text-xs text-gray-500">2 ngày trước</p>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Đổi chéo: Math 201</p>
                  <p className="text-sm text-gray-500">Toán cao cấp</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-1">
                  Đang chờ xác nhận
                </span>
                <p className="text-xs text-gray-500">1 tuần trước</p>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tải lên ghi chú</p>
                  <p className="text-sm text-gray-500">CS 101 - Algorithms</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-1">
                  Đã hoàn thành
                </span>
                <p className="text-xs text-gray-500">3 ngày trước</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions với improved design */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Thao tác nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Đánh giá giảng viên</span>
            </button>
            
            <button className="group bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Yêu cầu đổi chéo</span>
            </button>
            
            <button className="group bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-gray-200 hover:border-purple-300 flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Tải dữ liệu lên</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 