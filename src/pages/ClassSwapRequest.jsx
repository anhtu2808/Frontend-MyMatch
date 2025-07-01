import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input, Button, message, Select } from 'antd';
import { ArrowLeftOutlined, BookOutlined, SwapOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const ClassSwapRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Lớp hiện tại
    currentSubjectName: '',
    currentClassCode: '',
    currentDayOfWeek: [],
    currentSlot: '',
    currentInstructor: '',
    currentTeacherCode: '',
    
    // Lớp muốn đổi
    desiredSubjectName: '',
    desiredClassCode: '',
    desiredDayOfWeek: [],
    desiredSlot: '',
    desiredInstructor: '',
    desiredTeacherCode: '',
    
    // Ghi chú
    additionalNotes: ''
  });

  const [marketplaceRequests, setMarketplaceRequests] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.currentSubjectName || !formData.currentClassCode) {
      message.error('Vui lòng điền đầy đủ thông tin lớp hiện tại');
      return;
    }

    // Validate desired class - at least one of the fields must be filled
    if (!formData.desiredClassCode && (!formData.desiredDayOfWeek || formData.desiredDayOfWeek.length === 0) && !formData.desiredSlot) {
      message.error('Vui lòng điền ít nhất một trong các trường: Mã lớp, Thứ, hoặc Slot cho lớp mong muốn');
      return;
    }

    // Create new request object
    const newRequest = {
      id: Date.now(), // Unique ID
      subjectCode: formData.currentSubjectName,
      subjectName: formData.currentSubjectName,
      studentName: 'Your Name', // Replace with actual user name
      studentEmail: 'your.email@example.com', // Replace with actual user email
      studentAvatar: '👨‍🎓', // Replace with actual user avatar
      currentClass: formData.currentClassCode,
      currentLecturer: formData.currentInstructor,
      currentLecturerCode: formData.currentTeacherCode,
      currentDay: formData.currentDayOfWeek.join(', '),
      currentSlot: formData.currentSlot,
      wantedClass: formData.desiredClassCode,
      wantedLecturer: formData.desiredInstructor,
      wantedLecturerCode: formData.desiredTeacherCode,
      wantedDay: formData.desiredDayOfWeek.join(', '),
      wantedSlot: formData.desiredSlot,
      reason: formData.additionalNotes,
      postedDate: 'Vừa xong',
      tags: ['New Request'],
      priority: 'medium',
      contactPreference: 'Email'
    };

    // Add new request to marketplaceRequests
    setMarketplaceRequests(prev => [...prev, newRequest]);

    // Process form submission
    console.log('Class swap request:', formData);
    message.success('Yêu cầu đổi chéo lớp đã được gửi thành công!');
    
    // Redirect to class exchange page
    setTimeout(() => {
      navigate('/exchange');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/exchange');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
          <div className="max-w-4xl mx-auto px-6">
            <button
              onClick={() => navigate('/exchange')}
              className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeftOutlined className="mr-2" />
              Quay lại
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <SwapOutlined className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Đổi chéo lớp</h1>
                <p className="text-blue-100 text-lg">Chi tiết đổi chéo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-8">
              
              {/* Môn học chung */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <BookOutlined className="text-white text-xs" />
                  </div>
                  Môn học
                </h3>
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên môn *
                  </label>
                  <Select
                    placeholder="Chọn môn học"
                    value={formData.currentSubjectName}
                    onChange={(value) => {
                      handleInputChange('currentSubjectName', value);
                      handleInputChange('desiredSubjectName', value);
                    }}
                    className="w-full rounded-xl"
                    size="large"
                  >
                    <Option value="Software Engineering">Software Engineering</Option>
                    <Option value="Data Structures">Data Structures</Option>
                    <Option value="Database Systems">Database Systems</Option>
                    <Option value="Web Development">Web Development</Option>
                    <Option value="Computer Networks">Computer Networks</Option>
                    <Option value="Object-Oriented Programming">Object-Oriented Programming</Option>
                    <Option value="Machine Learning">Machine Learning</Option>
                    <Option value="Mobile Development">Mobile Development</Option>
                  </Select>
                </div>
              </div>

              

              {/* Two Column Layout */}
              <div className="relative">
                {/* Swap Icon - positioned between columns on desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                    <SwapOutlined className="text-white text-xl" />
                  </div>
                </div>
                
                {/* Mobile Swap Icon */}
                <div className="lg:hidden flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <SwapOutlined className="text-white text-lg" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Lớp hiện tại của bạn - Bên trái */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <BookOutlined className="text-white text-sm" />
                    </div>
                    Lớp hiện tại của bạn
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Mã lớp */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã lớp *
                      </label>
                      <Input
                        placeholder="e.g. SE1704"
                        value={formData.currentClassCode}
                        onChange={(e) => handleInputChange('currentClassCode', e.target.value)}
                        className="rounded-xl h-12"
                        size="large"
                      />
                    </div>

                    {/* Thứ */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thứ * (tối đa 2 thứ)
                      </label>
                      <Select
                        mode="multiple"
                        placeholder="Chọn thứ (tối đa 2)"
                        value={formData.currentDayOfWeek}
                        onChange={(value) => {
                          if (value.length <= 2) {
                            handleInputChange('currentDayOfWeek', value);
                          }
                        }}
                        className="w-full rounded-xl"
                        size="large"
                        maxTagCount={2}
                      >
                        <Option value="2">Thứ 2</Option>
                        <Option value="3">Thứ 3</Option>
                        <Option value="4">Thứ 4</Option>
                        <Option value="5">Thứ 5</Option>
                        <Option value="6">Thứ 6</Option>
                        <Option value="7">Thứ 7</Option>
                        <Option value="CN">Chủ Nhật</Option>
                      </Select>
                    </div>

                    {/* Slot */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slot *
                      </label>
                      <Select
                        placeholder="Chọn slot"
                        value={formData.currentSlot}
                        onChange={(value) => handleInputChange('currentSlot', value)}
                        className="w-full rounded-xl"
                        size="large"
                      >
                        <Option value="1">Slot 1 (7:00 - 9:00)</Option>
                        <Option value="2">Slot 2 (9:30 - 11:45)</Option>
                        <Option value="3">Slot 3 (12:30 - 15:00)</Option>
                        <Option value="4">Slot 4 (15:00 - 17:15)</Option>
                      </Select>
                    </div>

                    {/* Tên giảng viên */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên giảng viên
                      </label>
                      <Input
                        placeholder="e.g. Dr. Emily Carter"
                        value={formData.currentInstructor}
                        onChange={(e) => handleInputChange('currentInstructor', e.target.value)}
                        className="rounded-xl h-12"
                        size="large"
                      />
                    </div>

                    {/* Teacher Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teacher Code
                      </label>
                      <Input
                        placeholder="e.g. LamNN2"
                        value={formData.currentTeacherCode}
                        onChange={(e) => handleInputChange('currentTeacherCode', e.target.value)}
                        className="rounded-xl h-12"
                        size="large"
                      />
                    </div>
                  </div>
                </div>

                {/* Lớp muốn đổi - Bên phải */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                      <BookOutlined className="text-white text-sm" />
                    </div>
                    Lớp muốn đổi
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Mã lớp */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã lớp
                      </label>
                      <Input
                        placeholder="e.g. SE1705"
                        value={formData.desiredClassCode}
                        onChange={(e) => handleInputChange('desiredClassCode', e.target.value)}
                        className="rounded-xl h-12"
                        size="large"
                      />
                    </div>

                    {/* Thứ */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thứ (tối đa 2 thứ)
                      </label>
                      <Select
                        mode="multiple"
                        placeholder="Chọn thứ (tối đa 2)"
                        value={formData.desiredDayOfWeek}
                        onChange={(value) => {
                          if (value.length <= 2) {
                            handleInputChange('desiredDayOfWeek', value);
                          }
                        }}
                        className="w-full rounded-xl"
                        size="large"
                        maxTagCount={2}
                      >
                        <Option value="2">Thứ 2</Option>
                        <Option value="3">Thứ 3</Option>
                        <Option value="4">Thứ 4</Option>
                        <Option value="5">Thứ 5</Option>
                        <Option value="6">Thứ 6</Option>
                        <Option value="7">Thứ 7</Option>
                        <Option value="CN">Chủ Nhật</Option>
                      </Select>
                    </div>

                    {/* Slot */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slot
                      </label>
                      <Select
                        placeholder="Chọn slot"
                        value={formData.desiredSlot}
                        onChange={(value) => handleInputChange('desiredSlot', value)}
                        className="w-full rounded-xl"
                        size="large"
                      >
                        <Option value="1">Slot 1 (7:00 - 9:00)</Option>
                        <Option value="2">Slot 2 (9:30 - 11:45)</Option>
                        <Option value="3">Slot 3 (12:30 - 15:00)</Option>
                        <Option value="4">Slot 4 (15:00 - 17:15)</Option>
                      </Select>
                    </div>

                    {/* Tên giảng viên */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên giảng viên
                      </label>
                      <Input
                        placeholder="e.g. Dr. Mark Lee"
                        value={formData.desiredInstructor}
                        onChange={(e) => handleInputChange('desiredInstructor', e.target.value)}
                        className="rounded-xl h-12"
                        size="large"
                      />
                    </div>

                    {/* Teacher Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teacher Code
                      </label>
                      <Input
                        placeholder="e.g. HuyNM"
                        value={formData.desiredTeacherCode}
                        onChange={(e) => handleInputChange('desiredTeacherCode', e.target.value)}
                        className="rounded-xl h-12"
                        size="large"
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <TextArea
                  placeholder="Add any details (optional)"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={6}
                  className="rounded-xl"
                />
              </div>

              {/* Lưu ý validation */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Lưu ý:</span> Cần điền ít nhất một trong các trường: Mã lớp, Thứ, hoặc Slot cho lớp mong muốn
                </p>
              </div>

              {/* Display marketplace requests */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Yêu cầu trên thị trường</h3>
                <ul className="space-y-4">
                  {marketplaceRequests.map(request => (
                    <li key={request.id} className="bg-gray-100 p-4 rounded-lg shadow">
                      <div className="flex justify-between">
                        <span className="font-semibold">{request.subjectName}</span>
                        <span className="text-sm text-gray-600">{request.postedDate}</span>
                      </div>
                      <p className="text-sm text-gray-700">{request.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button 
                  type="primary"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-8 font-semibold"
                  disabled={!formData.currentSubjectName || !formData.currentClassCode}
                >
                  Gửi yêu cầu
                </Button>
                
                <Button 
                  onClick={handleCancel}
                  className="rounded-xl h-12 px-8 font-semibold border-blue-200 text-blue-600 hover:border-blue-400 hover:text-blue-700"
                >
                  Hủy
                </Button>
              </div>

              {/* Help text */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Lưu ý:</p>
                    <ul className="space-y-1 list-disc list-inside text-blue-700">
                      <li>Yêu cầu đổi chéo sẽ được hiển thị công khai để các sinh viên khác có thể xem và liên hệ</li>
                      <li>Vui lòng cung cấp thông tin chính xác để dễ dàng tìm kiếm và kết nối</li>
                      <li>Bạn có thể hủy yêu cầu bất kỳ lúc nào từ trang quản lý đổi chéo lớp</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClassSwapRequest; 