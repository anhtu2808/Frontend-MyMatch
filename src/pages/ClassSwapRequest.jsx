import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input, Button, message } from 'antd';
import { ArrowLeftOutlined, BookOutlined, SwapOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ClassSwapRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Lớp hiện tại
    currentSubjectName: '',
    currentClassCode: '',
    currentSlot: '',
    currentInstructor: '',
    
    // Lớp muốn đổi
    desiredClassName: '',
    desiredClassCode: '',
    desiredSlot: '',
    desiredInstructor: '',
    
    // Ghi chú
    additionalNotes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.currentSubjectName || !formData.currentClassCode || 
        !formData.desiredClassName || !formData.desiredClassCode) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

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
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-8">
              
              {/* Lớp hiện tại của bạn */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <BookOutlined className="text-white text-sm" />
                  </div>
                  Lớp hiện tại của bạn
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tên môn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên môn *
                    </label>
                    <Input
                      placeholder="e.g. Intro to Computer Science"
                      value={formData.currentSubjectName}
                      onChange={(e) => handleInputChange('currentSubjectName', e.target.value)}
                      className="rounded-xl h-12"
                      size="large"
                    />
                  </div>

                  {/* Mã lớp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã lớp *
                    </label>
                    <Input
                      placeholder="e.g. CS101-01"
                      value={formData.currentClassCode}
                      onChange={(e) => handleInputChange('currentClassCode', e.target.value)}
                      className="rounded-xl h-12"
                      size="large"
                    />
                  </div>

                  {/* Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slot
                    </label>
                    <Input
                      placeholder="e.g. Mon 10:00 AM"
                      value={formData.currentSlot}
                      onChange={(e) => handleInputChange('currentSlot', e.target.value)}
                      className="rounded-xl h-12"
                      size="large"
                    />
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
                </div>
              </div>

              {/* Divider with swap icon */}
              <div className="flex items-center justify-center py-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="mx-6 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <SwapOutlined className="text-white text-lg" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              {/* Lớp muốn đổi */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <BookOutlined className="text-white text-sm" />
                  </div>
                  Lớp muốn đổi
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tên lớp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên lớp *
                    </label>
                    <Input
                      placeholder="e.g. Data Structures"
                      value={formData.desiredClassName}
                      onChange={(e) => handleInputChange('desiredClassName', e.target.value)}
                      className="rounded-xl h-12"
                      size="large"
                    />
                  </div>

                  {/* Mã lớp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã lớp *
                    </label>
                    <Input
                      placeholder="e.g. CS102-02"
                      value={formData.desiredClassCode}
                      onChange={(e) => handleInputChange('desiredClassCode', e.target.value)}
                      className="rounded-xl h-12"
                      size="large"
                    />
                  </div>

                  {/* Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slot
                    </label>
                    <Input
                      placeholder="e.g. Tue 1:00 PM"
                      value={formData.desiredSlot}
                      onChange={(e) => handleInputChange('desiredSlot', e.target.value)}
                      className="rounded-xl h-12"
                      size="large"
                    />
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

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button 
                  type="primary"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-8 font-semibold"
                  disabled={!formData.currentSubjectName || !formData.currentClassCode || 
                           !formData.desiredClassName || !formData.desiredClassCode}
                >
                  Nộp yêu cầu
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