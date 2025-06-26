import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Button, 
  Card, 
  Typography, 
  Rate, 
  Tag, 
  Space, 
  Avatar, 
  Divider,
  Input,
  Form,
  message
} from 'antd';
import { 
  ArrowLeftOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled,
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [materialData, setMaterialData] = useState(null);
  const [form] = Form.useForm();

  // Mock data - trong thực tế sẽ fetch từ API dựa trên id
  useEffect(() => {
    // Simulate API call với id
    const fetchMaterialData = () => {
      const mockData = {
        1: {
          id: 1,
          title: 'Ôn thi môn giảng CS101',
          course: 'CS101',
          instructor: 'Dr. Smith',
          uploadedBy: 'Jamie',
          uploadDate: '2024-01-15',
          timeAgo: '2 days ago',
          rating: 4.5,
          totalRatings: 24,
          downloads: 125,
          fileSize: '2.5 MB',
          fileType: 'PDF',
          description: 'Tài liệu ôn thi môn CS101 bao gồm các chủ đề chính: thuật toán cơ bản, cấu trúc dữ liệu, và lập trình hướng đối tượng. Tài liệu được tổng hợp từ các bài giảng và bài tập thực hành.',
          tags: ['Computer Science', 'Programming', 'Algorithms'],
          image: '/api/placeholder/600/300'
        },
        2: {
          id: 2,
          title: 'PHYS110 Formula Sheet',
          course: 'PHYS110',
          instructor: 'Dr. Johnson',
          uploadedBy: 'Sam',
          uploadDate: '2024-01-12',
          timeAgo: '3 days ago',
          rating: 4.2,
          totalRatings: 18,
          downloads: 89,
          fileSize: '1.8 MB',
          fileType: 'PDF',
          description: 'Tổng hợp các công thức vật lý cơ bản cho môn PHYS110, bao gồm cơ học, nhiệt học và điện từ học.',
          tags: ['Physics', 'Formulas', 'Science'],
          image: '/api/placeholder/600/300'
        }
      };
      
      return mockData[id] || mockData[1]; // Fallback to first material if id not found
    };

    setMaterialData(fetchMaterialData());
  }, [id]);

  const handleBack = () => {
    navigate('/materials');
  };

  const handleDownload = () => {
    message.success(`Đang tải xuống tài liệu ${materialData?.title}...`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    message.success(isFavorite ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích');
  };

  const handleRatingSubmit = (values) => {
    console.log('Rating submitted:', { 
      materialId: id,
      rating: userRating, 
      comment: values.comment 
    });
    message.success('Đánh giá của bạn đã được gửi!');
    form.resetFields();
    setUserRating(0);
  };

  // Loading state
  if (!materialData) {
    return (
      <Layout title="Chi tiết tài liệu" description="Đang tải...">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Text>Đang tải thông tin tài liệu...</Text>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Chi tiết tài liệu" description="Xem thông tin chi tiết tài liệu">
      {/* Back Button */}
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={handleBack}
        className="mb-6"
        size="large"
      >
        Quay lại
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Material Image */}
          <Card className="mb-6 overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=400&q=80"
                alt={materialData.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <Tag color="blue" className="text-sm font-medium">
                  {materialData.fileType}
                </Tag>
              </div>
            </div>
          </Card>

          {/* Material Info */}
          <Card className="mb-6">
            <div className="mb-4">
              <Title level={2} className="!mb-2">
                {materialData.title}
              </Title>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Rate disabled defaultValue={materialData.rating} allowHalf />
                  <Text className="text-gray-600">
                    {materialData.rating} ({materialData.totalRatings} đánh giá)
                  </Text>
                </div>
                <Text className="text-gray-500">
                  {materialData.downloads} lượt tải
                </Text>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {materialData.tags.map(tag => (
                  <Tag key={tag} color="blue-inverse">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            <Divider />

            {/* Course Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Text strong className="block text-gray-700 mb-1">Môn học:</Text>
                <Text>{materialData.course}</Text>
              </div>
              <div>
                <Text strong className="block text-gray-700 mb-1">Giảng viên:</Text>
                <Text>{materialData.instructor}</Text>
              </div>
              <div>
                <Text strong className="block text-gray-700 mb-1">Kích thước:</Text>
                <Text>{materialData.fileSize}</Text>
              </div>
              <div>
                <Text strong className="block text-gray-700 mb-1">Ngày tải lên:</Text>
                <Text>{materialData.timeAgo}</Text>
              </div>
            </div>

            <Divider />

            {/* Description */}
            <div className="mb-6">
              <Title level={4} className="!mb-3">Mô tả</Title>
              <Paragraph className="text-gray-700 leading-relaxed">
                {materialData.description}
              </Paragraph>
            </div>

            <Divider />

            {/* Uploader Info */}
            <div className="flex items-center space-x-3">
              <Avatar size={40} icon={<UserOutlined />} />
              <div>
                <Text strong>Được tải lên bởi {materialData.uploadedBy}</Text>
                <br />
                <Text className="text-gray-500 text-sm">
                  <CalendarOutlined className="mr-1" />
                  {materialData.uploadDate}
                </Text>
              </div>
            </div>
          </Card>

          {/* Rating Section */}
          <Card title="Đánh giá tài liệu">
            <Form form={form} onFinish={handleRatingSubmit} layout="vertical">
              <Form.Item label="Đánh giá của bạn">
                <Rate 
                  value={userRating} 
                  onChange={setUserRating}
                  className="mb-4"
                />
              </Form.Item>
              
              <Form.Item 
                name="comment"
                label="Nhận xét"
                rules={[{ required: true, message: 'Vui lòng nhập nhận xét!' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="Chia sẻ nhận xét của bạn về tài liệu này..."
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  disabled={userRating === 0}
                  className="bg-blue-600"
                >
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileTextOutlined className="text-2xl text-blue-600" />
              </div>
              <Title level={4} className="!mb-2">
                Tải xuống tài liệu
              </Title>
              <Text className="text-gray-600">
                Tài liệu chất lượng cao
              </Text>
            </div>

            <Space direction="vertical" className="w-full" size="middle">
              <Button 
                type="primary" 
                size="large" 
                icon={<DownloadOutlined />}
                onClick={handleDownload}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Tải xuống
              </Button>
              
              <Button 
                size="large" 
                icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                onClick={handleToggleFavorite}
                className={`w-full ${isFavorite ? 'text-yellow-500 border-yellow-500' : ''}`}
              >
                {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
              </Button>
            </Space>

            <Divider />

            <div className="space-y-3">
              <div className="flex justify-between">
                <Text className="text-gray-600">Định dạng:</Text>
                <Text strong>{materialData.fileType}</Text>
              </div>
              <div className="flex justify-between">
                <Text className="text-gray-600">Kích thước:</Text>
                <Text strong>{materialData.fileSize}</Text>
              </div>
              <div className="flex justify-between">
                <Text className="text-gray-600">Lượt tải:</Text>
                <Text strong>{materialData.downloads}</Text>
              </div>
              <div className="flex justify-between">
                <Text className="text-gray-600">Đánh giá:</Text>
                <div className="flex items-center space-x-1">
                  <Rate disabled defaultValue={materialData.rating} allowHalf className="text-xs" />
                  <Text strong>{materialData.rating}</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialDetail;
