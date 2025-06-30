import React, { useState } from 'react';
import { Button, Select } from 'antd';
import {
  BookOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const mockTeachers = [
  {
    id: 1,
    name: 'Dr. Emily Carter',
    place: '1st',
    percent: '98%',
    university: 'Đại học Stanford',
    desc: 'Phù hợp 98%. Chuyên môn xuất sắc, cách giảng dạy sinh động và dễ hiểu.'
  },
  {
    id: 2,
    name: 'Prof. Daniel Lee',
    place: '2nd',
    percent: '95%',
    university: 'MIT',
    desc: 'Phù hợp 95%. Tuyệt vời để thảo luận vấn đề, khuyến khích tư duy phản biện.'
  },
  {
    id: 3,
    name: 'Dr. Priya Singh',
    place: '3rd',
    percent: '91%',
    university: 'Art Institute',
    desc: 'Phù hợp 91%. Hình ảnh sáng tạo, phù hợp phong cách bằng hình ảnh và định dạng linh hoạt.'
  },
];

const AiRecommendation = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = () => {
    setLoading(true);
    setTimeout(() => {
      setTeachers(mockTeachers);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout title="Đề xuất giảng viên bằng AI">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <p className="text-gray-600 mt-2">Tìm giảng viên phù hợp nhất với bạn bằng AI và đánh giá từ cộng đồng</p>

        {/* Chỉ còn phần chọn môn học */}
        <div className="bg-gray-100 rounded-xl p-6 mt-6 space-y-3">
          <div className="text-xl font-bold">Chọn môn học bạn muốn</div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">Môn học</label>
            <Select
              placeholder="Ví dụ: MAT101 - Toán cao cấp"
              value={subject}
              onChange={setSubject}
              className="w-full rounded-full"
              size="large"
              suffixIcon={<BookOutlined />}
              allowClear
            >
              <Option value="EXE101">EXE101 - Nhập môn Kỹ thuật</Option>
              <Option value="MAT101">MAT101 - Toán cao cấp</Option>
              <Option value="ENG101">ENG101 - Tiếng Anh cơ bản</Option>
            </Select>
          </div>
        </div>

        {/* Nút lấy gợi ý */}
        <div className="mt-6">
          <Button
            icon={<TrophyOutlined />}
            type="primary"
            size="large"
            className="rounded-full px-8"
            loading={loading}
            onClick={handleRecommend}
          >
            Get Recommendations
          </Button>
        </div>

        {/* KẾT QUẢ GỢI Ý */}
        {teachers.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">🏆 Top 3 Giảng viên phù hợp</h2>
            <div className="flex justify-center items-end mt-6 space-x-4">

              {/* 2nd Place */}
              {teachers[1] && (
                <div className="flex flex-col items-center transform hover:scale-105 transition">
                  <div className="text-center">
                    <div className="text-3xl">🥈</div>
                    <div className="font-bold text-lg">{teachers[1].name}</div>
                    <div className="text-gray-600">{teachers[1].university}</div>
                    <div className="text-gray-500 text-sm">{teachers[1].percent} Match</div>
                    <Button
                      className="mt-2 w-40 rounded-full font-semibold"
                      size="small"
                      style={{ backgroundColor: '#9CA3AF', color: 'white' }}
                      onClick={() => navigate(`/teachers/${teachers[1]?.id || 1}`)}
                    >
                      Xem hồ sơ
                    </Button>
                  </div>
                  <div className="bg-gray-300 w-52 h-24 rounded-t-2xl mt-3 flex justify-center"></div>
                </div>
              )}

              {/* 1st Place */}
              {teachers[0] && (
                <div className="flex flex-col items-center transform hover:scale-105 transition">
                  <div className="text-center">
                    <div className="text-3xl">🥇</div>
                    <div className="font-bold text-lg">{teachers[0].name}</div>
                    <div className="text-gray-600">{teachers[0].university}</div>
                    <div className="text-gray-500 text-sm">{teachers[0].percent} Match</div>
                    <Button
                      className="mt-2 w-40 rounded-full font-semibold"
                      size="small"
                      style={{ backgroundColor: '#FCD34D', color: 'black' }}
                      onClick={() => navigate(`/teachers/${teachers[0]?.id || 1}`)}
                    >
                      Xem hồ sơ
                    </Button>
                  </div>
                  <div className="bg-yellow-300 w-52 h-32 rounded-t-2xl mt-3 flex justify-center"></div>
                </div>
              )}

              {/* 3rd Place */}
              {teachers[2] && (
                <div className="flex flex-col items-center transform hover:scale-105 transition">
                  <div className="text-center">
                    <div className="text-3xl">🥉</div>
                    <div className="font-bold text-lg">{teachers[2].name}</div>
                    <div className="text-gray-600">{teachers[2].university}</div>
                    <div className="text-gray-500 text-sm">{teachers[2].percent} Match</div>
                    <Button
                      className="mt-2 w-40 rounded-full font-semibold"
                      size="small"
                      style={{ backgroundColor: '#FDBA74', color: 'white' }}
                      onClick={() => navigate(`/teachers/${teachers[2]?.id || 1}`)}
                    >
                      Xem hồ sơ
                    </Button>
                  </div>
                  <div className="bg-orange-300 w-52 h-16 rounded-t-2xl mt-3 flex justify-center"></div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AiRecommendation;
