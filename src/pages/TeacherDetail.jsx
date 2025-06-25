import React, { useState, useEffect } from 'react';
import { Button, Card, Tag, Input, Typography, Avatar, Rate, Progress, Badge, Select, Modal, Form, Radio, Dropdown, Menu } from 'antd';
import { ArrowLeftOutlined, BookOutlined, ShareAltOutlined, ThunderboltOutlined, UserOutlined, StarFilled, EyeOutlined, MessageOutlined, EditOutlined, FilterOutlined, SortAscendingOutlined, FlagOutlined, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const { Title, Text, Paragraph } = Typography;
// Mock data - in real app, this would come from API
const teacherData = {
  id: 1,
  name: "Nguyễn Văn An",
  university: "FPT University",
  subject: "Software Engineering",
  subjectCode: "SE",
  department: "Công nghệ phần mềm",
  email: "anv@fpt.edu.vn",
  phone: "+84 901 234 567",
  experience: "8 năm",
  degree: "Thạc sĩ CNTT",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  isOnline: true,
  overallRating: 4.2,
  totalRatings: 308,
  wouldTakeAgain: 85,
  difficulty: 3.1,
  subjects: ["Software Engineering", "Database Design", "Web Development"],
  reviews: [
    {
      id: 1,
      title: "Giảng viên tuyệt vời",
      content: "Giải thích các khái niệm một cách rõ ràng và luôn sẵn lòng giúp đỡ. Bài tập hơi khó nhưng công bằng.",
      teachingCriteria: 5.0,
      teachingQuality: 4.5,
      structure: 5,
      communication: 4,
      score: 9.0,
      tags: ["Truyền cảm hứng", "Giảng hay", "Nhiệt huyết"],
      helpful: 24,
      notHelpful: 2,
      date: "2024-01-15",
      verified: true,
      rating: 5
    },
    {
      id: 2,
      title: "Lớp học hấp dẫn",
      content: "Làm cho bài giảng trở nên thú vị và sử dụng các ví dụ thực tế. Đôi khi điểm số khó nhưng lại đưa ra phản hồi tốt.",
      teachingCriteria: 4.2,
      teachingQuality: 4.0,
      structure: 4,
      communication: 4,
      score: 8.0,
      tags: ["Nhiều bài tập", "Điểm công bằng", "Điểm cộng"],
      helpful: 18,
      notHelpful: 1,
      date: "2024-01-10",
      verified: true,
      rating: 4
    },
    {
      id: 3,
      title: "Khó hiểu một chút",
      content: "Kiến thức sâu nhưng cách truyền đạt chưa thật sự rõ ràng. Cần cải thiện cách giảng dạy cho sinh viên dễ hiểu hơn.",
      teachingCriteria: 2.5,
      teachingQuality: 2.0,
      structure: 3,
      communication: 2,
      score: 5.5,
      tags: ["Khó hiểu", "Cần cải thiện", "Kiến thức sâu"],
      helpful: 8,
      notHelpful: 5,
      date: "2024-01-08",
      verified: false,
      rating: 2
    },
    {
      id: 4,
      title: "Giảng viên nhiệt tình",
      content: "Rất tận tâm với học sinh, luôn trả lời câu hỏi một cách chi tiết. Bài giảng được chuẩn bị kỹ lưỡng.",
      teachingCriteria: 4.8,
      teachingQuality: 4.5,
      structure: 5,
      communication: 5,
      score: 9.2,
      tags: ["Tận tâm", "Chi tiết", "Chuẩn bị kỹ"],
      helpful: 32,
      notHelpful: 0,
      date: "2024-01-12",
      verified: true,
      rating: 5
    },
    {
      id: 5,
      title: "Bình thường",
      content: "Không có gì đặc biệt, giảng dạy theo sách vở. Không tệ nhưng cũng không xuất sắc.",
      teachingCriteria: 3.0,
      teachingQuality: 3.0,
      structure: 3,
      communication: 3,
      score: 6.0,
      tags: ["Bình thường", "Theo sách", "Không nổi bật"],
      helpful: 12,
      notHelpful: 8,
      date: "2024-01-05",
      verified: true,
      rating: 3
    },
    {
      id: 6,
      title: "Rất khuyến khích",
      content: "Một trong những giảng viên tốt nhất tôi từng học. Phương pháp giảng dạy hiện đại và hiệu quả.",
      teachingCriteria: 4.9,
      teachingQuality: 4.8,
      structure: 5,
      communication: 5,
      score: 9.5,
      tags: ["Xuất sắc", "Hiện đại", "Hiệu quả"],
      helpful: 45,
      notHelpful: 1,
      date: "2024-01-18",
      verified: true,
      rating: 5
    },
    {
      id: 7,
      title: "Cần cải thiện thái độ",
      content: "Kiến thức ổn nhưng thái độ với sinh viên chưa thật sự tốt. Đôi khi hơi khó tính và không kiên nhẫn.",
      teachingCriteria: 3.5,
      teachingQuality: 2.5,
      structure: 4,
      communication: 2,
      score: 6.5,
      tags: ["Cần cải thiện", "Khó tính", "Thiếu kiên nhẫn"],
      helpful: 15,
      notHelpful: 12,
      date: "2024-01-03",
      verified: false,
      rating: 2
    },
    {
      id: 8,
      title: "Giảng dạy xuất sắc",
      content: "Phương pháp giảng dạy sáng tạo, luôn cập nhật kiến thức mới. Rất đáng để học từ thầy.",
      teachingCriteria: 4.7,
      teachingQuality: 4.6,
      structure: 5,
      communication: 4,
      score: 8.8,
      tags: ["Sáng tạo", "Cập nhật", "Đáng học hỏi"],
      helpful: 28,
      notHelpful: 3,
      date: "2024-01-20",
      verified: true,
      rating: 5
    }
  ]
};
const TeacherDetail = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const [reportForm] = Form.useForm();



  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveTeacher = () => {
    // Logic to save teacher to favorites
    console.log('Teacher saved to favorites');
  };

  const handlePremiumPlan = () => {
    // Navigate to premium study plan feature
    navigate('/premium/study-plan', { state: { teacherId: teacherData.id, teacherName: teacherData.name } });
  };

  const handleReviewTeacher = () => {
    // Navigate to step 2 of review process
    navigate('/teachers/add-review', { state: { teacherId: teacherData.id, step: 2 } });
  };

  const handleReportReview = (reviewId) => {
    console.log('Reporting review:', reviewId);
    setIsReportModalVisible(true);
  };

  const handleReportSubmit = (values) => {
    console.log('Report submitted:', values);
    setIsReportModalVisible(false);
    reportForm.resetFields();
  };

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...teacherData.reviews];

    // Apply filter
    switch (filterBy) {
      case 'positive':
        filtered = filtered.filter(review => review.rating >= 4);
        break;
      case 'neutral':
        filtered = filtered.filter(review => review.rating === 3);
        break;
      case 'negative':
        filtered = filtered.filter(review => review.rating <= 2);
        break;
      case 'verified':
        filtered = filtered.filter(review => review.verified);
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply sort
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
      default: // 'newest'
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    setFilteredReviews(filtered);
  }, [sortBy, filterBy, teacherData.reviews]);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleFilterChange = (value) => {
    setFilterBy(value);
  };



  const ReviewCard = ({ review }) => (
    <Card
      style={{
        borderRadius: '16px',
        background: 'white',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        marginBottom: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      bodyStyle={{ padding: '24px' }}
      hoverable
    >
      {/* Review Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        <Avatar
          size={48}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: '600'
          }}
        >
          SV
        </Avatar>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Title level={4} style={{ margin: '0', color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>
              {review.title}
            </Title>
            <Rate
              disabled
              defaultValue={review.teachingCriteria}
              style={{ fontSize: '14px' }}
            />
          </div>
          <Text style={{ color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
            Sinh viên K17 • {new Date(review.date).toLocaleDateString('vi-VN')}
            {review.verified && <Tag color="green" size="small" style={{ marginLeft: '8px' }}>✓ Đã xác thực</Tag>}
          </Text>
          <Paragraph style={{ color: '#475569', fontSize: '15px', margin: '0', lineHeight: '1.6' }}>
            {review.content}
          </Paragraph>
        </div>
      </div>

      {/* Rating Metrics */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: '#667eea', fontSize: '14px', fontWeight: '600', display: 'block' }}>
              Tiêu chí giảng dạy
            </Text>
            <Title level={3} style={{ margin: '8px 0 0 0', color: '#1e293b', fontSize: '24px' }}>
              {review.teachingCriteria}/5.0
            </Title>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: '#667eea', fontSize: '14px', fontWeight: '600', display: 'block' }}>
              Chất lượng giảng dạy
            </Text>
            <Title level={3} style={{ margin: '8px 0 0 0', color: '#1e293b', fontSize: '24px' }}>
              {review.teachingQuality}/5.0
            </Title>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <div>
              <Text style={{ color: '#64748b', fontSize: '13px', display: 'block' }}>Cấu trúc bài giảng</Text>
              <Text style={{ color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>{review.structure}/5</Text>
            </div>
            <div>
              <Text style={{ color: '#64748b', fontSize: '13px', display: 'block' }}>Khả năng truyền đạt</Text>
              <Text style={{ color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>{review.communication}/5</Text>
            </div>
            <div>
              <Text style={{ color: '#64748b', fontSize: '13px', display: 'block' }}>Điểm tổng</Text>
              <Text style={{ color: '#667eea', fontSize: '16px', fontWeight: '600' }}>{review.score}/10</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {review.tags.map((tag, index) => (
            <Tag
              key={index}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '13px'
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            type="text"
            size="small"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#10b981',
              padding: '4px 12px',
              borderRadius: '8px'
            }}
          >
            👍 {review.helpful}
          </Button>
          <Button
            type="text"
            size="small"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ef4444',
              padding: '4px 12px',
              borderRadius: '8px'
            }}
          >
            👎 {review.notHelpful}
          </Button>
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="report"
                icon={<FlagOutlined />}
                onClick={() => handleReportReview(review.id)}
              >
                Báo cáo vi phạm
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button
            type="text"
            size="small"
            style={{ color: '#64748b', fontSize: '13px' }}
          >
            ⋯
          </Button>
        </Dropdown>
      </div>
    </Card>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />

      <div style={{ flex: 1, marginLeft: '256px', padding: '0' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleGoBack}
                style={{
                  padding: '8px 16px',
                  color: 'white',
                  fontSize: '14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none'
                }}
              >
                Quay lại
              </Button>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                / Chi tiết giảng viên
              </Text>
            </div>

            {/* Teacher Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Badge
                dot
                status={teacherData.isOnline ? "success" : "default"}
                offset={[-10, 45]}
              >
                <Avatar
                  size={120}
                  src={teacherData.avatar}
                  icon={<UserOutlined />}
                  style={{
                    border: '4px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                />
              </Badge>

              <div style={{ flex: 1 }}>
                <Title level={1} style={{
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  margin: '0 0 0.5rem 0'
                }}>
                  {teacherData.name}
                </Title>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Tag color="#284CFF" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {teacherData.subjectCode}
                  </Tag>
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                    {teacherData.department}
                  </Text>
                </div>

                <Text style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '16px',
                  display: 'block',
                  marginBottom: '1rem'
                }}>
                  {teacherData.university} • {teacherData.experience} kinh nghiệm • {teacherData.degree}
                </Text>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Rate
                      disabled
                      defaultValue={teacherData.overallRating}
                      style={{ color: '#ffd700' }}
                    />
                    <Text style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                      {teacherData.overallRating}/5.0
                    </Text>
                  </div>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                    {teacherData.totalRatings} đánh giá
                  </Text>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button
                  onClick={handleSaveTeacher}
                  type="primary"
                  icon={<BookOutlined />}
                  size="large"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Lưu lại
                </Button>
                <Button
                  onClick={handleReviewTeacher}
                  icon={<EditOutlined />}
                  size="large"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Đánh giá
                </Button>
                <Button
                  onClick={handlePremiumPlan}
                  icon={<CrownOutlined />}
                  size="large"
                  style={{
                    background: '#E3D046',
                    borderColor: '#E3D046',
                    color: '#000',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}
                >
                  Gợi ý học tập
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>

          {/* Quick Info Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Overall Rating Card */}
            <Card
              style={{
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⭐</div>
                <Title level={2} style={{ color: 'white', margin: '0 0 0.5rem 0' }}>
                  {teacherData.overallRating}/5.0
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                  Đánh giá tổng thể
                </Text>
                <div style={{ marginTop: '0.5rem' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    Từ {teacherData.totalRatings} đánh giá
                  </Text>
                </div>
              </div>
            </Card>

            {/* Would Take Again Card */}
            <Card
              style={{
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📚</div>
                <Title level={2} style={{ color: 'white', margin: '0 0 0.5rem 0' }}>
                  {teacherData.wouldTakeAgain}%
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                  Sẽ học lại
                </Text>
                <div style={{ marginTop: '0.5rem' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    Sinh viên đồng ý
                  </Text>
                </div>
              </div>
            </Card>

            {/* Difficulty Card */}
            <Card
              style={{
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
                <Title level={2} style={{ color: 'white', margin: '0 0 0.5rem 0' }}>
                  {teacherData.difficulty}/5.0
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                  Mức độ khó
                </Text>
                <div style={{ marginTop: '0.5rem' }}>
                  <Progress
                    percent={(teacherData.difficulty / 5) * 100}
                    showInfo={false}
                    strokeColor="rgba(255,255,255,0.8)"
                    trailColor="rgba(255,255,255,0.2)"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Subject Tags */}
          <Card
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '2rem'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <Title level={4} style={{ marginBottom: '1rem', color: '#1A237E' }}>
              Môn học giảng dạy
            </Title>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {teacherData.subjects.map((subject, index) => (
                <Tag
                  key={index}
                  color="#667eea"
                  style={{
                    fontSize: '14px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none'
                  }}
                >
                  {subject}
                </Tag>
              ))}
            </div>
          </Card>

          {/* Reviews Section */}
          <Card
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '2rem'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <Title level={3} style={{
                    color: '#1A237E',
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Đánh giá từ sinh viên
                  </Title>
                  <Text style={{ color: '#64748b', fontSize: '16px' }}>
                    {teacherData.totalRatings} đánh giá • Cập nhật gần nhất: hôm nay
                  </Text>
                </div>
                <Input
                  placeholder="Tìm kiếm đánh giá..."
                  prefix={<EyeOutlined style={{ color: '#94a3b8' }} />}
                  style={{
                    width: '280px',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                />
              </div>

              {/* Sort and Filter Controls */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SortAscendingOutlined style={{ color: '#64748b' }} />
                  <Text style={{ color: '#64748b', fontSize: '14px' }}>Sắp xếp:</Text>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    style={{ width: '160px' }}
                    size="small"
                    options={[
                      { value: 'newest', label: 'Mới nhất' },
                      { value: 'oldest', label: 'Cũ nhất' },
                      { value: 'highest', label: 'Đánh giá cao nhất' },
                      { value: 'lowest', label: 'Đánh giá thấp nhất' },
                      { value: 'helpful', label: 'Hữu ích nhất' }
                    ]}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FilterOutlined style={{ color: '#64748b' }} />
                  <Text style={{ color: '#64748b', fontSize: '14px' }}>Lọc:</Text>
                  <Select
                    value={filterBy}
                    onChange={handleFilterChange}
                    style={{ width: '160px' }}
                    size="small"
                    options={[
                      { value: 'all', label: 'Tất cả' },
                      { value: 'positive', label: 'Tích cực (4-5⭐)' },
                      { value: 'neutral', label: 'Trung tính (3⭐)' },
                      { value: 'negative', label: 'Tiêu cực (1-2⭐)' },
                      { value: 'verified', label: 'Đã xác thực' }
                    ]}
                  />
                </div>

                <Tag color="#667eea" style={{ marginLeft: '8px' }}>
                  {filteredReviews.length} kết quả
                </Tag>
              </div>
            </div>

            {/* Review Cards */}
            <div>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#64748b'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <Title level={4} style={{ color: '#64748b', marginBottom: '8px' }}>
                    Không tìm thấy đánh giá nào
                  </Title>
                  <Text style={{ color: '#94a3b8' }}>
                    Thử thay đổi bộ lọc hoặc tiêu chí sắp xếp để xem thêm kết quả
                  </Text>
                </div>
              )}
            </div>

            {/* Load More Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button
                type="primary"
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderColor: 'transparent',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  height: 'auto',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Xem thêm đánh giá
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        title="Báo cáo vi phạm"
        open={isReportModalVisible}
        onCancel={() => setIsReportModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={reportForm}
          layout="vertical"
          onFinish={handleReportSubmit}
        >
          <Form.Item
            name="reason"
            label="Lý do báo cáo"
            rules={[{ required: true, message: 'Vui lòng chọn lý do báo cáo!' }]}
          >
            <Radio.Group>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Radio value="spam">Spam hoặc quảng cáo</Radio>
                <Radio value="inappropriate">Nội dung không phù hợp</Radio>
                <Radio value="false">Thông tin sai lệch</Radio>
                <Radio value="harassment">Quấy rối hoặc bắt nạt</Radio>
                <Radio value="hate">Ngôn từ thù địch</Radio>
                <Radio value="other">Khác</Radio>
              </div>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="details"
            label="Chi tiết (tùy chọn)"
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả chi tiết về vi phạm..."
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Button
              onClick={() => setIsReportModalVisible(false)}
              style={{ marginRight: '8px' }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: '#ef4444',
                borderColor: '#ef4444'
              }}
            >
              Gửi báo cáo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherDetail; 