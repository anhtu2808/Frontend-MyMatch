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
  message,
  Modal
} from 'antd';
import { 
  ArrowLeftOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled,
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
  LockOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { 
  earnCoins, 
  selectCurrentUser, 
  spendCoins
} from '../store/slices/userSlice';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [materialData, setMaterialData] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const coinsBalance = currentUser?.coins || 0;
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Chi phí tải xuống
  const DOWNLOAD_COST = 10;

  // Mock data - trong thực tế sẽ fetch từ API dựa trên id
  useEffect(() => {
    // Simulate API call với id
    const fetchMaterialData = () => {
      const mockData = {
        1: {
          id: 1,
          title: "Ôn thi môn giảng CS101",
          description: "Tài liệu tổng hợp kiến thức và bài tập môn CS101",
          course: "CS101 - Nhập môn lập trình",
          instructor: "Dr. John Smith",
          fileType: "PDF",
          fileSize: "2.5 MB",
          downloads: 125,
          rating: 4.5,
          totalRatings: 24,
          timeAgo: "2 ngày trước",
          uploadedBy: "Alex Johnson",
          uploadDate: "20/02/2024",
          tags: ["Computer Science", "Programming", "Algorithms"],
          fileUrl: "/materials/CS101-review.pdf"
        },
        2: {
          id: 2,
          title: 'PHYS110 Formula Sheet',
          course: 'PHYS110',
          instructor: 'Dr. Johnson',
          uploadedBy: 'Sam',
          uploadDate: '2024-01-12',
          timeAgo: '3 ngày trước',
          rating: 4.2,
          totalRatings: 18,
          downloads: 89,
          fileSize: '1.8 MB',
          fileType: 'PDF',
          description: 'Tổng hợp các công thức vật lý cơ bản cho môn PHYS110, bao gồm cơ học, nhiệt học và điện từ học.',
          tags: ['Physics', 'Formulas', 'Science'],
          fileUrl: "/materials/PHYS110-formulas.pdf"
        }
      };
      
      return mockData[id] || mockData[1]; // Fallback to first material if id not found
    };

    setMaterialData(fetchMaterialData());
  }, [id]);

  const handleBack = () => {
    navigate('/materials');
  };

  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true);
  };

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  const downloadFile = async (url, filename) => {
    try {
      // Tạo file PDF mock với nội dung thực tế
      const createMockPDF = () => {
        // Tạo nội dung PDF đơn giản nhưng hợp lệ
        const canvas = document.createElement('canvas');
        canvas.width = 595; // A4 width in points
        canvas.height = 842; // A4 height in points
        const ctx = canvas.getContext('2d');
        
        // Nền trắng
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Tiêu đề
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(materialData.title, canvas.width / 2, 100);
        
        // Nội dung
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        const content = [
          'Tài liệu học tập chất lượng cao',
          '',
          'Nội dung bao gồm:',
          '• Lý thuyết cơ bản',
          '• Bài tập thực hành',
          '• Ví dụ minh họa',
          '• Đáp án chi tiết',
          '',
          'Được biên soạn bởi: ' + materialData.instructor,
          'Ngày tải: ' + new Date().toLocaleDateString('vi-VN'),
          '',
          'Chúc bạn học tập hiệu quả!'
        ];
        
        content.forEach((line, index) => {
          ctx.fillText(line, 50, 150 + (index * 25));
        });
        
        return canvas.toDataURL('image/png');
      };

      if (url.includes("/materials/")) {
        // Tạo PDF từ canvas
        const imgData = createMockPDF();
        
        // Chuyển đổi thành blob
        const link = document.createElement('a');
        link.href = imgData;
        link.download = filename.replace('.pdf', '.png'); // Tạm thời download như PNG
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
      } else {
        // Nếu là URL thật, dùng fetch
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
        return true;
      }
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      return false;
    }
  };

  const handleDownloadConfirm = async () => {
    // Kiểm tra số xu trước khi tải
    if (coinsBalance < DOWNLOAD_COST) {
      message.error('Số xu không đủ để tải tài liệu!');
      setIsDownloadModalOpen(false);
      return;
    }

    try {
      // Trừ xu trước khi tải
      dispatch(spendCoins(DOWNLOAD_COST));
      
      // Thực hiện tải file
      const downloadSuccess = await downloadFile(
        materialData.fileUrl,
        `${materialData.title}.pdf`
      );
      
      if (downloadSuccess) {
        message.success(`Đã tải xuống thành công tài liệu "${materialData.title}"!`);
      } else {
        // Hoàn lại xu nếu tải file thất bại
        dispatch(earnCoins(DOWNLOAD_COST));
        message.error('Có lỗi xảy ra khi tải file. Đã hoàn lại xu cho bạn!');
      }
    } catch (error) {
      // Hoàn lại xu nếu có lỗi
      dispatch(earnCoins(DOWNLOAD_COST));
      message.error(`Có lỗi xảy ra khi tải file: ${error.message}. Đã hoàn lại xu cho bạn!`);
    }
    
    setIsDownloadModalOpen(false);
  };

  const handleDownloadCancel = () => {
    setIsDownloadModalOpen(false);
  };

  const handlePreviewCancel = () => {
    setIsPreviewModalOpen(false);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    message.success(isFavorite ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích');
  };

  const handleRatingSubmit = (values) => {
    console.log('Đánh giá đã gửi:', { 
      materialId: id,
      rating: userRating, 
      comment: values.comment 
    });
    message.success('Đánh giá của bạn đã được gửi!');
    form.resetFields();
    setUserRating(0);
  };

  // Mock preview content
  const previewContent = `
# Chương 1: Giới thiệu về Machine Learning

Machine Learning (ML) là một nhánh của trí tuệ nhân tạo (AI) tập trung vào việc phát triển các hệ thống có khả năng học hỏi từ dữ liệu.

## 1.1 Định nghĩa Machine Learning

Machine Learning là quá trình một hệ thống máy tính cải thiện hiệu suất của nó trên một tác vụ thông qua kinh nghiệm...

## 1.2 Các loại Machine Learning

1. Học có giám sát (Supervised Learning)
2. Học không giám sát (Unsupervised Learning)
3. Học tăng cường (Reinforcement Learning)

## 1.3 Ứng dụng của Machine Learning

Machine Learning được ứng dụng rộng rãi trong nhiều lĩnh vực...

# Chương 2: Chuẩn bị dữ liệu

## 2.1 Thu thập dữ liệu

Quá trình thu thập dữ liệu là bước đầu tiên và quan trọng nhất...

## 2.2 Tiền xử lý dữ liệu

Các bước tiền xử lý dữ liệu bao gồm:
1. Làm sạch dữ liệu
2. Chuẩn hóa
3. Xử lý missing values

## 2.3 Chia tập dữ liệu

Chia dữ liệu thành các tập training, validation và test...

# Chương 3: Các thuật toán cơ bản

## 3.1 Linear Regression

Linear Regression là một trong những thuật toán đơn giản nhất...

## 3.2 Decision Trees

Decision Trees sử dụng cấu trúc cây để đưa ra quyết định...`;

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
                Tài liệu học tập
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
                onClick={handleDownloadClick}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={coinsBalance < DOWNLOAD_COST}
              >
                Tải xuống ({DOWNLOAD_COST} xu)
              </Button>
              
              <Button 
                size="large" 
                icon={<EyeOutlined />}
                onClick={handlePreviewClick}
                className="w-full"
                type="default"
              >
                Xem trước
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

            {/* Thông tin xu của người dùng */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <Text className="text-blue-700 font-medium">Số xu hiện tại:</Text>
                <Text strong className="text-blue-600 text-lg">{coinsBalance} xu</Text>
              </div>
              {coinsBalance < DOWNLOAD_COST && (
                <Text className="text-red-500 text-sm">
                  ⚠️ Không đủ xu để tải tài liệu này
                </Text>
              )}
            </div>

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

      {/* Download Modal */}
      <Modal
        title="Xác nhận tải xuống"
        open={isDownloadModalOpen}
        onOk={handleDownloadConfirm}
        onCancel={handleDownloadCancel}
        okText="Xác nhận tải xuống"
        cancelText="Hủy"
        okButtonProps={{
          disabled: coinsBalance < DOWNLOAD_COST,
          className: "bg-blue-600"
        }}
      >
        <div className="space-y-4">
          <p>Bạn có muốn tải xuống tài liệu <strong>"{materialData?.title}"</strong> không?</p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>Chi phí tải xuống:</span>
              <span className="font-semibold text-yellow-600">{DOWNLOAD_COST} xu</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Số dư hiện tại:</span>
              <span className="font-semibold text-blue-600">{coinsBalance} xu</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span>Số dư sau khi tải:</span>
              <span className={`font-semibold ${coinsBalance >= DOWNLOAD_COST ? 'text-green-600' : 'text-red-600'}`}>
                {coinsBalance >= DOWNLOAD_COST ? (coinsBalance - DOWNLOAD_COST) : 'Không đủ'} xu
              </span>
            </div>
          </div>

          {coinsBalance < DOWNLOAD_COST && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium mb-2">⚠️ Số xu không đủ!</p>
              <p className="text-red-600 text-sm">
                Bạn cần thêm <strong>{DOWNLOAD_COST - coinsBalance} xu</strong> để tải tài liệu này.
                Hãy kiếm xu bằng cách:
              </p>
              <ul className="text-red-600 text-sm mt-2 ml-4">
                <li>• Đánh giá giảng viên (+100 xu)</li>
                <li>• Tải lên tài liệu mới (+20 xu)</li>
                <li>• Xem quảng cáo (+10 xu)</li>
              </ul>
            </div>
          )}
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        title={`Xem trước: ${materialData?.title}`}
        open={isPreviewModalOpen}
        onCancel={handlePreviewCancel}
        width={800}
        footer={[
          <Button key="close" onClick={handlePreviewCancel}>
            Đóng
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={() => {
              setIsPreviewModalOpen(false);
              setIsDownloadModalOpen(true);
            }}
            className="bg-blue-600"
            disabled={coinsBalance < DOWNLOAD_COST}
          >
            Tải xuống bản đầy đủ ({DOWNLOAD_COST} xu)
          </Button>
        ]}
      >
        <div className="max-h-96 overflow-y-auto">
          <div className="relative">
            {/* Preview content container */}
            <div className="prose max-w-none mb-4">
              <div className="relative">
                {/* First part - clear */}
                <div className="mb-8">
                  {previewContent.split('\n').slice(0, 8).map((line, index) => (
                    <div key={index} className={line.startsWith('#') ? 'font-bold text-xl mb-4' : 'mb-2'}>
                      {line}
                    </div>
                  ))}
                </div>
                
                {/* Second part - semi-blurred */}
                <div className="mb-8 blur-[2px]">
                  {previewContent.split('\n').slice(8, 12).map((line, index) => (
                    <div key={index} className={line.startsWith('#') ? 'font-bold text-xl mb-4' : 'mb-2'}>
                      {line}
                    </div>
                  ))}
                </div>
                
                {/* Third part - more blurred */}
                <div className="blur-[4px]">
                  {previewContent.split('\n').slice(12).map((line, index) => (
                    <div key={index} className={line.startsWith('#') ? 'font-bold text-xl mb-4' : 'mb-2'}>
                      {line}
                    </div>
                  ))}
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white pointer-events-none" 
                     style={{ top: '30%' }} />
                
                {/* Premium content overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-6 text-center rounded-b-lg">
                  <LockOutlined className="text-2xl text-yellow-500 mb-2" />
                  <p className="text-gray-800 font-medium mb-2">
                    Tải xuống để xem toàn bộ nội dung
                  </p>
                  <p className="text-gray-600 mb-2">
                    Chi phí: {DOWNLOAD_COST} xu
                  </p>
                  <p className="text-sm text-gray-500">
                    Số dư của bạn: {coinsBalance} xu
                  </p>
                  {coinsBalance < DOWNLOAD_COST && (
                    <p className="text-red-500 text-sm mt-2">
                      Không đủ xu để tải xuống
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default MaterialDetail;