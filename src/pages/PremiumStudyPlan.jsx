import React from 'react';
import {
  Card,
  Tag,
  List,
  Space,
  Typography,
  Button,
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const teacher = {
  name: 'NGUYỄN VĂN A',
  subject: 'ABC',
  overallRating: 4.2,
  difficulty: 3.1,
  wouldTakeAgain: 85,
  strengths: ['Truyền cảm hứng', 'Điểm chuẩn', 'Đưa ra phản hồi tốt'],
};

const studyPlan = [
  {
    title: 'Chia nhỏ bài tập lớn theo ngày',
    content: 'Đối với assignment hoặc project dài hạn (1–2 tuần), hãy chia nhỏ công việc thành các bước như: tìm hiểu đề bài (ngày 1), lập kế hoạch/flowchart (ngày 2), viết phần 1 (ngày 3–4), kiểm tra + sửa lỗi (ngày 5), chuẩn bị nộp (ngày 6–7). Mỗi ngày chỉ cần hoàn thành 1 bước để tránh bị quá tải sát deadline.'
  },
  {
    title: 'Ưu tiên bài tập theo deadline & độ khó',
    content: 'Tạo danh sách các bài tập cần làm mỗi tuần. Sắp xếp theo thứ tự ưu tiên: (1) gần deadline, (2) khó hiểu, (3) quan trọng (nhiều điểm). Áp dụng nguyên tắc Eisenhower hoặc bảng Kanban để theo dõi tiến độ.'
  },
  {
    title: 'Tái sử dụng kiến thức từ bài giảng',
    content: 'Ngay sau buổi học, cố gắng áp dụng ngay kiến thức vừa học vào bài tập. Điều này giúp hiểu sâu và tiết kiệm thời gian. Có thể dùng slide, ví dụ minh họa của thầy cô làm nền tảng để phát triển thêm.'
  },
  {
    title: 'Giải đề mẫu và đề cũ trước kiểm tra',
    content: '1 tuần trước khi kiểm tra giữa kỳ/cuối kỳ, hãy luyện đề mẫu hoặc đề thi cũ ít nhất 2–3 lần. Ghi lại lỗi sai, rà lại lý thuyết. Dùng Flashcard (Quizlet, Anki) để ôn lại các định nghĩa, công thức, key points.'
  },
  {
    title: 'Học nhóm để xử lý bài tập khó',
    content: 'Nếu gặp bài tập khó, hãy chia sẻ với nhóm học. Có thể phân công mỗi người làm phần riêng, sau đó cùng review và giải thích lại cho nhau. Học nhóm giúp phát hiện lỗ hổng kiến thức nhanh hơn.'
  }
];


const testTips = [
  {
    title: 'Đề kiểm tra',
    tags: ['Trắc nghiệm', 'Tự luận'],
    note: 'Ôn kỹ slide giảng để đạt kết quả cao.'
  },
  {
    title: 'Slide',
    tags: ['PDF'],
    note: 'Tải slide trên LMS để ôn bài.'
  },
  {
    title: 'Tài liệu gợi ý',
    tags: ['Sách giáo trình', 'Tài liệu tham khảo'],
    note: 'Đọc kỹ phần giới thiệu, tóm tắt lại kiến thức chính.'
  },
];

const lifehacks = [
  'Học bài trước mỗi tiết, mỗi buổi đều có bài kiểm tra nhỏ',
  'Đừng lo về điểm số ban đầu, ưu tiên thái độ học tập cùng việc nắm rõ chi tiết',
];

const PremiumStudyPlan = () => {
  const navigate = useNavigate(); 
  return (
    <Layout title="Kế hoạch học tập cá nhân">
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
        <Title level={2} className="text-blue-900">
          Kế hoạch học tập môn <span className="uppercase">{teacher.subject}</span> -{' '}
          <span className="uppercase">{teacher.name}</span>
        </Title>

        {/* Teacher Info */}
        <Card className="rounded-xl shadow">
          <Space size="large" align="center" className="w-full flex flex-col md:flex-row justify-between">
            <div className="bg-blue-100 rounded-full p-3">
              <UserOutlined className="text-3xl text-blue-600" />
            </div>
            <div>
              <Text strong className="text-lg">{teacher.name}</Text><br />
              <Text type="secondary">{teacher.subject}</Text>
            </div>
            <div className="flex justify-around flex-1 space-x-4 mt-3 md:mt-0">
              {[{
                label: 'Đánh giá tổng',
                value: teacher.overallRating,
                textColor: '#007BFF',
                bg: 'bg-gradient-to-r from-[#eaf4ff] to-[#d2eaff]',
              }, {
                label: 'Mức độ khó',
                value: teacher.difficulty,
                textColor: '#DAA520',
                bg: 'bg-gradient-to-r from-[#fffbe5] to-[#fff1c1]',
              }, {
                label: 'Sẽ học lại',
                value: `${teacher.wouldTakeAgain}%`,
                textColor: '#28a745',
                bg: 'bg-gradient-to-r from-[#eafff3] to-[#c9ffe1]',
              }].map((stat) => (
                <div
                  key={stat.label}
                  className={`${stat.bg} rounded-lg p-4 flex flex-col items-center justify-center flex-1`}
                >
                  <span className="text-3xl font-bold" style={{ color: stat.textColor }}>{stat.value}</span>
                  <span className="text-gray-600 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </Space>
          <div className="mt-4 space-x-2 flex flex-wrap">
            {teacher.strengths.map((str) => (
              <Tag
                key={str}
                style={{
                  fontSize: '14px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: '#667eea',
                  color: '#fff',
                  fontWeight: 500,
                }}
              >
                {str}
              </Tag>
            ))}
          </div>
        </Card>

        {/* Study Plan */}
        <Card title={<span className="text-blue-800"><BookOutlined /> Chiến Lược Học Tập</span>} className="rounded-xl shadow">
          <List
            dataSource={studyPlan}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Text strong>{item.title}</Text>}
                  description={item.content}
                />
              </List.Item>
            )}
            bordered
            itemLayout="vertical"
          />
        </Card>

        {/* Test Tips */}
        <Card title={<span className="text-green-700"><CheckCircleOutlined /> Thi / Kiểm tra</span>} className="rounded-xl shadow">
          {testTips.map((tip, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <Text strong>{tip.title}</Text>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tip.tags.map((tag) => (
                      <Tag key={tag} color="geekblue" className="rounded-full">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <Text>{tip.note}</Text>
                </div>
                <Button
                  icon={<FileTextOutlined />}
                  shape="round"
                  size="middle"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    fontWeight: 500,
                    padding: '0 16px',
                    border: 'none',
                  }}
                  onClick={() => navigate('/study-material-detail')} // Thêm dòng này
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                >
                  Xem tài liệu
                </Button>
              </div>
            </div>
          ))}
        </Card>

        {/* Lifehacks */}
        <Card title={<span style={{ color: '#ff9800' }}><BulbOutlined /> Tips</span>} className="rounded-xl shadow">
          <List
            dataSource={lifehacks}
            renderItem={(item) => (
              <List.Item className="pl-3">
                <CheckCircleOutlined className="text-[#28a745] mr-2" />
                <Text>{item}</Text>
              </List.Item>
            )}
            bordered
            itemLayout="vertical"
            className="text-left"
          />
        </Card>
      </div>
    </Layout>
  );
};

export default PremiumStudyPlan;

