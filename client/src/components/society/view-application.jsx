import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../assets/proxy";

const ViewApplication = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          url + `/societies/get-application/${applicationId}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        setApplicationData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId]);

  const handleViewDocument = (documentUrl) => {
    // Open iframe popup or download the document
    // Implement the necessary logic based on your requirements
  };

  if (isLoading) {
    return <p>Loading application data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center">
      {applicationData && (
        <div className="w-full max-w-md p-4 rounded-lg bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Application Type: {applicationData.application_type}
          </h2>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Application Type:
            </label>
            <span className="block mt-1 border-gray-300 rounded-md shadow-sm">
              {applicationData.application_type}
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Application Title:
            </label>
            <span className="block mt-1 border-gray-300 rounded-md shadow-sm">
              {applicationData.application_title}
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Application Description:
            </label>
            <span className="block mt-1 border-gray-300 rounded-md shadow-sm">
              {applicationData.application_desc}
            </span>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Supporting Documents:</h3>
            {applicationData.supporting_documents &&
            applicationData.supporting_documents.length > 0 ? (
              <ul>
                {applicationData.supporting_documents.map((document, index) => (
                  <li key={index}>
                    <span className="block text-primary">
                      {document.substring(document.lastIndexOf("/") + 1)}
                    </span>
                    <a
                      href={url + document}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleViewDocument(document)}
                      className="text-primary underline"
                    >
                      View Document
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No supporting documents available.</p>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Notice:</h3>
            {applicationData.notice ? (
              <div>
                <span className="block text-primary">
                  {applicationData.notice}
                </span>
                <a
                  href={url + applicationData.notice}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleViewDocument(applicationData.notice)}
                  className="text-primary underline"
                >
                  View Notice
                </a>
              </div>
            ) : (
              <p>No notice available.</p>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Order:</h3>
            {applicationData.order ? (
              <div>
                <span className="block text-primary">
                  {applicationData.order}
                </span>
                <a
                  href={url + applicationData.order}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleViewDocument(applicationData.order)}
                  className="text-primary underline"
                >
                  View Order
                </a>
              </div>
            ) : (
              <p>No order available.</p>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Certificate:</h3>
            {applicationData.certificate ? (
              <div>
                <span className="block text-primary">
                  {applicationData.certificate}
                </span>
                <a
                  href={url + applicationData.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleViewDocument(applicationData.certificate)
                  }
                  className="text-primary underline"
                >
                  View Certificate
                </a>
              </div>
            ) : (
              <p>No certificate available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
