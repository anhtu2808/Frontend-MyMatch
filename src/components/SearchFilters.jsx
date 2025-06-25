import React, { useState } from 'react';
import { Input, Select, Button, Tabs } from 'antd';
import { SearchOutlined, UserOutlined, BookOutlined, CodeOutlined, ReloadOutlined } from '@ant-design/icons';

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
  const [filters, setFilters] = useState({
    search: '',
    teacherCode: '',
    subjectName: '',
    subjectCode: '',
    sortBy: 'Highest Rating'
  });



  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    // Call respective callback functions
    switch (field) {
      case 'search':
        onSearchChange?.(value);
        break;
      case 'teacherCode':
        onTeacherCodeChange?.(value);
        break;
      case 'subjectName':
        onSubjectNameChange?.(value);
        break;
      case 'subjectCode':
        onSubjectCodeChange?.(value);
        break;
      case 'sortBy':
        onSortChange?.(value);
        break;
    }
  };

  const tabItems = [
    { key: 'all', label: `Tất cả (${totalCount})` },
    { key: 'reviewed', label: `Đã đánh giá (${reviewedCount})` },
    { key: 'bookmarked', label: `Đã đánh dấu (${bookmarkedCount})` }
  ];

  const sortOptions = [
    { value: 'Highest Rating', label: 'Highest Rating' },
    { value: 'Lowest Rating', label: 'Lowest Rating' },
    { value: 'Most Reviews', label: 'Most Reviews' },
    { value: 'Alphabetical', label: 'Alphabetical' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Navigation Tabs */}
      <div className="mb-8">
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          items={tabItems}
        />
      </div>

      {/* Search Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Tìm giảng viên
          </label>
          <Input
            placeholder="Type a name..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            prefix={<SearchOutlined />}
            className="rounded-xl h-12"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Mã giảng viên
          </label>
          <Input
            placeholder="e.g. TCH123"
            value={filters.teacherCode}
            onChange={(e) => handleFilterChange('teacherCode', e.target.value)}
            prefix={<UserOutlined />}
            className="rounded-xl h-12"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Tên môn
          </label>
          <Input
            placeholder="e.g. Algorithms"
            value={filters.subjectName}
            onChange={(e) => handleFilterChange('subjectName', e.target.value)}
            prefix={<BookOutlined />}
            className="rounded-xl h-12"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Mã môn
          </label>
          <Input
            placeholder="e.g. CS101"
            value={filters.subjectCode}
            onChange={(e) => handleFilterChange('subjectCode', e.target.value)}
            prefix={<CodeOutlined />}
            className="rounded-xl h-12"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Sắp xếp theo
          </label>
          <Select
            value={filters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            options={sortOptions}
            className="w-full rounded-xl"
            style={{ height: '48px' }}
            size="large"
          />
        </div>

        {/* Filter Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setFilters({
                search: '',
                teacherCode: '',
                subjectName: '',
                subjectCode: '',
                sortBy: 'Highest Rating'
              });
              // Reset all filters
              onSearchChange?.('');
              onTeacherCodeChange?.('');
              onSubjectNameChange?.('');
              onSubjectCodeChange?.('');
              onSortChange?.('Highest Rating');
            }}
            icon={<ReloadOutlined />}
            className="px-4 py-2.5 h-12 text-sm font-medium"
          >
            Xóa bộ lọc
          </Button>
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            className="px-6 py-2.5 h-12 text-sm font-medium bg-blue-500 hover:bg-blue-600"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;