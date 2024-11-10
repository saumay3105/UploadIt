import React, { useState, useEffect } from 'react';
import './Files.css'
const FilesList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/list-files');
      const data = await response.json();
      setFiles(data.files);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch files');
      setLoading(false);
    }
  };

  const handleDelete = async (fileName) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        const response = await fetch(`/api/delete-file/${fileName}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchFiles(); // Refresh the list
        } else {
          setError('Failed to delete file');
        }
      } catch (err) {
        setError('Failed to delete file');
      }
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) return <div className="files-container">Loading...</div>;
  if (error) return <div className="files-container error">{error}</div>;

  return (
    <div className="files-container">
      <h1 className="files-title">Your Files</h1>
      {files.length === 0 ? (
        <p className="no-files">No files uploaded yet</p>
      ) : (
        <div className="files-grid">
          {files.map((file) => (
            <div key={file.name} className="file-card">
              <div className="file-name">{file.name}</div>
              <div className="file-info">
                <span>Size: {(file.size / 1024).toFixed(2)} KB</span>
                <span>Modified: {new Date(file.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="file-actions">
                <button
                  onClick={() => handleDelete(file.name)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesList;