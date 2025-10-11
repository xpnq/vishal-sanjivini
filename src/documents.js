import React from "react";
import "./styles/documents.css"; // separate styling file

const GeneralDocuments = () => {
  const documents = [
    {
      name: "RERA Certificate 1",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/reracert-1.pdf",
    },
    {
      name: "RERA Certificate 2",
      link: "https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/docs/reracert-2.pdf",
    }
  ];

  return (
    <div className="docs-container" style={{ maxWidth: 600, margin: "60px auto 40px auto", padding: "40px" }}>
      <h2>Project Documents </h2>
      <p className="sub">General documents related to the project.</p>

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

export default GeneralDocuments;
