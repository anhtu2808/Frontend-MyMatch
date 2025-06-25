import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';

const exchangeRequests = [
  {
    id: 1,
    fromClass: 'SE1305',
    toClass: 'SE1326',
    fromLecturer: 'Dr. Smith',
    toLecturer: 'Dr. Taylor',
    fromTime: 'Mon 8AM',
    toTime: 'Tue 10AM',
    tags: ['Morning Slot', 'Theory Focused'],
    createdBy: 'Abc@fpt.edu.vn',
    status: 'active',
    priority: 'high'
  },
  {
    id: 2,
    fromClass: 'MA1102',
    toClass: 'MA1104',
    fromLecturer: 'Dr. Lee',
    toLecturer: 'Dr. Chen',
    fromTime: 'Wed 10AM',
    toTime: 'Fri 2PM',
    tags: ['Afternoon', 'Calculus'],
    createdBy: 'Abc@fpt.edu.vn',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    fromClass: 'CS2201',
    toClass: 'CS2203',
    fromLecturer: 'Dr. Patel',
    toLecturer: 'Dr. Brown',
    fromTime: 'Thu 1PM',
    toTime: 'Mon 9AM',
    tags: ['Early Slot', 'Project-Based'],
    createdBy: 'Abc@fpt.edu.vn',
    status: 'completed',
    priority: 'low'
  }
];

// Requests sent to me (other students want to swap with my classes)
const requestsToMe = [
  {
    id: 101,
    requesterName: 'Nguyễn Văn A',
    requesterEmail: 'NguyenVanA@fpt.edu.vn',
    requesterAvatar: '👨‍💼',
    myClass: 'SE1326',
    myLecturer: 'Dr. Taylor', 
    myTime: 'Tue 10AM',
    theirClass: 'SE1305',
    theirLecturer: 'Dr. Smith',
    theirTime: 'Mon 8AM',
    reason: 'Tôi muốn đổi sang buổi sáng để có thể tham gia thực tập buổi chiều',
    requestDate: '2 giờ trước',
    status: 'pending',
    tags: ['Morning Preferred', 'Internship Conflict']
  },
  {
    id: 102,
    requesterName: 'Trần Thị B',
    requesterEmail: 'TranThiB@fpt.edu.vn',
    requesterAvatar: '👩‍💻',
    myClass: 'MA1104',
    myLecturer: 'Dr. Chen',
    myTime: 'Fri 2PM',
    theirClass: 'MA1102',
    theirLecturer: 'Dr. Lee',
    theirTime: 'Wed 10AM',
    reason: 'Tôi có môn học khác vào thứ 6, muốn đổi sang thứ 4 để tránh xung đột lịch học',
    requestDate: '1 ngày trước',
    status: 'pending',
    tags: ['Schedule Conflict', 'Wednesday Slot']
  },
  {
    id: 103,
    requesterName: 'Lê Văn C',
    requesterEmail: 'LeVanC@fpt.edu.vn',
    requesterAvatar: '👨‍🎓',
    myClass: 'CS2203',
    myLecturer: 'Dr. Brown',
    myTime: 'Mon 9AM',
    theirClass: 'CS2201',
    theirLecturer: 'Dr. Patel',
    theirTime: 'Thu 1PM',
    reason: 'Tôi ở xa nên muốn có lịch học tập trung vào thứ 2 để tiết kiệm thời gian di chuyển',
    requestDate: '3 ngày trước',
    status: 'accepted',
    tags: ['Distance Learning', 'Monday Preferred']
  }
];

