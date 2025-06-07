// src/Account/Verification.jsx
import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

const Verification = () => {
  // Local state for verification status, loading, errors, file selection, and upload state
  const [status, setStatus] = useState(''); // expected values: 'verified', 'pending', 'unverified'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    // Fetch verification status as soon as component mounts
    const fetchStatus = async () => {
      try {
        const data = await userService.getVerificationStatus();
        setStatus(data.status);
      } catch (err) {
        console.error(err);
        setError('Failed to load verification status.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleFileChange = (e) => {
    // Update which file user selected for upload
    setSelectedFile(e.target.files[0]);
    setUploadError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadError('Please select a document to upload.');
      return;
    }

    setUploading(true);
    try {
      // Prepare a FormData object to send the file
      const formData = new FormData();
      formData.append('document', selectedFile);

      await userService.uploadVerificationDocument(formData);

      // After a successful upload, assume status moves to "pending"
      setStatus('pending');
      setUploadError('');
    } catch (err) {
      console.error(err);
      setUploadError('Failed to upload document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading verification status...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h2 className="text-2xl font-semibold mb-4">Account Verification</h2>

      {/* If user is already verified */}
      {status === 'verified' && (
        <p className="text-fortino-goldSoft">
          Your account is verified.
        </p>
      )}

      {/* If user’s verification is pending review */}
      {status === 'pending' && (
        <p className="text-fortino-oliveGreen">
          Your verification is pending review. We will notify you once it is
          completed.
        </p>
      )}

      {/* If user is unverified, show upload form */}
      {status === 'unverified' && (
        <div>
          <p className="mb-4">
            Your account is not verified. Please upload a valid government ID
            or document to complete verification.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File input */}
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="text-sm text-fortino-softWhite"
            />

            {/* Display any upload error */}
            {uploadError && (
              <div className="text-red-500">{uploadError}</div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={uploading}
              className="bg-fortino-darkRed text-white px-4 py-2 rounded-lg hover:bg-fortino-darkRed/80 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Verification;
