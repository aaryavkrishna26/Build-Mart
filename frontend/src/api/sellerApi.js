import apiClient from './apiClient';

export const getSellerProfile = () => 
  apiClient.get('/seller/profile');

export const updateSellerProfile = (data) => 
  apiClient.put('/seller/profile', data);

export const getSellerOrders = () => 
  apiClient.get('/seller/orders');

export const updateOrderStatus = (orderId, status) =>
  apiClient.put(`/seller/orders/${orderId}/status`, { status });
