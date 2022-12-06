import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from './apis';
export const getAppointmentList = createAsyncThunk('appointment/getAppointmentList', async payload => {
  const response = await api.getAppointmentList();
  return response.data;
});
export const createAppointment = createAsyncThunk('appointment/createAppointment', async payload => {
  const response = await api.createAppointment(payload);
  return response.data;
});
export const getCategoriesList = createAsyncThunk('appointment/getCategoriesList', async (payload, {
  rejectWithValue
}) => {
  try {
    const response = await api.getCategoriesList();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getServiceProviderList = createAsyncThunk('appointment/getServiceProviderList', async (payload, {
  rejectWithValue
}) => {
  try {
    const response = await api.getServiceProviderList();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getMeetingInfo = createAsyncThunk('appointment/getMeetingInfo', async (payload, {
  rejectWithValue
}) => {
  try {
    const response = await api.getMeetingInfo();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getCountry = createAsyncThunk('appointment/getCountry', async country => {
  const response = await api.getCountry(country);
  return response.data;
});
export const getUserInfo = createAsyncThunk('appointment/getUserInfo', async payload => {
  const response = await api.getUserInfo();
  return response.data;
});
export const getOrderList = createAsyncThunk('appointment/getOrderList', async payload => {
  const response = await api.getOrderList();
  return response.data;
});
const initialState = {
  service_providers: [],
  categories: [],
  meeting_info: [],
  myBasket: [],
  country: '',
  orderList: [],
  user: null,
  api: {
    loading: 'idle',
    error: null
  }
};
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAppointmentList.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getAppointmentList.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.api.loading = 'idle';
    },
    [getAppointmentList.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [createAppointment.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
        state.api.error = null;
      }
    },
    [createAppointment.fulfilled]: state => {
      state.api.loading = 'idle';
      state.api.error = null;
    },
    [createAppointment.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [getCategoriesList.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getCategoriesList.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.api.loading = 'idle';
    },
    [getCategoriesList.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [getServiceProviderList.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getServiceProviderList.fulfilled]: (state, action) => {
      state.service_providers = action.payload;
      state.api.loading = 'idle';
    },
    [getServiceProviderList.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [getMeetingInfo.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getMeetingInfo.fulfilled]: (state, action) => {
      state.meeting_info = action.payload;
      state.api.loading = 'idle';
    },
    [getMeetingInfo.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [getCountry.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getCountry.fulfilled]: (state, action) => {
      state.country = action.payload;
      state.api.loading = 'idle';
    },
    [getCountry.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [getUserInfo.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.api.loading = 'idle';
    },
    [getUserInfo.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    },
    [getOrderList.pending]: state => {
      if (state.api.loading === 'idle') {
        state.api.loading = 'pending';
      }
    },
    [getOrderList.fulfilled]: (state, action) => {
      state.orderList = action.payload;
      state.api.loading = 'idle';
    },
    [getOrderList.rejected]: (state, action) => {
      if (state.api.loading === 'pending') {
        state.api.error = action.error;
        state.api.loading = 'idle';
      }
    }
  }
});
export default appointmentSlice.reducer;
export const setItem = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};
export const getItem = async key => {
  return await AsyncStorage.getItem(key);
};
import storeSlices from './*/*.slice.js'; // Minimal check to see if imported slice has all properties of an actual slice

const isValid = slice => {
  const sliceProps = ['actions', 'caseReducers', 'name', 'reducer'];
  return Object.keys(slice).every(prop => sliceProps.includes(prop));
};

export const slices = storeSlices.filter(slice => slice.value.slice && isValid(slice.value.slice)).map(slice => slice.value.slice);
export const connectors = slices.reduce((acc, slice) => {
  let name = slice.name.charAt(0).toUpperCase() + slice.name.slice(1);
  acc[name] = slice.reducer;
  return acc;
}, {});