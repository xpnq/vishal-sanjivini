/* eslint-disable */
import { useState } from "react";
// Add AWS SDK imports
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export default function Nominations() {
  const [form, setForm] = useState({
    name: "",
    villaNumber: "",
    email: "",
    saleDeed: "",
    post: "",
    nominationForm: null,
    saleDeedCopy: null,
    adharCard: null,
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

  const uploadToS3 = async (folderName, file, fileLabel) => {
    // Save file as Villanumber_Nomination.ext, Villanumber_SaleDeedCopy.ext, Villanumber_AdharCard.ext
    const ext = file.name.split('.').pop();
    let key = "";
    if (fileLabel === "NominationForm") {
      key = `${folderName}/${form.villaNumber}_Nomination.${ext}`;
    } else if (fileLabel === "SaleDeedCopy") {
      key = `${folderName}/${form.villaNumber}_SaleDeedCopy.${ext}`;
    } else if (fileLabel === "AdharCard") {
      key = `${folderName}/${form.villaNumber}_AdharCard.${ext}`;
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.villaNumber ||
      !form.nominationForm ||
      !form.saleDeedCopy ||
      !form.adharCard ||
      emailError
    ) {
      alert("Please fill all mandatory fields and upload all required documents.");
      return;
    }
    setUploading(true);
    try {
      const folderName = form.name.replace(/\s+/g, "_");
      await uploadToS3(folderName, form.nominationForm, "NominationForm");
      await uploadToS3(folderName, form.saleDeedCopy, "SaleDeedCopy");
      await uploadToS3(folderName, form.adharCard, "AdharCard");
      alert("Nomination submitted and files uploaded to S3!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "60px auto 40px auto" }}>
      {/* Add space at top and sample content below header */}
      <div style={{ paddingTop: "40px", marginBottom: "24px" }}>
         <h2>Nomination Submission</h2>
        <p>
          Please fill out the nomination form below. Ensure all mandatory fields and documents are provided.
        </p>
        <p>
          Download and print the official nomination form before uploading:
        </p>
        <a
          href="/assets/NominationForm.pdf"
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
          Download Nomination Form
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
        {/* <div style={{ marginBottom: 16 }}>
          <label htmlFor="saleDeed">
            Sale Deed Number:
          </label>
          <br />
          <input
            type="text"
            id="saleDeed"
            name="saleDeed"
            value={form.saleDeed}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div> */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="post">
            Post for Nomination:
          </label>
          <br />
          <select
            id="post"
            name="post"
            value={form.post}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          >
            <option value="">Select Post</option>
            <option value="President">President</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="nominationForm">
            Upload Nomination Form (PDF/JPG/PNG):
          </label>
          <br />
          <input
            type="file"
            id="nominationForm"
            name="nominationForm"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="saleDeedCopy">
            Upload Sale Deed Copy First Page (PDF/JPG/PNG):
          </label>
          <br />
          <input
            type="file"
            id="saleDeedCopy"
            name="saleDeedCopy"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="adharCard">
            Upload Adhar Card (PDF/JPG/PNG):
          </label>
          <br />
          <input
            type="file"
            id="adharCard"
            name="adharCard"
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
