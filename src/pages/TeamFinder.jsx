import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const TeamFinder = () => {
  const [activeTab, setActiveTab] = useState('looking-for-team');
  const [hasProfile, setHasProfile] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTeamEditModalOpen, setIsTeamEditModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [viewProfileModalOpen, setViewProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewTeamModalOpen, setViewTeamModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [createTeamForm] = Form.useForm();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [subjectGoalsForm, setSubjectGoalsForm] = useState({});
  const navigate = useNavigate();
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
      subject: 'EXE101',
      description: 'Tìm thành viên có kinh nghiệm backend development',
      maxMembers: 5,
      memberCount: 2,
      skills: ['Node.js', 'Express', 'MongoDB'],
      members: ['Nguyễn Văn A', 'Trần Thị B'],
      lookingFor: ['Backend Developer', 'Tester'],
      deadline: '2024-07-01',
      createdDate: '2024-05-01'
    },
    {
      id: 2,
      name: 'Nhóm nghiên cứu AI',
      status: 'Đã đóng',
      match: '76% match • Artificial Intelligence',
      subject: 'PRN212',
      description: 'Nghiên cứu machine learning và deep learning',
      maxMembers: 4,
      memberCount: 4,
      skills: ['Python', 'TensorFlow', 'Data Analysis'],
      members: ['Phạm Thị D', 'Nguyễn Văn C', 'Lê Văn E', 'Trần Thị F'],
      lookingFor: [],
      deadline: '2024-06-20',
      createdDate: '2024-04-10'
    },
    {
      id: 3,
      name: 'Nhóm dev',
      status: 'Mở',
      match: '79% match • Web Development',
      subject: 'WED201',
      description: 'Phát triển ứng dụng web fullstack',
      maxMembers: 6,
      memberCount: 3,
      skills: ['React', 'Node.js', 'UI/UX'],
      members: ['Nguyễn Văn G', 'Hoàng Thị H', 'Võ Văn I'],
      lookingFor: ['UI/UX Designer', 'Frontend Developer'],
      deadline: '2024-08-15',
      createdDate: '2024-05-20'
    }
  ];

  // Mock data for students looking for teams
  const studentsLookingForTeams = [
    {
      id: 1,
      name: 'Jamie Lee',
      major: 'Software Engineering',
      class: 'SE1704',
      workStyle: 'Night Owl • Team Player',
      bio: 'Backend developer, thích học hỏi và làm việc nhóm.',
      contact: {
        email: 'jamie.lee@example.com',
        discord: 'jamielee#1234'
      },
      description: 'Backend Developer • Night Owl • Available evenings',
      avatar: '/src/assets/figma/avatar1.svg',
      matchPercentage: 92,
      skills: ['Node.js', 'Python', 'MongoDB'],
      availability: 'Tối và cuối tuần'
    },
    {
      id: 2,
      name: 'Priya Patel',
      major: 'UI/UX Design',
      class: 'SE1705',
      workStyle: 'Punctual • Presentation expert',
      bio: 'Đam mê thiết kế giao diện và trải nghiệm người dùng.',
      contact: {
        email: 'priya.patel@example.com',
        discord: 'priyapatel#5678'
      },
      description: 'UI/UX Designer • Punctual • Presentation expert',
      avatar: '/src/assets/figma/avatar2.svg',
      matchPercentage: 87,
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      availability: 'Linh hoạt'
    },
    {
      id: 3,
      name: 'Carlos Mendez',
      major: 'Web Development',
      class: 'SE1706',
      workStyle: 'Early Bird • Creative problem solver',
      bio: 'Yêu thích phát triển frontend và giải quyết vấn đề sáng tạo.',
      contact: {
        email: 'carlos.mendez@example.com',
        discord: 'carlosm#9999'
      },
      description: 'Frontend Developer • Early Bird • Creative problem solver',
      avatar: '/src/assets/figma/avatar.png',
      matchPercentage: 78,
      skills: ['React', 'TypeScript', 'CSS'],
      availability: 'Sáng và trưa'
    }
  ];

  // Mock data for user's teams
  const myTeams = [
    {
      id: 1,
      name: 'Team Alpha',
      subject: 'EXE101',
      description: 'Nhóm phát triển ứng dụng web quản lý sinh viên',
      status: 'Đang hoạt động',
      memberCount: 3,
      maxMembers: 5,
      skills: ['React', 'Node.js', 'MongoDB'],
      members: ['anhtu2808', 'Trần Thị B', 'Lê Văn C'],
      lookingFor: ['Backend Developer', 'UI/UX Designer'],
      deadline: '2024-06-15',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Data Science Team',
      subject: 'PRN212',
      description: 'Phân tích dữ liệu và machine learning cho doanh nghiệp',
      status: 'Tuyển thêm',
      memberCount: 2,
      maxMembers: 4,
      skills: ['Python', 'TensorFlow', 'Data Analysis'],
      members: ['anhtu2808', 'Phạm Thị D'],
      lookingFor: ['Data Analyst', 'ML Engineer'],
      deadline: '2024-07-20',
      createdDate: '2024-02-01'
    }
  ];

  // Mock data for user's profile
  const myProfile = {
    name: 'anhtu2808',
    major: 'Software Engineering',
    class: 'SE1633',
    skills: ['React', 'Node.js', 'Python', 'UI/UX Design'],
    subjects: ['EXE101', 'PRN212', 'WED201'],
    subjectGoals: {
      'EXE101': '9.0',
      'PRN212': '8.5',
      'WED201': '8.0'
    },
    workStyle: 'Flexible • Team Player • Detail-oriented',
    availability: 'Weekends and evenings',
    bio: 'Passionate about web development and AI. Looking for a collaborative team to work on innovative projects.',
    goals: ['Học tập kinh nghiệm', 'Phát triển kỹ năng', 'Xây dựng portfolio', 'Kết nối mạng lưới'],
    personality: ['Nhiệt tình', 'Kiên nhẫn', 'Sáng tạo', 'Đáng tin cậy', 'Ham học hỏi'],
    preferences: {
      teamSize: '3-5 members',
      projectType: 'Web Development, Mobile App',
      communication: 'Discord, Slack'
    },
    contact: {
      email: 'anhtu2808@fpt.edu.vn',
      discord: 'anhtu2808#1234'
    }
  };

  const [form] = Form.useForm();
  const [teamForm] = Form.useForm();

  const subjectOptions = [
    { label: 'EXE101 - Thực tập tốt nghiệp', value: 'EXE101' },
    { label: 'PRN212 - Lập trình C# cơ bản', value: 'PRN212' },
    { label: 'SWE201 - Kỹ thuật phần mềm', value: 'SWE201' },
    { label: 'DBI202 - Cơ sở dữ liệu', value: 'DBI202' },
    { label: 'WED201 - Thiết kế web', value: 'WED201' }
  ];

  const goalOptions = [
    'Học tập kinh nghiệm', 'Phát triển kỹ năng', 'Xây dựng portfolio',
    'Kết nối mạng lưới', 'Tìm hiểu công nghệ mới', 'Thực hành dự án thực tế'
  ];

  const personalityOptions = [
    'Nhiệt tình', 'Kiên nhẫn', 'Sáng tạo', 'Đáng tin cậy', 'Ham học hỏi',
    'Tỉ mỉ', 'Linh hoạt', 'Tích cực', 'Thân thiện', 'Có trách nhiệm'
  ];

  const teamSizeOptions = [
    { label: '2 người', value: '2 người' },
    { label: '3 người', value: '3 người' },
    { label: '4 người', value: '4 người' },
    { label: '5 người', value: '5 người' },
    { label: '3-5 người', value: '3-5 người' },
    { label: 'Linh hoạt', value: 'Linh hoạt' }
  ];

  const handleSaveProfile = (values) => {
    console.log('Saving profile:', values);
    setIsEditModalOpen(false);
    message.success('Profile đã được cập nhật!');
  };

  const handleEditTeam = (team) => {
    setEditingTeam(team);
    teamForm.setFieldsValue({
      name: team.name,
      subject: team.subject,
      description: team.description,
      maxMembers: team.maxMembers,
      skills: team.skills.join(', '),
      lookingFor: team.lookingFor.join(', '),
      status: team.status
    });
    setIsTeamEditModalOpen(true);
  };

  const handleSaveTeam = (values) => {
    console.log('Saving team:', values);
    message.success('Thông tin nhóm đã được cập nhật!');
    setIsTeamEditModalOpen(false);
    setEditingTeam(null);
  };

  const handleDeleteTeam = (teamId) => {
    Modal.confirm({
      title: 'Xác nhận xóa nhóm',
      content: 'Bạn có chắc chắn muốn xóa nhóm này?',
      onOk() {
        console.log('Deleting team:', teamId);
        message.success('Nhóm đã được xóa!');
      }
    });
  };

  const handleSubjectsChange = (subjects) => {
    setSelectedSubjects(subjects);
    const currentGoals = form.getFieldValue('subjectGoals') || {};
    const newGoals = { ...currentGoals };

    subjects.forEach(subject => {
      if (!newGoals[subject]) {
        newGoals[subject] = '';
      }
    });

    Object.keys(newGoals).forEach(subject => {
      if (!subjects.includes(subject)) {
        delete newGoals[subject];
      }
    });

    setSubjectGoalsForm(newGoals);
    form.setFieldValue('subjectGoals', newGoals);
  };

  const handleSubjectGoalChange = (subject, goal) => {
    const currentGoals = form.getFieldValue('subjectGoals') || {};
    const newGoals = { ...currentGoals, [subject]: goal };
    setSubjectGoalsForm(newGoals);
    form.setFieldValue('subjectGoals', newGoals);
  };

  const handleModalOpen = () => {
    form.setFieldsValue({
      name: myProfile.name,
      major: myProfile.major,
      class: myProfile.class,
      skills: myProfile.skills.join(', '),
      subjects: myProfile.subjects,
      subjectGoals: myProfile.subjectGoals,
      workStyle: myProfile.workStyle,
      availability: myProfile.availability,
      bio: myProfile.bio,
      goals: myProfile.goals,
      personality: myProfile.personality,
      teamSize: myProfile.preferences.teamSize,
      projectType: myProfile.preferences.projectType,
      communication: myProfile.preferences.communication,
      email: myProfile.contact.email,
      discord: myProfile.contact.discord
    });
    setSelectedSubjects(myProfile.subjects);
    setSubjectGoalsForm(myProfile.subjectGoals);
    setIsEditModalOpen(true);
  };

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
      title="Tìm nhóm"
      description="Kết nối với học sinh dựa trên kỹ năng, sở thích và môn học"
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('looking-for-team')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-colors ${activeTab === 'looking-for-team'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              Tìm nhóm cho tôi
            </button>
            <button
              onClick={() => setActiveTab('looking-for-members')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-colors ${activeTab === 'looking-for-members'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              Nhóm của tôi
            </button>
            <button
              onClick={() => setActiveTab('my-profile')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-colors ${activeTab === 'my-profile'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              Profile của tôi
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'looking-for-members' && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Nhóm của tôi</h3>
                  <p className="text-gray-600 mt-1">Quản lý các nhóm bạn đã tham gia và tạo</p>
                </div>
                <button
                  className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover flex items-center space-x-2"
                  onClick={() => setIsCreateTeamModalOpen(true)}
                >
                  <PlusOutlined />
                  <span>Tạo nhóm mới</span>
                </button>
              </div>
            </div>

            {/* My Teams Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Nhóm của tôi ({myTeams.length})</h3>
              <div className="space-y-4">
                {myTeams.map((team) => (
                  <div key={team.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">{team.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${team.status === 'Đang hoạt động'
                            ? 'bg-green-100 text-green-700'
                            : team.status === 'Tuyển thêm'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                            }`}>
                            {team.status}
                          </span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                            {team.subject}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{team.description}</p>

                        {/* Team Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 font-medium">Thành viên</p>
                            <p className="text-lg font-bold text-gray-900">{team.memberCount}/{team.maxMembers}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 font-medium">Hạn chót</p>
                            <p className="text-sm font-medium text-gray-900">{new Date(team.deadline).toLocaleDateString('vi-VN')}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 font-medium">Ngày tạo</p>
                            <p className="text-sm font-medium text-gray-900">{new Date(team.createdDate).toLocaleDateString('vi-VN')}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 font-medium">Đang tìm</p>
                            <p className="text-sm font-medium text-gray-900">{team.lookingFor.length > 0 ? team.lookingFor.length + ' vị trí' : 'Đủ thành viên'}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng nhóm:</p>
                          <div className="flex flex-wrap gap-2">
                            {team.skills.map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-50 text-primary border border-blue-200 rounded-lg text-xs font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Members */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Thành viên:</p>
                          <div className="flex flex-wrap gap-2">
                            {team.members.map((member, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-50 text-primary border border-blue-200 rounded-lg text-xs">
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Looking For */}
                        {team.lookingFor.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Đang tìm kiếm:</p>
                            <div className="flex flex-wrap gap-2">
                              {team.lookingFor.map((role, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-50 text-primary border border-blue-200 rounded-lg text-xs font-medium">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 ml-6">
                        <button
                          onClick={() => handleEditTeam(team)}
                          className="bg-blue-50 text-primary border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center space-x-2"
                        >
                          <EditOutlined />
                          <span>Chỉnh sửa</span>
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(team.id)}
                          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center space-x-2"
                        >
                          <DeleteOutlined />
                          <span>Xóa nhóm</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTeam(team);
                            setViewTeamModalOpen(true);
                          }}
                          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {myTeams.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusOutlined className="text-2xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Chưa có nhóm nào</h3>
                <p className="text-gray-600 mb-6">Bắt đầu tạo nhóm đầu tiên của bạn để kết nối với các thành viên khác</p>
                <button
                  onClick={() => setIsCreateTeamModalOpen(true)}
                  className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover"
                >
                  Tạo nhóm đầu tiên
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'looking-for-team' && (
          <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bộ lọc</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngành / Lớp
                  </label>
                  <input
                    type="text"
                    placeholder="VD: SE1326"
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Môn học
                  </label>
                  <input
                    type="text"
                    placeholder="VD: EXE101, PRN212"
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kỹ năng
                  </label>
                  <input
                    type="text"
                    placeholder="VD: React, C#, UI/UX"
                    value={filters.specialization}
                    onChange={(e) => handleFilterChange('specialization', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

            {/* Available Teams Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Nhóm có sẵn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamsLookingForMembers.map((team) => (
                  <div key={team.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${team.status === 'Mở'
                        ? 'bg-success/10 text-success'
                        : 'bg-gray-100 text-gray-600'
                        }`}>
                        {team.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {team.match}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {team.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {team.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mb-4">
                      <span>{team.memberCount}/{team.maxMembers} thành viên</span>
                      <span className="mx-2">•</span>
                      <span>{team.subject}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover"
                        onClick={() => navigate('/messages')}
                      >
                        Liên hệ
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTeam(team);
                          setViewTeamModalOpen(true);
                        }}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Students Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Sinh viên cá nhân tìm nhóm</h3>
              <div className="space-y-4">
                {studentsLookingForTeams.map((student) => (
                  <div key={student.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{student.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${student.matchPercentage >= 85
                              ? 'bg-success/10 text-success'
                              : student.matchPercentage >= 70
                                ? 'bg-warning/10 text-warning'
                                : 'bg-gray-100 text-gray-700'
                              }`}>
                              {student.matchPercentage}% phù hợp
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{student.major} • {student.class}</p>
                          <p className="text-sm text-gray-500 mb-3">{student.description}</p>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {student.skills?.map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Availability */}
                          <div className="text-xs text-gray-400">
                            <span>Có thể làm việc: {student.availability}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover"
                          onClick={() => navigate('/messages')}
                        >
                          Liên hệ
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProfile(student);
                            setViewProfileModalOpen(true);
                          }}
                          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
                        >
                          Xem profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-profile' && (
          <div className="space-y-6">
            {hasProfile ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {myProfile.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{myProfile.name}</h3>
                        <p className="text-gray-600">{myProfile.major} • {myProfile.class}</p>
                        <p className="text-sm text-gray-500 mt-1">{myProfile.workStyle}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={handleModalOpen}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 border border-gray-200"
                        >
                          Chỉnh sửa
                        </button>
                        <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 border border-red-200">
                          Xóa profile
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Giới thiệu</h4>
                    <p className="text-gray-700">{myProfile.bio}</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Kỹ năng</h4>
                    <div className="flex flex-wrap gap-2">
                      {myProfile.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-primary rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Môn học & Mục tiêu điểm</h4>
                    <div className="space-y-3">
                      {myProfile.subjects.map((subject, index) => {
                        const subjectInfo = subjectOptions.find(option => option.value === subject);
                        const goalScore = myProfile.subjectGoals[subject];
                        const getScoreColor = (score) => {
                          const numScore = parseFloat(score);
                          if (numScore >= 9.0) return 'bg-blue-50 text-primary border-blue-200';
                          if (numScore >= 8.0) return 'bg-blue-50 text-primary border-blue-200';
                          if (numScore >= 7.0) return 'bg-blue-50 text-primary border-blue-200';
                          return 'bg-blue-50 text-primary border-blue-200';
                        };
                        return (
                          <div key={index} className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                            <div className="flex items-center justify-between">
                              <span className="px-3 py-1 bg-blue-50 text-primary rounded-lg text-sm font-medium">
                                {subjectInfo ? subjectInfo.label : subject}
                              </span>
                              {goalScore && (
                                <span className={`px-3 py-1 border rounded-lg text-sm font-bold ${getScoreColor(goalScore)}`}>
                                  Mục tiêu: {goalScore} điểm
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Mục tiêu</h4>
                    <div className="flex flex-wrap gap-2">
                      {myProfile.goals.map((goal, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-primary rounded-lg border border-blue-200 text-sm font-medium">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personality */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Tính cách</h4>
                    <div className="flex flex-wrap gap-2">
                      {myProfile.personality.map((trait, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-primary rounded-lg border border-blue-200 text-sm font-medium">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Thời gian rảnh</h4>
                    <p className="text-gray-700">{myProfile.availability}</p>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Sở thích làm việc</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Kích thước nhóm</h4>
                      <p className="text-gray-700">{myProfile.preferences.teamSize}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Loại dự án</h4>
                      <p className="text-gray-700">{myProfile.preferences.projectType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Công cụ liên lạc</h4>
                      <p className="text-gray-700">{myProfile.preferences.communication}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{myProfile.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span className="text-gray-700">{myProfile.contact.discord}</span>
                    </div>
                  </div>
                </div>

                
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin tìm nhóm của tôi</h3>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Chưa có thông tin</h4>
                  <p className="text-gray-500 mb-4">Bạn chưa tạo thông tin tìm nhóm. Hãy tạo ngay để các nhóm có thể tìm thấy bạn!</p>
                  <button
                    onClick={() => setHasProfile(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover"
                  >
                    Tạo thông tin tìm nhóm
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        <Modal
          title="Chi tiết hồ sơ thành viên"
          open={viewProfileModalOpen}
          onCancel={() => setViewProfileModalOpen(false)}
          footer={null}
          width={800}
        >
          {selectedProfile && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{selectedProfile.name}</h3>
              <p>{selectedProfile.major} • {selectedProfile.class}</p>
              <p className="text-sm text-gray-500">{selectedProfile.workStyle}</p>

              <div>
                <h4 className="font-medium">Giới thiệu</h4>
                <p>{selectedProfile.bio}</p>
              </div>

              <div>
                <h4 className="font-medium">Kỹ năng</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-primary border border-blue-200 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium">Liên hệ</h4>
                <p>Email: {selectedProfile.contact?.email}</p>
                <p>Discord: {selectedProfile.contact?.discord}</p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          title="Chi tiết nhóm"
          open={viewTeamModalOpen}
          onCancel={() => setViewTeamModalOpen(false)}
          footer={null}
          width={800}
        >
          {selectedTeam && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{selectedTeam.name}</h3>
              <p className="text-sm text-gray-600">{selectedTeam.subject}</p>
              <p>Trạng thái: <strong>{selectedTeam.status}</strong></p>
              <p>Số thành viên tối đa: {selectedTeam.maxMembers}</p>

              <div>
                <h4 className="font-medium">Mô tả nhóm</h4>
                <p>{selectedTeam.description}</p>
              </div>

              <div>
                <h4 className="font-medium">Kỹ năng nhóm</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-primary border border-blue-200 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium">Đang tìm kiếm</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.lookingFor?.map((role, i) => (
                    <span key={i} className="px-3 py-1 bg-success/10 text-success rounded-lg text-sm">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          title="Chỉnh sửa thông tin profile"
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
          width={800}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveProfile}
          >
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>

              <Form.Item
                label="Ngành học"
                name="major"
                rules={[{ required: true, message: 'Vui lòng nhập ngành học!' }]}
              >
                <Input placeholder="VD: Software Engineering" />
              </Form.Item>

              <Form.Item
                label="Lớp"
                name="class"
                rules={[{ required: true, message: 'Vui lòng nhập lớp!' }]}
              >
                <Input placeholder="VD: SE1633" />
              </Form.Item>

              <Form.Item
                label="Phong cách làm việc"
                name="workStyle"
              >
                <Input placeholder="VD: Flexible • Team Player" />
              </Form.Item>
            </div>

            {/* Bio */}
            <Form.Item
              label="Giới thiệu bản thân"
              name="bio"
            >
              <Input.TextArea
                rows={3}
                placeholder="Mô tả về bản thân, kinh nghiệm và mục tiêu..."
              />
            </Form.Item>

            {/* Skills */}
            <Form.Item
              label="Kỹ năng (phân cách bằng dấu phẩy)"
              name="skills"
            >
              <Input placeholder="VD: React, Node.js, Python" />
            </Form.Item>

            {/* Subjects */}
            <Form.Item
              label="Môn học"
              name="subjects"
            >
              <Select
                mode="multiple"
                placeholder="Chọn các môn học bạn đang học hoặc quan tâm"
                options={subjectOptions}
                onChange={handleSubjectsChange}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            {/* Subject Goals */}
            {selectedSubjects.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Mục tiêu điểm số cho từng môn</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSubjects.map((subject) => {
                    const subjectInfo = subjectOptions.find(option => option.value === subject);
                    return (
                      <div key={subject}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {subjectInfo ? subjectInfo.label : subject}
                        </label>
                        <Select
                          placeholder="Chọn điểm mong muốn"
                          value={subjectGoalsForm[subject] || undefined}
                          onChange={(value) => handleSubjectGoalChange(subject, value)}
                          options={[
                            { label: '10.0 - Xuất sắc', value: '10.0' },
                            { label: '9.5 - Xuất sắc', value: '9.5' },
                            { label: '9.0 - Xuất sắc', value: '9.0' },
                            { label: '8.5 - Giỏi', value: '8.5' },
                            { label: '8.0 - Giỏi', value: '8.0' },
                            { label: '7.5 - Khá', value: '7.5' },
                            { label: '7.0 - Khá', value: '7.0' }
                          ]}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Goals */}
            <Form.Item
              label="Mục tiêu"
              name="goals"
            >
              <Select
                mode="tags"
                placeholder="Chọn hoặc nhập mục tiêu của bạn"
                options={goalOptions.map(goal => ({ label: goal, value: goal }))}
                tokenSeparators={[',']}
              />
            </Form.Item>

            {/* Personality */}
            <Form.Item
              label="Tính cách"
              name="personality"
            >
              <Select
                mode="tags"
                placeholder="Chọn hoặc nhập tính cách của bạn"
                options={personalityOptions.map(trait => ({ label: trait, value: trait }))}
                tokenSeparators={[',']}
              />
            </Form.Item>

            {/* Availability */}
            <Form.Item
              label="Thời gian rảnh"
              name="availability"
            >
              <Input placeholder="VD: Cuối tuần và buổi tối" />
            </Form.Item>

            {/* Preferences Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sở thích làm việc</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Kích thước nhóm mong muốn"
                  name="teamSize"
                >
                  <Select
                    placeholder="Chọn kích thước nhóm"
                    options={teamSizeOptions}
                  />
                </Form.Item>

                <Form.Item
                  label="Loại dự án quan tâm"
                  name="projectType"
                >
                  <Input placeholder="VD: Web Development, Mobile App" />
                </Form.Item>

                <Form.Item
                  label="Công cụ liên lạc ưa thích"
                  name="communication"
                  className="md:col-span-2"
                >
                  <Input placeholder="VD: Discord, Slack" />
                </Form.Item>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="your.email@domain.com" />
                </Form.Item>

                <Form.Item
                  label="Discord"
                  name="discord"
                >
                  <Input placeholder="VD: username#1234" />
                </Form.Item>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <Button
                onClick={() => setIsEditModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary hover:bg-primary-hover"
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          title="Tạo nhóm mới"
          open={isCreateTeamModalOpen}
          onCancel={() => setIsCreateTeamModalOpen(false)}
          footer={null}
          width={700}
        >
          <Form
            form={createTeamForm}
            layout="vertical"
            onFinish={(values) => {
              console.log('Tạo nhóm mới:', values);
              setIsCreateTeamModalOpen(false);
              createTeamForm.resetFields();
              message.success('Tạo nhóm mới thành công!');
            }}
          >
            <Form.Item
              label="Tên nhóm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên nhóm!' }]}
            >
              <Input placeholder="VD: Team Alpha" />
            </Form.Item>
            <Form.Item
              label="Môn học"
              name="subject"
              rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
            >
              <Select
                placeholder="Chọn môn học"
                options={subjectOptions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item
              label="Mô tả nhóm"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả nhóm!' }]}
            >
              <Input.TextArea rows={3} placeholder="Mô tả về mục tiêu, dự án và yêu cầu của nhóm..." />
            </Form.Item>
            <Form.Item
              label="Số thành viên tối đa"
              name="maxMembers"
              rules={[{ required: true, message: 'Vui lòng nhập số thành viên!' }]}
            >
              <Select
                placeholder="Chọn số thành viên"
                options={[
                  { label: '2 thành viên', value: 2 },
                  { label: '3 thành viên', value: 3 },
                  { label: '4 thành viên', value: 4 },
                  { label: '5 thành viên', value: 5 },
                  { label: '6 thành viên', value: 6 },
                  { label: '7 thành viên', value: 7 },
                  { label: '8 thành viên', value: 8 }
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Kỹ năng nhóm (phân cách bằng dấu phẩy)"
              name="skills"
            >
              <Input placeholder="VD: React, Node.js, MongoDB" />
            </Form.Item>
            <Form.Item
              label="Đang tìm kiếm (phân cách bằng dấu phẩy)"
              name="lookingFor"
            >
              <Input placeholder="VD: Backend Developer, UI/UX Designer" />
            </Form.Item>
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <Button onClick={() => setIsCreateTeamModalOpen(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary hover:bg-primary-hover"
              >
                Tạo nhóm
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Team Edit Modal */}
        <Modal
          title="Chỉnh sửa thông tin nhóm"
          open={isTeamEditModalOpen}
          onCancel={() => {
            setIsTeamEditModalOpen(false);
            setEditingTeam(null);
          }}
          footer={null}
          width={800}
        >
          <Form
            form={teamForm}
            onFinish={handleSaveTeam}
            layout="vertical"
            className="mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Tên nhóm"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhóm!' }]}
              >
                <Input placeholder="VD: Team Alpha" />
              </Form.Item>

              <Form.Item
                label="Môn học"
                name="subject"
                rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
              >
                <Select
                  placeholder="Chọn môn học"
                  options={subjectOptions}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>

              <Form.Item
                label="Số thành viên tối đa"
                name="maxMembers"
                rules={[{ required: true, message: 'Vui lòng nhập số thành viên!' }]}
              >
                <Select
                  placeholder="Chọn số thành viên"
                  options={[
                    { label: '2 thành viên', value: 2 },
                    { label: '3 thành viên', value: 3 },
                    { label: '4 thành viên', value: 4 },
                    { label: '5 thành viên', value: 5 },
                    { label: '6 thành viên', value: 6 },
                    { label: '7 thành viên', value: 7 },
                    { label: '8 thành viên', value: 8 }
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
              >
                <Select
                  placeholder="Chọn trạng thái"
                  options={[
                    { label: 'Đang hoạt động', value: 'Đang hoạt động' },
                    { label: 'Tuyển thêm', value: 'Tuyển thêm' },
                    { label: 'Hoàn thành', value: 'Hoàn thành' },
                    { label: 'Tạm dừng', value: 'Tạm dừng' }
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả nhóm"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả nhóm!' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Mô tả về mục tiêu, dự án và yêu cầu của nhóm..."
              />
            </Form.Item>

            <Form.Item
              label="Kỹ năng nhóm (phân cách bằng dấu phẩy)"
              name="skills"
            >
              <Input placeholder="VD: React, Node.js, MongoDB" />
            </Form.Item>

            <Form.Item
              label="Đang tìm kiếm (phân cách bằng dấu phẩy)"
              name="lookingFor"
            >
              <Input placeholder="VD: Backend Developer, UI/UX Designer" />
            </Form.Item>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <Button
                onClick={() => {
                  setIsTeamEditModalOpen(false);
                  setEditingTeam(null);
                }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary hover:bg-primary-hover"
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

export default TeamFinder;