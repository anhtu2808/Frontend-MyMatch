import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherCard = ({ teacher, isBookmarked = false, onBookmarkToggle, hasReviewed = false }) => {
  const navigate = useNavigate();
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-emerald-500 to-emerald-600';
    if (rating >= 4.0) return 'from-blue-500 to-blue-600';
    if (rating >= 3.5) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getRatingTextColor = (rating) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking bookmark
    if (onBookmarkToggle) {
      onBookmarkToggle(teacher.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/teachers/${teacher.id}`);
  };

  const handleViewDetailClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking view detail button
    navigate(`/teachers/${teacher.id}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 w-1/2 overflow-hidden">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer relative"
    >


      {/* Reviewed Badge - Top left positioning */}
      {hasReviewed && (
        <div className="absolute top-3 left-3 z-20 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
          <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Đã đánh giá
        </div>
      )}

      {/* Card Header với gradient overlay */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="relative z-10">
          {/* Avatar và Rating Badge */}
          <div className="flex items-start justify-between mb-4 relative">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                {teacher.image ? (
                  <img 
                    src={teacher.image} 
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {teacher.name.charAt(0)}
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            {/* Rating Badge - Positioned to avoid overlap */}
            <div className={`bg-gradient-to-r ${getRatingColor(teacher.rating)} text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg self-start`}>
              ⭐ {teacher.rating}
            </div>
          </div>

          {/* Teacher Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex items-center">
              {teacher.name}
              <div className="relative ml-2 group">
                <svg className="w-4 h-4 text-blue-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 -bottom-1 transform -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible z-10">
                  <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    Mã giảng viên
                  </div>
                </div>
              </div>
            </h3>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200">
                  {teacher.code}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium mt-1">
                {teacher.department}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Rating Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {renderStars(teacher.rating)}
              <span className={`text-sm font-semibold ${getRatingTextColor(teacher.rating)}`}>
                {teacher.rating}/5.0
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {teacher.reviews} đánh giá
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 w-16">Chất lượng</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${getRatingColor(teacher.rating)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(teacher.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600">{teacher.rating}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 w-16">Phổ biến</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((teacher.reviews / 60) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600">{teacher.reviews}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-gray-900">{teacher.reviews}</div>
            <div className="text-xs text-gray-500">Đánh giá</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{Math.floor(Math.random() * 5) + 1}</div>
            <div className="text-xs text-gray-500">Môn học</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-sm">Đánh giá</span>
          </button>
          
          <button 
            onClick={handleViewDetailClick}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center"
            title="Xem chi tiết"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Bookmark Button */}
          <button 
            onClick={handleBookmarkClick}
            className={`font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isBookmarked 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-yellow-600'
            }`}
          >
            <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TeacherCard;