import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchFilters from '../components/SearchFilters';
import TeacherCard from '../components/TeacherCard';

// Hàm tạo mã giảng viên từ tên
const generateTeacherCode = (name, id) => {
  if (!name) return `T${id}`;
  
  // Tách tên thành các phần
  const parts = name.split(' ');
  if (parts.length === 0) return `T${id}`;
  
  // Lấy chữ cái đầu tiên của tên (phần cuối cùng)
  const firstName = parts[parts.length - 1];
  const firstNameInitial = firstName.charAt(0).toUpperCase();
  
  // Lấy chữ cái đầu tiên của họ và tên đệm
  const lastNameInitials = parts.slice(0, parts.length - 1).map(part => 
    part.charAt(0).toUpperCase()
  ).join('');
  
  // Kết hợp và thêm số ID
  return `${firstNameInitial}${lastNameInitials}${id.toString().padStart(2, '0')}`;
};

const TeacherReview = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    teacherCode: '',
    subjectName: '',
    subjectCode: '',
    sortBy: 'Highest Rating'
  });
  
  const teachers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      code: 'TCH001',
      department: 'Khoa Công nghệ thông tin',
      rating: 4.8,
      ratingColor: 'bg-green-500',
      reviews: 45,
      image: '/src/assets/figma/avatar.png'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      code: 'TCH002',
      department: 'Khoa Kinh tế',
      rating: 4.5,
      ratingColor: 'bg-blue-500',
      reviews: 32,
      image: '/src/assets/figma/avatar.png'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      code: 'TCH003',
      department: 'Khoa Kỹ thuật',
      rating: 4.2,
      ratingColor: 'bg-yellow-500',
      reviews: 28,
      image: '/src/assets/figma/avatar.png'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      code: 'TCH004',
      department: 'Khoa Ngoại ngữ',
      rating: 4.9,
      ratingColor: 'bg-green-500',
      reviews: 56,
      image: '/src/assets/figma/avatar.png'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      code: 'TCH005',
      department: 'Khoa Toán học',
      rating: 4.3,
      ratingColor: 'bg-blue-500',
      reviews: 19,
      image: '/src/assets/figma/avatar.png'
    },
    {
      id: 6,
      name: 'Võ Thị F',
      code: 'TCH006',
      department: 'Khoa Vật lý',
      rating: 4.7,
      ratingColor: 'bg-green-500',
      reviews: 41,
      image: '/src/assets/figma/avatar.png'
    }
  ];

  // Handlers for search filter changes
  const handleSearchChange = (value) => {
    setSearchFilters(prev => ({ ...prev, search: value }));
  };

  const handleTeacherCodeChange = (value) => {
    setSearchFilters(prev => ({ ...prev, teacherCode: value }));
  };

  const handleSubjectNameChange = (value) => {
    setSearchFilters(prev => ({ ...prev, subjectName: value }));
  };

  const handleSubjectCodeChange = (value) => {
    setSearchFilters(prev => ({ ...prev, subjectCode: value }));
  };

  const handleSortChange = (value) => {
    setSearchFilters(prev => ({ ...prev, sortBy: value }));
  };

  // Filter teachers based on search criteria
  const filteredTeachers = teachers.filter(teacher => {
    const matchSearch = searchFilters.search === '' || 
      teacher.name.toLowerCase().includes(searchFilters.search.toLowerCase());
    
    const matchTeacherCode = searchFilters.teacherCode === '' ||
      teacher.code.toLowerCase().includes(searchFilters.teacherCode.toLowerCase());
    
    // Add more filters for subject code and name if needed
    const matchSubjectName = searchFilters.subjectName === '' || true; // Placeholder for subject filtering
    const matchSubjectCode = searchFilters.subjectCode === '' || true; // Placeholder for subject filtering
    
    return matchSearch && matchTeacherCode && matchSubjectName && matchSubjectCode;
  });

  // Sort teachers based on selected sort option
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    switch (searchFilters.sortBy) {
      case 'Highest Rating':
        return b.rating - a.rating;
      case 'Lowest Rating':
        return a.rating - b.rating;
      case 'Most Reviews':
        return b.reviews - a.reviews;
      case 'Alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <Layout 
      title="Đánh giá giảng viên"
      description="Chia sẻ đánh giá và tìm hiểu về giảng viên"
    >
      <div className="space-y-8">
        {/* Header Section with gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Đánh giá giảng viên 🌟
                </h2>
                <p className="text-blue-100 text-lg">
                  Khám phá và chia sẻ trải nghiệm học tập của bạn
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{sortedTeachers.length}</div>
                <div className="text-sm text-blue-100">Giảng viên có đánh giá</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{teachers.length}</div>
                <div className="text-sm text-gray-500">Tổng giảng viên</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.6</div>
                <div className="text-sm text-gray-500">Điểm TB</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{teachers.reduce((sum, teacher) => sum + teacher.reviews, 0)}</div>
                <div className="text-sm text-gray-500">Tổng đánh giá</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-500">Khoa/Bộ môn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters với improved design */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <SearchFilters 
            onSearchChange={handleSearchChange}
            onTeacherCodeChange={handleTeacherCodeChange}
            onSubjectNameChange={handleSubjectNameChange}
            onSubjectCodeChange={handleSubjectCodeChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Teachers Grid với enhanced styling */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Danh sách giảng viên</h3>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Hiển thị {sortedTeachers.length} kết quả</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTeachers.map((teacher) => (
              <div key={teacher.id} className="transform hover:scale-105 transition-all duration-300">
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination với modern design */}
        <div className="flex items-center justify-center space-x-2 pt-8">
          <button className="px-4 py-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium">1</button>
          <button className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200">2</button>
          <button className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200">3</button>
          <span className="px-2 text-gray-400">...</span>
          <button className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200">10</button>
          
          <button className="px-4 py-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Quick Add Review Button */}
        <div className="fixed bottom-8 right-8">
          <button 
            onClick={() => navigate('/teachers/add-review')}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherReview;