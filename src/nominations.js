/* eslint-disable */
import { useState } from "react";

const FILE_FIELDS = [
  { name: "nominationForm", label: "Nomination Form" },
  { name: "saleDeedCopy", label: "Sale Deed Copy First Page" },
  { name: "adharCard", label: "Adhar Card" },
];

export default function Nominations() {
  const [form, setForm] = useState({
    name: "",
    villaNumber: "",
    post: "",
    nominationForm: null,
    saleDeedCopy: null,
    adharCard: null,
  });
  const [uploading, setUploading] = useState(false);

  const REGION = process.env.REACT_APP_AWS_REGION;
  const BUCKET = process.env.REACT_APP_AWS_BUCKET;

  if (!REGION || !BUCKET) {
    console.warn("AWS S3 configuration missing. Uploads will fail.");
  }

  const uploadToS3 = async (preName, file, fileLabel) => {
    const ext = file.name.split(".").pop();
    const villaFolder = form.villaNumber.replace(/\s+/g, "_");
    const namePart = form.name.replace(/\s+/g, "_");

    // For nominationForm, include the selected post in the file name
    const postPart = preName === "nominationForm" && form.post ? `_${form.post}` : "";

    const fileName = `nominations/${villaFolder}/${namePart}${postPart}_${preName}.${ext}`;
    const s3Url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

    const resp = await fetch(s3Url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!resp.ok) {
      throw new Error(`Failed to upload ${fileLabel}. Check your S3 bucket policy.`);
    }
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    const missingFields = ["name", "villaNumber", "post", ...FILE_FIELDS.map(f => f.name)]
      .filter(field => !form[field]);

    if (missingFields.length) {
      alert("Please fill all mandatory fields and upload all required documents.");
      return;
    }

    setUploading(true);

    try {
      for (const fileField of FILE_FIELDS) {
        await uploadToS3(fileField.name, form[fileField.name], fileField.label);
      }
      alert("Nomination submitted and files uploaded successfully!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }

    setUploading(false);
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "60px auto 40px auto" }}>
      <div style={{ paddingTop: 40, marginBottom: 24 }}>
        <h2>Nomination Submission</h2>
        <p>Please fill out the nomination form below. Ensure all mandatory fields and documents are provided.</p>
        <p>Download and print the official nomination form before uploading:</p>
        <a
          href="https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/nomination-ack-form.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginBottom: 16,
            color: "#D4AF37",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Download Nomination Form
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name and Villa Number */}
        {["name", "villaNumber"].map((field) => (
          <div key={field} style={{ marginBottom: 16 }}>
            <label htmlFor={field} style={{ display: "block" }}>
              {field === "villaNumber" ? "Villa Number:" : "Name:"}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        ))}

        {/* Post Selection */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="post">Post for Nomination:</label>
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
            <option value="PRES">President</option>
            <option value="VP">Vice President</option>
            <option value="GS">General Secretary</option>
            <option value="JS">Joint Secretary</option>
            <option value="TR">Treasurer</option>
            <option value="EM_MA">Executive Member (Maintenance & Amenities)</option>
            <option value="EM_CW">Executive Member (Community & Welfare)</option>
          </select>
        </div>

        {/* File Uploads */}
        {FILE_FIELDS.map((file) => (
          <div key={file.name} style={{ marginBottom: 16 }}>
            <label htmlFor={file.name}>
              Upload {file.label} (PDF/JPG/PNG):
            </label>
            <br />
            <input
              type="file"
              id={file.name}
              name={file.name}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px 24px",
            background: "#D4AF37",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