// Marketplace - Public requests from all students
const marketplaceRequests = [
  {
    id: 201,
    studentName: 'Phạm Minh D',
    studentEmail: 'PhamMinhD@fpt.edu.vn',
    studentAvatar: '👨‍💻',
    currentClass: 'SE1305',
    currentLecturer: 'Dr. Smith',
    currentTime: 'Mon 8AM',
    wantedClass: 'SE1326',
    wantedLecturer: 'Dr. Taylor',
    wantedTime: 'Tue 10AM',
    reason: 'Muốn đổi sang buổi chiều để có thời gian làm part-time',
    postedDate: '30 phút trước',
    tags: ['Afternoon Preferred', 'Part-time Job'],
    priority: 'high',
    contactPreference: 'Email hoặc Facebook Messenger'
  },
  {
    id: 202,
    studentName: 'Vũ Thị E',
    studentEmail: 'VuThiE@fpt.edu.vn',
    studentAvatar: '👩‍🎓',
    currentClass: 'MA1104',
    currentLecturer: 'Dr. Chen',
    currentTime: 'Fri 2PM',
    wantedClass: 'MA1102',
    wantedLecturer: 'Dr. Lee',
    wantedTime: 'Wed 10AM',
    reason: 'Lịch học bị trùng với môn khác, cần đổi sang thứ 4',
    postedDate: '2 giờ trước',
    tags: ['Schedule Conflict', 'Wednesday Preferred'],
    priority: 'medium',
    contactPreference: 'Zalo: 0123456789'
  },
  {
    id: 203,
    studentName: 'Hoàng Văn F',
    studentEmail: 'HoangVanF@fpt.edu.vn',
    studentAvatar: '👨‍🎓',
    currentClass: 'CS2203',
    currentLecturer: 'Dr. Brown',
    currentTime: 'Mon 9AM',
    wantedClass: 'CS2201',
    wantedLecturer: 'Dr. Patel',
    wantedTime: 'Thu 1PM',
    reason: 'Thích học vào buổi chiều hơn, tập trung tốt hơn',
    postedDate: '1 ngày trước',
    tags: ['Afternoon Learning', 'Better Focus'],
    priority: 'low',
    contactPreference: 'Facebook: Hoàng Văn F'
  },
  {
    id: 204,
    studentName: 'Ngô Thị G',
    studentEmail: 'NgoThiG@fpt.edu.vn',
    studentAvatar: '👩‍💼',
    currentClass: 'BU1234',
    currentLecturer: 'Dr. Wilson',
    currentTime: 'Tue 3PM',
    wantedClass: 'BU1235',
    wantedLecturer: 'Dr. Johnson',
    wantedTime: 'Mon 10AM',
    reason: 'Muốn có lịch học tập trung vào đầu tuần',
    postedDate: '2 ngày trước',
    tags: ['Monday Focus', 'Week Planning'],
    priority: 'medium',
    contactPreference: 'Email chính'
  },
  {
    id: 205,
    studentName: 'Đặng Văn H',
    studentEmail: 'DangVanH@fpt.edu.vn',
    studentAvatar: '👨‍🔬',
    currentClass: 'PH1101',
    currentLecturer: 'Dr. Clark',
    currentTime: 'Wed 11AM',
    wantedClass: 'PH1102',
    wantedLecturer: 'Dr. Davis',
    wantedTime: 'Fri 9AM',
    reason: 'Lab session vào thứ 6 thuận tiện cho việc thực hành',
    postedDate: '3 ngày trước',
    tags: ['Lab Session', 'Friday Convenience'],
    priority: 'high',
    contactPreference: 'Điện thoại: 0987654321'
  }
];

