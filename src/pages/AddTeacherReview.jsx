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
    selectedSubjects: [],

    // Step 2: Course Information
    courseCode: '',
    semester: '',

    // Step 3: Review Information
    teachingAbility: 0,
    lectureStructure: 0,
    studentInteraction: 0,
    workloadRequirement: 0,
    gradingDifficulty: 0,

    wouldRetake: null,
    adequateMaterials: null,
    fairTesting: null,

    selectedTags: [],
    quizReview: '',
    testReview: '',
    examReview: '',

    reviewText: '',
    uploadedFile: null,
    anonymous: false
  });

  // [Keep all existing useEffect and handlers as they are...]
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
        localStorage.removeItem('selectedSubjects');
      } catch (error) {
        console.error('Error parsing selected subjects:', error);
      }
    }
  }, [location.state]);

  // Transform teachers data from Redux store for AutoComplete component
  const teachersData = teachers.map(teacher => ({
    value: teacher.name,
    label: teacher.name + ' - ' + teacher.code,
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
      localStorage.setItem('reviewFormData', JSON.stringify(formData));
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep === 1) {
      navigate('/teachers');
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const selectedTeacher = teachers.find(t => t.id === formData.teacherId);

    if (selectedTeacher) {
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
        verified: true,
        rating: Math.round((formData.teachingAbility + formData.lectureStructure + formData.studentInteraction + formData.workloadRequirement + formData.gradingDifficulty) / 5)
      };

      const allReviews = [...selectedTeacher.reviewData, newReview];
      const newAverageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;

      const updatedTeacher = {
        ...selectedTeacher,
        reviewData: allReviews,
        rating: parseFloat(newAverageRating.toFixed(1)),
        totalReviews: allReviews.length,
        reviews: allReviews.length
      };

      dispatch(updateTeacher(updatedTeacher));
      localStorage.removeItem('reviewFormData');

      console.log('Review submitted successfully:', newReview);
      navigate('/teachers/review-success');
    }
  };

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
        return {
          ...prev,
          selectedTags: currentTags.filter(t => t !== tag)
        };
      } else if (currentTags.length < 3) {
        return {
          ...prev,
          selectedTags: [...currentTags, tag]
        };
      }
      return prev;
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <div className="space-y-6">
          {/* Search Teacher with AutoComplete */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <SearchOutlined className="mr-2 text-primary" />
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
              <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {formData.teacherName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary text-lg">{formData.teacherName}</h3>
                    <p className="text-primary/70 text-sm">Giảng viên đã chọn</p>
                  </div>
                  <div className="text-success">
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
            <div className="bg-warning/5 border border-warning/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-warning text-lg mb-2">Giúp chúng tôi mở rộng cơ sở dữ liệu! 🚀</h3>
                  <p className="text-warning/80 text-sm leading-relaxed mb-4">
                    Không tìm thấy giảng viên bạn muốn đánh giá? Hãy giúp cộng đồng sinh viên bằng cách thêm thông tin giảng viên mới.
                  </p>
                  <button
                    onClick={() => navigate('/teachers/add-teacher')}
                    className="w-full bg-warning hover:bg-warning text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <div className="space-y-6">
          {/* Semester Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                handleInputChange('courseCode', '');
              }}
              options={[
                { value: '1', label: 'Học kỳ 1' },
                { value: '2', label: 'Học kỳ 2' },
                { value: '3', label: 'Học kỳ 3' },
                { value: '4', label: 'Học kỳ 4' },
                { value: '5', label: 'Học kỳ 5' },
                { value: '6', label: 'Học kỳ 6' },
                { value: '7', label: 'Học kỳ 7' },
                { value: '8', label: 'Học kỳ 8' },
                { value: '9', label: 'Học kỳ 9' },
              ]}
            />
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <BookOutlined className="mr-2 text-primary" />
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
              <p className="text-xs text-warning mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Hãy chọn học kỳ để xem danh sách môn học
              </p>
            )}
          </div>

          {/* Selected Course Display */}
          {selectedCourse && (
            <div className="bg-success/5 border border-success/20 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <BookOutlined className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-success text-lg">{selectedCourse.label}</h3>
                  <p className="text-success/70 text-sm">Học kỳ {formData.semester}</p>
                </div>
                <div className="text-success">
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
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {selectedTeacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">{selectedTeacher.name}</h3>
                    <p className="text-sm text-primary/70">{selectedTeacher.code} • {selectedTeacher.department}</p>
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">


      {/* Detailed Rating Criteria */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Đánh giá chi tiết
        </h3>

        <div className="grid gap-6">
          {[
            {
              key: 'teachingAbility',
              label: 'Khả năng truyền đạt',
              description: 'Dạy dễ hiểu, có ví dụ minh hoạ, logic'
            },
            {
              key: 'lectureStructure',
              label: 'Cấu trúc bài giảng',
              description: 'Bài giảng mạch lạc, bám sát đề cương'
            },
            {
              key: 'studentInteraction',
              label: 'Tương tác với sinh viên',
              description: 'Giao tiếp, hỗ trợ, tạo cơ hội phát biểu'
            },
            {
              key: 'workloadRequirement',
              label: 'Khối lượng bài tập / yêu cầu môn học',
              description: 'Số lượng và độ khó bài tập hợp lý'
            },
            {
              key: 'gradingDifficulty',
              label: 'Điểm số',
              description: 'Cách chấm điểm dễ hay khó'
            }
          ].map((criterion) => (
            <div key={criterion.key} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{criterion.label}</h4>
                  <p className="text-gray-600 text-sm">{criterion.description}</p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formData[criterion.key] || 0}/5
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleInputChange(criterion.key, rating)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-200 ${rating <= formData[criterion.key]
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
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

      {/* Quick Questions */}
      <div className="space-y-6">


        <div className="grid gap-4">
          {[
            {
              key: 'wouldRetake',
              question: 'Bạn có muốn học lại giảng viên này không?',
              required: true
            },
          ].map((item) => (
            <div key={item.key} className="bg-gray-50 rounded-xl p-6">
              <div className="mb-4 flex items-center">
                <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                {item.required && <span className="text-sm text-red-500 font-medium ml-2">*</span>}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleInputChange(item.key, false)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${formData[item.key] === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-red-500/10'
                    }`}
                >
                  No
                </button>
                <button
                  onClick={() => handleInputChange(item.key, true)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${formData[item.key] === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-green-500/10'
                    }`}
                >
                  Yes
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          Nhận xét về giảng viên <span className="text-sm text-red-500 font-medium ml-2">*</span>

        </h3>
        <textarea
          value={formData.reviewText}
          onChange={(e) => handleInputChange('reviewText', e.target.value)}
          placeholder="Nhận xét về giảng viên"
          className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* Đánh giá về quiz, kiểm tra */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          Đánh giá về Quiz, Assignment <span className="text-sm text-red-500 font-medium ml-2">*</span>
        </h3>
        <div className="flex items-center space-x-4">
          <textarea
            value={formData.quizReview}
            onChange={(e) => handleInputChange('quizReview', e.target.value)}
            placeholder="Nhận xét về quiz, assignment, bài thi. Mẹo cho sinh viên khi làm bài"
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Minh chứng bạn từng học với giảng viên này <span className="text-sm text-red-500 font-medium ml-2">*</span>
        </h3>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf"
          />
          <div className="space-y-4">

            <div>
              <label
                htmlFor="fileUpload"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </label>
              <p className="mt-2 text-gray-600">
                {formData.uploadedFile ? (
                  <span className="text-success font-medium">{formData.uploadedFile.name}</span>
                ) : (
                  'Chưa có ảnh minh chứng'
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-info/10 border border-info/20 rounded-xl p-4">
          <p className="text-info text-sm">
            Để xác thực thông tin review là chính xác, vui lòng upload hình ảnh lớp học FAP thuộc giảng viên bạn review và Attendance report.
          </p>
        </div>
      </div>

      {/* Policy Information */}
      <div className="bg-warning/10 border border-warning/20 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Chính sách đánh giá</h4>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>• Xếp hạng của bạn sẽ bị xóa nếu bạn sử dụng ngôn từ tục tĩu hoặc mang tính xúc phạm, công kích cá nhân.</p>
          <p>• Phản ánh đúng trải nghiệm thực tế của bạn trong quá trình học.</p>
          <p>• Đọc lại trước khi nhấn Submit.</p>
        </div>
      </div>

      {/* Anonymous Option */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Đăng bài đánh giá ẩn danh</h4>
              <p className="text-gray-600">Tên của bạn sẽ không hiển thị công khai</p>
            </div>
          </div>

          {/* Switch đã sửa */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => handleInputChange('anonymous', e.target.checked)}
              className="sr-only"
            />
            <div className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${formData.anonymous ? 'bg-primary' : 'bg-gray-200'
              }`}>
              <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${formData.anonymous ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      title="Thêm đánh giá giảng viên"
      description="Chia sẻ trải nghiệm của bạn để giúp các sinh viên khác"
    >
      <div className="space-y-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-120px)] h-0.5 bg-gray-200">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between items-start px-[60px]">
              {[
                { step: 1, label: 'Chọn giảng viên', desc: 'Tìm kiếm GV' },
                { step: 2, label: 'Thông tin môn học', desc: 'Học kỳ & môn học' },
                { step: 3, label: 'Đánh giá chi tiết', desc: 'Viết review' }
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  {/* Step Circle */}
                  <div className={`rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === currentStep
                    ? 'w-10 h-10 bg-primary text-white shadow-lg scale-110'
                    : step < currentStep
                      ? 'w-8 h-8 bg-success text-white scale-90' // Thu nhỏ step đã hoàn thành
                      : 'w-10 h-10 bg-white border-2 border-gray-300 text-gray-500'
                    }`}>
                    {step < currentStep ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="mt-3 text-center max-w-[140px]">
                    <div className={`text-sm font-semibold transition-colors ${step === currentStep ? 'text-primary' :
                      step < currentStep ? 'text-success' : 'text-gray-500'
                      }`}>
                      {label}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}

            className={`px-6 py-3 rounded-xl font-medium transition-colors bg-primary text-white hover:bg-primary-hover`}
          >
            Quay lại
          </button>

          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!formData.teacherName || !formData.teacherCode)) ||
                (currentStep === 2 && (!formData.courseCode || !formData.semester))
              }
              className={`px-8 py-3 rounded-xl font-medium transition-colors ${(currentStep === 1 && (!formData.teacherName || !formData.teacherCode)) ||
                (currentStep === 2 && (!formData.courseCode || !formData.semester))
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-hover'
                }`}
            >
              Tiếp theo
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
                !formData.quizReview.trim() ||
                !formData.reviewText.trim() ||
                !formData.uploadedFile
              }
              className={`px-8 py-3 rounded-xl font-medium transition-colors ${!formData.teachingAbility ||
                !formData.lectureStructure ||
                !formData.studentInteraction ||
                !formData.workloadRequirement ||
                !formData.gradingDifficulty ||
                formData.wouldRetake === null ||
                !formData.quizReview.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-hover'
                }`}
            >
              Gửi đánh giá
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AddTeacherReview;