import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input, Button, Upload, Select } from 'antd';
import { ArrowLeftOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddTeacher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    university: '',
    email: '',
    photo: null,
    selectedSubjects: [],
    recommendation: ''
  });

  // Danh sách môn học
  const availableSubjects = [
    { code: 'CSE101', name: 'Nhập môn lập trình', department: 'CNTT' },
    { code: 'CSE201', name: 'Cấu trúc dữ liệu', department: 'CNTT' },
    { code: 'CSE301', name: 'Cơ sở dữ liệu', department: 'CNTT' },
    { code: 'CSE302', name: 'Mạng máy tính', department: 'CNTT' },
    { code: 'CSE202', name: 'Lập trình hướng đối tượng', department: 'CNTT' },
    { code: 'CSE303', name: 'Phần mềm hệ thống', department: 'CNTT' },
    { code: 'MAT101', name: 'Toán cao cấp 1', department: 'Toán học' },
    { code: 'MAT201', name: 'Toán cao cấp 2', department: 'Toán học' },
    { code: 'ENG101', name: 'Tiếng Anh 1', department: 'Ngoại ngữ' },
    { code: 'ENG201', name: 'Tiếng Anh 2', department: 'Ngoại ngữ' },
    { code: 'PHY101', name: 'Vật lý đại cương', department: 'Vật lý' },
    { code: 'BUS301', name: 'Quản trị doanh nghiệp', department: 'Kinh tế' },
    { code: 'MKT101', name: 'Marketing căn bản', department: 'Kinh tế' },
    { code: 'ECO201', name: 'Kinh tế vi mô', department: 'Kinh tế' },
    { code: 'ACC101', name: 'Kế toán căn bản', department: 'Kinh tế' }
  ];

  // Các khoa/bộ môn
  const departments = [
    'Khoa Công nghệ thông tin',
    'Khoa Kinh tế',
    'Khoa Kỹ thuật',
    'Khoa Ngoại ngữ',
    'Khoa Toán học',
    'Khoa Vật lý',
    'Khoa Hóa học',
    'Khoa Sinh học',
    'Quản trị Marketing',
    'Quản trị Dự án',
    'Lãnh đạo chuyển đổi số',
    'Quản trị doanh nghiệp',
    'Khởi nghiệp & Đổi mới sáng tạo'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectChange = (selectedValues) => {
    const selectedSubjects = selectedValues.map(value => {
      const subject = availableSubjects.find(s => s.code === value);
      return subject;
    }).filter(Boolean);
    
    setFormData(prev => ({
      ...prev,
      selectedSubjects: selectedSubjects
    }));
  };

  const handleUpload = (info) => {
    setFormData(prev => ({
      ...prev,
      photo: info.file
    }));
  };

  const handleSubmit = () => {
    // Xử lý submit form
    console.log('Form data:', formData);
    // Redirect hoặc show success message
    navigate('/teachers/review');
  };

  const uploadProps = {
    name: 'file',
    beforeUpload: () => false, // Prevent auto upload
    onChange: handleUpload,
    showUploadList: false,
  };

  return (
    <Layout
      title="Thêm giảng viên"
      description="Thêm thông tin giảng viên mới vào hệ thống"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4 text-blue-100">
                  <span>Professors</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Add Professor</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  Thêm giảng viên 👨‍🏫
                </h1>
                <p className="text-blue-100 text-lg">
                  Tất cả thông tin sẽ được quản trị viên xác minh trước khi hiển thị.
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UserOutlined className="text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/teachers/add-review')}
            className="flex items-center space-x-2"
          >
            Quay lại
          </Button>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            {/* Thông tin giảng viên */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin giảng viên</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <Input
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="rounded-xl h-12"
                    size="large"
                  />
                </div>

                {/* Khoa/Bộ môn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoa/Bộ môn *
                  </label>
                  <Select
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={(value) => handleInputChange('department', value)}
                    className="w-full rounded-xl"
                    style={{ height: '48px' }}
                    size="large"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {departments.map(dept => (
                      <Option key={dept} value={dept}>{dept}</Option>
                    ))}
                  </Select>
                </div>

                {/* Trường đại học */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trường đại học *
                  </label>
                  <Input
                    placeholder="Enter university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    className="rounded-xl h-12"
                    size="large"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (không bắt buộc)
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-xl h-12"
                    size="large"
                  />
                </div>
              </div>
            </div>

            {/* Ảnh đại diện */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ảnh đại diện (không bắt buộc)</h3>
              
              <div className="flex items-start space-x-6">
                <Upload {...uploadProps}>
                  <Button 
                    icon={<UploadOutlined />}
                    className="h-12 px-6"
                  >
                    Upload Photo
                  </Button>
                </Upload>
                
                {formData.photo && (
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <UserOutlined className="text-2xl text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Môn học giảng dạy */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Môn học giảng dạy</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn các môn học mà giảng viên này giảng dạy *
                </label>
                <Select
                  mode="multiple"
                  placeholder="Chọn môn học..."
                  value={formData.selectedSubjects.map(s => s.code)}
                  onChange={handleSubjectChange}
                  className="w-full"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  maxTagCount="responsive"
                >
                  {availableSubjects.map(subject => (
                    <Option key={subject.code} value={subject.code}>
                      {subject.code} - {subject.name} ({subject.department})
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Selected Subjects Display */}
              {formData.selectedSubjects.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-sm font-medium text-blue-800 mb-3">
                    Đã chọn {formData.selectedSubjects.length} môn học:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.selectedSubjects.map(subject => (
                      <div 
                        key={subject.code}
                        className="bg-white p-3 rounded-lg border border-blue-200"
                      >
                        <div className="font-medium text-blue-900">{subject.code}</div>
                        <div className="text-sm text-blue-700">{subject.name}</div>
                        <div className="text-xs text-blue-600">{subject.department}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Đề xuất */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Đề xuất</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tại sao bạn đề xuất giảng viên này?
                </label>
                <TextArea
                  placeholder="Hãy chia sẻ trải nghiệm hoặc lý do của bạn."
                  value={formData.recommendation}
                  onChange={(e) => handleInputChange('recommendation', e.target.value)}
                  rows={6}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                onClick={() => navigate('/teachers/add-review')}
                className="px-8 h-12"
              >
                Previous step
              </Button>
              
              <Button 
                type="primary"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 px-8 h-12"
                disabled={!formData.fullName || !formData.department || !formData.university || formData.selectedSubjects.length === 0}
              >
                Save 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddTeacher;
