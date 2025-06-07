// src/services/userService.js
import api from './api';

/**
 * userService
 *
 * Encapsulates user profile and verification API calls:
 *   - getUserDetails:           fetch user profile (username, email, balance, createdAt)
 *   - getVerificationStatus:    fetch current KYC verification status
 *   - uploadVerificationDocument: upload a KYC document for verification
 */
const getUserDetails = async () => {
  const response = await api.get('/user/profile');
  // expected response.data: { username, email, balance, createdAt, ... }
  return response.data;
};

const getVerificationStatus = async () => {
  const response = await api.get('/user/verification-status');
  // expected response.data: { status: 'unverified' | 'pending' | 'verified' }
  return response.data;
};

const uploadVerificationDocument = async (formData) => {
  const response = await api.post('/user/upload-document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // expected response.data: confirmation or new status
  return response.data;
};

export default {
  getUserDetails,
  getVerificationStatus,
  uploadVerificationDocument,
};
