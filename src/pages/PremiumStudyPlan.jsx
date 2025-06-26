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
    title: 'Thời gian',
    content: 'Ưu tiên học buổi sáng hoặc tối, slot trước 10h hoặc sau 19h để đạt hiệu quả cao.'
  },
  {
    title: 'Chiến lược học tập',
    content: 'Quản lý thời gian bằng cách chia bài tập lớn thành phần nhỏ, hoàn thành hàng ngày.'
  },
  {
    title: 'Tư vấn giảng dạy',
    content: 'Khai thác office hours để hỏi thầy về vấn đề còn thắc mắc.'
  },
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
        <Card title={<span style={{ color: '#ff9800' }}><BulbOutlined /> Lifehacks</span>} className="rounded-xl shadow">
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

