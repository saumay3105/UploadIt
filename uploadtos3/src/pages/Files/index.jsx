import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';
import { Trash2, RefreshCw, FileText, Image, File, Download } from 'lucide-react';
import './Files.css'; 

const ShowFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const s3 = new S3({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION
  });

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      return <Image className="file-icon" />;
    } else if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
      return <FileText className="file-icon" />;
    }
    return <File className="file-icon" />;
  };

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await s3.listObjectsV2({
        Bucket: import.meta.env.VITE_S3_BUCKET
      }).promise();
      
      const fileList = response.Contents.map(file => ({
        name: file.Key,
        lastModified: file.LastModified,
        size: file.Size,
        url: s3.getSignedUrl('getObject', {
          Bucket: import.meta.env.VITE_S3_BUCKET,
          Key: file.Key,
          Expires: 3600
        })
      }));
      
      setFiles(fileList);
    } catch (err) {
      setError('Failed to fetch files: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileName) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await s3.deleteObject({
          Bucket: import.meta.env.VITE_S3_BUCKET,
          Key: fileName
        }).promise();
        fetchFiles();
      } catch (err) {
        setError('Failed to delete file: ' + err.message);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <h1 className="file-manager-title">Get all your <span className='f'> Files </span> here</h1>
        <button
          onClick={fetchFiles}
          className={`refresh-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          <RefreshCw className={`refresh-icon ${loading ? 'spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="file-grid">
        {files.map((file) => (
          <div key={file.name} className="file-card">
            <div className="file-card-content">
              <div className="file-icon-wrapper">
                {getFileIcon(file.name)}
              </div>
              <div className="file-details">
                <h3 className="file-name" title={file.name}>
                  {file.name}
                </h3>
                <p className="file-size">
                  {formatFileSize(file.size)}
                </p>
                <p className="file-date">
                  {new Date(file.lastModified).toLocaleDateString()}
                </p>
              </div>
              <div className="file-actions">
                <a
                  href={file.url}
                  className="download-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="action-icon" />
                  Download
                </a>
                <button
                  onClick={() => deleteFile(file.name)}
                  className="delete-button"
                >
                  <Trash2 className="action-icon" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {files.length === 0 && !loading && (
        <div className="no-files-message">
          No files found in the bucket
        </div>
      )}

      {loading && (
        <div className="loading-message">
          Loading files...
        </div>
      )}
    </div>
  );
};

export default ShowFiles;
