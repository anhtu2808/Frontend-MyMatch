import React, { useState } from 'react';
import { Input, Select, Button, Tabs } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  BookOutlined,
  CodeOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const SearchFilters = ({
  onSearchChange,
  onTeacherCodeChange,
  onSubjectNameChange,
  onSubjectCodeChange,
  onSortChange,
  activeTab = 'all',
  onTabChange,
  bookmarkedCount = 0,
  reviewedCount = 0,
  totalCount = 0
}) => {
  // Local state giữ giá trị của các filter
  const [filters, setFilters] = useState({
    search: '',
    teacherCode: '',
    subjectName: '',
    subjectCode: '',
    sortBy: 'Highest Rating'
  });

  // Khi nhập input, chỉ update local state
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Khi ấn "Tìm kiếm", đẩy giá trị hiện tại lên parent
  const applyFilters = () => {
    onSearchChange?.(filters.search);
    onTeacherCodeChange?.(filters.teacherCode);
    onSubjectNameChange?.(filters.subjectName);
    onSubjectCodeChange?.(filters.subjectCode);
    onSortChange?.(filters.sortBy);
  };

  // Xóa local state và notify parent ngay lập tức
  const resetFilters = () => {
    const empty = {
      search: '',
      teacherCode: '',
      subjectName: '',
      subjectCode: '',
      sortBy: 'Highest Rating'
    };
    setFilters(empty);
    onSearchChange?.(empty.search);
    onTeacherCodeChange?.(empty.teacherCode);
    onSubjectNameChange?.(empty.subjectName);
    onSubjectCodeChange?.(empty.subjectCode);
    onSortChange?.(empty.sortBy);
  };

  // Cấu hình tabs và sort options
  const tabItems = [
    { key: 'all', label: `Tất cả (${totalCount})` },
    { key: 'reviewed', label: `Đã đánh giá (${reviewedCount})` },
    { key: 'bookmarked', label: `Đã đánh dấu (${bookmarkedCount})` }
  ];

  const sortOptions = [
    { value: 'Highest Rating', label: 'Đánh giá cao nhất' },
    { value: 'Lowest Rating', label: 'Đánh giá thấp nhất' },
    { value: 'Most Reviews', label: 'Đánh giá nhiều nhất' },
    { value: 'Alphabetical', label: 'Tên A-Z' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Tabs điều hướng */}
      <div className="mb-8">
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          items={tabItems}
        />
      </div>

      {/* Grid các filter inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Tìm giảng viên theo tên */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Tìm giảng viên
          </label>
          <Input
            placeholder="Type a name..."
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            prefix={<SearchOutlined />}
            className="rounded-xl h-12"
          />
        </div>

        {/* Tìm theo Mã giảng viên */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Mã giảng viên
          </label>
          <Input
            placeholder="e.g. TCH123"
            value={filters.teacherCode}
            onChange={e => handleFilterChange('teacherCode', e.target.value)}
            prefix={<UserOutlined />}
            className="rounded-xl h-12"
          />
        </div>

        {/* Tìm theo Tên môn */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Tên môn
          </label>
          <Input
            placeholder="e.g. Algorithms"
            value={filters.subjectName}
            onChange={e => handleFilterChange('subjectName', e.target.value)}
            prefix={<BookOutlined />}
            className="rounded-xl h-12"
          />
        </div>

        {/* Tìm theo Mã môn */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Mã môn
          </label>
          <Input
            placeholder="e.g. CS101"
            value={filters.subjectCode}
            onChange={e => handleFilterChange('subjectCode', e.target.value)}
            prefix={<CodeOutlined />}
            className="rounded-xl h-12"
          />
        </div>
      </div>

      {/* Sắp xếp và các nút hành động */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        {/* Select sắp xếp */}
        <div className="flex-1 max-w-sm">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Sắp xếp theo
          </label>
          <Select
            value={filters.sortBy}
            onChange={value => handleFilterChange('sortBy', value)}
            options={sortOptions}
            className="w-full rounded-xl"
            style={{ height: '48px' }}
            size="large"
          />
        </div>

        {/* Nút Xóa và Tìm kiếm */}
        <div className="flex gap-3">
          <Button
            onClick={resetFilters}
            icon={<ReloadOutlined />}
            className="px-4 py-2.5 h-12 text-sm font-medium border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            Xóa bộ lọc
          </Button>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="px-6 py-2.5 h-12 text-sm font-medium bg-primary hover:bg-primary-hover"
            onClick={applyFilters}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
