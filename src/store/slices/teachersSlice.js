import { createSlice } from '@reduxjs/toolkit';

// Load initial data from localStorage if available
const loadInitialState = () => {
  try {
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
      return JSON.parse(savedTeachers);
    }
  } catch (error) {
    console.error('Error loading teachers from localStorage:', error);
  }
  return initialState;
};

const initialState = {
  teachers: [
    {
      id: 1,
      name: "Nguyễn Văn An",
      code: "AnNV23",
      department: "Công nghệ phần mềm",
      subject: "Software Engineering",
      subjectCode: "SWE201",
      subjectCodeArray: ["SWE201", "PRN201", "PRU321"],
      university: "FPT University",
      rating: 4.8,
      reviews: 156,
      totalReviews: 156,
      experience: "8 năm",
      degree: "Thạc sĩ CNTT",
      specializations: ["Software Engineering", "Database Design", "Web Development"],
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      isOnline: true,
      // Additional fields for TeacherDetail
      overallRating: 4.8,
      wouldTakeAgain: 85,
      difficulty: 3.2,
      subjects: ["Software Engineering", "Database Design", "Web Development"],
      schedule: {
        monday: "09:00 - 12:00",
        wednesday: "14:00 - 17:00",
        friday: "10:00 - 13:00"
      },
      contact: {
        email: "annv@fpt.edu.vn",
        office: "Alpha-204",
        phone: "+84 901 234 567"
      },
      bio: "Giảng viên có nhiều năm kinh nghiệm trong lĩnh vực phát triển phần mềm và giảng dạy.",
      reviewData: [
        {
          id: 1,
          title: "Giảng viên tuyệt vời",
          content: "Giải thích các khái niệm một cách rõ ràng và luôn sẵn lòng giúp đỡ. Bài tập hơi khó nhưng công bằng.",
          teachingCriteria: 5.0,
          teachingQuality: 4.5,
          structure: 5,
          communication: 4,
          score: 9.0,
          tags: ["Truyền cảm hứng", "Giảng hay", "Nhiệt huyết"],
          helpful: 24,
          notHelpful: 2,
          date: "2024-01-15",
          verified: true,
          rating: 5
        },
        {
          id: 2,
          title: "Lớp học hấp dẫn",
          content: "Làm cho bài giảng trở nên thú vị và sử dụng các ví dụ thực tế. Đôi khi điểm số khó nhưng lại đưa ra phản hồi tốt.",
          teachingCriteria: 4.2,
          teachingQuality: 4.0,
          structure: 4,
          communication: 4,
          score: 8.0,
          tags: ["Nhiều bài tập", "Điểm công bằng", "Điểm cộng"],
          helpful: 18,
          notHelpful: 1,
          date: "2024-01-10",
          verified: true,
          rating: 4
        }
      ]
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      code: "BinhTT24",
      department: "Kinh tế chính trị",
      subject: "Kinh tế chính trị",
      subjectCode: "POL301",
      subjectCodeArray: ["POL101", "POL201", "POL301", "ECO101"],
      university: "FPT University",
      rating: 4.6,
      reviews: 203,
      totalReviews: 203,
      experience: "8 năm",
      degree: "Tiến sĩ Kinh tế",
      specializations: ["Kinh tế chính trị", "Kinh tế học đại cương", "Lý thuyết chính trị", "Kinh tế thị trường"],
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isOnline: false,
      // Additional fields for TeacherDetail
      overallRating: 4.6,
      wouldTakeAgain: 82,
      difficulty: 3.8,
      subjects: ["Kinh tế chính trị", "Kinh tế học đại cương", "Lý thuyết chính trị", "Kinh tế thị trường"],
      schedule: {
        tuesday: "08:00 - 11:00",
        thursday: "13:00 - 16:00",
        friday: "14:00 - 17:00"
      },
      contact: {
        email: "binhtt@fpt.edu.vn",
        office: "Alpha-205",
        phone: "+84 902 345 678"
      },
      bio: "Tiến sĩ Kinh tế với chuyên môn sâu về Kinh tế chính trị và Lý thuyết kinh tế. Có nhiều năm kinh nghiệm giảng dạy và nghiên cứu tại các trường đại học hàng đầu.",
      reviewData: [
        {
          id: 1,
          title: "Giảng viên tuyệt vời",
          content: "Cô Bình giảng dạy rất hay, có thể giải thích những khái niệm kinh tế phức tạp một cách dễ hiểu. Luôn liên hệ thực tiễn với lý thuyết.",
          teachingCriteria: 4.7,
          teachingQuality: 4.8,
          structure: 4.9,
          communication: 4.5,
          score: 9.2,
          tags: ["Dễ hiểu", "Thực tiễn", "Nhiệt tình"],
          helpful: 35,
          notHelpful: 2,
          date: "2024-02-15",
          verified: true,
          rating: 5
        },
        {
          id: 2,
          title: "Môn học thú vị",
          content: "Ban đầu tưởng môn Kinh tế chính trị khô khan nhưng cô dạy rất sinh động. Cô thường đưa ra các ví dụ thực tế để minh họa.",
          teachingCriteria: 4.5,
          teachingQuality: 4.6,
          structure: 4.3,
          communication: 4.7,
          score: 8.9,
          tags: ["Sinh động", "Ví dụ thực tế", "Hay"],
          helpful: 22,
          notHelpful: 1,
          date: "2024-01-28",
          verified: true,
          rating: 4
        }
      ]
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      code: "CuongLV22",
      department: "An toàn thông tin",
      subject: "Network Security",
      subjectCode: "SEC302",
      subjectCodeArray: ["SEC302", "SEC303", "SEC304"],
      university: "FPT University",
      rating: 4.9,
      reviews: 89,
      totalReviews: 89,
      experience: "10 năm",
      degree: "Thạc sĩ ATTT",
      specializations: ["Network Security", "Cryptography", "Ethical Hacking"],
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      isOnline: true,
      // Additional fields for TeacherDetail
      overallRating: 4.9,
      wouldTakeAgain: 92,
      difficulty: 3.8,
      subjects: ["Network Security", "Cryptography", "Ethical Hacking"],
      schedule: {
        monday: "13:00 - 16:00",
        wednesday: "09:00 - 12:00",
        friday: "14:00 - 17:00"
      },
      contact: {
        email: "cuonglv@fpt.edu.vn",
        office: "Gamma-105",
        phone: "+84 903 456 789"
      },
      bio: "Giảng viên có chứng chỉ CISSP với nhiều năm kinh nghiệm trong lĩnh vực an toàn thông tin.",
      reviewData: [
        {
          id: 1,
          title: "Rất khuyến khích",
          content: "Một trong những giảng viên tốt nhất tôi từng học. Phương pháp giảng dạy hiện đại và hiệu quả.",
          teachingCriteria: 4.9,
          teachingQuality: 4.8,
          structure: 5,
          communication: 5,
          score: 9.5,
          tags: ["Xuất sắc", "Hiện đại", "Hiệu quả"],
          helpful: 45,
          notHelpful: 1,
          date: "2024-01-18",
          verified: true,
          rating: 5
        },
        {
          id: 2,
          title: "Giảng viên nhiệt tình",
          content: "Rất tận tâm với học sinh, luôn trả lời câu hỏi một cách chi tiết. Bài giảng được chuẩn bị kỹ lưỡng.",
          teachingCriteria: 4.8,
          teachingQuality: 4.5,
          structure: 5,
          communication: 5,
          score: 9.2,
          tags: ["Tận tâm", "Chi tiết", "Chuẩn bị kỹ"],
          helpful: 32,
          notHelpful: 0,
          date: "2024-01-12",
          verified: true,
          rating: 5
        }
      ]
    },
    {
      id: 4,
      name: "Phạm Thị Dung",
      code: "DungPT23",
      department: "IoT",
      subject: "Internet of Things",
      subjectCode: "IOT201",
      subjectCodeArray: ["IOT201", "PRN201", "PRU321"],
      university: "FPT University",
      rating: 4.7,
      reviews: 134,
      totalReviews: 134,
      experience: "5 năm",
      degree: "Thạc sĩ Kỹ thuật",
      specializations: ["IoT", "Embedded Systems", "Sensor Networks"],
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      isOnline: true,
      // Additional fields for TeacherDetail
      overallRating: 4.7,
      wouldTakeAgain: 81,
      difficulty: 3.5,
      subjects: ["IoT", "Embedded Systems", "Sensor Networks"],
      schedule: {
        tuesday: "10:00 - 13:00",
        thursday: "08:00 - 11:00",
        friday: "15:00 - 18:00"
      },
      contact: {
        email: "dungpt@fpt.edu.vn",
        office: "Delta-202",
        phone: "+84 904 567 890"
      },
      bio: "Chuyên gia IoT với nhiều dự án thực tế và kinh nghiệm giảng dạy tại FPT.",
      reviewData: [
        {
          id: 1,
          title: "Bình thường",
          content: "Không có gì đặc biệt, giảng dạy theo sách vở. Không tệ nhưng cũng không xuất sắc.",
          teachingCriteria: 3.0,
          teachingQuality: 3.0,
          structure: 3,
          communication: 3,
          score: 6.0,
          tags: ["Bình thường", "Theo sách", "Không nổi bật"],
          helpful: 12,
          notHelpful: 8,
          date: "2024-01-05",
          verified: true,
          rating: 3
        }
      ]
    },
    {
      id: 5,
      name: "Hoàng Văn Em",
      code: "EmHV24",
      department: "Mobile Development",
      subject: "Cross-platform Development",
      subjectCode: "MOB401",
      subjectCodeArray: ["MOB401", "MOB402", "MOB403"],
      university: "FPT University",
      rating: 4.5,
      reviews: 167,
      totalReviews: 167,
      experience: "7 năm",
      degree: "Thạc sĩ CNTT",
      specializations: ["React Native", "Flutter", "Mobile Architecture"],
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      isOnline: false,
      // Additional fields for TeacherDetail
      overallRating: 4.5,
      wouldTakeAgain: 73,
      difficulty: 3.9,
      subjects: ["React Native", "Flutter", "Mobile Architecture"],
      schedule: {
        monday: "10:00 - 13:00",
        wednesday: "15:00 - 18:00"
      },
      contact: {
        email: "emhv@fpt.edu.vn",
        office: "Epsilon-303",
        phone: "+84 905 678 901"
      },
      bio: "Giảng viên có nhiều năm kinh nghiệm phát triển ứng dụng di động đa nền tảng.",
      reviewData: [
        {
          id: 1,
          title: "Khó hiểu một chút",
          content: "Kiến thức sâu nhưng cách truyền đạt chưa thật sự rõ ràng. Cần cải thiện cách giảng dạy cho sinh viên dễ hiểu hơn.",
          teachingCriteria: 2.5,
          teachingQuality: 2.0,
          structure: 3,
          communication: 2,
          score: 5.5,
          tags: ["Khó hiểu", "Cần cải thiện", "Kiến thức sâu"],
          helpful: 8,
          notHelpful: 5,
          date: "2024-01-08",
          verified: false,
          rating: 2
        },
        {
          id: 2,
          title: "Cần cải thiện thái độ",
          content: "Kiến thức ổn nhưng thái độ với sinh viên chưa thật sự tốt. Đôi khi hơi khó tính và không kiên nhẫn.",
          teachingCriteria: 3.5,
          teachingQuality: 2.5,
          structure: 4,
          communication: 2,
          score: 6.5,
          tags: ["Cần cải thiện", "Khó tính", "Thiếu kiên nhẫn"],
          helpful: 15,
          notHelpful: 12,
          date: "2024-01-03",
          verified: false,
          rating: 2
        }
      ]
    }
  ],
  filteredTeachers: [],
  selectedTeacher: null,
  loading: false,
  error: null,
  filters: {
    department: '',
    subject: '',
    rating: 0,
    searchTerm: ''
  }
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: loadInitialState(),
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
      // Save to localStorage
      try {
        localStorage.setItem('teachers', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving teachers to localStorage:', error);
      }
    },
    addTeacher: (state, action) => {
      state.teachers.push({
        ...action.payload,
        id: Math.max(...state.teachers.map(t => t.id)) + 1,
        rating: 0,
        totalReviews: 0
      });
      // Save to localStorage
      try {
        localStorage.setItem('teachers', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving teachers to localStorage:', error);
      }
    },
    updateTeacher: (state, action) => {
      const index = state.teachers.findIndex(teacher => teacher.id === action.payload.id);
      if (index !== -1) {
        state.teachers[index] = { ...state.teachers[index], ...action.payload };
        // Save to localStorage
        try {
          localStorage.setItem('teachers', JSON.stringify(state));
        } catch (error) {
          console.error('Error saving teachers to localStorage:', error);
        }
      }
    },
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Tự động filter teachers khi filters thay đổi
      state.filteredTeachers = state.teachers.filter(teacher => {
        const matchesDepartment = !state.filters.department || teacher.department === state.filters.department;
        const matchesSubject = !state.filters.subject || teacher.subject.toLowerCase().includes(state.filters.subject.toLowerCase());
        const matchesRating = teacher.rating >= state.filters.rating;
        const matchesSearch = !state.filters.searchTerm || 
          teacher.name.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
          teacher.subject.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
          teacher.department.toLowerCase().includes(state.filters.searchTerm.toLowerCase());
        
        return matchesDepartment && matchesSubject && matchesRating && matchesSearch;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        department: '',
        subject: '',
        rating: 0,
        searchTerm: ''
      };
      state.filteredTeachers = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setTeachers,
  addTeacher,
  updateTeacher,
  setSelectedTeacher,
  setFilters,
  clearFilters,
  setLoading,
  setError
} = teachersSlice.actions;

export default teachersSlice.reducer; 