import React from "react";
import "./styles/documents.css"; // separate styling file

const Documents = () => {
  const generalDocuments = [
    {
      name: "RERA Certificate 1",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/reracert-1.pdf",
    },
    {
      name: "RERA Certificate 2",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/reracert-2.pdf",
    }
  ];

  const electionDocuments = [
    {
      name: "Appointee Declaration Form",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/appointee-declaration.pdf",
    },
    {
      name: "Consent Form",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/consent.pdf",
    },
    {
      name: "Election Notification (English)",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/english-election-notification.pdf",
    },
    {
      name: "Election Notification (Telugu)",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/telugu-election-notificaiton.pdf",
    },
    {
      name: "Nomination Form",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/nomination-ack-form.pdf",
    },
    {
      name: "Notice for forming assocation",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/notice.pdf",
    },
  ];

  return (
    <div className="docs-container" style={{ maxWidth: 800, margin: "60px auto 40px auto", padding: "40px" }}>
      <h2>Documents</h2>
      <p className="sub">All project and election related documents.</p>

      {/* General Documents Section */}
      <div style={{ marginBottom: "60px" }}>
        <h3 style={{ color: "#D4AF37", marginBottom: "20px" }}>Project Documents</h3>
        <p className="sub" style={{ marginBottom: "20px" }}>General documents related to the project.</p>
        
        <table id="customers">
          <thead>
            <tr>
              <th style={{ width: "45%" }}>Document</th>
              <th style={{ width: "35%" }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {generalDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.name}</td>
                <td>
                  <a
                    className="doc-link"
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Election Documents Section */}
      <div>
        <h3 style={{ color: "#D4AF37", marginBottom: "20px" }}>Election Documents</h3>
        <p className="sub" style={{ marginBottom: "20px" }}>Election related documents.</p>
        
        <table id="customers">
          <thead>
            <tr>
              <th style={{ width: "45%" }}>Document</th>
              <th style={{ width: "35%" }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {electionDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.name}</td>
                <td>
                  <a
                    className="doc-link"
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
