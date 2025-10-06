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
    email: "",
    post: "",
    nominationForm: null,
    saleDeedCopy: null,
    adharCard: null,
  });
  const [emailError, setEmailError] = useState("");
  const [uploading, setUploading] = useState(false);

  const REGION = process.env.REACT_APP_AWS_REGION;
  const BUCKET = process.env.REACT_APP_AWS_BUCKET;

  if (!REGION || !BUCKET) {
    console.warn("AWS S3 configuration missing. Uploads will fail.");
  }

  const uploadToS3 = async (preName,file, fileLabel) => {
    const ext = file.name.split(".").pop();
    const villaFolder = form.villaNumber.replace(/\s+/g, "_");
    const namePart = form.name.replace(/\s+/g, "_");

    // File name is now name_consent.ext
    const fileName = `nominations/${villaFolder}/${namePart}_${preName}.${ext}`;
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

    if (name === "email") {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(valid ? "" : "Invalid email address");
    }

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

    if (missingFields.length || emailError) {
      alert("Please fill all mandatory fields and upload all required documents.");
      return;
    }

    setUploading(true);

    try {
      for (const fileField of FILE_FIELDS) {
        await uploadToS3(fileField.name,form[fileField.name], fileField.label);
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
        <h1 className="docs-container">Nomination Submission</h1>
        <p>Please fill out the nomination form below. Ensure all mandatory fields and documents are provided.</p>
        <p>Download and print the official nomination form before uploading:</p>
        <a
          href="/assets/NominationForm.pdf"
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
        {/* Name, Villa Number, Email */}
        {["name", "villaNumber", "email"].map((field) => (
          <div key={field} style={{ marginBottom: 16 }}>
            <label htmlFor={field} style={{ display: "block" }}>
              {field === "villaNumber" ? "Villa Number:" : field === "email" ? "Email ID:" : "Name:"}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
            {field === "email" && emailError && (
              <span style={{ color: "red", fontSize: 13 }}>{emailError}</span>
            )}
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
            <option value="President">President</option>
            <option value="Vice President">Vice President</option>
            <option value="General Secretary">General Secretary</option>
            <option value="Joint Secretary">Joint Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Executive Member (Maintenance & Amenities)">Executive Member (Maintenance & Amenities)
            </option>
            <option value="Executive Member (Community & Welfare)">Executive Member (Community & Welfare)
            </option>
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
