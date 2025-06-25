import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    {
      id: 'dashboard',
      name: 'Bảng điều khiển',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      id: 'teachers',
      name: 'Giảng viên',
      path: '/teachers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'exchange',
      name: 'Đổi chéo lớp',
      path: '/exchange',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: 'schedule',
      name: 'Thời khóa biểu',
      path: '/schedule',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'messages',
      name: 'Tin nhắn',
      path: '/messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'favorites',
      name: 'Đã yêu thích',
      path: '/favorites',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary-500">My Match</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                  }`
                }
              >
                <span className="flex-shrink-0">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Suggestion Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                     <div className="flex items-center space-x-3 mb-3">
             <img 
               src="/src/assets/figma/suggestion-icon.png" 
               alt="Suggestion" 
               className="w-6 h-6"
               onError={(e) => {
                 e.target.style.display = 'none';
               }}
             />
             <span className="font-medium text-blue-800">Gợi ý giảng viên</span>
           </div>
          <p className="text-sm text-blue-600 mb-3">
            Khám phá các giảng viên được đánh giá cao
          </p>
          <NavLink 
            to="/teachers" 
            className="text-xs font-medium text-blue-700 hover:text-blue-800 underline"
          >
            Xem ngay →
          </NavLink>
        </div>
      </nav>

      {/* Settings Section */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">Cài đặt</span>
        </NavLink>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
                 <div className="flex items-center space-x-3 px-4 py-3">
           <img 
             src="/src/assets/figma/avatar.png" 
             alt="User Avatar" 
             className="w-10 h-10 rounded-full object-cover"
             onError={(e) => {
               e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSIjOUI5Qjk5Ii8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDIwIDQgMTguNjcgNCAxNkM0IDEzLjMzIDYuNjcgMTIgMTIgMTJDMTcuMzMgMTIgMjAgMTMuMzMgMjAgMTZDMjAgMTguNjcgMTcuMzMgMjAgMTIgMjBaIiBmaWxsPSIjOUI5Qjk5Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
             }}
           />
           <div className="flex-1 min-w-0">
             <p className="text-sm font-medium text-gray-900 truncate">Nguyễn Văn A</p>
             <p className="text-xs text-gray-500 truncate">nguyenvana@fpt.edu.vn</p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar; 