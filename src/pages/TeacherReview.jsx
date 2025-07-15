import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import SearchFilters from '../components/SearchFilters';
import TeacherCard from '../components/TeacherCard';
import { motion } from 'framer-motion';
const TeacherReview = () => {
  const navigate = useNavigate();

  // Get teachers from Redux store
  const teachers = useSelector(state => state.teachers.teachers);

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'bookmarked', 'reviewed'
  const [bookmarkedTeachers, setBookmarkedTeachers] = useState(new Set([1, 3])); // Sample bookmarked teachers
  const [reviewedTeachers] = useState(new Set([2, 4])); // Sample reviewed teachers
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    teacherCode: '',
    subjectName: '',
    subjectCode: '',
    sortBy: 'Highest Rating'
  });

  // Transform teachers data to match TeacherCard component expectations
  const transformedTeachers = teachers.map(teacher => ({
    id: teacher.id,
    name: teacher.name,
    code: teacher.code,
    department: teacher.department,
    subjectCodes: teacher.subjectCodeArray || [],
    subjects: teacher.subjects || teacher.specializations || [],
    rating: teacher.rating,
    ratingColor: teacher.rating >= 4.5 ? 'bg-success' : 'bg-primary',
    reviews: teacher.totalReviews,
    image: teacher.avatar
  }));
  const handlePremiumClick = () => {
    navigate('/ai-recommendation');
  };

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

  // Bookmark handler
  const handleBookmarkToggle = (teacherId) => {
    setBookmarkedTeachers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teacherId)) {
        newSet.delete(teacherId);
      } else {
        newSet.add(teacherId);
      }
      return newSet;
    });
  };

  // Tab change handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Filter teachers based on search criteria and active tab
  const filteredTeachers = transformedTeachers.filter(teacher => {
    // Tab filtering
    if (activeTab === 'bookmarked' && !bookmarkedTeachers.has(teacher.id)) {
      return false;
    }
    if (activeTab === 'reviewed' && !reviewedTeachers.has(teacher.id)) {
      return false;
    }

    // Search filtering - Tìm kiếm tên giảng viên
    const matchSearch = searchFilters.search === '' ||
      teacher.name.toLowerCase().includes(searchFilters.search.toLowerCase());

    // Tìm kiếm mã giảng viên
    const matchTeacherCode = searchFilters.teacherCode === '' ||
      teacher.code.toLowerCase().includes(searchFilters.teacherCode.toLowerCase());

    // Tìm kiếm trong mã môn học (array subjectCodes)
    const matchSubjectCode = searchFilters.subjectCode === '' ||
      (teacher.subjectCodes && teacher.subjectCodes.length > 0 &&
        teacher.subjectCodes.some(code =>
          code.toLowerCase().includes(searchFilters.subjectCode.toLowerCase())
        ));

    // Tìm kiếm tên môn học (trong subjects array)
    const matchSubjectName = searchFilters.subjectName === '' ||
      (teacher.subjects && teacher.subjects.length > 0 &&
        teacher.subjects.some(subject =>
          subject.toLowerCase().includes(searchFilters.subjectName.toLowerCase())
        ));

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
        {/* AI Recommendation Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{
            scale: 1.02,
            y: -5
          }}
          className="
    rounded-2xl p-8 text-white
    bg-gradient-to-r
    from-[var(--color-accent)]
    to-[var(--color-primary)]
    shadow-lg
    hover:shadow-2xl
    relative overflow-hidden
  "
        >
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
          />

          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"
          />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8
              }}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
            />
          ))}

          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-3xl font-semibold mb-2 text-white"
              >
                Nhận gợi ý giảng viên từ
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 10px #fbbf24',
                      '0 0 20px #fbbf24',
                      '0 0 10px #fbbf24'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="text-yellow-400 ml-1"
                >
                  AI
                </motion.span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-white/90"
              >
                Tìm kiếm giảng viên phù hợp nhất với tính cách và nhu cầu học tập của bạn
              </motion.p>
            </div>

            <div className="ml-8">
              <motion.button
                onClick={handlePremiumClick}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 border border-white/30 hover:border-white/50 relative overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: [-100, 200]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"
                />

                <motion.svg
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </motion.svg>

                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 5px rgba(255, 255, 255, 0.5)',
                      '0 0 10px rgba(251, 191, 36, 0.8)',
                      '0 0 5px rgba(255, 255, 255, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  Thử ngay
                </motion.span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ">
                  PRO
                </span>
              </motion.button>
            </div>
          </div>

          {/* Pulsing Border Effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
          />
        </motion.div>



        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SearchFilters
            onSearchChange={handleSearchChange}
            onTeacherCodeChange={handleTeacherCodeChange}
            onSubjectNameChange={handleSubjectNameChange}
            onSubjectCodeChange={handleSubjectCodeChange}
            onSortChange={handleSortChange}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            bookmarkedCount={bookmarkedTeachers.size}
            reviewedCount={reviewedTeachers.size}
            totalCount={transformedTeachers.length}
          />
        </div>

        {/* Teachers Grid */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTeachers.map((teacher) => (
              <div key={teacher.id} className="transform hover:scale-105 transition-all duration-200">
                <TeacherCard
                  teacher={teacher}
                  isBookmarked={bookmarkedTeachers.has(teacher.id)}
                  onBookmarkToggle={handleBookmarkToggle}
                  hasReviewed={reviewedTeachers.has(teacher.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {sortedTeachers.length > 0 && (
          <div className="flex items-center justify-center space-x-2 pt-8">
            <button className="px-4 py-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button className="px-4 py-2 rounded-xl bg-primary text-white font-medium">1</button>
            <button className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200">2</button>
            <button className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200">10</button>

            <button className="px-4 py-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Empty State for filtered results */}
        {sortedTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'bookmarked' ? 'Chưa có giảng viên nào được đánh dấu' :
                activeTab === 'reviewed' ? 'Chưa đánh giá giảng viên nào' : 'Không tìm thấy giảng viên'}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'bookmarked' ? 'Hãy đánh dấu các giảng viên yêu thích để xem lại sau.' :
                activeTab === 'reviewed' ? 'Hãy chia sẻ đánh giá về giảng viên bạn đã học.' : 'Thử điều chỉnh bộ lọc tìm kiếm.'}
            </p>

            {/* Show add teacher button only when no search results and not in bookmarked/reviewed tabs */}
            {activeTab === 'all' && (searchFilters.search || searchFilters.teacherCode || searchFilters.subjectName || searchFilters.subjectCode) && (
              <div className="mt-6">
                <p className="text-gray-600 mb-4">
                  Không tìm thấy review về giảng viên bạn muốn?
                </p>
                <button
                  onClick={() => navigate('/teachers/add-teacher')}
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Thêm giảng viên tại đây
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Add Review Button - Simplified version */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="relative"
          >
            {/* Pulsing background */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-yellow-400 rounded-full blur-md"
            />

            <motion.button
              onClick={() => navigate('/teachers/add-review')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-6 py-4 rounded-full shadow-xl transition-all duration-300 flex items-center gap-3 border-2 border-yellow-300"
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl"
              >

              </motion.span>


              <div className="text-left">
                <div className="text-sm font-bold">+100 Coin</div>
                <div className="text-xs opacity-90">Viết đánh giá</div>
              </div>

              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherReview;