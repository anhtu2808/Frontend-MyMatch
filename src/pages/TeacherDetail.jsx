import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Tag, Input, Typography, Avatar, Rate, Progress, Badge, Select, Modal, Form, Radio, Dropdown, Menu } from 'antd';
import { ArrowLeftOutlined, BookOutlined, ShareAltOutlined, ThunderboltOutlined, UserOutlined, StarFilled, EyeOutlined, MessageOutlined, EditOutlined, FilterOutlined, SortAscendingOutlined, FlagOutlined, CrownOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';

const { Title, Text, Paragraph } = Typography;

// Mock data - in real app, this would come from API
const teacherData2 = {
  id: 1,
  name: "Nguyễn Văn An",
  university: "FPT University",
  subject: "Software Engineering",
  subjectCode: "SE",
  subjectCodeArray: ["EXE101", "EXE201"],
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
      subjectCode: "EXE101",
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
      subjectCode: "EXE201",
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
      subjectCode: "EXE301",
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
      subjectCode: "EXE101",
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
      subjectCode: "EXE101",
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
      subjectCode: "EXE101",
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
      subjectCode: "EXE101",
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
      subjectCode: "EXE101",
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

const randomAddSubjectCode = (subjectCodeArray, reviews) => {
  return reviews.map(review => {
    return {
      ...review,
      subjectCode: subjectCodeArray[Math.floor(Math.random() * subjectCodeArray.length)]
    }
  })
};

const TeacherDetail = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('newest');
  const [subjectCode, setSubjectCode] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [teacherData, setTeacherData] = useState(teacherData2);
  const { teacherId } = useParams();
  const teachers = useSelector(state => state.teachers.teachers);
  const [reportForm] = Form.useForm();

  useEffect(() => {
    const teacher = teachers.find(t => t.id === Number(teacherId));
    console.log(teacher);
    if (teacher) {
      setTeacherData({
        ...teacherData,
        name: teacher.name,
        avatar: teacher.avatar,
        department: teacher.department,
        university: teacher.university,
        subjects: teacher.subjects,
        code: teacher.code,
        subjectCode: teacher.subjectCode,
        subjectCodeArray: teacher.subjectCodeArray,
        reviews: randomAddSubjectCode(teacher.subjectCodeArray, teacherData.reviews),
        email: teacher.email,
      });
    }
  }, [teacherId, teachers]);

  const handleGoBack = () => {
    navigate('/teachers');
  };

  const handleSaveTeacher = () => {
    console.log('Teacher saved to favorites');
  };

  const handlePremiumPlan = () => {
    navigate('/premium/study-plan', { state: { teacherId: teacherData.id, teacherName: teacherData.name } });
  };

  const handleReviewTeacher = useCallback(() => {
    navigate('/teachers/add-review', {
      state: {
        preSelectedTeacher: {
          id: teacherData.id,
          name: teacherData.name,
          code: teacherData.code,
          department: teacherData.department
        },
        step: 2
      }
    });
  }, [navigate, teacherData.id, teacherData.name, teacherData.code, teacherData.department]);

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
        break;
    }
    if (subjectCode) {
      filtered = filtered.filter(review => review.subjectCode === subjectCode);
    }

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
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    setFilteredReviews(filtered);
  }, [sortBy, filterBy, teacherData.reviews, subjectCode]);

  const handleSubjectCodeChange = (value) => {
    setSubjectCode(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleFilterChange = (value) => {
    setFilterBy(value);
  };

  const ReviewCard = ({ review }) => {
    // AI score cố định cho demo MVP - hiển thị % sinh viên cùng ý kiến
  const getFixedAIScore = (reviewId) => {
    const aiScores = {
      1: { score: 92, label: "AI cho biết có 92% sinh viên có cùng đánh giá", color: "bg-green-500" },
      2: { score: 88, label: "AI cho biết có 88% sinh viên có cùng đánh giá", color: "bg-green-500" },
      3: { score: 15, label: "AI cho biết có 15% sinh viên có cùng đánh giá", color: "bg-red-500" },
      4: { score: 95, label: "AI cho biết có 95% sinh viên có cùng đánh giá", color: "bg-green-500" },
      5: { score: 67, label: "AI cho biết có 67% sinh viên có cùng đánh giá", color: "bg-blue-500" },
      6: { score: 98, label: "AI cho biết có 98% sinh viên có cùng đánh giá", color: "bg-green-500" },
      7: { score: 23, label: "AI cho biết có 23% sinh viên có cùng đánh giá", color: "bg-red-500" },
      8: { score: 91, label: "AI cho biết có 91% sinh viên có cùng đánh giá", color: "bg-green-500" }
    };
    
    return aiScores[reviewId] || { score: 75, label: "75% sinh viên có cùng đánh giá", color: "bg-blue-500" };
  };

  const aiScore = getFixedAIScore(review.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-6">
      <div className="p-6">
        {/* Review Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
            SV
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-lg font-semibold text-gray-900">{review.title}</h4>
              <Rate disabled defaultValue={review.rating} className="text-sm" />
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {review.subjectCode}
              </span>
              
              {/* AI Badge - hiển thị % đồng tình */}
              <div className="flex items-center gap-1">
                <span className="text-xs">🤖</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${aiScore.color}`}>
                 AI cho biết có {aiScore.score}% sinh viên có cùng đánh giá
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Sinh viên K17 • {new Date(review.date).toLocaleDateString('vi-VN')}
              {review.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success ml-2">
                  ✓ Đã xác thực
                </span>
              )}
             
            </div>
            <p className="text-gray-700 leading-relaxed">{review.content}</p>
          </div>
        </div>
  
          {/* Phần còn lại giữ nguyên */}
          {/* Rating Metrics */}
          <div className="bg-gray-50 rounded-xl p-5 mb-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-sm font-medium text-primary mb-1">Tiêu chí giảng dạy</div>
                <div className="text-2xl font-bold text-gray-900">{review.teachingCriteria}/5.0</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-primary mb-1">Chất lượng giảng dạy</div>
                <div className="text-2xl font-bold text-gray-900">{review.teachingQuality}/5.0</div>
              </div>
            </div>
  
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="text-xs text-gray-500 mb-1">Cấu trúc bài giảng</div>
                <div className="text-sm font-semibold text-gray-900">{review.structure}/5</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Khả năng truyền đạt</div>
                <div className="text-sm font-semibold text-gray-900">{review.communication}/5</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Điểm tổng</div>
                <div className="text-sm font-semibold text-primary">{review.score}/10</div>
              </div>
            </div>
          </div>
  
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {review.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white"
              >
                {tag}
              </span>
            ))}
          </div>
  
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-success hover:text-success text-sm font-medium">
                👍 {review.helpful}
              </button>
              <button className="flex items-center gap-2 text-error hover:text-error text-sm font-medium">
                👎 {review.notHelpful}
              </button>
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
              <button className="text-gray-500 hover:text-gray-700 text-sm">⋯</button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title={`Chi tiết giảng viên - ${teacherData.name}`}
      description="Xem thông tin chi tiết và đánh giá của giảng viên"
    >
      <div className="space-y-8">
        {/* Hero Section với animation */}
        <div className="rounded-2xl p-8 text-white bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] shadow-lg relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10 animate-bounce"></div>

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>

          <div className="relative z-10">
            {/* Breadcrumb với hover effect */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/30 rounded-xl transition-all duration-300 text-white hover:scale-105 backdrop-blur-sm"
              >
                <ArrowLeftOutlined className="transition-transform duration-300 group-hover:-translate-x-1" />
                Quay lại
              </button>
              <span className="text-white/70">/ Chi tiết giảng viên</span>
            </div>

            {/* Teacher Profile với animation khi load */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-105">
                  {teacherData.avatar ? (
                    <img src={teacherData.avatar} alt={teacherData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                      {teacherData.name.charAt(0)}
                    </div>
                  )}
                </div>
                {teacherData.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-white rounded-full animate-pulse"></div>
                )}
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 hover:text-yellow-200 transition-colors duration-300">{teacherData.name}</h1>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-colors duration-300">
                    {teacherData.code}
                  </span>
                  <span className="text-white/90">{teacherData.department}</span>
                </div>
                <div className="text-white/80 mb-3">
                  {teacherData.university} • {teacherData.experience} kinh nghiệm
                </div>
                <div className="flex items-center gap-4">
                  <Rate disabled defaultValue={teacherData.overallRating} className="text-yellow-400" />
                  <span className="text-white font-semibold">{teacherData.overallRating}/5.0</span>
                  <span className="text-white/70">({teacherData.totalRatings} đánh giá)</span>
                </div>
              </div>

              {/* Action Buttons với hiệu ứng đặc biệt */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSaveTeacher}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                >
                  <HeartOutlined /> Lưu lại
                </button>
                <button
                  onClick={handleReviewTeacher}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                >
                  Đánh giá
                </button>

                {/* Premium button với hiệu ứng đặc biệt */}
                <div className="relative group">
                  <button
                    onClick={handlePremiumPlan}
                    className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl transition-all duration-300 font-bold hover:scale-110 shadow-lg hover:shadow-2xl w-full overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <div className="relative flex items-center justify-center gap-2">
                      <CrownOutlined className="text-lg animate-bounce" />
                      <span>Gợi ý học tập</span>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        PRO
                      </span>
                    </div>
                  </button>

                  {/* Glow effect cho premium button */}
                  <div className="absolute inset-0 rounded-xl bg-yellow-400/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-primary-accent rounded-2xl p-6 text-white text-center">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold mb-1">{teacherData.overallRating}/5.0</div>
            <div className="text-white/80">Đánh giá tổng thể</div>
            <div className="text-white/60 text-sm mt-1">Từ {teacherData.totalRatings} đánh giá</div>
          </div>

          <div className="bg-gradient-info-primary rounded-2xl p-6 text-white text-center">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-2xl font-bold mb-1">{teacherData.wouldTakeAgain}%</div>
            <div className="text-white/80">Sẽ học lại</div>
            <div className="text-white/60 text-sm mt-1">Sinh viên đồng ý</div>
          </div>

          <div className="bg-gradient-warning-accent rounded-2xl p-6 text-white text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-2xl font-bold mb-1">{teacherData.difficulty}/5.0</div>
            <div className="text-white/80">Mức độ khó</div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div
                className="bg-white/80 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(teacherData.difficulty / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Subject Tags */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Môn học giảng dạy</h3>
          <div className="flex flex-wrap gap-2">
            {teacherData.subjects.map((subject, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Đánh giá từ sinh viên</h3>
                <p className="text-gray-600">{teacherData.totalRatings} đánh giá • Cập nhật gần nhất: hôm nay</p>
              </div>
              <Input
                placeholder="Tìm kiếm đánh giá..."
                prefix={<EyeOutlined className="text-gray-400" />}
                className="w-72"
              />
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FilterOutlined className="text-gray-500" />
                <span className="text-sm text-gray-600">Môn học:</span>
                <Select
                  value={subjectCode}
                  onChange={handleSubjectCodeChange}
                  style={{ width: 160 }}
                  size="small"
                  placeholder="Tất cả"
                >
                  <Select.Option value="">Tất cả</Select.Option>
                  {teacherData.subjectCodeArray.map((code, index) => (
                    <Select.Option key={index} value={code}>{code}</Select.Option>
                  ))}
                </Select>
              </div>

              <Select
                value={sortBy}
                onChange={handleSortChange}
                style={{ width: 160 }}
                size="small"
                options={[
                  { value: 'newest', label: 'Mới nhất' },
                  { value: 'oldest', label: 'Cũ nhất' },
                  { value: 'highest', label: 'Đánh giá cao nhất' },
                  { value: 'lowest', label: 'Đánh giá thấp nhất' },
                  { value: 'helpful', label: 'Hữu ích nhất' }
                ]}
              />

              <Select
                value={filterBy}
                onChange={handleFilterChange}
                style={{ width: 160 }}
                size="small"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'positive', label: 'Tích cực (4-5⭐)' },
                  { value: 'neutral', label: 'Trung tính (3⭐)' },
                  { value: 'negative', label: 'Tiêu cực (1-2⭐)' },
                  { value: 'verified', label: 'Đã xác thực' }
                ]}
              />

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {filteredReviews.length} kết quả
              </span>
            </div>
          </div>

          {/* Review Cards */}
          <div>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h4 className="text-lg font-medium text-gray-600 mb-2">Không tìm thấy đánh giá nào</h4>
                <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tiêu chí sắp xếp để xem thêm kết quả</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredReviews.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Xem thêm đánh giá
              </button>
            </div>
          )}
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
              <div className="flex flex-col gap-2">
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

          <Form.Item className="mb-0 text-right">
            <button
              type="button"
              onClick={() => setIsReportModalVisible(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-3 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-error hover:bg-error text-white px-4 py-2 rounded-lg transition-colors"
            >
              Gửi báo cáo
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default TeacherDetail;