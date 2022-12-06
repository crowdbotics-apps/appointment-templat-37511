// @ts-ignore
import { getGlobalOptions } from '@options';
import axios from 'axios';
import { getItem } from '.';
const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const appointmentAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const getAppointmentList = async () => {
  const token = await getItem('token');
  return appointmentAPI.get('/api/v1/appointment/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

const createAppointment = async () => {
  const token = await getItem('token');
  return appointmentAPI.post('/api/v1/appointment/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

const getCategoriesList = async () => {
  return appointmentAPI.get('/api/v1/category/');
};

const getServiceProviderList = async () => {
  return appointmentAPI.get('/api/v1/srvc_prvdr/');
};

const getMeetingInfo = async () => {
  return appointmentAPI.get('/api/v1/meeting-info/');
};

const getCountry = async country => {
  const token = await getItem('token');
  return appointmentAPI.get(`${country}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

const getUserInfo = async () => {
  const token = await getItem('token');
  return appointmentAPI.get(`/rest-auth/user/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

const getOrderList = async url => {
  const token = await getItem('token');
  return appointmentAPI.get(`/api/orders/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

export const api = {
  getAppointmentList,
  createAppointment,
  getCategoriesList,
  getServiceProviderList,
  getMeetingInfo,
  getCountry,
  getUserInfo,
  getOrderList
};