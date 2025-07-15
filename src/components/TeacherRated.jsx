import React from 'react';
import avatar1 from '../assets/figma/avatar1.svg';
import avatar2 from '../assets/figma/avatar2.svg';

const TeacherRated = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-[24px] font-semibold text-[#1A237E] mb-4">Giảng viên</h2>
      <p className="text-[18px] font-medium text-[#1A237E] mb-6">Duyệt & Đánh giá</p>
      
      {/* Navigation Tabs */}
      <div className="border-b border-[#E8E8E8] mb-6">
        <div className="flex gap-8 pb-3">
          <button className="text-[14px] font-medium text-[#949494]">Tất cả</button>
          <button className="text-[14px] font-medium text-black">Đã đánh giá</button>
          <button className="text-[14px] font-medium text-[#949494]">Đã đánh dấu</button>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <label className="block text-[14px] font-medium text-[#0A0A0A] mb-2">
          Tìm kiếm giảng viên
        </label>
        <div className="bg-[#F8F8F7] rounded-xl p-3">
          <input
            type="text"
            placeholder="Type a name..."
            className="w-full bg-transparent text-[14px] text-[#949494] outline-none"
          />
        </div>
      </div>

      {/* Rated Teachers Section */}
      <div>
        <h3 className="text-[16px] font-medium text-[#1A237E] mb-6">
          Các giảng viên bạn đã đánh giá
        </h3>

        {/* Teacher List */}
        <div className="space-y-5">
          {/* Teacher 1 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img src={avatar1} alt="Dr. Emily Carter" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-medium">Dr. Emily Carter</p>
              <p className="text-[14px] font-medium">Computer Science</p>
            </div>
          </div>

          {/* Teacher 2 */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img src={avatar2} alt="Dr. Mark Lee" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-medium">Dr. Mark Lee</p>
              <p className="text-[14px] font-medium">Mathematics</p>
            </div>
          </div>
        </div>

        {/* Rate More Button */}
        <button className="mt-8 bg-[#284CFF] text-white text-[14px] font-semibold px-4 py-2.5 rounded-xl">
          Đánh giá khác
        </button>
      </div>
    </div>
  );
};

export default TeacherRated;