import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Input, 
  Tabs, 
  Select, 
  Card, 
  Button, 
  Badge,
  Space,
  Typography,
  Upload,
  Modal,
  Form,
  message,
  Rate
} from 'antd';
import { 
  SearchOutlined, 
  SettingOutlined, 
  FileTextOutlined, 
  BookOutlined, 
  StarOutlined,
  StarFilled,
  UserOutlined,
  UploadOutlined,
  PlusOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const Materials = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([1, 3]);
  const [form] = Form.useForm();

  // Dữ liệu tài liệu mẫu với môn học FPT
  const allMaterialsData = [
    {
      id: 1,
      title: 'EXE101 - Tài liệu thực tập tốt nghiệp',
      uploadedBy: 'anhtu2808',
      timeAgo: '2 ngày trước',
      type: 'pdf',
      course: 'EXE101',
      instructor: 'Thầy Nguyễn Văn A',
      category: 'all',
      downloaded: true,
      rating: 4.5,
      downloads: 125,
      icon: <FileTextOutlined className="text-primary text-xl" />
    },
    {
      id: 2,
      title: 'PRN212 - Bài tập lập trình C#',
      uploadedBy: 'student123',
      timeAgo: '3 ngày trước',
      type: 'pdf',
      course: 'PRN212',
      instructor: 'Cô Trần Thị B',
      category: 'all',
      downloaded: false,
      rating: 4.2,
      downloads: 89,
      icon: <FileTextOutlined className="text-primary text-xl" />
    },
    {
      id: 3,
      title: 'SWE201 - Tài liệu kỹ thuật phần mềm',
      uploadedBy: 'devmaster',
      timeAgo: '5 ngày trước',
      type: 'book',
      course: 'SWE201',
      instructor: 'Thầy Lê Văn C',
      category: 'all',
      downloaded: true,
      rating: 4.8,
      downloads: 203,
      icon: <BookOutlined className="text-primary text-xl" />
    },
    {
      id: 4,
      title: 'DBI202 - Bài tập cơ sở dữ liệu',
      uploadedBy: 'dbexpert',
      timeAgo: '1 tuần trước',
      type: 'pdf',
      course: 'DBI202',
      instructor: 'Thầy Phạm Văn D',
      category: 'all',
      downloaded: false,
      rating: 4.0,
      downloads: 67,
      icon: <FileTextOutlined className="text-primary text-xl" />
    },
    {
      id: 5,
      title: 'WED201 - Hướng dẫn thiết kế web',
      uploadedBy: 'webdev',
      timeAgo: '4 ngày trước',
      type: 'book',
      course: 'WED201',
      instructor: 'Cô Hoàng Thị E',
      category: 'all',
      downloaded: true,
      rating: 4.3,
      downloads: 156,
      icon: <BookOutlined className="text-primary text-xl" />
    }
  ];

  // Lọc dữ liệu theo tab và tìm kiếm
  const getFilteredMaterials = () => {
    let filteredData = allMaterialsData;

    // Lọc theo tab
    if (activeTab === '2') {
      filteredData = filteredData.filter(item => item.downloaded);
    } else if (activeTab === '3') {
      filteredData = filteredData.filter(item => favorites.includes(item.id));
    }

    // Lọc theo tìm kiếm
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (courseCode) {
      filteredData = filteredData.filter(item =>
        item.course.toLowerCase().includes(courseCode.toLowerCase())
      );
    }

    if (instructor) {
      filteredData = filteredData.filter(item =>
        item.instructor.toLowerCase().includes(instructor.toLowerCase())
      );
    }

    return filteredData;
  };

  const handleToggleFavorite = (materialId) => {
    setFavorites(prev => {
      if (prev.includes(materialId)) {
        return prev.filter(id => id !== materialId);
      } else {
        return [...prev, materialId];
      }
    });
  };

  const handleUpload = (values) => {
    console.log('Upload values:', values);
    message.success('Tài liệu đã được tải lên thành công!');
    setIsUploadModalVisible(false);
    form.resetFields();
  };

  const handleViewDetail = (materialId) => {
    navigate(`/materials/${materialId}`);
  };

  const tabItems = [
    {
      key: '1',
      label: 'Tất cả tài liệu',
    },
    {
      key: '2',
      label: 'Tài liệu đã tải',
    },
    {
      key: '3',
      label: 'Tài liệu yêu thích',
    },
  ];

  const filteredMaterials = getFilteredMaterials();

  return (
    <Layout title="Tài liệu học tập" description="Tài nguyên học tập và tài liệu môn học">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Tài liệu học tập</h1>
              <p className="text-gray-600">Nguồn tài liệu và tài nguyên học tập</p>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsUploadModalVisible(true)}
              className="bg-primary hover:bg-primary-hover font-medium"
            >
              Tải tài liệu lên
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-gray-100 rounded-xl p-1">
            <div className="flex space-x-1">
              {tabItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === item.key
                      ? 'bg-white  text-primary border  shadow-sm'
                      : 'text-gray-800 hover:text-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tìm kiếm tài liệu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên tài liệu
              </label>
              <Input
                placeholder="Nhập tên tài liệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suffix={<SearchOutlined className="text-gray-400" />}
                className="rounded-lg"
              />
            </div>

            {/* Course Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã môn học
              </label>
              <Input
                placeholder="VD: EXE101, PRN212"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="rounded-lg"
              />
            </div>

            {/* Instructor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên giảng viên
              </label>
              <Input
                placeholder="VD: Thầy Nguyễn Văn A"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                prefix={<UserOutlined className="text-gray-400" />}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Bộ lọc nhanh:</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCourseCode('EXE101')}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                EXE101
              </button>
              <button 
                onClick={() => setCourseCode('PRN212')}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                PRN212
              </button>
              <button 
                onClick={() => setCourseCode('SWE201')}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                SWE201
              </button>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setCourseCode('');
                  setInstructor('');
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Materials List Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              {activeTab === '1' && `Tất cả tài liệu (${filteredMaterials.length})`}
              {activeTab === '2' && `Tài liệu đã tải (${filteredMaterials.length})`}
              {activeTab === '3' && `Tài liệu yêu thích (${filteredMaterials.length})`}
            </h2>
          </div>
          
          <div className="space-y-4">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {material.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-gray-900">
                            {material.title}
                          </h3>
                          <Rate 
                            disabled 
                            defaultValue={material.rating} 
                            allowHalf 
                            className="text-xs"
                          />
                          <span className="text-gray-500 text-xs">
                            ({material.downloads} lượt tải)
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Tải lên bởi {material.uploadedBy} • {material.timeAgo} • {material.course} • {material.instructor}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetail(material.id)}
                        className="p-2 text-gray-400 hover:text-info hover:bg-info/10 rounded-lg transition-all"
                        title="Xem chi tiết"
                      >
                        <EyeOutlined />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-success hover:bg-success/10 rounded-lg transition-all"
                        title="Tải xuống"
                      >
                        <DownloadOutlined />
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(material.id)}
                        className={`p-2 rounded-lg transition-all ${
                          favorites.includes(material.id) 
                            ? 'text-warning bg-warning/10' 
                            : 'text-gray-400 hover:text-warning hover:bg-warning/10'
                        }`}
                        title={favorites.includes(material.id) ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
                      >
                        {favorites.includes(material.id) ? <StarFilled /> : <StarOutlined />}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileTextOutlined className="text-2xl text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Không tìm thấy tài liệu</h3>
                <p className="text-gray-500">
                  {activeTab === '2' && 'Bạn chưa tải xuống tài liệu nào'}
                  {activeTab === '3' && 'Bạn chưa có tài liệu yêu thích nào'}
                  {activeTab === '1' && 'Không có tài liệu phù hợp với bộ lọc hiện tại'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        <Modal
          title={null}
          open={isUploadModalVisible}
          onCancel={() => setIsUploadModalVisible(false)}
          footer={null}
          width={600}
          centered
        >
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <UploadOutlined className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tải lên tài liệu</h2>
              <p className="text-gray-600">Chia sẻ tài liệu học tập với cộng đồng</p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpload}
            >
              <Form.Item
                name="title"
                label={<span className="text-gray-700 font-medium">Tiêu đề tài liệu</span>}
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
              >
                <Input 
                  placeholder="VD: EXE101 - Tài liệu thực tập tốt nghiệp" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="course"
                label={<span className="text-gray-700 font-medium">Mã môn học</span>}
                rules={[{ required: true, message: 'Vui lòng nhập mã môn học!' }]}
              >
                <Input 
                  placeholder="VD: EXE101, PRN212, SWE201" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="instructor"
                label={<span className="text-gray-700 font-medium">Tên giảng viên</span>}
                rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên!' }]}
              >
                <Input 
                  placeholder="VD: Thầy Nguyễn Văn A, Cô Trần Thị B" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label={<span className="text-gray-700 font-medium">Mô tả (không bắt buộc)</span>}
              >
                <Input.TextArea 
                  placeholder="Mô tả ngắn về nội dung tài liệu..."
                  rows={3}
                  className="rounded-lg"
                />
              </Form.Item>

              {/* Upload File Section */}
              <Form.Item
                name="file"
                label={<span className="text-gray-700 font-medium">Tệp tài liệu</span>}
                rules={[{ required: true, message: 'Vui lòng chọn tệp!' }]}
              >
                <Upload.Dragger
                  name="file"
                  multiple={false}
                  beforeUpload={() => false}
                  className="rounded-xl border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50 hover:bg-primary/5"
                >
                  <div className="py-8">
                    <UploadOutlined className="text-3xl text-primary mb-4" />
                    <p className="text-gray-600 mb-2">
                      <span className="text-primary font-medium cursor-pointer">
                        Chọn tệp
                      </span>
                      {' '}hoặc kéo thả vào đây
                    </p>
                    <p className="text-gray-400 text-sm">
                      Hỗ trợ PDF, DOC, DOCX, PPT, PPTX tối đa 10MB
                    </p>
                  </div>
                </Upload.Dragger>
              </Form.Item>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button 
                  onClick={() => setIsUploadModalVisible(false)}
                  className="px-6 border-gray-300 text-gray-700 hover:border-gray-400"
                >
                  Hủy
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="bg-primary hover:bg-primary-hover px-6 font-medium"
                >
                  Tải lên
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Materials;