const ClassExchange = () => {
  const [activeTab, setActiveTab] = useState('my-requests');
  const [filters, setFilters] = useState({
    subject: '',
    className: '',
    lecturer: '',
    timeSlot: '',
    dayOfWeek: '',
    sortBy: 'Most Recent'
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      subject: '',
      className: '',
      lecturer: '',
      timeSlot: '',
      dayOfWeek: '',
      sortBy: 'Most Recent'
    });
  };

  const filteredAndSortedRequests = useMemo(() => {
    const dayMapping = {
      monday: 'mon',
      tuesday: 'tue',
      wednesday: 'wed',
      thursday: 'thu',
      friday: 'fri',
      saturday: 'sat',
      sunday: 'sun',
    };

    let filtered = exchangeRequests.filter(request => {
      const subjectMatch = filters.subject === '' ||
        request.fromClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
        request.toClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
        request.tags.some(tag => tag.toLowerCase().includes(filters.subject.toLowerCase()));

      const classMatch = filters.className === '' ||
        request.fromClass.toLowerCase().includes(filters.className.toLowerCase()) ||
        request.toClass.toLowerCase().includes(filters.className.toLowerCase());

      const lecturerMatch = filters.lecturer === '' ||
        request.fromLecturer.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
        request.toLecturer.toLowerCase().includes(filters.lecturer.toLowerCase());

      const timeSlotMatch = filters.timeSlot === '' ||
        request.fromTime.toLowerCase().includes(filters.timeSlot.toLowerCase()) ||
        request.toTime.toLowerCase().includes(filters.timeSlot.toLowerCase());

      const dayOfWeekMatch = filters.dayOfWeek === '' ||
        (dayMapping[filters.dayOfWeek] && (request.fromTime.toLowerCase().startsWith(dayMapping[filters.dayOfWeek]) ||
        request.toTime.toLowerCase().startsWith(dayMapping[filters.dayOfWeek])));

      return subjectMatch && classMatch && lecturerMatch && timeSlotMatch && dayOfWeekMatch;
    });

    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'Oldest':
          return a.id - b.id;
        case 'Subject':
          return a.fromClass.localeCompare(b.fromClass);
        case 'Lecturer':
          return a.fromLecturer.localeCompare(b.fromLecturer);
        case 'Most Recent':
        default:
          return b.id - a.id;
      }
    });
  }, [filters]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-green-500 to-green-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Đang hoạt động</span>;
      case 'pending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang chờ</span>;
      case 'completed':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Hoàn thành</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Không xác định</span>;
    }
  };

  const handleAcceptRequest = (requestId) => {
    // Handle accept request logic
    console.log('Accepting request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    // Handle decline request logic
    console.log('Declining request:', requestId);
  };

  const handleSendSwapRequest = (studentId, studentName) => {
    console.log(`Sending swap request to ${studentName} (ID: ${studentId})`);
    // Here you would typically open a modal or navigate to a form
    alert(`Gửi yêu cầu đổi lớp tới ${studentName}`);
  };

  const handleContactStudent = (contactInfo) => {
    console.log('Contact info:', contactInfo);
    alert(`Thông tin liên lạc: ${contactInfo}`);
  };

  const getRequestStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang chờ phản hồi</span>;
      case 'accepted':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Đã chấp nhận</span>;
      case 'declined':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Đã từ chối</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Không xác định</span>;
    }
  };

  return (
    <Layout 
      title="Đổi chéo lớp"
      description="Quản lý yêu cầu chuyển lớp một cách dễ dàng"
    >
      <div className="space-y-8">
        {/* Header Section with gradient */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Yêu cầu chuyển lớp</h2>
                <p className="text-blue-100">Quản lý và theo dõi các yêu cầu đổi chéo lớp của bạn</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{filteredAndSortedRequests.length}</div>
                <div className="text-sm text-blue-100">Yêu cầu hiện tại</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs với improved design */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('my-requests')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'my-requests'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Yêu Cầu Chuyển Của tôi</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('requests-to-me')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'requests-to-me'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span>Yêu cầu gửi tới tôi</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'marketplace'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Chợ chuyển lớp</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Advanced Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Bộ lọc nâng cao</span>
            </h3>
            <button onClick={handleResetFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Đặt lại bộ lọc</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {/* Subject Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Môn học
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Software Eng."
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                />
                <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            {/* Class Name Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tên lớp
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. SE1305"
                  value={filters.className}
                  onChange={(e) => handleFilterChange('className', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                />
                <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            {/* Lecturer Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Giảng viên
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Dr. Smith"
                  value={filters.lecturer}
                  onChange={(e) => handleFilterChange('lecturer', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                />
                <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Time Slot Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Khung giờ học
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Mon 8AM"
                  value={filters.timeSlot}
                  onChange={(e) => handleFilterChange('timeSlot', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                />
                <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Day of Week Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Thứ trong tuần
              </label>
              <div className="relative">
                <select
                  value={filters.dayOfWeek}
                  onChange={(e) => handleFilterChange('dayOfWeek', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200 appearance-none"
                >
                  <option value="">Chọn ngày</option>
                  <option value="monday">Thứ 2</option>
                  <option value="tuesday">Thứ 3</option>
                  <option value="wednesday">Thứ 4</option>
                  <option value="thursday">Thứ 5</option>
                  <option value="friday">Thứ 6</option>
                  <option value="saturday">Thứ 7</option>
                  <option value="sunday">Chủ nhật</option>
                </select>
                <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="text-base font-semibold text-gray-900">Sắp xếp theo:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-6 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Most Recent">Mới nhất</option>
                <option value="Oldest">Cũ nhất</option>
                <option value="Subject">Môn học</option>
                <option value="Lecturer">Giảng viên</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>

        {/* Exchange Requests List với enhanced design */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {activeTab === 'my-requests' && 'Yêu cầu của tôi'}
              {activeTab === 'requests-to-me' && 'Yêu cầu gửi tới tôi'}
              {activeTab === 'marketplace' && 'Chợ chuyển lớp'}
            </h3>
            <div className="text-sm text-gray-500">
              {activeTab === 'my-requests' && `Hiển thị ${filteredAndSortedRequests.length} yêu cầu`}
              {activeTab === 'requests-to-me' && `Hiển thị ${requestsToMe.length} yêu cầu`}
              {activeTab === 'marketplace' && `Hiển thị ${marketplaceRequests.length} yêu cầu`}
            </div>
          </div>
          
          {/* My Requests Tab */}
          {activeTab === 'my-requests' && filteredAndSortedRequests.map((request) => (
            <div key={request.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Priority Icon */}
                    <div className={`w-12 h-12 bg-gradient-to-br ${getPriorityColor(request.priority)} rounded-xl flex items-center justify-center shadow-lg`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    
                    {/* Status Badge */}
                    {getStatusBadge(request.status)}
                  </div>

                  {/* Class Exchange Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{request.fromClass}</div>
                        <div className="text-sm text-gray-600">{request.fromLecturer}</div>
                        <div className="text-sm text-blue-600 font-medium">{request.fromTime}</div>
                      </div>
                      
                      <div className="mx-8 flex items-center">
                        <div className="w-8 h-0.5 bg-gray-300"></div>
                        <div className="mx-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="w-8 h-0.5 bg-gray-300"></div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{request.toClass}</div>
                        <div className="text-sm text-gray-600">{request.toLecturer}</div>
                        <div className="text-sm text-green-600 font-medium">{request.toTime}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {request.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Tạo bởi: {request.createdBy}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 ml-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Xóa yêu cầu</span>
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Chỉnh sửa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Requests To Me Tab */}
          {activeTab === 'requests-to-me' && requestsToMe.map((request) => (
            <div key={request.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Requester Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                    {request.requesterAvatar}
                  </div>
                </div>

                {/* Request Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{request.requesterName}</h4>
                      <p className="text-sm text-gray-600">{request.requesterEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">{request.requestDate}</p>
                    </div>
                    {getRequestStatusBadge(request.status)}
                  </div>

                  {/* Class Exchange Visualization */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-8">
                      {/* Their Class */}
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Họ muốn đổi</div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-lg font-bold text-gray-900">{request.theirClass}</div>
                          <div className="text-sm text-gray-600">{request.theirLecturer}</div>
                          <div className="text-sm text-orange-600 font-medium">{request.theirTime}</div>
                        </div>
                      </div>

                      {/* Exchange Arrow */}
                      <div className="flex items-center">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                        <div className="mx-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                      </div>

                      {/* My Class */}
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Lớp của bạn</div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-200">
                          <div className="text-lg font-bold text-gray-900">{request.myClass}</div>
                          <div className="text-sm text-gray-600">{request.myLecturer}</div>
                          <div className="text-sm text-green-600 font-medium">{request.myTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Lý do muốn đổi:</h5>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-700 italic">"{request.reason}"</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {request.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {request.status === 'pending' && (
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Chấp nhận đổi</span>
                      </button>
                      <button 
                        onClick={() => handleDeclineRequest(request.id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Từ chối</span>
                      </button>
                    </div>
                  )}

                  {request.status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 text-green-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Bạn đã chấp nhận yêu cầu đổi lớp này</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Marketplace Tab */}
          {activeTab === 'marketplace' && marketplaceRequests.map((request) => (
            <div key={request.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Student Avatar & Info */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    {request.studentAvatar}
                  </div>
                  <div className="text-center mt-3">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'high' ? 'bg-red-100 text-red-700' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {request.priority === 'high' ? '🔥 Gấp' : 
                       request.priority === 'medium' ? '⚡ Trung bình' : '😌 Bình thường'}
                    </div>
                  </div>
                </div>

                {/* Request Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{request.studentName}</h4>
                      <p className="text-sm text-gray-600">{request.studentEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">Đăng {request.postedDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <div className="text-xs text-blue-600 font-medium">Liên lạc</div>
                        <div className="text-sm text-blue-800 font-semibold">{request.contactPreference}</div>
                      </div>
                    </div>
                  </div>

                  {/* Class Exchange Visualization */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-6 border border-orange-100">
                    <div className="flex items-center justify-center space-x-8">
                      {/* Their Current Class */}
                      <div className="text-center">
                        <div className="text-sm text-orange-600 font-semibold mb-2">💼 Họ có</div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-orange-200">
                          <div className="text-lg font-bold text-gray-900">{request.currentClass}</div>
                          <div className="text-sm text-gray-600">{request.currentLecturer}</div>
                          <div className="text-sm text-orange-600 font-medium">{request.currentTime}</div>
                        </div>
                      </div>

                      {/* Want Arrow */}
                      <div className="flex items-center">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-400"></div>
                        <div className="mx-3 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-400"></div>
                      </div>

                      {/* Wanted Class */}
                      <div className="text-center">
                        <div className="text-sm text-red-600 font-semibold mb-2">❤️ Họ muốn</div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-red-200">
                          <div className="text-lg font-bold text-gray-900">{request.wantedClass}</div>
                          <div className="text-sm text-gray-600">{request.wantedLecturer}</div>
                          <div className="text-sm text-red-600 font-medium">{request.wantedTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Lý do muốn đổi:
                    </h5>
                    <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                      <p className="text-gray-700 italic">"{request.reason}"</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {request.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => handleSendSwapRequest(request.id, request.studentName)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span>Gửi yêu cầu đổi</span>
                    </button>
                    <button 
                      onClick={() => handleContactStudent(request.contactPreference)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Liên hệ trực tiếp</span>
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-2 text-blue-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">
                        💡 Tip: Kiểm tra lịch học của bạn trước khi gửi yêu cầu đổi lớp
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State for Requests to Me */}
          {activeTab === 'requests-to-me' && requestsToMe.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Chưa có yêu cầu nào</h3>
              <p className="text-gray-500">Khi có sinh viên muốn đổi lớp với bạn, yêu cầu sẽ hiển thị ở đây</p>
            </div>
          )}

          {/* Empty State for Marketplace */}
          {activeTab === 'marketplace' && marketplaceRequests.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Chợ chuyển lớp trống</h3>
              <p className="text-gray-500">Hiện tại chưa có yêu cầu đổi lớp nào được đăng công khai</p>
            </div>
          )}
        </div>

        {/* Add New Request Button với improved design */}
        <div className="flex justify-center pt-8">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center space-x-3">
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Thêm Yêu cầu chuyển Lớp</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ClassExchange;