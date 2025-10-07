import React from "react";
import "./styles/documents.css"; // separate styling file

const ElectionDocuments = () => {

    const documents = [
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
    <div className="docs-container" style={{ maxWidth: 600, margin: "60px auto 40px auto", padding: "40px" }}>
      <h2>Election Documents </h2>
      <p className="sub">Election related documents.</p>

      <table id="customers">
        <thead>
          <tr>
            <th style={{ width: "45%" }}>Document</th>
            <th style={{ width: "35%" }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
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
  );
};

export default ElectionDocuments;
