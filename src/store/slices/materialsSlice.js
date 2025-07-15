import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  materials: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Comprehensive guide covering ML fundamentals, algorithms, and practical applications",
      subject: "Computer Science",
      type: "pdf",
      size: "2.5 MB",
      uploadDate: "2024-01-15",
      downloadCount: 245,
      rating: 4.8,
      tags: ["Machine Learning", "AI", "Algorithms", "Python"],
      author: "Dr. Sarah Johnson",
      url: "/materials/ml-intro.pdf",
      thumbnail: "/src/assets/figma/suggestion-icon.png",
      difficulty: "intermediate"
    },
    {
      id: 2,
      title: "Calculus III - Complete Notes",
      description: "Detailed lecture notes covering multivariable calculus, vector calculus, and more",
      subject: "Mathematics",
      type: "pdf",
      size: "3.2 MB",
      uploadDate: "2024-01-10",
      downloadCount: 189,
      rating: 4.6,
      tags: ["Calculus", "Mathematics", "Derivatives", "Integrals"],
      author: "Prof. Michael Chen",
      url: "/materials/calculus-3-notes.pdf",
      thumbnail: "/src/assets/figma/suggestion-icon.png",
      difficulty: "advanced"
    },
    {
      id: 3,
      title: "Quantum Physics Lab Reports",
      description: "Collection of lab reports and experiments in quantum physics",
      subject: "Physics",
      type: "zip",
      size: "4.1 MB",
      uploadDate: "2024-01-08",
      downloadCount: 87,
      rating: 4.9,
      tags: ["Quantum Physics", "Lab Reports", "Experiments"],
      author: "Dr. Emily Rodriguez",
      url: "/materials/quantum-lab-reports.zip",
      thumbnail: "/src/assets/figma/suggestion-icon.png",
      difficulty: "advanced"
    },
    {
      id: 4,
      title: "Organic Chemistry Reactions Guide",
      description: "Visual guide to common organic chemistry reactions and mechanisms",
      subject: "Chemistry",
      type: "pdf",
      size: "1.8 MB",
      uploadDate: "2024-01-05",
      downloadCount: 156,
      rating: 4.7,
      tags: ["Organic Chemistry", "Reactions", "Mechanisms"],
      author: "Dr. David Kim",
      url: "/materials/organic-reactions.pdf",
      thumbnail: "/src/assets/figma/suggestion-icon.png",
      difficulty: "intermediate"
    },
    {
      id: 5,
      title: "Data Structures Cheat Sheet",
      description: "Quick reference for common data structures and their implementations",
      subject: "Computer Science",
      type: "pdf",
      size: "0.8 MB",
      uploadDate: "2024-01-12",
      downloadCount: 312,
      rating: 4.5,
      tags: ["Data Structures", "Programming", "Algorithms"],
      author: "Student Contributor",
      url: "/materials/ds-cheatsheet.pdf",
      thumbnail: "/src/assets/figma/suggestion-icon.png",
      difficulty: "beginner"
    }
  ],
  filteredMaterials: [],
  selectedMaterial: null,
  favorites: [],
  recentlyViewed: [],
  loading: false,
  error: null,
  filters: {
    subject: '',
    type: '',
    difficulty: '',
    searchTerm: '',
    minRating: 0
  }
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    setMaterials: (state, action) => {
      state.materials = action.payload;
    },
    addMaterial: (state, action) => {
      state.materials.unshift({
        ...action.payload,
        id: Math.max(...state.materials.map(m => m.id)) + 1,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadCount: 0,
        rating: 0
      });
    },
    updateMaterial: (state, action) => {
      const index = state.materials.findIndex(material => material.id === action.payload.id);
      if (index !== -1) {
        state.materials[index] = { ...state.materials[index], ...action.payload };
      }
    },
    deleteMaterial: (state, action) => {
      state.materials = state.materials.filter(material => material.id !== action.payload);
    },
    setSelectedMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
      // Thêm vào recently viewed nếu chưa có
      if (action.payload && !state.recentlyViewed.find(item => item.id === action.payload.id)) {
        state.recentlyViewed.unshift(action.payload);
        // Giữ tối đa 10 items
        if (state.recentlyViewed.length > 10) {
          state.recentlyViewed.pop();
        }
      }
    },
    toggleFavorite: (state, action) => {
      const materialId = action.payload;
      const existingIndex = state.favorites.findIndex(fav => fav.id === materialId);
      
      if (existingIndex !== -1) {
        state.favorites.splice(existingIndex, 1);
      } else {
        const material = state.materials.find(m => m.id === materialId);
        if (material) {
          state.favorites.push(material);
        }
      }
    },
    incrementDownloadCount: (state, action) => {
      const material = state.materials.find(m => m.id === action.payload);
      if (material) {
        material.downloadCount += 1;
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Tự động filter materials khi filters thay đổi
      state.filteredMaterials = state.materials.filter(material => {
        const matchesSubject = !state.filters.subject || material.subject === state.filters.subject;
        const matchesType = !state.filters.type || material.type === state.filters.type;
        const matchesDifficulty = !state.filters.difficulty || material.difficulty === state.filters.difficulty;
        const matchesRating = material.rating >= state.filters.minRating;
        const matchesSearch = !state.filters.searchTerm || 
          material.title.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
          material.description.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
          material.tags.some(tag => tag.toLowerCase().includes(state.filters.searchTerm.toLowerCase()));
        
        return matchesSubject && matchesType && matchesDifficulty && matchesRating && matchesSearch;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        subject: '',
        type: '',
        difficulty: '',
        searchTerm: '',
        minRating: 0
      };
      state.filteredMaterials = [];
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
  setMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  setSelectedMaterial,
  toggleFavorite,
  incrementDownloadCount,
  setFilters,
  clearFilters,
  setLoading,
  setError
} = materialsSlice.actions;

export default materialsSlice.reducer; 