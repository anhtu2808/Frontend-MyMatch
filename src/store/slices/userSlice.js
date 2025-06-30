import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@student.university.edu",
    avatar: "/src/assets/figma/avatar.png",
    studentId: "2021123456",
    major: "Computer Science",
    year: 3,
    gpa: 3.75,
    phone: "+84 912 345 678",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    coins: 1000,
    enrolledClasses: [
      {
        id: 1,
        subject: "Data Structures",
        section: "CS201-A",
        teacher: "Dr. Sarah Johnson",
        schedule: "Thứ 5, 10:00-12:00",
        room: "CS-204",
        credits: 3
      },
      {
        id: 2,
        subject: "Calculus III", 
        section: "A01",
        teacher: "Prof. Michael Chen",
        schedule: "Thứ 2, 8:00-10:00",
        room: "MATH-101",
        credits: 4
      },
      {
        id: 3,
        subject: "Physics Lab",
        section: "L01",
        teacher: "Dr. Emily Rodriguez", 
        schedule: "Thứ 6, 13:00-16:00",
        room: "PHY-LAB1",
        credits: 2
      }
    ],
    completedCourses: 45,
    totalCredits: 135,
    preferences: {
      theme: 'light',
      language: 'vi',
      notifications: {
        email: true,
        push: true,
        classReminders: true,
        exchangeUpdates: true
      },
      privacy: {
        showProfile: true,
        showClasses: true,
        showContact: false
      }
    },
    achievements: [
      {
        id: 1,
        title: "Đánh giá nhiệt tình",
        description: "Đã đánh giá hơn 5 giảng viên",
        icon: "⭐",
        earnedDate: "2024-01-15"
      },
      {
        id: 2,
        title: "Chia sẻ kiến thức",
        description: "Đã tải lên 3 tài liệu học tập",
        icon: "📚",
        earnedDate: "2024-01-10"
      }
    ]
  },
  isAuthenticated: true,
  loginAttempts: 0,
  lastLoginDate: "2024-01-15T10:30:00Z",
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.lastLoginDate = new Date().toISOString();
      state.loginAttempts = 0;
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    updateUserProfile: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },

    updateUserPreferences: (state, action) => {
      if (state.currentUser) {
        state.currentUser.preferences = { 
          ...state.currentUser.preferences, 
          ...action.payload 
        };
      }
    },

    addEnrolledClass: (state, action) => {
      if (state.currentUser) {
        state.currentUser.enrolledClasses.push(action.payload);
        state.currentUser.totalCredits += action.payload.credits || 0;
      }
    },

    removeEnrolledClass: (state, action) => {
      if (state.currentUser) {
        const classIndex = state.currentUser.enrolledClasses.findIndex(
          cls => cls.id === action.payload
        );
        if (classIndex !== -1) {
          const removedClass = state.currentUser.enrolledClasses[classIndex];
          state.currentUser.totalCredits -= removedClass.credits || 0;
          state.currentUser.enrolledClasses.splice(classIndex, 1);
        }
      }
    },

    earnCoins: (state, action) => {
      if (state.currentUser) {
        state.currentUser.coins += action.payload;
      }
    },

    spendCoins: (state, action) => {
      if (state.currentUser && state.currentUser.coins >= action.payload) {
        state.currentUser.coins -= action.payload;
      }
    },

    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1;
    },

    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    }
  }
});

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserPreferences = (state) => 
  state.user.currentUser?.preferences || {};
export const selectUserClasses = (state) => 
  state.user.currentUser?.enrolledClasses || [];
export const selectCoinsBalance = (state) => state.user.currentUser?.coins || 0;

export const {
  loginUser,
  logoutUser,
  updateUserProfile,
  updateUserPreferences,
  addEnrolledClass,
  removeEnrolledClass,
  incrementLoginAttempts,
  resetLoginAttempts,
  setLoading,
  setError,
  clearError,
  earnCoins,
  spendCoins
} = userSlice.actions;

export default userSlice.reducer; 