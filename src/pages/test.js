import React, { useState } from "react";
import axios from "axios";

const PDFUploadPage = () => {
  const [pdfData, setPdfData] = useState(null);
  const [imgbbLink, setImgbbLink] = useState("");

  const handleUpload = async (event) => {
    event.preventDefault();

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("pdf", file);

    const response = await axios.post(
      "https://api.imgbb.com/upload",
      formData,
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      setPdfData(response.data);
      setImgbbLink(response.data.data.url);
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    setPdfData(event.target.files[0]);
    console.log(file);

    const imageData = new FormData();
    imageData.set("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);
    imageData.append("image", file);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <p>Click the button below to upload a PDF file.</p>
      <input type="file" name="pdf" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>

      {pdfData && (
        <div>
          <h3>PDF Data</h3>
          <p>File name: {pdfData.fileName}</p>
          <p>File size: {pdfData.size} bytes</p>
        </div>
      )}

      {imgbbLink && (
        <div>
          <h3>Imgbb Link</h3>
          <p>
            <a href={imgbbLink}>Download PDF</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PDFUploadPage;
