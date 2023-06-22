import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../assets/proxy";
import { toast } from "react-toastify";

const SocietiyApplicationDetails = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplicationData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        url + `/admin/get-application/${applicationId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 401) {
        toast.error("Please login to see this page.");
        navigate("/signup");
      }
      if (!response.ok) {
        toast.error("Something went wrong!, Please try again later.");
      }
      setApplicationData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchApplicationData();
  }, [applicationId]);

  const handleViewDocument = (documentUrl) => {
    // Open iframe popup or download the document
    // Implement the necessary logic based on your requirements
  };

  const [showAcceptForm, setShowAcceptForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleAccept = () => {
    setShowAcceptForm(true);
  };

  const handleReject = () => {
    setShowRejectForm(true);
  };

  const handleAcceptSubmit = async (event) => {
    // Handle accept form submission logic
    event.preventDefault();

    const certificateFile = event.target.elements.certificate.files[0];
    if (!certificateFile) {
      alert("Please select a certificate file.");
      return;
    }

    // Implement your logic to handle the submission of the certificate file

    const formData = new FormData();
    formData.append("certificate", certificateFile);

    try {
      const response = await fetch(
        url + `/admin/approve-application/${applicationId}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.status === 401) {
        toast.error("Please login to see this page.");
        navigate("/signup");
      }
      if (response.ok) {
        toast.success("Application Accepted Successfully!");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
      // Handle error
      // e.g., display an error message
    }

    // Reset the form and close the accept form
    event.target.reset();
    fetchApplicationData();
    setShowAcceptForm(false);
  };

  const handleRejectSubmit = async (event) => {
    // Handle reject form submission logic
    event.preventDefault();

    const orderFile = event.target.elements.order.files[0];
    const noticeFile = event.target.elements.notice.files[0];
    if (!orderFile && !noticeFile) {
      alert("Please select either an order file and a notice file.");
      return;
    }

    const formData = new FormData();
    formData.append("notice", noticeFile);
    formData.append("order", orderFile);

    try {
      const response = await fetch(
        url + `/admin/decline-application/${applicationId}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.status === 401) {
        toast.error("Please login to see this page.");
        navigate("/signup");
      }
      if (response.ok) {
        toast.success("Application Rejected Successfully!");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
      // Handle error
      // e.g., display an error message
    }

    // Implement your logic to handle the submission of the order and notice files

    // Reset the form and close the reject form
    event.target.reset();
    fetchApplicationData();
    setShowRejectForm(false);
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
            <h3 className="text-lg font-bold">Society Details:</h3>
            <div>
              <span className="block font-bold">Name: </span>
              <span>{applicationData.society_id.society_name}</span>
            </div>
            <div>
              <span className="block font-bold">Address: </span>
              <span>{applicationData.society_id.address}</span>
            </div>
            <div>
              <span className="block font-bold">Pincode: </span>
              <span>{applicationData.society_id.pincode.$numberDecimal}</span>
            </div>
            <div>
              <span className="block font-bold">State: </span>
              <span>{applicationData.society_id.state}</span>
            </div>
            <div>
              <span className="block font-bold">District: </span>
              <span>{applicationData.society_id.district}</span>
            </div>
            <div>
              <span className="block font-bold">Society Type: </span>
              <span>{applicationData.society_id.society_type}</span>
            </div>
            <div>
              <span className="block font-bold">Name of Officer: </span>
              <span>{applicationData.society_id.name_of_officer}</span>
            </div>
            <div>
              <span className="block font-bold">Designation: </span>
              <span>{applicationData.society_id.designation}</span>
            </div>
            <div>
              <span className="block font-bold">PAN Number: </span>
              <span>{applicationData.society_id.pan_number}</span>
            </div>
            <div>
              <span className="block font-bold">Email: </span>
              <span>{applicationData.society_id.email}</span>
            </div>
            <div>
              <span className="block font-bold">Phone Number: </span>
              <span>
                {applicationData.society_id.phone_number.$numberDecimal}
              </span>
            </div>
          </div>
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
          {!applicationData.is_approved && (
            <div className="flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          )}
          {showAcceptForm && (
            <form
              className="w-full max-w-md p-4 rounded-lg bg-white shadow-lg mt-4"
              onSubmit={handleAcceptSubmit}
            >
              {/* Accept form fields */}
              <h3 className="text-lg font-bold mb-2">Accept Application</h3>
              <div className="flex items-center mb-2">
                <label
                  htmlFor="certificate"
                  className="w-1/4 font-medium text-gray-700"
                >
                  Certificate:
                </label>
                <input
                  type="file"
                  id="certificate"
                  name="certificate"
                  accept=".pdf,.doc,.docx"
                  className="w-3/4 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAcceptForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {showRejectForm && (
            <form
              className="w-full max-w-md p-4 rounded-lg bg-white shadow-lg mt-4"
              onSubmit={handleRejectSubmit}
            >
              {/* Reject form fields */}
              <h3 className="text-lg font-bold mb-2">Reject Application</h3>
              <div className="flex items-center mb-2">
                <label
                  htmlFor="order"
                  className="w-1/4 font-medium text-gray-700"
                >
                  Order:
                </label>
                <input
                  type="file"
                  id="order"
                  name="order"
                  accept=".pdf,.doc,.docx"
                  className="w-3/4 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex items-center mb-2">
                <label
                  htmlFor="notice"
                  className="w-1/4 font-medium text-gray-700"
                >
                  Notice:
                </label>
                <input
                  type="file"
                  id="notice"
                  name="notice"
                  accept=".pdf,.doc,.docx"
                  className="w-3/4 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SocietiyApplicationDetails;
