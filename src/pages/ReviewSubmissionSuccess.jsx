import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { earnCoins } from '../store/slices/userSlice';
import Layout from '../components/Layout';

const ReviewSubmissionSuccess = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const coins = currentUser?.coins || 0;

    // Scroll to top khi component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Thưởng xu và auto redirect
    useEffect(() => {
        // Thưởng 100 xu cho việc review giảng viên
        dispatch(earnCoins(100));
        
        

        // Auto redirect after 5 seconds
        const timer = setTimeout(() => {
          
        }, 5000);

        return () => clearTimeout(timer);
    }, [dispatch, navigate]);

    return (
        <Layout title="Gửi đánh giá thành công" description="Đánh giá giảng viên đã được gửi thành công">
            <div className="min-h-screen x to-purple-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    {/* Success Animation Container */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center relative overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-4 left-4 w-8 h-8 bg-green-100 rounded-full opacity-60"></div>
                            <div className="absolute top-12 right-8 w-4 h-4 bg-blue-100 rounded-full opacity-40"></div>
                            <div className="absolute bottom-8 left-8 w-6 h-6 bg-purple-100 rounded-full opacity-50"></div>
                            <div className="absolute bottom-4 right-4 w-10 h-10 bg-yellow-100 rounded-full opacity-30"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Success Icon with animation */}
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                    <CheckCircleOutlined className="text-4xl text-white" />
                                </div>
                                <div className="flex justify-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>

                            {/* Success Message */}
                            <h1 className="text-2xl font-bold text-gray-800 mb-3">
                                🎉 Đánh giá đã được gửi thành công!
                            </h1>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Cảm ơn bạn đã chia sẻ đánh giá về giảng viên. Đánh giá của bạn sẽ giúp ích rất nhiều cho cộng đồng sinh viên!
                            </p>

                            {/* Coin Reward Section */}
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
                                <div className="flex items-center justify-center space-x-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">🪙</span>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-orange-800">+100 Xu</h3>
                                        <p className="text-sm text-orange-600">Phần thưởng cho đánh giá!</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-yellow-200">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Số xu hiện tại:</span>
                                        <span className="font-bold text-orange-600">{coins} xu</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Benefits */}
                            <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-2 flex items-center justify-center">
                                    <span className="mr-2">✨</span>
                                    Bạn cũng nhận được:
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-700">• Điểm đóng góp cộng đồng</span>
                                        <span className="text-blue-600 font-medium">+5 XP</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-700">• Badge "Người đánh giá" (nếu chưa có)</span>
                                        <span className="text-blue-600 font-medium">🏆</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/teachers')}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <UserOutlined />
                                    <span>Xem danh sách giảng viên</span>
                                </button>

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-gray-50"
                                >
                                    <HomeOutlined />
                                    <span>Về trang chủ</span>
                                </button>
                            </div>

                            {/* Auto redirect notice */}
                            <p className="text-xs text-gray-500 mt-4">
                                Tự động chuyển về danh sách giảng viên sau 5 giây...
                            </p>
                        </div>
                    </div>

                    {/* Additional celebration elements */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-full">
                        <div className="flex space-x-2 text-2xl animate-bounce">
                            <span>🎊</span>
                            <span>🎉</span>
                            <span>🎊</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ReviewSubmissionSuccess;