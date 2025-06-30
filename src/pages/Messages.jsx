import React, { useState } from 'react';
import Layout from '../components/Layout';


const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const contacts = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: '/src/assets/figma/avatar.png',
      lastMessage: 'Mình muốn đổi lớp với bạn',
      time: '2 phút',
      unread: 3,
      online: true,
      classWanted: 'SE1234 ',
      classOffered: 'SE5678 ',
      type: 'exchange'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      avatar: '/src/assets/figma/avatar1.svg',
      lastMessage: 'Cảm ơn bạn đã quan tâm!',
      time: '10 phút',
      unread: 0,
      online: true,
      classWanted: 'MAR2345',
      classOffered: 'MAR1234 ',
      type: 'exchange'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      avatar: '/src/assets/figma/avatar2.svg',
      lastMessage: 'Bạn có thể gặp vào thứ 2 không?',
      time: '1 giờ',
      unread: 1,
      online: false,
      classWanted: 'BUS3456 ',
      classOffered: 'BUS2345',
      type: 'exchange'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      avatar: '/src/assets/figma/avatar.png',
      lastMessage: 'Mình đồng ý đổi lớp',
      time: '3 giờ',
      unread: 0,
      online: false,
      classWanted: 'IT4567 ',
      classOffered: 'IT3456 ',
      type: 'exchange'
    },
    {
      id: 5,
      name: 'Ngô Văn E',
      avatar: '/src/assets/figma/avatar.png',
      lastMessage: 'Bạn có muốn tham gia nhóm Web Development không?',
      time: '1 phút',
      unread: 1,
      online: true,
      type: 'group'
    }
  ];

  const conversations = {
    1: [
      {
        id: 1,
        sender: 'other',
        message: 'Chào bạn! Mình thấy bạn đang muốn đổi lớp SE1234 - Nhóm 2',
        time: '14:30',
        date: 'Hôm nay'
      },
      {
        id: 2,
        sender: 'me',
        message: 'Chào bạn! Đúng rồi, mình đang cần đổi sang nhóm 1. Bạn có sẵn sàng đổi không?',
        time: '14:32',
        date: 'Hôm nay'
      },
      {
        id: 3,
        sender: 'other',
        message: 'Mình muốn đổi lớp với bạn. Lịch học của nhóm 1 như thế nào?',
        time: '14:35',
        date: 'Hôm nay'
      },
      {
        id: 4,
        sender: 'me',
        message: 'Nhóm 1 học thứ 2, 4, 6 từ 7h-9h30. Còn nhóm 2 của bạn học khi nào?',
        time: '14:37',
        date: 'Hôm nay'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'other',
        message: 'Hi! Cảm ơn bạn đã quan tâm đến yêu cầu đổi lớp của mình',
        time: '10:15',
        date: 'Hôm nay'
      }
    ],
    3: [
      {
        id: 1,
        sender: 'other',
        message: 'Bạn có thể gặp vào thứ 2 không? Mình muốn thảo luận về việc đổi lớp',
        time: '13:00',
        date: 'Hôm nay'
      }
    ],
    4: [
      {
        id: 1,
        sender: 'other',
        message: 'Mình đồng ý đổi lớp với bạn. Khi nào chúng ta hoàn tất thủ tục?',
        time: '11:30',
        date: 'Hôm nay'
      }
      
    ],
    5: [
      {
        id: 5,
        sender: 'other',
        message: 'Bạn có muốn tham gia nhóm Web Development không?',
        type: 'invite',
        time: '14:40',
        date: 'Hôm nay'
      }
    ]
  };

  const activeContact = contacts.find(contact => contact.id === activeChat);
  const messages = conversations[activeChat] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = filter === 'all' ? contacts : contacts.filter(c => c.type === filter);

  const handleAcceptInvite = () => {
    alert('Bạn đã chấp nhận lời mời tham gia nhóm!');
  };

  return (
    <Layout title="Tin nhắn" description="Trò chuyện với các bạn sinh viên">
      <div className="h-[calc(100vh-200px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex">

        {/* Contacts Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Tin nhắn</h2>
            </div>
            <div className="flex space-x-2 mb-4">
              <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Tất cả</button>
              <button onClick={() => setFilter('exchange')} className={`px-3 py-1 rounded-full text-sm ${filter === 'exchange' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Đổi lớp</button>
              <button onClick={() => setFilter('group')} className={`px-3 py-1 rounded-full text-sm ${filter === 'group' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Ghép nhóm</button>
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm tin nhắn..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveChat(contact.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeChat === contact.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                      {contact.avatar ? (
                        <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-semibold">{contact.name.charAt(0)}</span>
                      )}
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{contact.lastMessage}</p>
                    {contact.type === 'exchange' && (
                      <div className="text-xs space-y-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-green-600">Họ có:</span>
                          <span className="text-gray-500">{contact.classOffered}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-blue-600">Họ muốn:</span>
                          <span className="text-gray-500">{contact.classWanted}</span>
                        </div>
                      </div>
                    )}
                    {contact.unread > 0 && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeContact ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                {activeContact.avatar ? (
                  <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-semibold">{activeContact.name.charAt(0)}</span>
                )}
              </div>
              {activeContact.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">{activeContact.name}</h3>
              <p className="text-sm text-gray-500">
                {activeContact.online ? 'Đang hoạt động' : `Hoạt động ${activeContact.time} trước`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

       {/* Class exchange summary */}
{messages.some(m => m.type !== 'invite') && (
  <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center space-x-2">
        <span className="text-green-600 font-medium">Họ có:</span>
        <span className="text-gray-700">{activeContact.classOffered}</span>
      </div>
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      <div className="flex items-center space-x-2">
        <span className="text-blue-600 font-medium">Họ muốn:</span>
        <span className="text-gray-700">{activeContact.classWanted}</span>
      </div>
    </div>
  </div>
)}

              </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'me'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Xử lý lời mời tham gia nhóm nếu có */}
      {messages.some(m => m.type === 'invite') && (
        <div className="px-6 py-4 border-t bg-yellow-50 text-yellow-800 text-sm">
          <p className="mb-2">Bạn nhận được lời mời tham gia nhóm!</p>
          <button onClick={handleAcceptInvite} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Đồng ý tham gia
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-end space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="w-full p-3 pr-12 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="1"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn một cuộc trò chuyện</h3>
        <p className="text-gray-500">Chọn một người từ danh sách bên trái để bắt đầu trò chuyện</p>
      </div>
    </div>
  )}
</div>
      </div>
    </Layout>
  );
};

export default Messages; 