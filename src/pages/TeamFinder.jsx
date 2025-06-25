import React, { useState } from 'react';
import Layout from '../components/Layout';

const TeamFinder = () => {
  const [activeTab, setActiveTab] = useState('looking-for-members');
  const [filters, setFilters] = useState({
    major: '',
    class: '',
    subject: '',
    specialization: ''
  });

  // Mock data for teams looking for members
  const teamsLookingForMembers = [
    {
      id: 1,
      name: 'SE1326 Dự án nhóm',
      status: 'Mở',
      match: '82% match • Software Engineering',
      description: 'Tìm thành viên có kinh nghiệm backend development'
    },
    {
      id: 2,
      name: 'Nhóm nghiên cứu AI',
      status: 'Đã đóng',
      match: '76% match • Artificial Intelligence',
      description: 'Nghiên cứu machine learning và deep learning'
    },
    {
      id: 3,
      name: 'Nhóm dev',
      status: 'Mở',
      match: '79% match • Web Development',
      description: 'Phát triển ứng dụng web fullstack'
    }
  ];

  // Mock data for students looking for teams
  const studentsLookingForTeams = [
    {
      id: 1,
      name: 'Jamie Lee',
      description: 'Backend • Night Owl • Available evenings',
      avatar: '/src/assets/figma/avatar1.svg'
    },
    {
      id: 2,
      name: 'Priya Patel',
      description: 'Punctual • Presentation • Weekends',
      avatar: '/src/assets/figma/avatar2.svg'
    },
    {
      id: 3,
      name: 'Carlos Mendez',
      description: 'Frontend • Early Bird • Mornings',
      avatar: '/src/assets/figma/avatar.png'
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      major: '',
      class: '',
      subject: '',
      specialization: ''
    });
  };

  return (
    <Layout 
      currentPage="team-finder"
      title="Tìm nhóm"
      description="Kết hợp với học sinh dựa trên kỹ năng, sở thích và sở thích trong lớp."
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('looking-for-members')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'looking-for-members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tìm kiếm thành viên
            </button>
            <button
              onClick={() => setActiveTab('looking-for-team')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'looking-for-team'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tìm kiếm nhóm
            </button>
            <button
              onClick={() => setActiveTab('my-profile')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'my-profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Thông tin tìm nhóm của tôi
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'looking-for-members' && (
          <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lọc</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngành
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineering"
                    value={filters.major}
                    onChange={(e) => handleFilterChange('major', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lớp
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SE1326"
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Môn
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. backend developer"
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>

            {/* Teams Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Hoạt động nhóm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamsLookingForMembers.map((team) => (
                  <div key={team.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        team.status === 'Mở' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {team.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {team.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      {team.match}
                    </p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                        Xem chi tiết
                      </button>
                      <button className="flex-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">
                        Liên hệ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Team Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Đăng nhóm của bạn</h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    Tạo nhóm
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Đăng thông tin nhóm
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Chia sẻ mục tiêu của nhóm bạn, các kỹ năng cần thiết và chiêu mộ thành viên mới.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                  Đăng
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'looking-for-team' && (
          <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lọc</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngành / Lớp
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SE1326"
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chuyên ngành
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. frontend, backend, designer"
                    value={filters.specialization}
                    onChange={(e) => handleFilterChange('specialization', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Students Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Sinh viên đang tìm kiếm nhóm</h3>
              <div className="space-y-4">
                {studentsLookingForTeams.map((student) => (
                  <div key={student.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{display: 'none'}}>
                          {student.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.description}</p>
                      </div>
                    </div>
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">
                      Liên hệ
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Profile Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Đăng nhóm của bạn</h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    Tạo thông tin cá nhân
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Đăng thông tin cá nhân
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Kêu gọi các nhóm tuyển dụng mình.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                  Đăng
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin tìm nhóm của tôi</h3>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Chưa có thông tin</h4>
                <p className="text-gray-500 mb-4">Bạn chưa tạo thông tin tìm nhóm. Hãy tạo ngay để các nhóm có thể tìm thấy bạn!</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
                  Tạo thông tin tìm nhóm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeamFinder; 