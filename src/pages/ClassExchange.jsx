import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { EditOutlined, PhoneOutlined, MessageOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const exchangeRequests = [
  {
    id: 1,
    subjectCode: 'SWE201',
    subjectName: 'Software Engineering',
    fromClass: 'SWE201-01',
    toClass: 'SWE201-02',
    fromLecturer: 'Nguyễn Văn An',
    fromLecturerCode: 'AnNV23',
    toLecturer: 'Lê Văn Cường',
    toLecturerCode: 'CuongLV22',
    fromDay: 'Thứ 2',
    fromSlot: 1,
    fromTime: 'Thứ 2 8:00',
    toDay: 'Thứ 3',
    toSlot: 2,
    toTime: 'Thứ 3 10:00',
    tags: ['Buổi sáng', 'Lý thuyết'],
    createdBy: 'alex.johnson@fpt.edu.vn',
    status: 'active',
    priority: 'high'
  },
  {
    id: 2,
    subjectCode: 'MLN122',
    subjectName: 'Kinh tế chính trị',
    fromClass: 'POL301-01',
    toClass: 'POL301-02',
    fromLecturer: 'Trần Thị Bình',
    fromLecturerCode: 'BinhTT24',
    toLecturer: 'Phạm Thị Dung',
    toLecturerCode: 'DungPT23',
    fromDay: 'Thứ 4',
    fromSlot: 2,
    fromTime: 'Thứ 4 10:00',
    toDay: 'Thứ 6',
    toSlot: 3,
    toTime: 'Thứ 6 14:00',
    tags: ['Buổi chiều', 'Kinh tế'],
    createdBy: 'alex.johnson@fpt.edu.vn',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    subjectCode: 'IOT201',
    subjectName: 'Internet of Things',
    fromClass: 'IOT201-01',
    toClass: 'IOT201-02',
    fromLecturer: 'Phạm Thị Dung',
    fromLecturerCode: 'DungPT23',
    toLecturer: 'Phạm Thị Dung',
    toLecturerCode: 'DungPT23',
    fromDay: 'Thứ 5',
    fromSlot: 3,
    fromTime: 'Thứ 5 13:00',
    toDay: 'Thứ 2',
    toSlot: 1,
    toTime: 'Thứ 2 9:00',
    tags: ['Buổi sáng', 'Thực hành'],
    createdBy: 'alex.johnson@fpt.edu.vn',
    status: 'accepted',
    priority: 'low'
  },
  {
    id: 4,
    subjectCode: 'SEC302',
    subjectName: 'Network Security',
    fromClass: 'SEC302-01',
    toClass: 'SEC302-02',
    fromLecturer: 'Lê Văn Cường',
    fromLecturerCode: 'CuongLV22',
    toLecturer: 'Nguyễn Văn An',
    toLecturerCode: 'AnNV23',
    fromDay: 'Thứ 3',
    fromSlot: 4,
    fromTime: 'Thứ 3 15:00',
    toDay: 'Thứ 6',
    toSlot: 2,
    toTime: 'Thứ 6 10:00',
    tags: ['An toàn thông tin', 'Buổi sáng'],
    createdBy: 'alex.johnson@fpt.edu.vn',
    status: 'accepted',
    priority: 'high'
  }
];

// Requests sent to me (other students want to swap with my classes)
const requestsToMe = [
  {
    id: 101,
    subjectCode: 'SWE201',
    subjectName: 'Software Engineering',
    requesterName: 'Nguyễn Văn A',
    requesterEmail: 'NguyenVanA@fpt.edu.vn',
    requesterAvatar: '👨‍💼',
    myClass: 'SWE201-02',
    myLecturer: 'Lê Văn Cường',
    myLecturerCode: 'CuongLV22',
    myDay: 'Thứ 3',
    mySlot: 2,
    myTime: 'Thứ 3 10:00',
    theirClass: 'SWE201-01',
    theirLecturer: 'Nguyễn Văn An',
    theirLecturerCode: 'AnNV23',
    theirDay: 'Thứ 2',
    theirSlot: 1,
    theirTime: 'Thứ 2 8:00',
    reason: 'Tôi muốn đổi sang buổi sáng để có thể tham gia thực tập buổi chiều',
    requestDate: '2 giờ trước',
    status: 'pending',
    tags: ['Buổi sáng ưu tiên', 'Xung đột thực tập']
  },
  {
    id: 102,
    subjectCode: 'POL301',
    subjectName: 'Kinh tế chính trị',
    requesterName: 'Trần Thị B',
    requesterEmail: 'TranThiB@fpt.edu.vn',
    requesterAvatar: '👩‍💻',
    myClass: 'POL301-02',
    myLecturer: 'Phạm Thị Dung',
    myLecturerCode: 'DungPT23',
    myDay: 'Thứ 6',
    mySlot: 3,
    myTime: 'Thứ 6 14:00',
    theirClass: 'POL301-01',
    theirLecturer: 'Trần Thị Bình',
    theirLecturerCode: 'BinhTT24',
    theirDay: 'Thứ 4',
    theirSlot: 2,
    theirTime: 'Thứ 4 10:00',
    reason: 'Tôi có môn học khác vào thứ 6, muốn đổi sang thứ 4 để tránh xung đột lịch học',
    requestDate: '1 ngày trước',
    status: 'pending',
    tags: ['Xung đột lịch học', 'Thứ 4 ưu tiên']
  },
  {
    id: 103,
    subjectCode: 'MOB401',
    subjectName: 'Cross-platform Development',
    requesterName: 'Lê Văn C',
    requesterEmail: 'LeVanC@fpt.edu.vn',
    requesterAvatar: '👨‍🎓',
    myClass: 'MOB401-01',
    myLecturer: 'Hoàng Văn Em',
    myLecturerCode: 'EmHV24',
    myDay: 'Thứ 2',
    mySlot: 1,
    myTime: 'Thứ 2 9:00',
    theirClass: 'MOB401-02',
    theirLecturer: 'Hoàng Văn Em',
    theirLecturerCode: 'EmHV24',
    theirDay: 'Thứ 5',
    theirSlot: 3,
    theirTime: 'Thứ 5 13:00',
    reason: 'Tôi ở xa nên muốn có lịch học tập trung vào thứ 2 để tiết kiệm thời gian di chuyển',
    requestDate: '3 ngày trước',
    status: 'accepted',
    tags: ['Học từ xa', 'Thứ 2 ưu tiên']
  }
];

// Marketplace - Public requests from all students
const marketplaceRequests = [
  {
    id: 201,
    subjectCode: 'SWE201',
    subjectName: 'Software Engineering',
    studentName: 'Phạm Minh D',
    studentEmail: 'PhamMinhD@fpt.edu.vn',
    studentAvatar: '👨‍💻',
    currentClass: 'SWE201-01',
    currentLecturer: 'Nguyễn Văn An',
    currentLecturerCode: 'AnNV23',
    currentDay: 'Thứ 2',
    currentSlot: 1,
    currentTime: 'Thứ 2 8:00',
    wantedClass: 'SWE201-02',
    wantedLecturer: 'Lê Văn Cường',
    wantedLecturerCode: 'CuongLV22',
    wantedDay: 'Thứ 3',
    wantedSlot: 2,
    wantedTime: 'Thứ 3 10:00',
    reason: 'Muốn đổi sang buổi chiều để có thời gian làm part-time',
    postedDate: '30 phút trước',
    tags: ['Buổi chiều ưu tiên', 'Làm thêm'],
    priority: 'high',
    contactPreference: 'Email hoặc Facebook Messenger'
  },
  {
    id: 202,
    subjectCode: 'POL301',
    subjectName: 'Kinh tế chính trị',
    studentName: 'Vũ Thị E',
    studentEmail: 'VuThiE@fpt.edu.vn',
    studentAvatar: '👩‍🎓',
    currentClass: 'POL301-02',
    currentLecturer: 'Phạm Thị Dung',
    currentLecturerCode: 'DungPT23',
    currentDay: 'Thứ 6',
    currentSlot: 3,
    currentTime: 'Thứ 6 14:00',
    wantedClass: 'POL301-01',
    wantedLecturer: 'Trần Thị Bình',
    wantedLecturerCode: 'BinhTT24',
    wantedDay: 'Thứ 4',
    wantedSlot: 2,
    wantedTime: 'Thứ 4 10:00',
    reason: 'Lịch học bị trùng với môn khác, cần đổi sang thứ 4',
    postedDate: '2 giờ trước',
    tags: ['Xung đột lịch học', 'Thứ 4 ưu tiên'],
    priority: 'medium',
    contactPreference: 'Zalo: 0123456789'
  },
  {
    id: 203,
    subjectCode: 'IOT201',
    subjectName: 'Internet of Things',
    studentName: 'Hoàng Văn F',
    studentEmail: 'HoangVanF@fpt.edu.vn',
    studentAvatar: '👨‍🎓',
    currentClass: 'IOT201-01',
    currentLecturer: 'Phạm Thị Dung',
    currentLecturerCode: 'DungPT23',
    currentDay: 'Thứ 2',
    currentSlot: 1,
    currentTime: 'Thứ 2 9:00',
    wantedClass: 'IOT201-02',
    wantedLecturer: 'Phạm Thị Dung',
    wantedLecturerCode: 'DungPT23',
    wantedDay: 'Thứ 5',
    wantedSlot: 3,
    wantedTime: 'Thứ 5 13:00',
    reason: 'Thích học vào buổi chiều hơn, tập trung tốt hơn',
    postedDate: '1 ngày trước',
    tags: ['Học buổi chiều', 'Tập trung tốt hơn'],
    priority: 'low',
    contactPreference: 'Facebook: Hoàng Văn F'
  },
  {
    id: 204,
    subjectCode: 'SEC302',
    subjectName: 'Network Security',
    studentName: 'Ngô Thị G',
    studentEmail: 'NgoThiG@fpt.edu.vn',
    studentAvatar: '👩‍💼',
    currentClass: 'SEC302-01',
    currentLecturer: 'Lê Văn Cường',
    currentLecturerCode: 'CuongLV22',
    currentDay: 'Thứ 3',
    currentSlot: 4,
    currentTime: 'Thứ 3 15:00',
    wantedClass: 'SEC302-02',
    wantedLecturer: 'Nguyễn Văn An',
    wantedLecturerCode: 'AnNV23',
    wantedDay: 'Thứ 2',
    wantedSlot: 2,
    wantedTime: 'Thứ 2 10:00',
    reason: 'Muốn có lịch học tập trung vào đầu tuần',
    postedDate: '2 ngày trước',
    tags: ['Tập trung thứ 2', 'Kế hoạch tuần'],
    priority: 'medium',
    contactPreference: 'Email chính'
  },
  {
    id: 205,
    subjectCode: 'IOT201',
    subjectName: 'Internet of Things',
    studentName: 'Đặng Văn H',
    studentEmail: 'DangVanH@fpt.edu.vn',
    studentAvatar: '👨‍🔬',
    currentClass: 'IOT201-02',
    currentLecturer: 'Phạm Thị Dung',
    currentLecturerCode: 'DungPT23',
    currentDay: 'Thứ 4',
    currentSlot: 2,
    currentTime: 'Thứ 4 11:00',
    wantedClass: 'IOT201-01',
    wantedLecturer: 'Phạm Thị Dung',
    wantedLecturerCode: 'DungPT23',
    wantedDay: 'Thứ 6',
    wantedSlot: 1,
    wantedTime: 'Thứ 6 9:00',
    reason: 'Lab session vào thứ 6 thuận tiện cho việc thực hành',
    postedDate: '3 ngày trước',
    tags: ['Lab session', 'Thứ 6 thuận tiện'],
    priority: 'high',
    contactPreference: 'Điện thoại: 0987654321'
  }
];

const ClassExchange = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('my-requests');
  const [filters, setFilters] = useState({
    subject: '',
    className: '',
    lecturer: '',
    timeSlot: '',
    dayOfWeek: '',
    sortBy: 'Most Recent'
  });
  const [acceptedRequests, setAcceptedRequests] = useState(new Set());

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

  // Filter function for all data types
  const applyFilters = (data, dataType) => {
    const dayMapping = {
      monday: 'Thứ 2',
      tuesday: 'Thứ 3',
      wednesday: 'Thứ 4',
      thursday: 'Thứ 5',
      friday: 'Thứ 6',
      saturday: 'Thứ 7',
      sunday: 'Chủ nhật',
    };

    return data.filter(item => {
      let subjectMatch, classMatch, lecturerMatch, timeSlotMatch, dayOfWeekMatch;

      if (dataType === 'exchangeRequests') {
        subjectMatch = filters.subject === '' ||
          item.fromClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
          item.toClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(filters.subject.toLowerCase()));

        classMatch = filters.className === '' ||
          item.fromClass.toLowerCase().includes(filters.className.toLowerCase()) ||
          item.toClass.toLowerCase().includes(filters.className.toLowerCase());

        lecturerMatch = filters.lecturer === '' ||
          item.fromLecturer.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
          item.toLecturer.toLowerCase().includes(filters.lecturer.toLowerCase());

        timeSlotMatch = filters.timeSlot === '' ||
          item.fromSlot === parseInt(filters.timeSlot) ||
          item.toSlot === parseInt(filters.timeSlot);

        dayOfWeekMatch = filters.dayOfWeek === '' ||
          (dayMapping[filters.dayOfWeek] && (item.fromDay === dayMapping[filters.dayOfWeek] ||
            item.toDay === dayMapping[filters.dayOfWeek]));
      } else if (dataType === 'requestsToMe') {
        subjectMatch = filters.subject === '' ||
          item.myClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
          item.theirClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(filters.subject.toLowerCase()));

        classMatch = filters.className === '' ||
          item.myClass.toLowerCase().includes(filters.className.toLowerCase()) ||
          item.theirClass.toLowerCase().includes(filters.className.toLowerCase());

        lecturerMatch = filters.lecturer === '' ||
          item.myLecturer.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
          item.theirLecturer.toLowerCase().includes(filters.lecturer.toLowerCase());

        timeSlotMatch = filters.timeSlot === '' ||
          item.mySlot === parseInt(filters.timeSlot) ||
          item.theirSlot === parseInt(filters.timeSlot);

        dayOfWeekMatch = filters.dayOfWeek === '' ||
          (dayMapping[filters.dayOfWeek] && (item.myDay === dayMapping[filters.dayOfWeek] ||
            item.theirDay === dayMapping[filters.dayOfWeek]));
      } else if (dataType === 'marketplaceRequests') {
        subjectMatch = filters.subject === '' ||
          item.currentClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
          item.wantedClass.toLowerCase().includes(filters.subject.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(filters.subject.toLowerCase()));

        classMatch = filters.className === '' ||
          item.currentClass.toLowerCase().includes(filters.className.toLowerCase()) ||
          item.wantedClass.toLowerCase().includes(filters.className.toLowerCase());

        lecturerMatch = filters.lecturer === '' ||
          item.currentLecturer.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
          item.wantedLecturer.toLowerCase().includes(filters.lecturer.toLowerCase());

        timeSlotMatch = filters.timeSlot === '' ||
          item.currentSlot === parseInt(filters.timeSlot) ||
          item.wantedSlot === parseInt(filters.timeSlot);

        dayOfWeekMatch = filters.dayOfWeek === '' ||
          (dayMapping[filters.dayOfWeek] && (item.currentDay === dayMapping[filters.dayOfWeek] ||
            item.wantedDay === dayMapping[filters.dayOfWeek]));
      }

      return subjectMatch && classMatch && lecturerMatch && timeSlotMatch && dayOfWeekMatch;
    });
  };

  const sortData = (data, dataType) => {
    return data.sort((a, b) => {
      switch (filters.sortBy) {
        case 'Oldest':
          return a.id - b.id;
        case 'Subject':
          if (dataType === 'exchangeRequests') {
            return a.fromClass.localeCompare(b.fromClass);
          } else if (dataType === 'requestsToMe') {
            return a.myClass.localeCompare(b.myClass);
          } else if (dataType === 'marketplaceRequests') {
            return a.currentClass.localeCompare(b.currentClass);
          }
          return 0;
        case 'Lecturer':
          if (dataType === 'exchangeRequests') {
            return a.fromLecturer.localeCompare(b.fromLecturer);
          } else if (dataType === 'requestsToMe') {
            return a.myLecturer.localeCompare(b.myLecturer);
          } else if (dataType === 'marketplaceRequests') {
            return a.currentLecturer.localeCompare(b.currentLecturer);
          }
          return 0;
        case 'Most Recent':
        default:
          return b.id - a.id;
      }
    });
  };

  const filteredAndSortedRequests = useMemo(() => {
    const filtered = applyFilters(exchangeRequests, 'exchangeRequests');
    return sortData(filtered, 'exchangeRequests');
  }, [filters]);

  const filteredRequestsToMe = useMemo(() => {
    const filtered = applyFilters(requestsToMe, 'requestsToMe');
    return sortData(filtered, 'requestsToMe');
  }, [filters]);

  const filteredMarketplaceRequests = useMemo(() => {
    const filtered = applyFilters(marketplaceRequests, 'marketplaceRequests');
    return sortData(filtered, 'marketplaceRequests');
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
      case 'pending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang chờ phản hồi</span>;
      case 'accepted':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Đã chấp nhận</span>;
      case 'completed':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Hoàn thành</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Không xác định</span>;
    }
  };

  const handleAcceptRequest = (requestId) => {
    setAcceptedRequests(prev => new Set([...prev, requestId]));
    message.success('Đã chấp nhận yêu cầu đổi chéo!');
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

  // const handleContactStudent = (contactInfo) => {
  //   console.log('Contact info:', contactInfo);
  //   // Navigate to messages page to start conversation
  //   navigate('/messages');
  // };

  // Handle edit modal
  const handleEditRequest = (request) => {
    setEditingRequest(request);
    form.setFieldsValue({
      fromClass: request.fromClass,
      toClass: request.toClass,
      fromLecturer: request.fromLecturer,
      toLecturer: request.toLecturer,
      fromTime: request.fromTime,
      toTime: request.toTime,
      tags: request.tags.join(', '),
      priority: request.priority
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (values) => {
    // Update the request in exchangeRequests array
    console.log('Saving edited request:', values);
    setIsEditModalOpen(false);
    setEditingRequest(null);
    message.success('Yêu cầu đã được cập nhật thành công!');
  };

  const handleDeleteRequest = (requestId) => {
    Modal.confirm({
      title: 'Xác nhận xóa yêu cầu',
      content: 'Bạn có chắc chắn muốn xóa yêu cầu đổi chéo lớp này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk() {
        console.log('Deleting request:', requestId);
        message.success('Yêu cầu đã được xóa thành công!');
      }
    });
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

  const getSlotDisplay = (slot, day) => {
    const slotTimes = {
      1: '7:00 - 9:00',
      2: '9:30 - 11:45',
      3: '12:30 - 15:00',
      4: '15:00 - 17:15'
    };

    return `${day} - Slot ${slot} (${slotTimes[slot]})`;
  };

  return (
    <Layout
      title="Đổi chéo lớp"
      description="Quản lý yêu cầu chuyển lớp một cách dễ dàng"
    >
      <div className="space-y-8">

        {/* Navigation Tabs với improved design */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('my-requests')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === 'my-requests'
                  ? 'bg-primary text-white shadow-lg'
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
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === 'requests-to-me'
                  ? 'bg-primary text-white shadow-lg'
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
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === 'marketplace'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Bản tin chuyển lớp</span>
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
                Slot *
              </label>
              <Select
                placeholder="Chọn slot"
                value={filters.timeSlot}
                onChange={(value) => handleFilterChange('timeSlot', value)}
                className="w-full"
                size="large"
                allowClear
              >
                <Option value="1">Slot 1 (7:00 - 9:00)</Option>
                <Option value="2">Slot 2 (9:30 - 11:45)</Option>
                <Option value="3">Slot 3 (12:30 - 15:00)</Option>
                <Option value="4">Slot 4 (15:00 - 17:15)</Option>
              </Select>
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
            <button className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2">
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
              {activeTab === 'marketplace' && 'Bản tin chuyển lớp'}
            </h3>
            <div className="text-sm text-gray-500">
              {activeTab === 'my-requests' && `Hiển thị ${filteredAndSortedRequests.length} yêu cầu`}
              {activeTab === 'requests-to-me' && `Hiển thị ${filteredRequestsToMe.length} yêu cầu`}
              {activeTab === 'marketplace' && `Hiển thị ${filteredMarketplaceRequests.length} yêu cầu`}
            </div>
          </div>

          {/* My Requests Tab */}
          {activeTab === 'my-requests' && filteredAndSortedRequests.map((request) => (
            <div key={request.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Priority Icon */}
                    <div className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg`}>
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
                        <div className="text-xs text-blue-600 font-medium">{request.subjectCode} - {request.subjectName}</div>
                        <div className="text-lg font-bold text-gray-900">{request.fromClass}</div>
                        <div className="text-sm text-gray-600">{request.fromLecturer} - {request.fromLecturerCode}</div>
                        <div className="text-sm text-blue-600 font-medium">{getSlotDisplay(request.fromSlot, request.fromDay)}</div>
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
                        <div className="text-xs text-green-600 font-medium">{request.subjectCode} - {request.subjectName}</div>
                        <div className="text-lg font-bold text-gray-900">{request.toClass}</div>
                        <div className="text-sm text-gray-600">{request.toLecturer} - {request.toLecturerCode}</div>
                        <div className="text-sm text-green-600 font-medium">{getSlotDisplay(request.toSlot, request.toDay)}</div>
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
                  {request.status !== 'accepted' && (
                    <button
                      onClick={() => handleDeleteRequest(request.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Xóa yêu cầu</span>
                    </button>
                  )}

                  {request.status === 'accepted' ? (
                    <button
                      onClick={() => navigate('/messages')}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                    >
                      <MessageOutlined className="w-4 h-4" />
                      <span>Nhắn tin</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditRequest(request)}
                      className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                    >
                      <EditOutlined className="w-4 h-4" />
                      <span>Chỉnh sửa</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Requests To Me Tab */}
          {activeTab === 'requests-to-me' && filteredRequestsToMe.map((request) => (
            <div key={request.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Requester Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-center text-2xl ">
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
                    <div className="text-right">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <div className="text-xs text-blue-600 font-medium">Môn học</div>
                        <div className="text-sm text-blue-800 font-semibold">{request.subjectCode} - {request.subjectName}</div>
                      </div>
                    </div>
                  </div>

                  {/* Class Exchange Visualization */}
                  <div className="bg-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-8">
                      {/* Their Class */}
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Họ muốn đổi</div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200">
                          <div className="text-lg font-bold text-gray-900">{request.theirClass}</div>
                          <div className="text-sm text-gray-600">{request.theirLecturer} - {request.theirLecturerCode}</div>
                          <div className="text-sm text-orange-600 font-medium">{getSlotDisplay(request.theirSlot, request.theirDay)}</div>
                        </div>
                      </div>

                      {/* Exchange Arrow */}
                      <div className="flex items-center">
                        <div className="w-8 h-0.5 bg-primary rounded-full"></div>
                        <div className="mx-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
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
                          <div className="text-xs text-green-600 font-medium">{request.subjectCode} - {request.subjectName}</div>
                          <div className="text-lg font-bold text-gray-900">{request.myClass}</div>
                          <div className="text-sm text-gray-600">{request.myLecturer} - {request.myLecturerCode}</div>
                          <div className="text-sm text-green-600 font-medium">{getSlotDisplay(request.mySlot, request.myDay)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

               
                  {/* Action Buttons */}
                  {request.status === 'pending' && (
                    <div className="flex space-x-4">
                      {!acceptedRequests.has(request.id) ? (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                          >
                            <CheckOutlined />
                            <span>Chấp nhận đổi</span>
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(request.id)}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                          >
                            <span>Từ chối</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex w-full space-x-4">
                          <button
                            onClick={() => window.open(`tel:${request.phone}`)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                          >
                            <PhoneOutlined />
                            <span>Gọi điện</span>
                          </button>
                          <button
                            onClick={() => navigate(`/messages`)}
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                          >
                            <MessageOutlined />
                            <span>Nhắn tin</span>
                          </button>
                        </div>
                      )}
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
          {activeTab === 'marketplace' && filteredMarketplaceRequests.map((request) => (
            <div key={request.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Student Avatar & Info */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-center text-3xl ">
                    {request.studentAvatar}
                  </div>
                  <div className="text-center mt-3">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${request.priority === 'high' ? 'bg-red-100 text-red-700' :
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
                        <div className="text-xs text-blue-600 font-medium">Môn học</div>
                        <div className="text-sm text-blue-800 font-semibold">{request.subjectCode} - {request.subjectName}</div>
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
                          <div className="text-sm text-gray-600">{request.currentLecturer} - {request.currentLecturerCode}</div>
                          <div className="text-sm text-orange-600 font-medium">{getSlotDisplay(request.currentSlot, request.currentDay)}</div>
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
                          <div className="text-sm text-gray-600">{request.wantedLecturer} - {request.wantedLecturerCode}</div>
                          <div className="text-sm text-red-600 font-medium">{getSlotDisplay(request.wantedSlot, request.wantedDay)}</div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleSendSwapRequest(request.id, request.studentName)}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span>Gửi yêu cầu đổi</span>
                    </button>

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
          <button
            onClick={() => navigate('/exchange/swap-request')}
            className="group bg-primary hover:bg-primary-hover text-white font-bold px-12 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center space-x-3"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Thêm Yêu cầu chuyển Lớp</span>
          </button>
        </div>

        {/* Edit Request Modal */}
        <Modal
          title={`Chỉnh sửa yêu cầu đổi chéo lớp ${editingRequest ? `(ID: ${editingRequest.id})` : ''}`}
          open={isEditModalOpen}
          onCancel={() => {
            setIsEditModalOpen(false);
            setEditingRequest(null);
          }}
          footer={null}
          width={800}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveEdit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Class Section */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Lớp hiện tại</h3>

                <Form.Item
                  label="Tên lớp"
                  name="fromClass"
                  rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
                >
                  <Input placeholder="e.g. SE1305" size="large" />
                </Form.Item>

                <Form.Item
                  label="Giảng viên"
                  name="fromLecturer"
                  rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên!' }]}
                >
                  <Input placeholder="e.g. Dr. Smith" size="large" />
                </Form.Item>

                <Form.Item
                  label="Thời gian"
                  name="fromTime"
                  rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                >
                  <Input placeholder="e.g. Mon 8AM" size="large" />
                </Form.Item>
              </div>

              {/* To Class Section */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Lớp muốn đổi</h3>

                <Form.Item
                  label="Tên lớp"
                  name="toClass"
                  rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
                >
                  <Input placeholder="e.g. SE1326" size="large" />
                </Form.Item>

                <Form.Item
                  label="Giảng viên"
                  name="toLecturer"
                  rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên!' }]}
                >
                  <Input placeholder="e.g. Dr. Taylor" size="large" />
                </Form.Item>

                <Form.Item
                  label="Thời gian"
                  name="toTime"
                  rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                >
                  <Input placeholder="e.g. Tue 10AM" size="large" />
                </Form.Item>
              </div>
            </div>

            {/* Tags */}
            <Form.Item
              label="Tags (phân cách bằng dấu phẩy)"
              name="tags"
            >
              <Input placeholder="e.g. Morning Slot, Theory Focused" size="large" />
            </Form.Item>

            {/* Priority */}
            <Form.Item
              label="Độ ưu tiên"
              name="priority"
              rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
            >
              <Select placeholder="Chọn độ ưu tiên" size="large">
                <Option value="high">Cao</Option>
                <Option value="medium">Trung bình</Option>
                <Option value="low">Thấp</Option>
              </Select>
            </Form.Item>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingRequest(null);
                }}
                className="rounded-xl px-6"
                size="large"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
                size="large"
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default ClassExchange;