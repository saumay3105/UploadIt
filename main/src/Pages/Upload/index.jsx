import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import './Upload.css';

const S3FileUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setError(null);

      // Create a pre-signed URL from your backend
      const response = await fetch('/api/get-upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileUrl } = await response.json();

      // Upload to S3 using the pre-signed URL
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      setFileList(prev => [...prev, {
        name: file.name,
        status: 'done',
        url: fileUrl
      }]);

      return fileUrl;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      try {
        await handleUpload(file);
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
      }
    }
  };

  const onFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      try {
        await handleUpload(file);
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
      }
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Your Files here</h2>
      <div 
        className={`upload-dropzone ${uploading ? 'uploading' : ''}`}
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={() => document.getElementById('file-input').click()}
      >
        <Upload className="upload-icon" size={48} />
        <p className="upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="upload-hint">
          Support for single or bulk upload
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={onFileSelect}
        />
      </div>

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}

      {fileList.length > 0 && (
        <div className="upload-list">
          <h3 className="upload-list-title">Uploaded files:</h3>
          <ul>
            {fileList.map((file, index) => (
              <li key={index} className="upload-list-item">
                <span className="file-name">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default S3FileUpload;