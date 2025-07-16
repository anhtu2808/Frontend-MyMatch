import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input, Button, Upload, Select } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

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

  const universities = [
    'FPT University (Hà Nội)',
    'FPT University (TP.HCM)',
    'FPT University (Cần Thơ)',
    'FPT University (Đà Nẵng)',
    'FPT University (Quy Nhơn)',
  ];
  // Danh sách môn học
  const availableSubjects = [
    { code: 'EXE101', name: 'Thực tập tốt nghiệp', department: 'CNTT' },
    { code: 'PRN212', name: 'Lập trình C# cơ bản', department: 'CNTT' },
    { code: 'SWE201', name: 'Kỹ thuật phần mềm', department: 'CNTT' },
    { code: 'DBI202', name: 'Cơ sở dữ liệu', department: 'CNTT' },
    { code: 'WED201', name: 'Thiết kế web', department: 'CNTT' },
    { code: 'LAB211', name: 'Lập trình Java', department: 'CNTT' },
    { code: 'MAS291', name: 'Toán rời rạc', department: 'Toán học' },
    { code: 'OSG202', name: 'Hệ điều hành', department: 'CNTT' },
    { code: 'MLN111', name: 'Marketing cơ bản', department: 'Kinh tế' },
    { code: 'BUS101', name: 'Quản trị doanh nghiệp', department: 'Kinh tế' },
    { code: 'ACC101', name: 'Kế toán căn bản', department: 'Kinh tế' },
    { code: 'ENG101', name: 'Tiếng Anh 1', department: 'Ngoại ngữ' },
    { code: 'ENG201', name: 'Tiếng Anh 2', department: 'Ngoại ngữ' },
    { code: 'PHY101', name: 'Vật lý đại cương', department: 'Vật lý' },
    { code: 'CHE101', name: 'Hóa học đại cương', department: 'Hóa học' }
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

  // const handleUpload = (info) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     photo: info.file
  //   }));
  // };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    navigate('/teachers/review');
  };

  // const uploadProps = {
  //   name: 'file',
  //   beforeUpload: () => false,
  //   onChange: handleUpload,
  //   showUploadList: false,
  // };

  return (
    <Layout
      title="Thêm giảng viên"
      description="Thêm thông tin giảng viên mới vào hệ thống"
    >
      <div className="space-y-6">


        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">
            {/* Thông tin giảng viên */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin giảng viên</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <Input
                    placeholder="Nhập họ và tên"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="rounded-lg h-12"
                    size="large"
                  />
                </div>

                {/* Khoa/Bộ môn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoa/Bộ môn *
                  </label>
                  <Select
                    placeholder="Chọn khoa/bộ môn"
                    value={formData.department}
                    onChange={(value) => handleInputChange('department', value)}
                    className="w-full"
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
                   <Select
                    placeholder="Chọn trường đại học"
                    value={formData.university}
                    onChange={(value) => handleInputChange('university', value)}
                    className="w-full"
                    size="large"
                  >
                    {universities.map(uni => (
                      <Option key={uni} value={uni}>{uni}</Option>
                    ))}
                  </Select>
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (không bắt buộc)
                  </label>
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-lg h-12"
                    size="large"
                  />
                </div>
              </div>
            </div>

            {/* Ảnh đại diện */}
            {/* <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ảnh đại diện (không bắt buộc)</h3>
              
              <div className="flex items-start space-x-6">
                <Upload {...uploadProps}>
                  <Button 
                    icon={<UploadOutlined />}
                    className="h-12 px-6 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
                  >
                    Tải ảnh lên
                  </Button>
                </Upload>
                
                {formData.photo && (
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <UserOutlined className="text-2xl text-gray-400" />
                  </div>
                )}
              </div>
            </div> */}

            {/* Môn học giảng dạy */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Môn học giảng dạy</h3>

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
                <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="text-sm font-medium text-primary mb-3">
                    Đã chọn {formData.selectedSubjects.length} môn học:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.selectedSubjects.map(subject => (
                      <div
                        key={subject.code}
                        className="bg-white p-3 rounded-lg border border-primary/20"
                      >
                        <div className="font-medium text-gray-900">{subject.code}</div>
                        <div className="text-sm text-gray-700">{subject.name}</div>
                        <div className="text-xs text-gray-600">{subject.department}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-info">
                  <p className="font-medium mb-2">Lưu ý:</p>
                  <ul className="space-y-1 text-info/80">
                    <li>• Tất cả thông tin sẽ được quản trị viên xem xét và xác minh</li>
                    <li>• Vui lòng cung cấp thông tin chính xác và đầy đủ</li>
                    <li>• Giảng viên sẽ được thông báo sau khi được phê duyệt</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                onClick={() => navigate('/teachers/add-review')}
                className="px-8 h-12 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
              >
                Bước trước
              </Button>

              <button
                type="primary"
                onClick={handleSubmit}
                className="bg-primary text-white hover:bg-primary-hover px-8 h-12 font-medium rounded-lg"
                disabled={!formData.fullName || !formData.department || !formData.university || formData.selectedSubjects.length === 0}
              >
                Lưu thông tin
              </button>
            </div>


          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddTeacher;