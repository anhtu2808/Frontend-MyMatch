import React, { useState } from 'react';
import {
  Card,
  Tag,
  List,
  Space,
  Typography,
  Button,
  Progress,
  Modal,
  Rate,
  message
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  TrophyOutlined,
  FireOutlined,
  AimOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  PlayCircleOutlined,
  LineChartOutlined,
  TeamOutlined
} from '@ant-design/icons';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const PremiumStudyPlan = () => {
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Teacher data cho EXE101 - Trải nghiệm khởi nghiệp
  const teacher = {
    id: 3,
    name: 'Thầy Nguyễn Văn Minh',
    code: 'TVA003',
    subject: 'EXE101 - Trải nghiệm khởi nghiệp',
    subjectCode: 'EXE101',
    overallRating: 4.8,
    difficulty: 3.2,
    wouldTakeAgain: 92,
    passRate: 95,
    averageGrade: 8.2,
    strengths: ['Mentor tận tâm', 'Kết nối doanh nghiệp', 'Hướng dẫn chi tiết', 'Kinh nghiệm khởi nghiệp'],
    department: 'Khoa Quản trị kinh doanh',
    experience: '12+ năm',
    projects: '300+ sinh viên đã hướng dẫn',
    companies: 'Founder 3 startup, Mentor tại Techstars'
  };

  // Weekly study schedule cho 10 tuần
  const weeklySchedule = {
    1: {
      title: 'Tuần 1-2: Tìm hiểu khởi nghiệp và ý tưởng',
      tasks: [
        { task: 'Tham dự buổi orientation về khởi nghiệp', time: '2h', priority: 'high' },
        { task: 'Brainstorm 5-10 ý tưởng kinh doanh', time: '4h', priority: 'high' },
        { task: 'Research market size và competitors', time: '6h', priority: 'medium' },
        { task: 'Đọc case study các startup Việt Nam', time: '3h', priority: 'medium' }
      ],
      deliverables: ['Danh sách ý tưởng kinh doanh', 'Phân tích thị trường sơ bộ'],
      tips: 'Tập trung vào problems mà bạn thực sự gặp phải hàng ngày'
    },
    2: {
      title: 'Tuần 3-4: Chọn ý tưởng và validate',
      tasks: [
        { task: 'Chọn 1 ý tưởng chính để phát triển', time: '2h', priority: 'high' },
        { task: 'Tạo customer persona chi tiết', time: '4h', priority: 'high' },
        { task: 'Interview 10-15 potential customers', time: '8h', priority: 'high' },
        { task: 'Làm MVP hoặc prototype đơn giản', time: '6h', priority: 'medium' }
      ],
      deliverables: ['Ý tưởng đã validated', 'Customer insights', 'MVP/Prototype'],
      tips: 'Nói chuyện với khách hàng trước khi xây dựng bất cứ thứ gì. Customer validation là key!'
    },
    3: {
      title: 'Tuần 5-6: Business Model Canvas',
      tasks: [
        { task: 'Hoàn thành Business Model Canvas', time: '5h', priority: 'high' },
        { task: 'Tính toán unit economics cơ bản', time: '4h', priority: 'high' },
        { task: 'Xác định revenue streams', time: '3h', priority: 'medium' },
        { task: 'Meeting với thầy để review BMC', time: '1h', priority: 'high' }
      ],
      deliverables: ['Business Model Canvas hoàn chỉnh', 'Financial projections'],
      tips: 'Tập trung vào value proposition - tại sao khách hàng phải mua sản phẩm của bạn?'
    },
    4: {
      title: 'Tuần 7-8: Go-to-market strategy',
      tasks: [
        { task: 'Xây dựng marketing strategy', time: '6h', priority: 'high' },
        { task: 'Tạo landing page hoặc social media', time: '8h', priority: 'medium' },
        { task: 'Test marketing channels (FB ads, Google)', time: '4h', priority: 'medium' },
        { task: 'Measure và analyze results', time: '3h', priority: 'high' }
      ],
      deliverables: ['Marketing plan', 'Digital presence', 'Initial traction data'],
      tips: 'Bắt đầu với marketing budget nhỏ. Test nhiều channels để tìm chi phí hiệu quả nhất'
    },
    5: {
      title: 'Tuần 9-10: Pitch preparation & Final',
      tasks: [
        { task: 'Viết business plan (15-20 trang)', time: '12h', priority: 'high' },
        { task: 'Tạo pitch deck (10-12 slides)', time: '8h', priority: 'high' },
        { task: 'Practice pitch với bạn bè/gia đình', time: '6h', priority: 'high' },
        { task: 'Chuẩn bị Q&A scenarios', time: '4h', priority: 'medium' }
      ],
      deliverables: ['Business plan hoàn chỉnh', 'Pitch deck', 'Demo/prototype'],
      tips: 'Nói chuyện với nhà đầu tư. Nhà đầu tư đầu tư vào người và passion, không chỉ idea'
    }
  };

  // Enhanced study strategies
  const studyStrategies = [
    {
      title: 'Lean Startup Methodology',
      content: 'Áp dụng Build-Measure-Learn cycle. Tạo MVP nhanh nhất có thể, test với customers, learn từ feedback, iterate. Đừng spend quá nhiều time vào perfect product mà chưa validate market need.',
      category: 'methodology',
      difficulty: 'Trung bình',
      impact: 'Rất cao'
    },
    {
      title: 'Customer Development Process',
      content: 'Get out of the building! Talk to customers mỗi ngày. Dùng interview techniques để discover pain points thật sự. Quan trọng hơn features là understanding customer needs.',
      category: 'customer-research',
      difficulty: 'Khó',
      impact: 'Rất cao'
    },
    {
      title: 'Rapid Prototyping',
      content: 'Dùng no-code tools như Figma, Canva, WordPress để tạo prototype nhanh. Mục tiêu là test concept chứ không phải build perfect product. Speed > perfection.',
      category: 'prototyping',
      difficulty: 'Dễ',
      impact: 'Cao'
    },
    {
      title: 'Pitch Storytelling',
      content: 'Structure pitch theo Hero\'s Journey: Problem (villain) → Solution (hero) → Market opportunity → Business model → Team → Ask. Practice pitch until you can do it without slides.',
      category: 'presentation',
      difficulty: 'Trung bình',
      impact: 'Cao'
    }
  ];

  // Resources và materials (bỏ tags không cần thiết)
  const studyMaterials = [
    {
      title: 'Business Model Canvas Template',
      type: 'document',
      format: 'PDF',
      size: '1.2 MB',
      downloads: 1247,
      rating: 4.9,
      description: 'Template BMC chuẩn để fill in startup idea của bạn'
    },
    {
      title: 'Customer Interview Questions',
      type: 'checklist',
      format: 'DOCX',
      size: '500 KB',
      downloads: 892,
      rating: 4.7,
      description: 'Danh sách câu hỏi để interview customers hiệu quả'
    },
    {
      title: 'Pitch Deck Template FPT',
      type: 'template',
      format: 'PPTX',
      size: '2.1 MB',
      downloads: 756,
      rating: 4.8,
      description: 'Template slide pitch deck theo format FPT requirement'
    },
    {
      title: 'Startup Success Stories Vietnam',
      type: 'video',
      format: 'MP4',
      size: '120 MB',
      downloads: 234,
      rating: 4.6,
      description: 'Video case studies của Tiki, Grab, VNG và các startup Việt thành công'
    }
  ];

  // Tips từ sinh viên thành công về Thầy Nguyễn Văn Minh - EXE101
  const successTips = [
    {
      tip: 'Thầy rất thích sinh viên tích cực trên kênh Slack. Hãy đặt câu hỏi sâu sắc và chia sẻ tiến độ hàng tuần để gây ấn tượng với thầy',
      author: 'Nguyễn Minh Hoàng - SE1234',
      grade: '9.2',
      year: 'Spring 2025'
    },
    {
      tip: 'Thầy tập trung nhiều vào việc xác thực khách hàng. Hãy trình bày bằng chứng cụ thể: "Đã phỏng vấn 15 khách hàng, 80% xác nhận vấn đề đau". Dữ liệu thuyết phục thầy hơn ý tưởng',
      author: 'Trần Thị Lan Anh - BUS1567',
      grade: '9.5',
      year: 'Spring 2025'
    },
    {
      tip: 'Điểm cộng cho sinh viên có tương tác thực tế. Tạo sản phẩm tối thiểu khả thi đơn giản, có 50-100 người dùng thật, đo lường mức độ tương tác. Thầy đánh giá thực hiện cao hơn thuyết trình',
      author: 'Lê Văn Đức - SE1890',
      grade: '8.8',
      year: 'Summer 2024'
    },
    {
      tip: 'Tham dự giờ tư vấn và buổi học 1-1 với thầy. Thầy đánh giá cao việc gặp mặt trực tiếp và sẽ chia sẻ những mẹo nội bộ về hệ sinh thái khởi nghiệp',
      author: 'Phạm Minh Tuấn - BUS1445',
      grade: '9.0',
      year: 'Fall 2024'
    },
    {
      tip: 'Thầy kết nối sinh viên với các nhà đầu tư thực nếu dự án triển vọng. Chuẩn bị bộ slide thuyết trình chuyên nghiệp và mô hình kinh doanh có ý nghĩa về mặt tài chính',
      author: 'Hoàng Thị Mai - ENT1678',
      grade: '8.7',
      year: 'Spring 2025'
    },
    {
      tip: 'Tham gia kênh #random trên Slack và tương tác với bạn cùng lớp. Thầy chú ý đến sinh viên giúp đỡ người khác và xây dựng cộng đồng. Hợp tác bằng điểm cộng',
      author: 'Đỗ Minh Quân - SE1234',
      grade: '9.3',
      year: 'Summer 2024'
    },
    {
      tip: 'Thầy ghét sinh viên sao chép kế hoạch kinh doanh. Nghiên cứu thị trường Việt Nam cụ thể, trích dẫn đối thủ cạnh tranh địa phương, thể hiện hiểu biết về hành vi người tiêu dùng Việt Nam',
      author: 'Vũ Thị Hằng - BUS1556',
      grade: '8.9',
      year: 'Fall 2024'
    },
    {
      tip: 'Thuyết trình cuối kỳ: 7 phút thuyết trình + 3 phút hỏi đáp. Thầy kiểm tra logic kinh doanh rất khắt khe. Chuẩn bị cho câu hỏi tài chính: tính toán đơn vị kinh tế, chi phí thu khách hàng, giá trị vòng đời',
      author: 'Ngô Thanh Tùng - ENT1789',
      grade: '9.1',
      year: 'Spring 2025'
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'methodology': 'bg-primary/10 text-primary',
      'customer-research': 'bg-success/10 text-success',
      'prototyping': 'bg-warning/10 text-warning',
      'presentation': 'bg-accent/10 text-accent'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Dễ': 'text-success',
      'Trung bình': 'text-warning',
      'Khó': 'text-error'
    };
    return colors[difficulty] || 'text-gray-600';
  };

  // Simulate file download
  const handleDownload = (fileName) => {
    // Create a mock file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;

    // Simulate download
    message.success(`Đang tải xuống ${fileName}...`);

    // Simulate download completion after 2 seconds
    setTimeout(() => {
      message.success(`Đã tải xuống ${fileName} thành công!`);
    }, 2000);
  };

  return (
    <Layout title="Kế hoạch học tập cá nhân" description="Chiến lược học tập khởi nghiệp được cá nhân hóa">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/teachers/3')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftOutlined />
          <span>Quay lại profile giảng viên</span>
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kế hoạch học tập cá nhân
            </h1>
            <p className="text-lg text-gray-600">
              Môn <span className="font-bold text-primary">{teacher.subject}</span> với{' '}
              <span className="font-bold text-primary">{teacher.name}</span>
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
              <TrophyOutlined />
              <span className="font-medium">Được tối ưu hóa cho 10 tuần</span>
            </div>
          </div>

          {/* Teacher Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Rating', value: teacher.overallRating, icon: <StarOutlined /> },
              { label: 'Độ khó', value: teacher.difficulty, icon: <AimOutlined /> },
              { label: 'Sẽ học lại', value: `${teacher.wouldTakeAgain}%`, icon: <CheckCircleOutlined /> },
              { label: 'Tỷ lệ pass', value: `${teacher.passRate}%`, icon: <TrophyOutlined /> },
              { label: 'Điểm TB', value: teacher.averageGrade, icon: <FireOutlined /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
              >
                <div className="text-primary text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Teacher Strengths */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Điểm mạnh của giảng viên:</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.strengths.map((strength, index) => (
                <span
                  key={strength}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${index % 4 === 0 ? 'bg-primary/10 text-primary' :
                    index % 4 === 1 ? 'bg-success/10 text-success' :
                      index % 4 === 2 ? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                    }`}
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              type="primary"
              icon={<CalendarOutlined />}
              onClick={() => setShowScheduleModal(true)}
              className="bg-primary hover:bg-primary-hover font-medium"
            >
              Xem lịch học 10 tuần
            </Button>
            <Button
              icon={<BookOutlined />}
              onClick={() => navigate('/materials')}
              className="border-primary text-primary hover:bg-primary/5 font-medium"
            >
              Tài liệu học tập
            </Button>
            <Button
              icon={<UserOutlined />}
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              className="border-gray-300 text-gray-700 hover:border-gray-400 font-medium"
            >
              Profile thầy
            </Button>
          </div>
        </div>

        {/* Study Strategies */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOutlined className="mr-2 text-primary" />
            Chiến lược khởi nghiệp được tối ưu
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studyStrategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{strategy.title}</h3>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(strategy.category)}`}>
                    {strategy.category.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{strategy.content}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Độ khó: <span className={`font-medium ${getDifficultyColor(strategy.difficulty)}`}>
                      {strategy.difficulty}
                    </span>
                  </span>
                  <span className="text-sm text-gray-600">
                    Impact: <span className="font-medium text-success">{strategy.impact}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Study Materials */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FileTextOutlined className="mr-2 text-primary" />
            Tài liệu khởi nghiệp
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {studyMaterials.map((material, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span>{material.format} • {material.size}</span>
                      <span>{material.downloads} downloads</span>
                      <div className="flex items-center space-x-1">
                        <Rate disabled defaultValue={material.rating} allowHalf className="text-xs" />
                        <span>{material.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {material.type === 'video' ? (
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlayCircleOutlined />}
                      className="bg-primary hover:bg-primary-hover"
                      onClick={() => handleDownload(`${material.title}.${material.format.toLowerCase()}`)}
                    >
                      Xem video
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      icon={<DownloadOutlined />}
                      className="bg-primary hover:bg-primary-hover"
                      onClick={() => handleDownload(`${material.title}.${material.format.toLowerCase()}`)}
                    >
                      Tải xuống
                    </Button>
                  )}
                  <Button
                    size="small"
                    onClick={() => navigate('/materials/1')}
                    className="border-gray-300 text-gray-700 hover:border-gray-400"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Tips from Alumni */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BulbOutlined className="mr-2 text-warning" />
            Tips từ sinh đã học với {teacher.name}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {successTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-warning/5 border border-warning/20 rounded-xl p-4"
              >
                <p className="text-gray-800 mb-3 italic">"{tip.tip}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">— {tip.author}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${tip.grade === 'A+' ? 'bg-success text-white' : 'bg-primary text-white'
                      }`}>
                      {tip.grade}
                    </span>
                    <span className="text-gray-500">{tip.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule Modal */}
        <Modal
          title="Lịch học 10 tuần chi tiết - Trải nghiệm khởi nghiệp"
          open={showScheduleModal}
          onCancel={() => setShowScheduleModal(false)}
          footer={null}
          width={800}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(weeklySchedule).map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(Number(week))}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${selectedWeek === Number(week)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {week === '1' ? 'Tuần 1-2' :
                    week === '2' ? 'Tuần 3-4' :
                      week === '3' ? 'Tuần 5-6' :
                        week === '4' ? 'Tuần 7-8' : 'Tuần 9-10'}
                </button>
              ))}
            </div>

            {weeklySchedule[selectedWeek] && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {weeklySchedule[selectedWeek].title}
                </h3>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Tasks cần hoàn thành:</h4>
                  {weeklySchedule[selectedWeek].tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <span className="text-gray-900">{task.task}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">⏱️ {task.time}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${task.priority === 'high' ? 'bg-error/10 text-error' :
                            task.priority === 'medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                            }`}>
                            {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Deliverables:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {weeklySchedule[selectedWeek].deliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <BulbOutlined className="text-success mt-1" />
                    <div>
                      <h4 className="font-medium text-success mb-1">Pro Tip:</h4>
                      <p className="text-success/80">{weeklySchedule[selectedWeek].tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default PremiumStudyPlan;