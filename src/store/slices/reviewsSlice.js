import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Dr. Sarah Johnson",
      studentId: 1,
      studentName: "Alex Johnson",
      rating: 5,
      comment: "Giảng viên rất nhiệt tình và giải thích dễ hiểu. Phương pháp giảng dạy hiện đại và thu hút.",
      subject: "Data Structures",
      difficulty: 4,
      workload: 3,
      clarity: 5,
      helpfulness: 5,
      tags: ["Nhiệt tình", "Dễ hiểu", "Tương tác tốt"],
      attendance: "required",
      wouldRecommend: true,
      createdDate: "2024-01-15",
      likes: 12,
      helpful: 8,
      anonymous: false
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Prof. Michael Chen",
      studentId: 1,
      studentName: "Alex Johnson",
      rating: 4,
      comment: "Giáo sư có kiến thức sâu rộng nhưng đôi khi giảng hơi nhanh. Bài tập khá khó.",
      subject: "Calculus III",
      difficulty: 5,
      workload: 4,
      clarity: 3,
      helpfulness: 4,
      tags: ["Kiến thức sâu", "Bài tập khó", "Cần chuẩn bị kỹ"],
      attendance: "recommended",
      wouldRecommend: true,
      createdDate: "2024-01-12",
      likes: 8,
      helpful: 6,
      anonymous: false
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: "Dr. Emily Rodriguez",
      studentId: 2,
      studentName: "Maria Garcia",
      rating: 5,
      comment: "Thí nghiệm được hướng dẫn rất chi tiết. Cô luôn sẵn sàng giúp đỡ sinh viên.",
      subject: "Quantum Physics",
      difficulty: 4,
      workload: 3,
      clarity: 5,
      helpfulness: 5,
      tags: ["Hướng dẫn tốt", "Nhiệt tình", "Thí nghiệm hay"],
      attendance: "required",
      wouldRecommend: true,
      createdDate: "2024-01-10",
      likes: 15,
      helpful: 11,
      anonymous: false
    },
    {
      id: 4,
      teacherId: 1,
      teacherName: "Dr. Sarah Johnson",
      studentId: 3,
      studentName: "John Smith",
      rating: 4,
      comment: "Cô dạy tốt nhưng deadline bài tập hơi gấp. Nội dung bài học rất bổ ích.",
      subject: "Machine Learning",
      difficulty: 4,
      workload: 4,
      clarity: 4,
      helpfulness: 4,
      tags: ["Bổ ích", "Deadline gấp", "Nội dung hay"],
      attendance: "optional",
      wouldRecommend: true,
      createdDate: "2024-01-08",
      likes: 6,
      helpful: 4,
      anonymous: true
    }
  ],
  userReviews: [],
  teacherStats: {},
  loading: false,
  error: null,
  filters: {
    teacherId: null,
    rating: 0,
    subject: '',
    sortBy: 'newest'
  }
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const newReview = {
        ...action.payload,
        id: Math.max(...state.reviews.map(r => r.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0],
        likes: 0,
        helpful: 0,
        studentId: 1, // Mock current user ID
        studentName: "Alex Johnson" // Mock current user name
      };
      state.reviews.unshift(newReview);
      state.userReviews.unshift(newReview);
      
      // Cập nhật stats của giảng viên
      state.teacherStats[action.payload.teacherId] = calculateTeacherStats(
        state.reviews.filter(r => r.teacherId === action.payload.teacherId)
      );
    },

    updateReview: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const reviewIndex = state.reviews.findIndex(r => r.id === id);
      
      if (reviewIndex !== -1) {
        state.reviews[reviewIndex] = { ...state.reviews[reviewIndex], ...updatedData };
        
        // Cập nhật trong userReviews nếu có
        const userReviewIndex = state.userReviews.findIndex(r => r.id === id);
        if (userReviewIndex !== -1) {
          state.userReviews[userReviewIndex] = state.reviews[reviewIndex];
        }
        
        // Cập nhật teacher stats
        const teacherId = state.reviews[reviewIndex].teacherId;
        state.teacherStats[teacherId] = calculateTeacherStats(
          state.reviews.filter(r => r.teacherId === teacherId)
        );
      }
    },

    deleteReview: (state, action) => {
      const reviewId = action.payload;
      const review = state.reviews.find(r => r.id === reviewId);
      
      if (review) {
        const teacherId = review.teacherId;
        state.reviews = state.reviews.filter(r => r.id !== reviewId);
        state.userReviews = state.userReviews.filter(r => r.id !== reviewId);
        
        // Cập nhật teacher stats
        state.teacherStats[teacherId] = calculateTeacherStats(
          state.reviews.filter(r => r.teacherId === teacherId)
        );
      }
    },

    likeReview: (state, action) => {
      const review = state.reviews.find(r => r.id === action.payload);
      if (review) {
        review.likes += 1;
      }
    },

    markHelpful: (state, action) => {
      const review = state.reviews.find(r => r.id === action.payload);
      if (review) {
        review.helpful += 1;
      }
    },

    setUserReviews: (state, action) => {
      state.userReviews = action.payload;
    },

    calculateAllTeacherStats: (state) => {
      const teacherIds = [...new Set(state.reviews.map(r => r.teacherId))];
      
      teacherIds.forEach(teacherId => {
        const teacherReviews = state.reviews.filter(r => r.teacherId === teacherId);
        state.teacherStats[teacherId] = calculateTeacherStats(teacherReviews);
      });
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        teacherId: null,
        rating: 0,
        subject: '',
        sortBy: 'newest'
      };
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Helper function để tính toán stats của giảng viên
const calculateTeacherStats = (reviews) => {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      difficulty: 0,
      workload: 0,
      clarity: 0,
      helpfulness: 0,
      recommendationRate: 0
    };
  }

  const totalReviews = reviews.length;
  const sumRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const sumDifficulty = reviews.reduce((sum, r) => sum + r.difficulty, 0);
  const sumWorkload = reviews.reduce((sum, r) => sum + r.workload, 0);
  const sumClarity = reviews.reduce((sum, r) => sum + r.clarity, 0);
  const sumHelpfulness = reviews.reduce((sum, r) => sum + r.helpfulness, 0);
  const recommendCount = reviews.filter(r => r.wouldRecommend).length;

  return {
    averageRating: Number((sumRating / totalReviews).toFixed(1)),
    totalReviews,
    difficulty: Number((sumDifficulty / totalReviews).toFixed(1)),
    workload: Number((sumWorkload / totalReviews).toFixed(1)),
    clarity: Number((sumClarity / totalReviews).toFixed(1)),
    helpfulness: Number((sumHelpfulness / totalReviews).toFixed(1)),
    recommendationRate: Number(((recommendCount / totalReviews) * 100).toFixed(1))
  };
};

