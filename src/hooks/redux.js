import { useSelector, useDispatch } from 'react-redux';

// Generic Redux hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);

// Teachers hooks
export const useTeachers = () => {
  const teachers = useAppSelector(state => state.teachers.teachers);
  const filteredTeachers = useAppSelector(state => state.teachers.filteredTeachers);
  const selectedTeacher = useAppSelector(state => state.teachers.selectedTeacher);
  const filters = useAppSelector(state => state.teachers.filters);
  const loading = useAppSelector(state => state.teachers.loading);
  
  return {
    teachers,
    filteredTeachers: filteredTeachers.length > 0 ? filteredTeachers : teachers,
    selectedTeacher,
    filters,
    loading
  };
};

// Materials hooks
export const useMaterials = () => {
  const materials = useAppSelector(state => state.materials.materials);
  const filteredMaterials = useAppSelector(state => state.materials.filteredMaterials);
  const selectedMaterial = useAppSelector(state => state.materials.selectedMaterial);
  const favorites = useAppSelector(state => state.materials.favorites);
  const recentlyViewed = useAppSelector(state => state.materials.recentlyViewed);
  const filters = useAppSelector(state => state.materials.filters);
  const loading = useAppSelector(state => state.materials.loading);
  
  return {
    materials,
    filteredMaterials: filteredMaterials.length > 0 ? filteredMaterials : materials,
    selectedMaterial,
    favorites,
    recentlyViewed,
    filters,
    loading
  };
};

// Exchange hooks
export const useExchange = () => {
  const exchanges = useAppSelector(state => state.exchange.exchanges);
  const userExchanges = useAppSelector(state => 
    state.exchange.exchanges.filter(ex => ex.requesterId === 1)
  );
  const availableClasses = useAppSelector(state => state.exchange.availableClasses);
  const filters = useAppSelector(state => state.exchange.filters);
  const loading = useAppSelector(state => state.exchange.loading);
  
  const pendingCount = exchanges.filter(ex => ex.status === 'pending').length;
  
  return {
    exchanges,
    userExchanges,
    availableClasses,
    filters,
    loading,
    pendingCount
  };
};

// User hooks
export const useUser = () => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const loading = useAppSelector(state => state.user.loading);
  
  return {
    currentUser,
    isAuthenticated,
    loading
  };
};

// Reviews hooks
export const useReviews = () => {
  const reviews = useAppSelector(state => state.reviews.reviews);
  const userReviews = useAppSelector(state => 
    state.reviews.reviews.filter(review => review.studentId === 1)
  );
  const teacherStats = useAppSelector(state => state.reviews.teacherStats);
  const filters = useAppSelector(state => state.reviews.filters);
  const loading = useAppSelector(state => state.reviews.loading);
  
  return {
    reviews,
    userReviews,
    teacherStats,
    filters,
    loading
  };
};

// Dashboard stats hooks
export const useDashboardStats = () => {
  const userReviews = useAppSelector(state => 
    state.reviews.reviews.filter(review => review.studentId === 1)
  );
  const userExchanges = useAppSelector(state => 
    state.exchange.exchanges.filter(ex => ex.requesterId === 1)
  );
  const userMaterials = useAppSelector(state => 
    state.materials.materials.filter(material => material.author === "Alex Johnson")
  );
  const pendingExchanges = useAppSelector(state => 
    state.exchange.exchanges.filter(ex => ex.status === 'pending' && ex.requesterId === 1).length
  );
  
  return {
    reviewsCount: userReviews.length,
    exchangesCount: userExchanges.length,
    materialsCount: userMaterials.length,
    pendingExchanges,
    recentActivity: [] // Empty array since we removed activity logging
  };
}; 