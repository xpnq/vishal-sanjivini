import React, { useState } from "react";
// AWS SDK imports
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export default function Consent() {
  const [form, setForm] = useState({
    name: "",
    villaNumber: "",
    email: "",
    file: null,
  });
  const [emailError, setEmailError] = useState("");
  const [uploading, setUploading] = useState(false);

  // AWS S3 config (replace with your values)
  const REGION = "YOUR_AWS_REGION";
  const BUCKET = "YOUR_BUCKET_NAME";
  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: "YOUR_ACCESS_KEY_ID",
      secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailPattern.test(value) ? "" : "Invalid email address");
    }
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const uploadToS3 = async (folderName, file) => {
    // Save file as VillaNumber_Consent.ext
    const ext = file.name.split('.').pop();
    const key = `${folderName}/${form.villaNumber}_Consent.${ext}`;
    const uploader = new Upload({
      client: s3,
      params: {
        Bucket: BUCKET,
        Key: key,
        Body: file,
        ContentType: file.type,
      },
    });
    await uploader.done();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.villaNumber || !form.email || !form.file) {
      alert("Please fill all mandatory fields and upload the document.");
      return;
    }
    setUploading(true);
    try {
      const folderName = form.name.replace(/\s+/g, "_");
      await uploadToS3(folderName, form.file);
      alert("Consent submitted and uploaded to S3!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "60px auto 40px auto", paddingTop: "40px" }}>
      <h2>Consent Submission</h2>
      <div style={{ marginBottom: "24px" }}>
        <p>
          Please submit your consent by signing and uploading the form below. All fields and the consent document are mandatory.
        </p>
        <p>
          Download and print the official consent form before uploading:
        </p>
        <a
          href="/assets/ConsentForm.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginBottom: "16px",
            color: "#D4AF37",
            fontWeight: "bold",
            textDecoration: "underline"
          }}
        >
          Download Consent Form
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">
            Name:
          </label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="villaNumber">
            Villa Number:
          </label>
          <br />
          <input
            type="text"
            id="villaNumber"
            name="villaNumber"
            value={form.villaNumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">
            Email ID:
          </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
          {emailError && (
            <span style={{ color: "red", fontSize: 13 }}>{emailError}</span>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="file">
            Upload Consent Document (PDF, JPG, PNG):
          </label>
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
