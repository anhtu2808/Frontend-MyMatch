import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Tag, Rate } from 'antd';
import {
    SendOutlined,
    RobotOutlined,
    UserOutlined,
    CloseOutlined,
    EyeOutlined,
    BarChartOutlined,
    BookOutlined,
    BulbOutlined,
    StarOutlined,
    CheckOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const AIChatBox = ({ isOpen, onClose, onTeacherSelect }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userProfile, setUserProfile] = useState({
        personality: [],
        targetGrade: null,
        isProfileComplete: false
    });
    const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
    const [showGradeSelector, setShowGradeSelector] = useState(false);
    const messagesEndRef = useRef(null);

    // Personality tags liên quan đến học tập
    // Personality tags thực tế khi chọn giảng viên
    const personalityOptions = [
        { key: 'de_diem', label: 'Muốn dễ điểm', color: 'green' },
        { key: 'chat_luong', label: 'Ưu tiên chất lượng', color: 'blue' },
        { key: 'tan_tam', label: 'Thích giảng viên tận tâm', color: 'orange' },
        { key: 'nghiem_khac', label: 'Chấp nhận nghiêm khắc', color: 'red' },
        { key: 'kinh_nghiem', label: 'Trọng kinh nghiệm thực tế', color: 'purple' },
        { key: 'tuong_tac', label: 'Thích tương tác nhiều', color: 'cyan' },
        { key: 'diem_chuyen_can', label: 'Quan tâm điểm chuyên cần', color: 'lime' },
        { key: 'deadline_eo', label: 'Muốn deadline linh hoạt', color: 'volcano' },
        { key: 'support_sau_gio', label: 'Cần hỗ trợ ngoài giờ', color: 'magenta' },
        { key: 'ket_noi_cong_ty', label: 'Muốn kết nối công ty', color: 'geekblue' }
    ];

    // Grade targets
    const gradeOptions = [
        { value: 'pass', label: 'Chỉ cần qua môn (5-6 điểm)', color: 'default' },
        { value: 'good', label: 'Điểm khá (7-8 điểm)', color: 'blue' },
        { value: 'excellent', label: 'Điểm giỏi (8.5-10 điểm)', color: 'gold' }
    ];

    // Teacher data với thông tin chi tiết
    const teacherData = {
        'TVA003': {
            id: 3,
            name: 'Thầy Nguyễn Văn Minh',
            code: 'TVA003',
            subjects: ['EXE101', 'PRN212', 'SWE201'],
            rating: 4.8,
            reviews: 186,
            department: 'Khoa Công nghệ thông tin',
            personality_match: ['thuc_hanh', 'tuong_tac', 'thi_cu_phap'],
            grade_difficulty: { pass: 'dễ', good: 'trung bình', excellent: 'khó' }
        },
        'TVA012': {
            id: 12,
            name: 'Cô Trần Thị Lan',
            code: 'TVA012',
            subjects: ['BUS101', 'MKT201', 'ECO101'],
            rating: 4.7,
            reviews: 124,
            department: 'Khoa Kinh tế',
            personality_match: ['tuong_tac', 'nhom', 'sang_tao'],
            grade_difficulty: { pass: 'dễ', good: 'dễ', excellent: 'trung bình' }
        },
        'TVA007': {
            id: 7,
            name: 'Thầy Lê Văn Đức',
            code: 'TVA007',
            subjects: ['PRN212', 'LAB211', 'PRO192'],
            rating: 4.6,
            reviews: 98,
            department: 'Khoa Công nghệ thông tin',
            personality_match: ['thuc_hanh', 'doc_lap', 'chi_tiet'],
            grade_difficulty: { pass: 'trung bình', good: 'khó', excellent: 'rất khó' }
        }
    };

    // Auto scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize with greeting và personality question
    // Initialize with greeting và loading sequence
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Tin nhắn chào đầu tiên
            setTimeout(() => {
                setMessages([{
                    id: 1,
                    type: 'ai',
                    content: "Xin chào **anhtu2808**! 👋\n\nTôi là **AI Assistant** của My Match. Để tư vấn giảng viên phù hợp nhất, tôi cần hiểu về bạn:\n\n🎯 **Tính cách học tập của bạn**\n📊 **Mục tiêu điểm số**\n\nHãy bắt đầu bằng cách chọn tính cách học tập của bạn!",
                    timestamp: new Date(),
                    actions: false
                }]);

                // Hiện typing indicator
                setIsTyping(true);
            }, 500);

            // Sau khi loading, hiện bảng chọn profile
            setTimeout(() => {
                setIsTyping(false);

                const profileMessage = {
                    id: 2,
                    type: 'ai',
                    content: "Vui lòng chọn những tiêu chí quan trọng với bạn khi chọn giảng viên:",
                    timestamp: new Date(),
                    actions: false
                };

                setMessages(prev => [...prev, profileMessage]);
                setShowPersonalitySelector(true);
            }, 2500); // Loading 2 giây
        }
    }, [isOpen]);

    const handlePersonalitySelect = (key) => {
        const newPersonality = userProfile.personality.includes(key)
            ? userProfile.personality.filter(p => p !== key)
            : [...userProfile.personality, key];

        setUserProfile(prev => ({ ...prev, personality: newPersonality }));
    };

    const handlePersonalityConfirm = () => {
        if (userProfile.personality.length === 0) return;

        setShowPersonalitySelector(false);
        setShowGradeSelector(true);

        const selectedLabels = userProfile.personality.map(key =>
            personalityOptions.find(opt => opt.key === key)?.label
        ).join(', ');

        const aiMessage = {
            id: Date.now(),
            type: 'ai',
            content: `Tuyệt vời! Bạn đã chọn: **${selectedLabels}**\n\n📊 Bây giờ hãy cho tôi biết mục tiêu điểm số của bạn:`,
            timestamp: new Date(),
            actions: false
        };

        setMessages(prev => [...prev, aiMessage]);
    };

    const handleGradeSelect = (grade) => {
        setUserProfile(prev => ({
            ...prev,
            targetGrade: grade,
            isProfileComplete: true
        }));
        setShowGradeSelector(false);

        const gradeLabel = gradeOptions.find(opt => opt.value === grade)?.label;

        const aiMessage = {
            id: Date.now(),
            type: 'ai',
            content: `Hoàn hảo! Mục tiêu của bạn: **${gradeLabel}**\n\n✅ **Profile hoàn tất!** Giờ bạn có thể hỏi về môn học cụ thể và tôi sẽ tư vấn giảng viên phù hợp nhất với tính cách và mục tiêu của bạn.\n\n💬 Hãy hỏi về môn học bạn quan tâm!`,
            timestamp: new Date(),
            actions: false
        };

        setMessages(prev => [...prev, aiMessage]);
    };

    const getPersonalizedRecommendation = (subject) => {
        const matchingTeachers = Object.values(teacherData).filter(teacher =>
            teacher.subjects.includes(subject)
        );

        if (matchingTeachers.length === 0) return null;

        // Calculate compatibility score
        const teacherScores = matchingTeachers.map(teacher => {
            const personalityMatch = teacher.personality_match.filter(trait =>
                userProfile.personality.includes(trait)
            ).length;

            const gradeDifficulty = teacher.grade_difficulty[userProfile.targetGrade];
            const difficultyScore = gradeDifficulty === 'dễ' ? 3 :
                gradeDifficulty === 'trung bình' ? 2 : 1;

            return {
                ...teacher,
                compatibilityScore: personalityMatch * 20 + difficultyScore * 10 + teacher.rating * 10,
                personalityMatch,
                gradeDifficulty
            };
        });

        // Sort by compatibility
        teacherScores.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
        const bestTeacher = teacherScores[0];

        return {
            text: `🎯 **Môn ${subject} - Gợi ý được cá nhân hóa**\n\n**Giảng viên phù hợp nhất: ${bestTeacher.name} (${bestTeacher.code})**\n\n📊 **Độ tương thích: ${Math.round(bestTeacher.compatibilityScore)}%**\n\n✨ **Tại sao phù hợp:**\n• Tính cách phù hợp: ${bestTeacher.personalityMatch}/${userProfile.personality.length} traits\n• Độ khó để đạt mục tiêu: ${bestTeacher.gradeDifficulty}\n• Rating: ${bestTeacher.rating}/5 (${bestTeacher.reviews} đánh giá)\n\n🎯 **Dự đoán kết quả:**\n• Xác suất đạt mục tiêu: ${bestTeacher.gradeDifficulty === 'dễ' ? '85-95%' : bestTeacher.gradeDifficulty === 'trung bình' ? '70-85%' : '50-70%'}\n• Phong cách phù hợp với bạn: ${bestTeacher.personalityMatch >= 2 ? 'Rất phù hợp' : 'Khá phù hợp'}`,
            teacher: bestTeacher.code,
            actions: true
        };
    };

    const generateAIResponse = (input) => {
        if (!userProfile.isProfileComplete) {
            return {
                text: "Vui lòng hoàn tất việc chọn tính cách và mục tiêu điểm số trước khi hỏi về môn học! 😊",
                actions: false
            };
        }

        const lowerInput = input.toLowerCase();

        // Check for specific subjects
        if (lowerInput.includes('exe101')) {
            return getPersonalizedRecommendation('EXE101');
        }
        if (lowerInput.includes('prn212')) {
            return getPersonalizedRecommendation('PRN212');
        }
        if (lowerInput.includes('bus101')) {
            return getPersonalizedRecommendation('BUS101');
        }

        return {
            text: "🤔 Tôi chưa hiểu môn học bạn hỏi. Bạn có thể hỏi về:\n• **EXE101** - Trải nghiệm khởi nghiệp\n• **PRN212** - Lập trình C#\n• **BUS101** - Quản trị doanh nghiệp\n\nHoặc nhập tên môn học khác!",
            actions: false
        };
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date(),
            actions: false
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = generateAIResponse(inputMessage);
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse.text,
                timestamp: new Date(),
                actions: aiResponse.actions || false,
                teacher: aiResponse.teacher || null
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleAnalyzeStrategy = (teacherCode) => {
        navigate('/premium/study-plan');
        onClose();
    };

    const handleViewProfile = (teacherCode) => {
        const teacher = teacherData[teacherCode];
        if (teacher) {
            navigate(`/teachers/${teacher.id}`);
            onClose();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatMessage = (content) => {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br/>');
    };

    const renderActionButtons = (message) => {
        if (!message.actions || !message.teacher) return null;

        const teacher = teacherData[message.teacher];
        if (!teacher) return null;

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 space-y-2"
            >
                <div className="text-xs text-gray-500 mb-2">⚡ Hành động nhanh:</div>

                <div className="flex flex-wrap gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleViewProfile(message.teacher)}
                        className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
                    >
                        <EyeOutlined />
                        <span>Xem Profile</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnalyzeStrategy(message.teacher)}
                        className="flex items-center space-x-2 px-3 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                    >
                        <BarChartOutlined />
                        <span>Xem kế hoạch học tập</span>
                    </motion.button>
                </div>
            </motion.div>
        );
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                            >
                                <RobotOutlined className="text-lg" />
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-primary">AI Assistant</h3>
                                <p className="text-xs text-primary opacity-90">
                                    {userProfile.isProfileComplete ? '✅ Profile hoàn tất' : '⚙️ Đang thiết lập'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-primary"
                        >
                            <CloseOutlined />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex items-start space-x-2 max-w-[85%]">
                                {message.type === 'ai' && (
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <RobotOutlined className="text-white text-sm" />
                                    </div>
                                )}

                                <div
                                    className={`p-3 rounded-2xl ${message.type === 'user'
                                        ? 'bg-primary text-white rounded-br-md'
                                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                        }`}
                                >
                                    <div
                                        className="text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                                    />

                                    {/* Action buttons cho gợi ý giảng viên */}
                                    {renderActionButtons(message)}

                                    <div className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-primary-light' : 'text-gray-500'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>

                                {message.type === 'user' && (
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                        <UserOutlined className="text-gray-600 text-sm" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Personality Selector */}
                    {showPersonalitySelector && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                        >
                            <h4 className="font-bold text-blue-900 mb-3">🎯 Chọn tính cách học tập (có thể chọn nhiều):</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {personalityOptions.map((option) => (
                                    <Tag.CheckableTag
                                        key={option.key}
                                        checked={userProfile.personality.includes(option.key)}
                                        onChange={() => handlePersonalitySelect(option.key)}
                                        className={`
                mb-1 px-3 py-1 rounded-md border text-xs font-medium transition-all duration-200 cursor-pointer
                ${userProfile.personality.includes(option.key)
                                                ? 'bg-primary  text-white shadow-sm transform scale-105'
                                                : 'bg-white border-gray-300 text-gray-600  hover:text-primary hover:bg-primary/5'
                                            }
            `}
                                    >
                                        {option.label}
                                    </Tag.CheckableTag>
                                ))}
                            </div>
                            <button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={handlePersonalityConfirm}
                                disabled={userProfile.personality.length === 0}
                                className="w-full bg-primary text-white rounded-lg hover:bg-primary-hover px-4 py-2"
                            >
                                Xác nhận ({userProfile.personality.length} đã chọn)
                            </button>
                        </motion.div>
                    )}

                    {/* Grade Selector */}
                    {showGradeSelector && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                        >
                            <h4 className="font-bold text-amber-900 mb-3">📊 Mục tiêu điểm số của bạn:</h4>
                            <div className="space-y-2">
                                {gradeOptions.map((option) => (
                                    <Button
                                        key={option.value}
                                        block
                                        type={userProfile.targetGrade === option.value ? 'primary' : 'default'}
                                        onClick={() => handleGradeSelect(option.value)}
                                        className="text-left h-auto py-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option.label}</span>
                                            {option.value === 'excellent' && <StarOutlined className="text-yellow-500" />}
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Typing indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <RobotOutlined className="text-white text-sm" />
                                </div>
                                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3].map((dot) => (
                                            <motion.div
                                                key={dot}
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: dot * 0.1
                                                }}
                                                className="w-2 h-2 bg-gray-400 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                        <TextArea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={
                                userProfile.isProfileComplete
                                    ? "Hỏi về môn học (VD: EXE101, PRN212, BUS101)..."
                                    : "Vui lòng hoàn tất profile trước..."
                            }
                            autoSize={{ minRows: 1, maxRows: 3 }}
                            className="flex-1 rounded-lg resize-none"
                            disabled={isTyping || !userProfile.isProfileComplete}
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isTyping || !userProfile.isProfileComplete}
                            className="bg-primary hover:bg-primary-hover h-10 px-4"
                        />
                    </div>

                    {/* Quick suggestions - chỉ hiện khi profile complete */}
                    {userProfile.isProfileComplete && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {[
                                { text: 'EXE101', icon: '🎓' },
                                { text: 'PRN212', icon: '💻' },
                                { text: 'BUS101', icon: '📈' }
                            ].map((suggestion) => (
                                <button
                                    key={suggestion.text}
                                    onClick={() => setInputMessage(suggestion.text)}
                                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-600 transition-colors"
                                >
                                    <span>{suggestion.icon}</span>
                                    <span>{suggestion.text}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AIChatBox;