// Selectors
export const selectReviewsByTeacher = (state, teacherId) => {
  return state.reviews.reviews.filter(review => review.teacherId === teacherId);
};

export const selectUserReviews = (state) => {
  return state.reviews.reviews.filter(review => review.studentId === 1); // Mock user ID
};

export const selectTeacherStats = (state, teacherId) => {
  return state.reviews.teacherStats[teacherId] || calculateTeacherStats([]);
};

export const selectFilteredReviews = (state) => {
  let filtered = state.reviews.reviews;
  const { teacherId, rating, subject, sortBy } = state.reviews.filters;

  if (teacherId) {
    filtered = filtered.filter(r => r.teacherId === teacherId);
  }
  
  if (rating > 0) {
    filtered = filtered.filter(r => r.rating >= rating);
  }
  
  if (subject) {
    filtered = filtered.filter(r => r.subject.toLowerCase().includes(subject.toLowerCase()));
  }

  // Sorting
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      break;
    case 'highest':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    case 'helpful':
      filtered.sort((a, b) => b.helpful - a.helpful);
      break;
  }

  return filtered;
};

export const {
  addReview,
  updateReview,
  deleteReview,
  likeReview,
  markHelpful,
  setUserReviews,
  calculateAllTeacherStats,
  setFilters,
  clearFilters,
  setLoading,
  setError
} = reviewsSlice.actions;

export default reviewsSlice.reducer; 