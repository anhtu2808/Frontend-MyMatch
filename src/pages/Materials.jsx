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
  UpOutlined,
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

  // Dữ liệu tài liệu mẫu
  const allMaterialsData = [
    {
      id: 1,
      title: 'CS101 Lecture Notes',
      uploadedBy: 'Jamie',
      timeAgo: '2 days ago',
      type: 'pdf',
      course: 'CS101',
      instructor: 'Dr. Smith',
      category: 'all',
      downloaded: true,
      rating: 4.5,
      downloads: 125,
      icon: <FileTextOutlined className="text-blue-500 text-xl" />
    },
    {
      id: 2,
      title: 'PHYS110 Formula Sheet',
      uploadedBy: 'Sam',
      timeAgo: '3 days ago',
      type: 'pdf',
      course: 'PHYS110',
      instructor: 'Dr. Johnson',
      category: 'all',
      downloaded: false,
      rating: 4.2,
      downloads: 89,
      icon: <FileTextOutlined className="text-blue-500 text-xl" />
    },
    {
      id: 3,
      title: 'HIST202 Reading Guide',
      uploadedBy: 'Taylor',
      timeAgo: '5 days ago',
      type: 'book',
      course: 'HIST202',
      instructor: 'Dr. Emily Carter',
      category: 'all',
      downloaded: true,
      rating: 4.8,
      downloads: 203,
      icon: <BookOutlined className="text-blue-500 text-xl" />
    },
    {
      id: 4,
      title: 'MATH101 Practice Problems',
      uploadedBy: 'Alex',
      timeAgo: '1 week ago',
      type: 'pdf',
      course: 'MATH101',
      instructor: 'Dr. Wilson',
      category: 'all',
      downloaded: false,
      rating: 4.0,
      downloads: 67,
      icon: <FileTextOutlined className="text-blue-500 text-xl" />
    },
    {
      id: 5,
      title: 'ENG201 Essay Guidelines',
      uploadedBy: 'Jordan',
      timeAgo: '4 days ago',
      type: 'book',
      course: 'ENG201',
      instructor: 'Dr. Brown',
      category: 'all',
      downloaded: true,
      rating: 4.3,
      downloads: 156,
      icon: <BookOutlined className="text-blue-500 text-xl" />
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
      label: 'Tài liệu được tôi yêu thích',
    },
  ];

  const filteredMaterials = getFilteredMaterials();

  return (
    <Layout title="Materials" description="Tài nguyên học tập và giảng viên">
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title level={2} className="!text-blue-600 !mb-0">
                Materials
              </Title>
              <Text className="text-gray-600">
                Nguồn tài liệu
              </Text>
            </div>
            <Text className="text-gray-600">
              Tài nguyên học tập
            </Text>
          </div>

          {/* Navigation Tabs */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="materials-tabs"
            size="large"
          />
        </div>

        {/* Search Section */}
        <div className="px-6 py-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div>
              <Text strong className="block mb-2 text-gray-700">
                Tên tài liệu
              </Text>
              <Input
                placeholder="Tên tài liệu"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suffix={<SearchOutlined className="text-gray-400" />}
                size="large"
                className="w-full"
              />
            </div>

            {/* Course Code */}
            <div>
              <Text strong className="block mb-2 text-gray-700">
                Mã môn học
              </Text>
              <Input
                placeholder="e.g. CS101"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                size="large"
                className="w-full"
              />
            </div>

            {/* Instructor */}
            <div>
              <Text strong className="block mb-2 text-gray-700">
                Tên giảng viên
              </Text>
              <Input
                placeholder="e.g. Dr. Emily Carter"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                prefix={<UserOutlined className="text-gray-400" />}
                size="large"
                className="w-full"
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <Text strong className="text-gray-700">
                Nhóm của tôi
              </Text>
              <Select
                defaultValue="settings"
                size="large"
                className="w-32"
                suffixIcon={<SettingOutlined />}
              >
                <Option value="settings">Cài đặt</Option>
                <Option value="group1">Nhóm 1</Option>
                <Option value="group2">Nhóm 2</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Materials List Section */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <Title level={4} className="!mb-0 text-gray-900">
              Tài liệu cá nhân đầu
            </Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsUploadModalVisible(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Tải tài liệu lên
            </Button>
          </div>
          
          <div className="space-y-4">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="hover:shadow-md transition-shadow border border-gray-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        {material.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Title level={5} className="!mb-0 text-gray-900">
                            {material.title}
                          </Title>
                          <Rate 
                            disabled 
                            defaultValue={material.rating} 
                            allowHalf 
                            className="text-xs"
                          />
                          <Text className="text-gray-500 text-xs">
                            ({material.downloads} downloads)
                          </Text>
                        </div>
                        <Text className="text-gray-500 text-sm">
                          Uploaded by {material.uploadedBy}, {material.timeAgo} • {material.course} • {material.instructor}
                        </Text>
                      </div>
                    </div>
                    
                    <Space>
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        className="text-gray-400 hover:text-blue-600"
                        onClick={() => handleViewDetail(material.id)}
                      />
                      <Button
                        type="text"
                        icon={<DownloadOutlined />}
                        className="text-gray-400 hover:text-green-600"
                      />
                      <Button
                        type="text"
                        icon={favorites.includes(material.id) ? <StarFilled /> : <StarOutlined />}
                        className={`${
                          favorites.includes(material.id) 
                            ? 'text-yellow-500' 
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                        onClick={() => handleToggleFavorite(material.id)}
                      />
                    </Space>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Text className="text-gray-500">
                  {activeTab === '2' && 'Chưa có tài liệu đã tải'}
                  {activeTab === '3' && 'Chưa có tài liệu yêu thích'}
                  {activeTab === '1' && 'Không tìm thấy tài liệu phù hợp'}
                </Text>
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
          className="upload-modal"
          bodyStyle={{ padding: '40px' }}
        >
          <div className="text-center mb-8">
            <Title level={3} className="!text-blue-600 !mb-2">
              Tải lên tài liệu
            </Title>
            <Text className="text-gray-600">
              Thêm nguồn tài liệu mới
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpload}
            className="upload-form"
          >
            <Form.Item
              name="title"
              label={<span className="text-gray-700 font-medium">Tiêu đề</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
              className="mb-6"
            >
              <Input 
                placeholder="Nhập tiêu đề tài liệu" 
                size="large" 
                className="rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              name="course"
              label={<span className="text-gray-700 font-medium">Mã môn học</span>}
              rules={[{ required: true, message: 'Vui lòng nhập mã môn học!' }]}
              className="mb-6"
            >
              <Input 
                placeholder="e.g. CS101" 
                size="large" 
                className="rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              name="instructor"
              label={<span className="text-gray-700 font-medium">Tên giảng viên</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên!' }]}
              className="mb-6"
            >
              <Input 
                placeholder="e.g. Dr. Emily Carter" 
                size="large" 
                className="rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-gray-700 font-medium">Mô tả</span>}
              className="mb-8"
            >
              <Input.TextArea 
                placeholder="Mô tả ngắn về tài liệu (tùy chọn)"
                rows={3}
                className="rounded-lg border-gray-300"
              />
            </Form.Item>

            {/* Upload File Section */}
            <div className="mb-8">
              <Text className="text-blue-600 font-medium block mb-4">
                Upload File
              </Text>
              <Form.Item
                name="file"
                rules={[{ required: true, message: 'Vui lòng chọn tệp!' }]}
              >
                <Upload.Dragger
                  name="file"
                  multiple={false}
                  beforeUpload={() => false}
                  className="upload-dragger-custom"
                  style={{
                    background: '#f8fafc',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '40px 20px'
                  }}
                >
                  <div className="text-center">
                    <UploadOutlined className="text-3xl text-blue-500 mb-3" />
                    <p className="text-gray-600 mb-1">
                      <span className="text-blue-600 font-medium cursor-pointer">
                        Choose file
                      </span>
                      {' '}or drag it here
                    </p>
                    <p className="text-gray-400 text-sm">
                      PDF, DOC, DOCX, PPT, PPTX up to 10MB
                    </p>
                  </div>
                </Upload.Dragger>
              </Form.Item>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 px-8 rounded-lg font-medium"
              >
                Submit
              </Button>
              <Button 
                onClick={() => setIsUploadModalVisible(false)}
                size="large"
                className="px-8 rounded-lg font-medium border-gray-300 text-gray-600 hover:border-gray-400"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>

        <style jsx>{`
          .materials-tabs .ant-tabs-tab {
            font-weight: 500;
            color: #9CA3AF;
          }
          .materials-tabs .ant-tabs-tab-active {
            color: #000000 !important;
            font-weight: 600;
          }
          .materials-tabs .ant-tabs-ink-bar {
            background: #000000;
            height: 2px;
          }
          
          .upload-modal .ant-modal-content {
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .upload-form .ant-form-item-label > label {
            font-weight: 500;
            color: #374151;
          }
          
          .upload-dragger-custom.ant-upload-drag:hover {
            border-color: #3b82f6;
            background: #eff6ff;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Materials;