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
  const [reviews, setReviews] = useState([]);

  // Chi phí tải xuống
  const DOWNLOAD_COST = 10;

  // Mock data với môn học FPT thực tế
  useEffect(() => {
    const fetchMaterialData = () => {
      const mockData = {
        1: {
          id: 1,
          title: "EXE101 - Tài liệu thực tập tốt nghiệp",
          description: "Tài liệu hướng dẫn thực tập tốt nghiệp cho sinh viên khóa cuối, bao gồm cách viết báo cáo, demo sản phẩm và phòng vấn với mentor.",
          course: "EXE101 - Thực tập tốt nghiệp",
          instructor: "Thầy Nguyễn Văn Minh",
          fileType: "PDF",
          fileSize: "3.2 MB",
          downloads: 245,
          rating: 4.7,
          totalRatings: 42,
          timeAgo: "3 ngày trước",
          uploadedBy: "anhtu2808",
          uploadDate: "15/07/2025",
          tags: ["Thực tập", "Tốt nghiệp", "Báo cáo", "Demo"],
          fileUrl: "/materials/EXE101-guide.pdf"
        },
        2: {
          id: 2,
          title: 'PRN212 - Bài tập lập trình C#',
          course: 'PRN212 - Lập trình C# cơ bản',
          instructor: 'Cô Trần Thị Lan',
          uploadedBy: 'student123',
          uploadDate: '10/07/2025',
          timeAgo: '6 ngày trước',
          rating: 4.3,
          totalRatings: 28,
          downloads: 189,
          fileSize: '2.1 MB',
          fileType: 'PDF',
          description: 'Tổng hợp 50 bài tập lập trình C# từ cơ bản đến nâng cao, có lời giải chi tiết và code mẫu.',
          tags: ['C#', 'Lập trình', 'Bài tập', 'Code mẫu'],
          fileUrl: "/materials/PRN212-exercises.pdf"
        }
      };
      
      return mockData[id] || mockData[1];
    };

    setMaterialData(fetchMaterialData());

    // Mock reviews data
    const mockReviews = [
      {
        id: 1,
        user: "student_abc",
        rating: 5,
        comment: "Tài liệu rất chi tiết và hữu ích cho việc thực tập. Cảm ơn bạn đã chia sẻ!",
        date: "2 ngày trước",
        avatar: "S"
      },
      {
        id: 2,
        user: "learner123",
        rating: 4,
        comment: "Nội dung khá hay nhưng có thể bổ sung thêm ví dụ thực tế nữa sẽ tốt hơn.",
        date: "1 tuần trước",
        avatar: "L"
      }
    ];
    setReviews(mockReviews);
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
      const createMockPDF = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 595;
        canvas.height = 842;
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
          'Tài liệu học tập chất lượng cao từ FPT University',
          '',
          'Nội dung bao gồm:',
          '• Lý thuyết cơ bản và nâng cao',
          '• Bài tập thực hành có lời giải',
          '• Ví dụ minh họa sinh động',
          '• Tips và tricks từ giảng viên',
          '• Đề thi và đáp án các năm trước',
          '',
          'Được biên soạn bởi: ' + materialData.instructor,
          'Tải bởi: ' + materialData.uploadedBy,
          'Ngày tải: ' + new Date().toLocaleDateString('vi-VN'),
          '',
          'Chúc bạn học tập hiệu quả và đạt điểm cao!',
          '',
          '© FPT University Study Materials'
        ];
        
        content.forEach((line, index) => {
          ctx.fillText(line, 50, 150 + (index * 25));
        });
        
        return canvas.toDataURL('image/png');
      };

      if (url.includes("/materials/")) {
        const imgData = createMockPDF();
        const link = document.createElement('a');
        link.href = imgData;
        link.download = filename.replace('.pdf', '.png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
      } else {
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
    if (coinsBalance < DOWNLOAD_COST) {
      message.error('Số xu không đủ để tải tài liệu!');
      setIsDownloadModalOpen(false);
      return;
    }

    try {
      dispatch(spendCoins(DOWNLOAD_COST));
      
      const downloadSuccess = await downloadFile(
        materialData.fileUrl,
        `${materialData.title}.pdf`
      );
      
      if (downloadSuccess) {
        message.success(`Đã tải xuống thành công tài liệu "${materialData.title}"!`);
      } else {
        dispatch(earnCoins(DOWNLOAD_COST));
        message.error('Có lỗi xảy ra khi tải file. Đã hoàn lại xu cho bạn!');
      }
    } catch (error) {
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
    const newReview = {
      id: Date.now(), // Simple ID generation
      user: currentUser?.name || "Bạn",
      rating: userRating,
      comment: values.comment,
      date: "Vừa xong",
      avatar: (currentUser?.name || "B").charAt(0).toUpperCase()
    };

    // Add new review to the beginning of the list
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
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
# Chương 1: Hướng dẫn thực tập tốt nghiệp EXE101

## 1.1 Giới thiệu về môn thực tập

Môn thực tập tốt nghiệp EXE101 là môn học cuối cùng trong chương trình đào tạo, giúp sinh viên áp dụng kiến thức đã học vào thực tế...

## 1.2 Quy trình thực tập

1. Chọn đề tài và mentor
2. Lập kế hoạch thực tập
3. Thực hiện dự án
4. Viết báo cáo
5. Demo và bảo vệ

## 1.3 Yêu cầu về dự án

Dự án thực tập cần đáp ứng các tiêu chí sau:
- Có tính ứng dụng thực tế
- Sử dụng công nghệ hiện đại
- Có đầy đủ tài liệu kỹ thuật

# Chương 2: Cách viết báo cáo thực tập

## 2.1 Cấu trúc báo cáo

Báo cáo thực tập bao gồm các phần chính:
1. Trang bìa
2. Lời cảm ơn
3. Mục lục
4. Danh sách hình ảnh và bảng biểu
5. Tóm tắt
6. Chương 1: Giới thiệu
7. Chương 2: Cơ sở lý thuyết
8. Chương 3: Phân tích và thiết kế
9. Chương 4: Cài đặt và kiểm thử
10. Chương 5: Kết luận và hướng phát triển

## 2.2 Các lưu ý khi viết

- Sử dụng font Times New Roman, size 13
- Căn lề trái, giãn dòng 1.5
- Đánh số trang từ trang đầu tiên của Chương 1

# Chương 3: Chuẩn bị cho buổi demo

## 3.1 Chuẩn bị nội dung demo

Buổi demo cần trình bày:
1. Tổng quan về dự án
2. Các chức năng chính
3. Demo trực tiếp sản phẩm
4. Kết quả đạt được

## 3.2 Tips để demo hiệu quả

- Luyện tập trước nhiều lần
- Chuẩn bị kịch bản demo
- Backup dữ liệu và code`;

  // Loading state
  if (!materialData) {
    return (
      <Layout title="Chi tiết tài liệu" description="Đang tải...">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin tài liệu...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Chi tiết tài liệu" description="Xem thông tin chi tiết tài liệu">
      <div className="space-y-6">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftOutlined />
          <span>Quay lại</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Material Preview Image */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=400&q=80"
                  alt={materialData.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium">
                    {materialData.fileType}
                  </span>
                </div>
              </div>
            </div>

            {/* Material Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {materialData.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Rate disabled defaultValue={materialData.rating} allowHalf />
                    <span className="text-gray-600">
                      {materialData.rating} ({materialData.totalRatings} đánh giá)
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {materialData.downloads} lượt tải
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {materialData.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Info Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Môn học:</p>
                  <p className="text-gray-900">{materialData.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Giảng viên:</p>
                  <p className="text-gray-900">{materialData.instructor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Kích thước:</p>
                  <p className="text-gray-900">{materialData.fileSize}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Ngày tải lên:</p>
                  <p className="text-gray-900">{materialData.timeAgo}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Mô tả tài liệu</h3>
                <p className="text-gray-700 leading-relaxed">
                  {materialData.description}
                </p>
              </div>

              {/* Uploader Info */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {materialData.uploadedBy.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900">Được tải lên bởi {materialData.uploadedBy}</p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <CalendarOutlined className="mr-1" />
                    {materialData.uploadDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Đánh giá tài liệu</h3>
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
                    className="rounded-lg"
                  />
                </Form.Item>
                
                <Form.Item>
                  <button 
                    type="primary" 
                    htmlType="submit"
                    disabled={userRating === 0}
                    className="bg-primary text-white rounded-lg hover:bg-primary-hover px-4 py-2"
                  >
                    Gửi đánh giá
                  </button>
                </Form.Item>
              </Form>
            </div>

            {/* Reviews List */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Đánh giá từ người dùng ({reviews.length})
                </h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium text-gray-900">{review.user}</span>
                              <Rate disabled defaultValue={review.rating} className="text-sm" />
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileTextOutlined className="text-2xl text-primary" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Tài liệu học tập</h2>
                <p className="text-gray-600">Tài liệu chất lượng cao từ FPT University</p>
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadClick}
                  className="w-full bg-primary hover:bg-primary-hover font-medium"
                  disabled={coinsBalance < DOWNLOAD_COST}
                >
                  Tải xuống ({DOWNLOAD_COST} xu)
                </Button>
                
                <Button 
                  size="large" 
                  icon={<EyeOutlined />}
                  onClick={handlePreviewClick}
                  className="w-full border-gray-300 text-gray-700 hover:border-gray-400 font-medium"
                >
                  Xem trước miễn phí
                </Button>
                
                <Button 
                  size="large" 
                  icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                  onClick={handleToggleFavorite}
                  className={`w-full font-medium ${
                    isFavorite 
                      ? 'text-warning border-warning bg-warning/10' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {isFavorite ? 'Đã yêu thích' : 'Thêm yêu thích'}
                </Button>
              </div>

              {/* Coin Balance */}
              <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-medium">Số xu hiện tại:</span>
                  <span className="font-bold text-primary text-lg">{coinsBalance} xu</span>
                </div>
                {coinsBalance < DOWNLOAD_COST && (
                  <p className="text-error text-sm">
                    ⚠️ Không đủ xu để tải tài liệu này
                  </p>
                )}
              </div>

              {/* Material Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Định dạng:</span>
                  <span className="font-medium text-gray-900">{materialData.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kích thước:</span>
                  <span className="font-medium text-gray-900">{materialData.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lượt tải:</span>
                  <span className="font-medium text-gray-900">{materialData.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đánh giá:</span>
                  <div className="flex items-center space-x-2">
                    <Rate disabled defaultValue={materialData.rating} allowHalf className="text-xs" />
                    <span className="font-medium text-gray-900">{materialData.rating}</span>
                  </div>
                </div>
              </div>
            </div>
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
            className: "bg-primary hover:bg-primary-hover"
          }}
        >
          <div className="space-y-4">
            <p>Bạn có muốn tải xuống tài liệu <strong>"{materialData?.title}"</strong> không?</p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span>Chi phí tải xuống:</span>
                <span className="font-bold text-warning">{DOWNLOAD_COST} xu</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Số dư hiện tại:</span>
                <span className="font-bold text-primary">{coinsBalance} xu</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span>Số dư sau khi tải:</span>
                <span className={`font-bold ${coinsBalance >= DOWNLOAD_COST ? 'text-success' : 'text-error'}`}>
                  {coinsBalance >= DOWNLOAD_COST ? (coinsBalance - DOWNLOAD_COST) : 'Không đủ'} xu
                </span>
              </div>
            </div>

            {coinsBalance < DOWNLOAD_COST && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                <p className="text-error font-medium mb-2">⚠️ Số xu không đủ!</p>
                <p className="text-error text-sm">
                  Bạn cần thêm <strong>{DOWNLOAD_COST - coinsBalance} xu</strong> để tải tài liệu này.
                  Hãy kiếm xu bằng cách:
                </p>
                <ul className="text-error text-sm mt-2 ml-4">
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
              className="bg-primary hover:bg-primary-hover"
              disabled={coinsBalance < DOWNLOAD_COST}
            >
              Tải xuống bản đầy đủ ({DOWNLOAD_COST} xu)
            </Button>
          ]}
        >
          <div className="max-h-96 overflow-y-auto">
            <div className="relative">
              <div className="prose max-w-none mb-4">
                <div className="relative">
                  {/* First part - clear */}
                  <div className="mb-8">
                    {previewContent.split('\n').slice(0, 8).map((line, index) => (
                      <div key={index} className={line.startsWith('#') ? 'font-bold text-xl mb-4 text-gray-900' : 'mb-2 text-gray-700'}>
                        {line}
                      </div>
                    ))}
                  </div>
                  
                  {/* Second part - semi-blurred */}
                  <div className="mb-8 blur-[2px]">
                    {previewContent.split('\n').slice(8, 12).map((line, index) => (
                      <div key={index} className={line.startsWith('#') ? 'font-bold text-xl mb-4 text-gray-900' : 'mb-2 text-gray-700'}>
                        {line}
                      </div>
                    ))}
                  </div>
                  
                  {/* Third part - more blurred */}
                  <div className="blur-[4px]">
                    {previewContent.split('\n').slice(12).map((line, index) => (
                      <div key={index} className={line.startsWith('#') ? 'font-bold text-xl mb-4 text-gray-900' : 'mb-2 text-gray-700'}>
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white pointer-events-none" 
                       style={{ top: '30%' }} />
                  
                  {/* Premium content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-6 text-center rounded-xl border border-gray-200">
                    <LockOutlined className="text-2xl text-warning mb-2" />
                    <p className="text-gray-800 font-bold mb-2">
                      Tải xuống để xem toàn bộ nội dung
                    </p>
                    <p className="text-gray-600 mb-2">
                      Chi phí: {DOWNLOAD_COST} xu
                    </p>
                    <p className="text-sm text-gray-500">
                      Số dư của bạn: {coinsBalance} xu
                    </p>
                    {coinsBalance < DOWNLOAD_COST && (
                      <p className="text-error text-sm mt-2">
                        Không đủ xu để tải xuống
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default MaterialDetail;