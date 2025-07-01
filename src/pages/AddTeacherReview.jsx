import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Select, Input, Divider } from 'antd';
import { SearchOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { updateTeacher } from '../store/slices/teachersSlice';
import Layout from '../components/Layout';

const AddTeacherReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  
  // Get teachers from Redux store
  const teachers = useSelector(state => state.teachers.teachers);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Teacher Selection
    teacherName: '',
    teacherId: '',
    teacherCode: '',
    selectedSubjects: [], // Thêm field cho môn học đã chọn

    // Step 2: Course Information
    courseCode: '',
    semester: '',

    // Step 3: Review Information
    // Detailed rating criteria (1-5 scale)
    teachingAbility: 0,      // Khả năng truyền đạt
    lectureStructure: 0,     // Cấu trúc bài giảng  
    studentInteraction: 0,   // Tương tác với sinh viên
    workloadRequirement: 0,  // Khối lượng bài tập / yêu cầu môn học
    gradingDifficulty: 0,    // Điểm số
    
    // Quick Questions
    wouldRetake: null,       // Bạn có muốn học lại giáo sư này không?
    adequateMaterials: null, // Tài liệu học tập có đầy đủ không?
    fairTesting: null,       // Bài kiểm tra và điểm số có công bằng không?
    
    // Personal tags (max 3)
    selectedTags: [],
    
    // Review text
    reviewText: '',
    
    // File upload
    uploadedFile: null,
    
    // Anonymous posting
    anonymous: false
  });

  // Xử lý dữ liệu môn học được chọn từ SubjectSelection và load saved form data
  useEffect(() => {
    // Load saved form data from localStorage
    const savedFormData = localStorage.getItem('reviewFormData');
    if (savedFormData) {
      try {
        const formData = JSON.parse(savedFormData);
        setFormData(prev => ({
          ...prev,
          ...formData
        }));
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }

    // Kiểm tra teacher được chọn từ TeacherCard
    if (location.state?.preSelectedTeacher) {
      const teacher = location.state.preSelectedTeacher;
      setFormData(prev => ({
        ...prev,
        teacherName: teacher.name,
        teacherId: teacher.id,
        teacherCode: teacher.code
      }));
      if (location.state.step) {
        setCurrentStep(location.state.step);
      }
    }

    // Kiểm tra dữ liệu từ navigation state
    if (location.state?.selectedSubjects) {
      setFormData(prev => ({
        ...prev,
        selectedSubjects: location.state.selectedSubjects
      }));
      if (location.state.step && !location.state.preSelectedTeacher) {
        setCurrentStep(location.state.step);
      }
    }

    // Kiểm tra dữ liệu từ localStorage
    const savedSubjects = localStorage.getItem('selectedSubjects');
    if (savedSubjects) {
      try {
        const subjects = JSON.parse(savedSubjects);
        setFormData(prev => ({
          ...prev,
          selectedSubjects: subjects
        }));
        // Xóa dữ liệu khỏi localStorage sau khi sử dụng
        localStorage.removeItem('selectedSubjects');
      } catch (error) {
        console.error('Error parsing selected subjects:', error);
      }
    }
  }, [location.state]);

  // Transform teachers data from Redux store for AutoComplete component
  const teachersData = teachers.map(teacher => ({
    value: teacher.name,
    label: teacher.name + ' - ' + teacher.code ,
    id: teacher.id,
    code: teacher.code,
    department: teacher.department
  }));

  const semesterCourses = {
    '1': [
      { value: 'PRF192', label: 'PRF192 - Programming Fundamentals' },
      { value: 'MAD101', label: 'MAD101 - Discrete Mathematics' },
      { value: 'CEA201', label: 'CEA201 - Computer Organization and Architecture' },
      { value: 'SSL101c', label: 'SSL101c - Academic Skills for University Success' },
    ],
    '2': [
      { value: 'PRO192', label: 'PRO192 - Object-Oriented Programming' },
      { value: 'OSG202', label: 'OSG202 - Operating Systems' },
      { value: 'CSI104', label: 'CSI104 - Introduction to Computer Science' },
      { value: 'MAE101', label: 'MAE101 - Mathematics for Engineering' },
    ],
    '3': [
      { value: 'DBI202', label: 'DBI202 - Introduction to Databases' },
      { value: 'CSD201', label: 'CSD201 - Data Structures and Algorithms' },
      { value: 'LAB211', label: 'LAB211 - OOP with Java Lab' },
      { value: 'JPD113', label: 'JPD113 - Elementary Japanese 1-A1.1' },
    ],
    '4': [
      { value: 'PRJ301', label: 'PRJ301 - Java Web Application Development' },
      { value: 'SWE201c', label: 'SWE201c - Introduction to Software Engineering' },
      { value: 'NWC203c', label: 'NWC203c - Computer Networking' },
      { value: 'JPD123', label: 'JPD123 - Elementary Japanese 1-A1.2' },
    ],
    '5': [
      { value: 'SWP391', label: 'SWP391 - Application Development Project' },
      { value: 'SWT301', label: 'SWT301 - Software Testing' },
      { value: 'ITE302c', label: 'ITE302c - Ethics in IT' },
      { value: 'JPD213', label: 'JPD213 - Elementary Japanese 2-A1.3' },
    ],
    '6': [
      { value: 'SWR302', label: 'SWR302 - Software Requirement' },
      { value: 'PMG202c', label: 'PMG202c - Project Management' },
      { value: 'MLN122', label: 'MLN122 - Marxist-Leninist Philosophy' },
      { value: 'JPD223', label: 'JPD223 - Elementary Japanese 2-A1.4' },
    ],
    '7': [
      { value: 'SWD392', label: 'SWD392 - SW Architecture and Design' },
      { value: 'MLN131', label: 'MLN131 - Marxist-Leninist Political Economics' },
      { value: 'MKT205', label: 'MKT205 - Marketing Principles' },
      { value: 'Elective1', label: 'Elective Course 1' },
    ],
    '8': [
      { value: 'SWP490', label: 'SWP490 - Capstone Project' },
      { value: 'MLN141', label: 'MLN141 - Scientific Socialism' },
      { value: 'ENW492c', label: 'ENW492c - Advanced English' },
      { value: 'Elective2', label: 'Elective Course 2' },
    ],
    '9': [
      { value: 'MLN151', label: 'MLN151 - Ho Chi Minh Ideology' },
      { value: 'VNR202c', label: 'VNR202c - History of Vietnamese Communist Party' },
      { value: 'Internship', label: 'Internship Program' },
      { value: 'Elective3', label: 'Elective Course 3' },
    ]
  };

  const handleInputChange = (field, value) => {
    if (field === 'teacherName') {
      const teacher = teachersData.find(t => t.value === value);
      setFormData(prev => ({
        ...prev,
        teacherName: value,
        teacherId: teacher ? teacher.id : '',
        teacherCode: teacher ? teacher.code : ''
      }));
    } else if (field === 'teacherCode') {
      const teacher = teachersData.find(t => t.code === value);
      setFormData(prev => ({
        ...prev,
        teacherCode: value,
        teacherName: teacher ? teacher.value : '',
        teacherId: teacher ? teacher.id : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      // Save current form data to localStorage
      localStorage.setItem('reviewFormData', JSON.stringify(formData));
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Find the selected teacher
    const selectedTeacher = teachers.find(t => t.id === formData.teacherId);
    
    if (selectedTeacher) {
      // Create new review object
      const newReview = {
        id: selectedTeacher.reviewData.length + 1,
        title: `Review về ${formData.courseCode}`,
        content: formData.reviewText || "No additional comments provided.",
        teachingCriteria: formData.teachingAbility,
        teachingQuality: formData.lectureStructure,
        structure: formData.lectureStructure,
        communication: formData.studentInteraction,
        score: (formData.teachingAbility + formData.lectureStructure + formData.studentInteraction + formData.workloadRequirement + formData.gradingDifficulty) / 5,
        tags: formData.selectedTags,
        helpful: 0,
        notHelpful: 0,
        date: new Date().toISOString().split('T')[0],
        verified: true, // Assuming verified if file was uploaded
        rating: Math.round((formData.teachingAbility + formData.lectureStructure + formData.studentInteraction + formData.workloadRequirement + formData.gradingDifficulty) / 5)
      };

      // Calculate new average rating
      const allReviews = [...selectedTeacher.reviewData, newReview];
      const newAverageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;

      // Update teacher with new review and rating
      const updatedTeacher = {
        ...selectedTeacher,
        reviewData: allReviews,
        rating: parseFloat(newAverageRating.toFixed(1)),
        totalReviews: allReviews.length,
        reviews: allReviews.length
      };

      // Dispatch update to store
      dispatch(updateTeacher(updatedTeacher));
      
      // Clear saved form data from localStorage
      localStorage.removeItem('reviewFormData');
      
      console.log('Review submitted successfully:', newReview);
      navigate('/teachers/review-success');
    }
  };

  // Available tags for selection
  const availableTags = [
  'Giảng dạy dễ hiểu',
  'Thân thiện với sinh viên',
  'Sẵn sàng hỗ trợ',
  'Chấm điểm công bằng',
  'Tạo động lực học',
  'Phản hồi nhanh chóng',
  'Bài giảng sinh động',
  'Ứng dụng thực tế cao',
  'Tổ chức lớp học tốt'
];

  const handleTagToggle = (tag) => {
    setFormData(prev => {
      const currentTags = prev.selectedTags;
      if (currentTags.includes(tag)) {
        // Remove tag if already selected
        return {
          ...prev,
          selectedTags: currentTags.filter(t => t !== tag)
        };
      } else if (currentTags.length < 3) {
        // Add tag if less than 3 selected
        return {
          ...prev,
          selectedTags: [...currentTags, tag]
        };
      }
      return prev; // Don't add if already 3 tags selected
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      uploadedFile: file
    }));
  };

  const renderStep1 = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Chọn giảng viên</h2>
          <p className="text-gray-600">Tìm kiếm và chọn giảng viên bạn muốn đánh giá</p>
        </div>

        <div className="space-y-6">
          {/* Search Teacher with AutoComplete */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <SearchOutlined className="mr-2 text-blue-500" />
              Tên giảng viên *
            </label>
            <AutoComplete
              size="large"
              style={{ width: '100%' }}
              options={teachersData}
              placeholder="Nhập tên giảng viên để tìm kiếm..."
              value={formData.teacherName}
              onChange={(value) => handleInputChange('teacherName', value)}
              onSelect={(value, option) => {
                handleInputChange('teacherName', value);
                handleInputChange('teacherId', option.id);
                handleInputChange('teacherCode', option.code);
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              className="custom-autocomplete"
            />
          </div>

          {/* Search by Teacher Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              Hoặc tìm kiếm bằng mã giảng viên
            </label>
            <AutoComplete
              size="large"
              style={{ width: '100%' }}
              options={teachersData.map(teacher => ({
                value: teacher.code,
                label: `${teacher.code} - ${teacher.value}`,
                id: teacher.id,
                teacherName: teacher.value
              }))}
              placeholder="Nhập mã giảng viên (VD: LamNN2, HuyNM...)"
              value={formData.teacherCode}
              onChange={(value) => handleInputChange('teacherCode', value)}
              onSelect={(value, option) => {
                handleInputChange('teacherCode', value);
                handleInputChange('teacherName', option.teacherName);
                handleInputChange('teacherId', option.id);
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              className="custom-autocomplete"
            />
          </div>

          {/* Display selected teacher info if selected */}
          {formData.teacherName && (
            <div className="mt-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {formData.teacherName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-800 text-lg">{formData.teacherName}</h3>
                    <p className="text-blue-600 text-sm">Giảng viên đã chọn</p>
                  </div>
                  <div className="text-green-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* Help us grow section */}
          <div className="mt-8">
            <Divider orientation="left" orientationMargin="0">
              <span className="text-sm text-gray-500 font-medium">Không tìm thấy giảng viên?</span>
            </Divider>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800 text-lg mb-2">Giúp chúng tôi mở rộng cơ sở dữ liệu! 🚀</h3>
                  <p className="text-orange-700 text-sm leading-relaxed mb-4">
                    Không tìm thấy giảng viên bạn muốn đánh giá? Hãy giúp cộng đồng sinh viên bằng cách thêm thông tin giảng viên mới. 
                    Mỗi thông tin bạn đóng góp sẽ giúp hàng nghìn sinh viên khác có được những lựa chọn môn học tốt nhất! 
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">📚 Thêm giảng viên mới</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">⭐ Chia sẻ trải nghiệm</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">🤝 Giúp đỡ cộng đồng</span>
                  </div>
                  <button
                    onClick={() => navigate('/teachers/add-teacher')}
                    className="mt-4 w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Thêm giảng viên</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    const selectedTeacher = teachers.find(t => t.id === formData.teacherId);
    const availableCourses = formData.semester ? semesterCourses[formData.semester] || [] : [];
    const selectedCourse = availableCourses.find(c => c.value === formData.courseCode);

    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thông tin môn học</h2>
          <p className="text-gray-600">Chọn học kỳ và môn học bạn đã học với giảng viên</p>
        </div>

        <div className="space-y-6">
          {/* Semester Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Học kỳ *
            </label>
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn học kỳ"
              value={formData.semester}
              onChange={(value) => {
                handleInputChange('semester', value);
                handleInputChange('courseCode', ''); // Reset course when semester changes
              }}
              options={[
                { value: '1', label: ' Học kỳ 1 ' },
                { value: '2', label: ' Học kỳ 2 ' },
                { value: '3', label: ' Học kỳ 3 ' },
                { value: '4', label: ' Học kỳ 4 ' },
                { value: '5', label: ' Học kỳ 5 ' },
                { value: '6', label: ' Học kỳ 6 ' },
                { value: '7', label: ' Học kỳ 7 ' },
                { value: '8', label: ' Học kỳ 8 ' },
                { value: '9', label: ' Học kỳ 9 ' },
              ]}
            />
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <BookOutlined className="mr-2 text-blue-500" />
              Mã môn học *
            </label>
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder={formData.semester ? "Chọn môn học" : "Vui lòng chọn học kỳ trước"}
              value={formData.courseCode}
              onChange={(value) => handleInputChange('courseCode', value)}
              disabled={!formData.semester}
              options={availableCourses}
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            {!formData.semester && (
              <p className="text-xs text-amber-600 mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Hãy chọn học kỳ để xem danh sách môn học
              </p>
            )}
          </div>

          {/* Selected Course Display */}
          {selectedCourse && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <BookOutlined className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 text-lg">{selectedCourse.label}</h3>
                  <p className="text-green-600 text-sm">Học kỳ {formData.semester}</p>
                </div>
                <div className="text-green-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Info Summary */}
          {selectedTeacher && (
            <div>
              <Divider orientation="left" orientationMargin="0">
                <span className="text-sm text-gray-500">Thông tin giảng viên</span>
              </Divider>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {selectedTeacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">{selectedTeacher.name}</h3>
                    <p className="text-sm text-blue-600">{selectedTeacher.code} • {selectedTeacher.department}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl p-8 space-y-8">
      {/* Header with enhanced design */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative flex items-center space-x-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl border border-white/30">
            {formData.teacherName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{formData.teacherName}</h3>
            <p className="text-blue-100 text-lg">Review giảng viên theo các tiêu chí dưới đây</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Rating Criteria with enhanced design */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Đánh giá chi tiết
        </h3>
        
        <div className="grid gap-8">
          {[
            { 
              key: 'teachingAbility', 
              label: 'Khả năng truyền đạt', 
              description: 'Dạy dễ hiểu, có ví dụ minh hoạ, logic',
              icon: '🎯',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              key: 'lectureStructure', 
              label: 'Cấu trúc bài giảng', 
              description: 'Bài giảng mạch lạc, bám sát đề cương',
              icon: '📚',
              color: 'from-green-500 to-green-600'
            },
            { 
              key: 'studentInteraction', 
              label: 'Tương tác với sinh viên', 
              description: 'Giao tiếp, hỗ trợ, tạo cơ hội phát biểu',
              icon: '💬',
              color: 'from-purple-500 to-purple-600'
            },
            { 
              key: 'workloadRequirement', 
              label: 'Khối lượng bài tập / yêu cầu môn học', 
              description: 'Số lượng và độ khó bài tập hợp lý',
              icon: '📝',
              color: 'from-orange-500 to-orange-600'
            },
            { 
              key: 'gradingDifficulty', 
              label: 'Điểm số', 
              description: 'Cách chấm điểm dễ hay khó',
              icon: '🎓',
              color: 'from-pink-500 to-pink-600'
            }
                     ].map((criterion) => (
             <div key={criterion.key} className="group hover:bg-gray-50 rounded-2xl p-6 transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{criterion.icon}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{criterion.label}</h4>
                  <p className="text-gray-600">{criterion.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {formData[criterion.key] || 0}/5
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleInputChange(criterion.key, rating)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-200 transform hover:scale-110 ${
                      rating <= formData[criterion.key]
                        ? `bg-gradient-to-r ${criterion.color} text-white shadow-xl shadow-${criterion.color.split('-')[1]}-500/30`
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:shadow-lg'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Questions with enhanced design */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Quick Questions
        </h3>
        
        <div className="grid gap-6">
          {[
            {
              key: 'wouldRetake',
              question: 'Bạn có muốn học lại giáo sư này không?',
              required: true,
              icon: '🔄'
            },
            {
              key: 'adequateMaterials',
              question: 'Tài liệu học tập có đầy đủ không?',
              required: false,
              icon: '📖'
            },
            {
              key: 'fairTesting',
              question: 'Bài kiểm tra và điểm số có công bằng không?',
              required: false,
              icon: '⚖️'
            }
                     ].map((item) => (
             <div key={item.key} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{item.icon}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                  {item.required && <span className="text-sm text-red-500 font-medium">Required</span>}
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleInputChange(item.key, true)}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    formData[item.key] === true
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>✅</span>
                    <span>Yes</span>
                  </div>
                </button>
                <button
                  onClick={() => handleInputChange(item.key, false)}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    formData[item.key] === false
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>❌</span>
                    <span>No</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Tags with enhanced design */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          Chọn tối đa 3 thẻ để mô tả về giảng viên
        </h3>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {availableTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagToggle(tag)}
              disabled={!formData.selectedTags.includes(tag) && formData.selectedTags.length >= 3}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                formData.selectedTags.includes(tag)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                  : formData.selectedTags.length >= 3
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Đã chọn {formData.selectedTags.length}/3 thẻ
          </p>
        </div>
      </div>

      {/* Comments with enhanced design */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          Comments 
          <span className="text-lg font-normal text-gray-500 ml-2">(optional)</span>
        </h3>
        <div className="relative">
          <textarea
            value={formData.reviewText}
            onChange={(e) => handleInputChange('reviewText', e.target.value)}
            placeholder="Share details about your experience with this professor..."
            className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            {formData.reviewText.length} characters
          </div>
        </div>
      </div>

      {/* File Upload with enhanced design */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          Upload File
        </h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-blue-50">
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf"
          />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <label
                htmlFor="fileUpload"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Choose File
              </label>
              <p className="mt-2 text-gray-600">
                {formData.uploadedFile ? (
                  <span className="text-green-600 font-medium">{formData.uploadedFile.name}</span>
                ) : (
                  'No file selected'
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-blue-800 leading-relaxed">
              Để xác thực thông tin review là chính xác, vui lòng upload hình ảnh lớp học FAP thuộc giảng viên bạn review và Attendance report.
            </p>
          </div>
        </div>
      </div>

      {/* Policy Information with enhanced design */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Chính sách đánh giá</h4>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Xếp hạng của bạn sẽ bị xóa nếu bạn sử dụng ngôn từ tục tĩu hoặc mang tính xúc phạm, công kích cá nhân.</span>
              </p>
              <p className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Phản ánh đúng trải nghiệm thực tế của bạn trong quá trình học.</span>
              </p>
              <p className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Đọc lại trước khi nhấn Submit.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Anonymous Option with enhanced design */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Đăng bài đánh giá ẩn danh</h4>
              <p className="text-gray-600">Tên của bạn sẽ không hiển thị công khai</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => handleInputChange('anonymous', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
          <div className="max-w-4xl mx-auto px-6">
            <button
              onClick={() => navigate('/teachers')}
              className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </button>
            <h1 className="text-3xl font-bold mb-2">Thêm đánh giá giảng viên</h1>
            <p className="text-blue-100">Chia sẻ trải nghiệm của bạn để giúp các sinh viên khác</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step === currentStep
                      ? 'bg-blue-600 text-white shadow-lg'
                      : step < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                  <div className="ml-3 text-center">
                    <div className={`text-sm font-medium ${step === currentStep ? 'text-blue-600' : step < currentStep ? 'text-green-600' : 'text-gray-500'
                      }`}>
                      Bước {step}
                    </div>
                    <div className="text-xs text-gray-500">
                      {step === 1 ? 'Chọn GV' : step === 2 ? 'Môn học' : 'Đánh giá'}
                    </div>
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-4 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Step Validation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.teacherName || !formData.teacherCode)) ||
                  (currentStep === 2 && (!formData.courseCode || !formData.semester))
                }
                className={`px-8 py-3 rounded-xl font-medium transition-all ${(currentStep === 1 && (!formData.teacherName || !formData.teacherCode)) ||
                  (currentStep === 2 && (!formData.courseCode || !formData.semester))
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                  }`}
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={
                  !formData.teachingAbility ||
                  !formData.lectureStructure ||
                  !formData.studentInteraction ||
                  !formData.workloadRequirement ||
                  !formData.gradingDifficulty ||
                  formData.wouldRetake === null ||
                  formData.adequateMaterials === null ||
                  formData.fairTesting === null
                }
                className={`px-8 py-3 rounded-xl font-medium transition-all ${!formData.teachingAbility ||
                  !formData.lectureStructure ||
                  !formData.studentInteraction ||
                  !formData.workloadRequirement ||
                  !formData.gradingDifficulty ||
                  formData.wouldRetake === null ||
                  formData.adequateMaterials === null ||
                  formData.fairTesting === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                  }`}
              >
                Submit Review
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddTeacherReview;