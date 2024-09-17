import React, { useState } from "react";
import csv from "csvtojson";

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

    const reader = new FileReader();
    reader.onload = () => {
      let rows = reader.result.split("\n");
      rows.shift();
      const headerRows = rows.slice(0, 3);
      const headers = Array.from(Array(headerRows[0].length).keys()).map((i) =>
        headerRows.reduce((x, y) => y.split(",")[i] || x, `${i}`)
      );
      rows = rows.slice(2);
      rows[0] = headers;
      const file = rows.join("\n");
      csv()
        .fromString(file)
        .then((csvRow) => {
          setData(csvRow);
          setUploadSuccess(true);
          setUploading(false);
        });
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="text/csv" />
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
