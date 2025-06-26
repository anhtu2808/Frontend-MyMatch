import React from 'react';
import { Card, Table, Typography, Divider, List } from 'antd';
import { FileTextOutlined, BulbOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';

const { Title, Text } = Typography;

const quiz1Tips = [
  "Tập trung vào các khái niệm chính từ chương 1 đến chương 3. Luyện tập việc vẽ các chuỗi mô tả nếu được. Xem lại bảng tóm tắt điểm nhấn/nhận xét nhanh."
]; 
const quiz2Tips = [
  "Nắm vững việc hiểu biết về di truyền học và bảng Punnett. Xem bảng tóm tắt và vẽ minh hoạ nếu cần."
];

const quiz1Table = [
  { topic: "Quang hợp", keyPoint: "Chuyển hóa năng lượng", example: "Ánh sáng → Glucose" },
  { topic: "Chu kỳ tế bào", keyPoint: "Các giai đoạn & điểm kiểm soát", example: "Nguyên phân (Mitosis)" },
];

const quiz2Table = [
  { topic: "Di truyền Mendel", keyPoint: "Tỉ lệ trội/lặn", example: "Vẽ bảng Punnett để minh hoạ" },
];

const StudyMaterialDetail = () => {
  return (
    <Layout title="Study Material Overview">
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-8 text-gray-800 bg-gradient-to-b from-blue-100 to-purple-100 rounded-xl">

        <Card className="rounded-xl shadow-lg border border-blue-300 bg-white/90" bodyStyle={{ padding: 24 }}>
          <Title level={4} className="!text-2xl font-bold text-blue-800 flex items-center gap-2 mb-4">
            <FileTextOutlined className="text-blue-600 text-2xl" /> Quiz 1 Tips
          </Title>
          <List
            dataSource={quiz1Tips}
            renderItem={item => (
              <List.Item className="!pl-0">
                <div className="flex items-center gap-2">
                  <BulbOutlined className="text-yellow-500 text-lg" />
                  <Text className="!m-0 text-base text-gray-800 font-medium">{item}</Text>
                </div>
              </List.Item>
            )}
            bordered={false}
          />
          <Divider />
          <img
            src="https://i.pinimg.com/736x/7a/60/e2/7a60e25d6b41c7a4f0a0a8c719f17e8c.jpg"
            alt="Quiz 1"
            className="w-full rounded-xl mb-4 shadow"
            style={{ maxHeight: 220, objectFit: 'cover' }}
          />
          <Table
            dataSource={quiz1Table}
            columns={[
              { title: <b>Topic</b>, dataIndex: 'topic', key: 'topic' },
              { title: <b>Key Point</b>, dataIndex: 'keyPoint', key: 'keyPoint' },
              { title: <b>Example</b>, dataIndex: 'example', key: 'example' },
            ]}
            pagination={false}
            size="small"
            rowKey="topic"
            className="mb-2"
          />
        </Card>

        <Card className="rounded-xl shadow-lg border border-purple-300 bg-white/90" bodyStyle={{ padding: 24 }}>
          <Title level={4} className="!text-2xl font-bold text-purple-800 flex items-center gap-2 mb-4">
            <FileTextOutlined className="text-purple-600 text-2xl" /> Quiz 2 Tips
          </Title>
          <List
            dataSource={quiz2Tips}
            renderItem={(item) => (
              <List.Item className="!pl-0 !py-1">
                <div className="flex items-center gap-2">
                  <BulbOutlined className="text-yellow-500 text-lg" />
                  <Text className="!m-0 text-base text-gray-800 font-medium">{item}</Text>
                </div>
              </List.Item>
            )}
            bordered={false}
          />
          <Divider />
          <img
            src="https://i.pinimg.com/736x/d7/07/c8/d707c8b9d4266c7853752f806bb2f897.jpg"
            alt="Quiz 2"
            className="w-full rounded-xl mb-4 shadow"
            style={{ maxHeight: 220, objectFit: 'cover' }}
          />
          <Table
            dataSource={quiz2Table}
            columns={[
              { title: <b>Concept</b>, dataIndex: 'topic', key: 'topic' },
              { title: <b>Summary</b>, dataIndex: 'keyPoint', key: 'keyPoint' },
              { title: <b>Tip</b>, dataIndex: 'example', key: 'example' },
            ]}
            pagination={false}
            size="small"
            rowKey="topic"
            className="mb-2"
          />
        </Card>

        <Card className="rounded-xl shadow border border-gray-300 bg-white/90" bodyStyle={{ padding: 24 }}>
          <Title level={4} className="!text-2xl font-bold text-pink-700 mb-4 flex items-center gap-2">
            📝 Assignment
          </Title>
          <div className="grid gap-4 text-gray-800" style={{ gridTemplateColumns: "auto 1fr" }}>
            <div className="font-semibold">Instructions:</div>
            <div className="leading-relaxed">
              Viết một bài luận 2 trang về tác động của biến đổi khí hậu tới hành động địa phương, sử dụng ít nhất 3 nguồn tài liệu đã được kiểm duyệt.
            </div>

            <div className="font-semibold">Rubric:</div>
            <div>Lập dàn ý (30%), Bằng chứng (30%), Cấu trúc (20%), Sự rõ ràng (20%).</div>

            <div className="font-semibold">Sample Outline:</div>
            <div>
              <ol className="list-decimal list-inside space-y-1">
                <li>Giới thiệu</li>
                <li>Nguyên nhân</li>
                <li>Ảnh hưởng</li>
                <li>Giải pháp</li>
                <li>Kết luận</li>
              </ol>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl shadow border border-gray-300 bg-white/90" bodyStyle={{ padding: 24 }}>
          <Title level={4} className="!text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
            📊 Final Project
          </Title>
          <div className="space-y-4 text-gray-800">
            <div className="flex">
              <div className="w-48 font-semibold">Milestone Breakdown:</div>
              <div>Chia suất dự án thành 3, mỗi mốc nộp báo cáo tuần, mỗi mốc có bài kiểm tra nhỏ.</div>
            </div>
            <div className="flex">
              <div className="w-48 font-semibold">Suggested Tools:</div>
              <div>Sử dụng Google Docs để hợp tác, Canva để hoàn thiện, và Zoom để trình diễn.</div>
            </div>
            <div className="flex items-start">
              <div className="w-48 font-semibold">Planning Checklist:</div>
              <ul className="list-disc list-inside space-y-1 text-purple-800">
                <li>✔️ Lên lịch nộp bài</li>
                <li>✔️ Kiểm tra tiến độ</li>
                <li>✔️ Gửi nhắc nhở cho các thành viên</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default StudyMaterialDetail;
