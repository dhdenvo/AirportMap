import React, { useState } from "react";

const FileUpload = ({ setData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadSuccess(false);

    // Run once done
    setUploadSuccess(true);
    setUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} /> //accept="text/csv"
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadSuccess && <p>File uploaded!</p>}
      {!uploadSuccess && !uploading && (
        <p>Upload failed or no file selected.</p>
      )}
    </div>
  );
};

export default FileUpload;
