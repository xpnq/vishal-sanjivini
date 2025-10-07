/* eslint-disable */
import React, { useState } from "react";

export default function Consent() {
  const [form, setForm] = useState({
    name: "",
    villaNumber: "",
    file: null,
  });

  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const REGION = process.env.REACT_APP_AWS_REGION;
  const BUCKET = process.env.REACT_APP_AWS_BUCKET;

  const uploadToS3 = async (folderName, file) => {
    const ext = file.name.split('.').pop();
    const fileName = `consent/${folderName}/${form.villaNumber}_Consent.${ext}`;
    const s3Url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

    const uploadResp = await fetch(s3Url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResp.ok) {
      throw new Error("File upload to S3 failed. Check bucket policy (PUT must be allowed for testing).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.villaNumber || !form.file) {
      setErrorMsg("Please fill all mandatory fields and upload the document.");
      return;
    }

    setUploading(true);

    try {
      const folderName = form.name.replace(/\s+/g, "_");
      await uploadToS3(folderName, form.file);
      alert("Consent submitted and uploaded to S3 successfully!");
    } catch (err) {
      let msg = "Upload failed. ";
      if (err.message) msg += err.message;
      else msg += "Unknown error occurred.";
      setErrorMsg(msg);
    }

    setUploading(false);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: 600, margin: "60px auto 40px auto", paddingTop: "40px" }}
    >
      <h2>Consent Submission</h2>
      <div style={{ marginBottom: "24px" }}>
        <p>
          Please submit your consent by signing and uploading the form below.
          All fields and the consent document are mandatory.
        </p>
        <p>Download and print the official consent form before uploading:</p>
        <a
          href="https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/consent.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginBottom: "16px",
            color: "#D4AF37",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Download Consent Form
        </a>
      </div>

      {errorMsg && (
        <div
          style={{ color: "red", marginBottom: "16px", fontWeight: "bold" }}
        >
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="villaNumber">Villa Number:</label>
          <br />
          <input
            type="text"
            id="villaNumber"
            name="villaNumber"
            value={form.villaNumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="file">Upload Consent Document (PDF, JPG, PNG):</label>
          <br />
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px 24px",
            background: "#D4AF37",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
