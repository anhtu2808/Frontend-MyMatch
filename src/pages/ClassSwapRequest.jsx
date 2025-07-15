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
      id: Date.now(),
      subjectCode: formData.currentSubjectName,
      subjectName: formData.currentSubjectName,
      studentName: 'anhtu2808',
      studentEmail: 'anhtu2808@fpt.edu.vn',
      studentAvatar: '👨‍🎓',
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
      tags: ['Yêu cầu mới'],
      priority: 'medium',
      contactPreference: 'Email'
    };

    setMarketplaceRequests(prev => [...prev, newRequest]);
    console.log('Class swap request:', formData);
    message.success('Yêu cầu đổi chéo lớp đã được gửi thành công!');

    setTimeout(() => {
      navigate('/exchange');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/exchange');
  };

  return (
    <Layout
      title="Tạo yêu cầu đổi chéo lớp"
      description="Điền thông tin để tạo yêu cầu đổi chéo lớp"
    >
      <div className="space-y-8">

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">

            {/* Môn học chung */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center mr-3">
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
                  className="w-full"
                  size="large"
                >
                  <Option value="SWE201">SWE201 - Software Engineering</Option>
                  <Option value="DBI202">DBI202 - Database Systems</Option>
                  <Option value="PRJ301">PRJ301 - Web Development</Option>
                  <Option value="CSD201">CSD201 - Data Structures</Option>
                  <Option value="NWC203">NWC203 - Computer Networks</Option>
                  <Option value="PRO192">PRO192 - Object-Oriented Programming</Option>
                  <Option value="MLN122">MLN122 - Machine Learning</Option>
                  <Option value="MOB401">MOB401 - Mobile Development</Option>
                </Select>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="relative">
              {/* Swap Icon */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <SwapOutlined className="text-white text-lg" />
                </div>
              </div>

              <div className="lg:hidden flex justify-center mb-6">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <SwapOutlined className="text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Lớp hiện tại */}
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                      <BookOutlined className="text-white text-sm" />
                    </div>
                    Lớp hiện tại của bạn
                  </h2>

                  <div className="space-y-4">
                    {/* Mã lớp */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã lớp *
                      </label>
                      <Input
                        placeholder="VD: SE1704"
                        value={formData.currentClassCode}
                        onChange={(e) => handleInputChange('currentClassCode', e.target.value)}
                        className="rounded-lg"
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
                        className="w-full"
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
                        className="w-full"
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
                        placeholder="VD: Nguyễn Văn A"
                        value={formData.currentInstructor}
                        onChange={(e) => handleInputChange('currentInstructor', e.target.value)}
                        className="rounded-lg"
                        size="large"
                      />
                    </div>

                    {/* Teacher Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã giảng viên
                      </label>
                      <Input
                        placeholder="VD: LamNN2"
                        value={formData.currentTeacherCode}
                        onChange={(e) => handleInputChange('currentTeacherCode', e.target.value)}
                        className="rounded-lg"
                        size="large"
                      />
                    </div>
                  </div>
                </div>

                {/* Lớp muốn đổi */}
                <div className="bg-success/5 rounded-2xl p-6 border border-success/20">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center mr-3">
                      <BookOutlined className="text-white text-sm" />
                    </div>
                    Lớp muốn đổi
                  </h2>

                  <div className="space-y-4">
                    {/* Mã lớp */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã lớp
                      </label>
                      <Input
                        placeholder="VD: SE1705"
                        value={formData.desiredClassCode}
                        onChange={(e) => handleInputChange('desiredClassCode', e.target.value)}
                        className="rounded-lg"
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
                        className="w-full"
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
                        className="w-full"
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
                        placeholder="VD: Trần Thị B"
                        value={formData.desiredInstructor}
                        onChange={(e) => handleInputChange('desiredInstructor', e.target.value)}
                        className="rounded-lg"
                        size="large"
                      />
                    </div>

                    {/* Teacher Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã giảng viên
                      </label>
                      <Input
                        placeholder="VD: HuyNM"
                        value={formData.desiredTeacherCode}
                        onChange={(e) => handleInputChange('desiredTeacherCode', e.target.value)}
                        className="rounded-lg"
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
                Lý do muốn đổi lớp
              </label>
              <TextArea
                placeholder="Mô tả lý do bạn muốn đổi lớp (không bắt buộc)"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={4}
                className="rounded-lg"
              />
            </div>

            {/* Validation Note */}
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm text-warning font-medium">
                  Cần điền ít nhất một trong các trường: Mã lớp, Thứ, hoặc Slot cho lớp mong muốn
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                onClick={handleCancel}
                className="rounded-lg h-12 px-8 font-medium border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
              >
                Hủy
              </Button>
              <button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary-hover text-white rounded-lg h-12 px-8 font-medium"
                disabled={!formData.currentSubjectName || !formData.currentClassCode}
              >
                Gửi yêu cầu
              </button>
            </div>

            {/* Help Section */}
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-info">
                  <p className="font-medium mb-2">Lưu ý:</p>
                  <ul className="space-y-1 text-info/80">
                    <li>• Yêu cầu đổi chéo sẽ được hiển thị công khai để các sinh viên khác có thể xem và liên hệ</li>
                    <li>• Vui lòng cung cấp thông tin chính xác để dễ dàng tìm kiếm và kết nối</li>
                    <li>• Bạn có thể hủy yêu cầu bất kỳ lúc nào từ trang quản lý đổi chéo lớp</li>
                  </ul>
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