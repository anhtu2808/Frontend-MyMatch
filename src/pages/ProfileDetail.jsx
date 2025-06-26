import React, { useState } from 'react';
import { Button, Tag, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  StarOutlined,
  BulbOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  VideoCameraOutlined,
  BookOutlined,
  RocketOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';

const ProfileDetail = () => {
  const navigate = useNavigate();
  const [selectedPersonality, setSelectedPersonality] = useState([]);
  const [selectedLearning, setSelectedLearning] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customTags, setCustomTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const data = {
    personality: [
      { label: 'Hướng nội', icon: <UserOutlined /> },
      { label: 'Hướng ngoại', icon: <TeamOutlined /> },
      { label: 'Cú đêm', icon: <StarOutlined /> },
      { label: 'Dậy sớm', icon: <BulbOutlined /> },
      { label: 'Rất ngăn nắp', icon: <FileTextOutlined /> },
      { label: 'Linh hoạt', icon: <FileSearchOutlined /> },
      { label: 'Thích cấu trúc', icon: <RocketOutlined /> },
    ],
    learning: [
      { label: 'Chấm điểm dễ', icon: <StarOutlined /> },
      { label: 'Bài giảng tương tác', icon: <VideoCameraOutlined /> },
      { label: 'Slide rõ ràng', icon: <BookOutlined /> },
      { label: 'Dựa trên dự án', icon: <SolutionOutlined /> },
      { label: 'Ít bài tập về nhà', icon: <FileSearchOutlined /> },
      { label: 'Thiên về lý thuyết', icon: <FileTextOutlined /> },
    ],
    skills: [
      { label: 'Backend Developer', icon: <SolutionOutlined /> },
      { label: 'Thuyết trình', icon: <TeamOutlined /> },
      { label: 'Phân tích dữ liệu', icon: <FileSearchOutlined /> },
      { label: 'Figma', icon: <StarOutlined /> },
      { label: 'Giải quyết vấn đề', icon: <RocketOutlined /> },
      { label: 'Khả năng lãnh đạo', icon: <UserOutlined /> },
      { label: 'Viết lách', icon: <BookOutlined /> },
    ],
  };

  const sections = [
    {
      key: 'personality',
      title: 'Personality Traits',
      description: 'Điều gì mô tả tính cách của bạn tốt nhất?',
      state: selectedPersonality,
      setState: setSelectedPersonality,
      max: 5,
    },
    {
      key: 'learning',
      title: 'Nhu cầu học tập',
      description: 'Bạn đang tìm kiếm điều gì ở một khóa học hoặc giảng viên?',
      state: selectedLearning,
      setState: setSelectedLearning,
      max: 5,
    },
    {
      key: 'skills',
      title: 'Kỹ năng & Thế mạnh',
      description: 'Điểm mạnh hoặc kỹ năng của bạn',
      state: selectedSkills,
      setState: setSelectedSkills,
      max: 5,
    },
  ];

  const handleToggle = (list, setList, value, max) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else if (list.length < max) {
      setList([...list, value]);
    }
  };
  
  const handleTagAdd = () => {
    if (inputValue && !customTags.includes(inputValue) && customTags.length < 5) {
      setCustomTags([...customTags, inputValue]);
      setInputValue('');
    }
  };
  
  return (
    <Layout title="Giới thiệu về bạn">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <p className="mb-8 text-gray-500">Hãy giúp chúng tôi cá nhân hoá trải nghiệm học tập và làm việc nhóm của bạn.</p>

        {sections.map(section => (
          <div key={section.key} className="mb-10">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="mb-2 text-gray-500">{section.description}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {data[section.key].map(item => {
                const isActive = section.state.includes(item.label);
                const activeColor =
                  section.key === 'personality'
                    ? 'bg-blue-100 text-blue-600'
                    : section.key === 'learning'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-purple-100 text-purple-600';
                return (
                  <Button
                    key={item.label}
                    icon={React.cloneElement(item.icon, {
                      className: isActive
                        ? section.key === 'personality'
                          ? 'text-blue-600'
                          : section.key === 'learning'
                          ? 'text-green-600'
                          : 'text-purple-600'
                        : 'text-gray-400',
                      style: { fontSize: '18px' },
                    })}
                    className={`rounded-full flex items-center gap-3 text-base font-medium px-5 py-3 ${isActive ? activeColor : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => handleToggle(section.state, section.setState, item.label, section.max)}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
            <div className="text-sm text-blue-500 mt-2">Bạn có thể chọn tối đa {section.max}</div>
          </div>
        ))}

        <div className="mb-10">
          <h2 className="text-2xl font-bold">Chi tiết hơn về tôi</h2>
          <p className="mb-2 text-gray-500">Thêm bất cứ điều gì bạn muốn chúng tôi biết (tùy chọn).</p>
          <Input
            placeholder="e.g., Học nhanh, Yêu thích AI, Thiết kế UI"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleTagAdd}
            className="mb-3 rounded-lg"
            size="large"
          />
          <div className="flex flex-wrap gap-2">
            {customTags.map(tag => (
              <Tag
                key={tag}
                closable
                onClose={() => setCustomTags(customTags.filter(t => t !== tag))}
                style={{
                  backgroundColor: '#EAF3FF',
                  color: '#007BFF',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: 'none',
                }}
                closeIcon={<span style={{ fontSize: '14px', color: '#007BFF' }}>×</span>}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            size="large"
            className="rounded-full px-10 py-3 text-base font-semibold"
            style={{ backgroundColor: '#007BFF' }}
            onClick={() => navigate('/ai-recommendation')} // Thêm onClick này
          >
            Continue
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileDetail;
