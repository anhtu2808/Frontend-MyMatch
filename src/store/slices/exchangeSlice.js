import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exchanges: [
    {
      id: 1,
      fromClass: {
        subject: "Calculus III",
        section: "A01",
        schedule: "Thứ 2, 8:00-10:00",
        teacher: "Prof. Michael Chen",
        room: "MATH-101"
      },
      toClass: {
        subject: "Calculus III", 
        section: "B02",
        schedule: "Thứ 4, 14:00-16:00",
        teacher: "Prof. Michael Chen",
        room: "MATH-102"
      },
      requesterId: 1,
      requesterName: "Alex Johnson",
      status: "pending",
      reason: "Xung đột lịch với môn khác",
      createdDate: "2024-01-10",
      priority: "high"
    },
    {
      id: 2,
      fromClass: {
        subject: "Physics Lab",
        section: "L01", 
        schedule: "Thứ 6, 13:00-16:00",
        teacher: "Dr. Emily Rodriguez",
        room: "PHY-LAB1"
      },
      toClass: {
        subject: "Physics Lab",
        section: "L02",
        schedule: "Thứ 3, 9:00-12:00", 
        teacher: "Dr. Emily Rodriguez",
        room: "PHY-LAB2"
      },
      requesterId: 1,
      requesterName: "Alex Johnson",
      status: "approved",
      reason: "Muốn có buổi chiều nghỉ",
      createdDate: "2024-01-05",
      priority: "medium",
      approvedDate: "2024-01-08"
    },
    {
      id: 3,
      fromClass: {
        subject: "Data Structures",
        section: "CS201-A",
        schedule: "Thứ 5, 10:00-12:00",
        teacher: "Dr. Sarah Johnson", 
        room: "CS-204"
      },
      toClass: {
        subject: "Data Structures",
        section: "CS201-B", 
        schedule: "Thứ 2, 14:00-16:00",
        teacher: "Dr. Sarah Johnson",
        room: "CS-205"
      },
      requesterId: 2,
      requesterName: "Maria Garcia",
      status: "rejected",
      reason: "Lớp đã full",
      createdDate: "2024-01-08",
      priority: "low",
      rejectedDate: "2024-01-12",
      rejectionReason: "Lớp B đã đạt số lượng tối đa"
    }
  ],
  userExchanges: [],
  availableClasses: [
    {
      id: 1,
      subject: "Calculus III",
      sections: [
        { code: "A01", schedule: "Thứ 2, 8:00-10:00", teacher: "Prof. Michael Chen", available: 5 },
        { code: "B02", schedule: "Thứ 4, 14:00-16:00", teacher: "Prof. Michael Chen", available: 2 },
        { code: "C03", schedule: "Thứ 6, 10:00-12:00", teacher: "Prof. David Lee", available: 8 }
      ]
    },
    {
      id: 2,
      subject: "Data Structures", 
      sections: [
        { code: "CS201-A", schedule: "Thứ 5, 10:00-12:00", teacher: "Dr. Sarah Johnson", available: 3 },
        { code: "CS201-B", schedule: "Thứ 2, 14:00-16:00", teacher: "Dr. Sarah Johnson", available: 0 },
        { code: "CS201-C", schedule: "Thứ 7, 8:00-10:00", teacher: "Dr. Mark Wilson", available: 12 }
      ]
    }
  ],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    subject: '',
    dateRange: 'all'
  }
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    addExchange: (state, action) => {
      const newExchange = {
        ...action.payload,
        id: Math.max(...state.exchanges.map(e => e.id)) + 1,
        status: 'pending',
        createdDate: new Date().toISOString().split('T')[0],
        requesterId: 1, // Mock user ID
        requesterName: "Alex Johnson" // Mock user name
      };
      state.exchanges.unshift(newExchange);
      state.userExchanges.unshift(newExchange);
    },
    
    updateExchangeStatus: (state, action) => {
      const { id, status, ...additionalData } = action.payload;
      const exchange = state.exchanges.find(e => e.id === id);
      if (exchange) {
        exchange.status = status;
        if (status === 'approved') {
          exchange.approvedDate = new Date().toISOString().split('T')[0];
        } else if (status === 'rejected') {
          exchange.rejectedDate = new Date().toISOString().split('T')[0];
          if (additionalData.rejectionReason) {
            exchange.rejectionReason = additionalData.rejectionReason;
          }
        }
      }
    },

    cancelExchange: (state, action) => {
      const exchangeId = action.payload;
      state.exchanges = state.exchanges.filter(e => e.id !== exchangeId);
      state.userExchanges = state.userExchanges.filter(e => e.id !== exchangeId);
    },

    setUserExchanges: (state, action) => {
      state.userExchanges = action.payload;
    },

    updateAvailableClasses: (state, action) => {
      state.availableClasses = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        subject: '',
        dateRange: 'all'
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

// Selectors
export const selectExchangesByStatus = (state, status) => {
  return state.exchange.exchanges.filter(exchange => 
    status === 'all' ? true : exchange.status === status
  );
};

export const selectUserExchanges = (state) => {
  return state.exchange.exchanges.filter(exchange => exchange.requesterId === 1); // Mock user ID
};

export const selectPendingExchangesCount = (state) => {
  return state.exchange.exchanges.filter(exchange => exchange.status === 'pending').length;
};

export const {
  addExchange,
  updateExchangeStatus,
  cancelExchange,
  setUserExchanges,
  updateAvailableClasses,
  setFilters,
  clearFilters,
  setLoading,
  setError
} = exchangeSlice.actions;

export default exchangeSlice.reducer; 