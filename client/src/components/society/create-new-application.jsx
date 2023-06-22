import React, { useState } from "react";
import { url } from "../../assets/proxy";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNewApplication = () => {
  const [applicationType, setApplicationType] = useState("");
  const [applicationTitle, setApplicationTitle] = useState("");
  const [applicationDesc, setApplicationDesc] = useState("");
  const [supportingDocs, setSupportingDocs] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const validationErrors = {};
    if (!applicationType) {
      validationErrors.applicationType = "Application type is required";
    }
    if (!applicationTitle) {
      validationErrors.applicationTitle = "Application title is required";
    }
    if (!applicationDesc) {
      validationErrors.applicationDesc = "Application description is required";
    }
    if (supportingDocs.length === 0) {
      validationErrors.supportingDocs =
        "Please upload at least one supporting document";
    }

    // If there are validation errors, update the state and stop form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true); // Set loading state to true

    // Construct the form data
    const formData = new FormData();
    formData.append("application_type", applicationType);
    formData.append("application_title", applicationTitle);
    formData.append("application_desc", applicationDesc);
    supportingDocs.forEach((file) => {
      formData.append("supporting_docs", file);
    });

    try {
      const response = await fetch(url + "/societies/create-application", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.status === 401) {
        toast.error("Please login to see this page.");
        navigate("/signup");
      }
      if (!response.ok) {
        toast.error("Something went wrong!, Please Try Again.");
      }
      // Process the response...
      const data = await response.json();
      if (data.success) {
        toast.success("Application Created Successfully!");
        navigate("/society/applications");
      }
    } catch (error) {
      // Handle error...
      toast.error("Something went wrong!, Please Try Again.");
    } finally {
      setIsLoading(false); // Set loading state back to false after submission
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSupportingDocs(files.slice(0, 5)); // Limit to maximum 5 files
  };

  const removeFile = (file) => {
    const updatedFiles = supportingDocs.filter((f) => f !== file);
    setSupportingDocs(updatedFiles);
  };
  const trimFileName = (fileName) => {
    const maxLength = 20;
    if (fileName.length <= maxLength) {
      return fileName;
    }
    const trimmedName = fileName.substring(0, maxLength - 3) + "...";
    return trimmedName;
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-0 mt-10 md:mt-0 md:min-h-screen bg-gray-100">
      <div className="bg-white w-full sm:max-w-md rounded-lg shadow-lg p-6 mt-4 sm:mt-0">
        <h2 className="text-2xl font-bold mb-4">Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="applicationType"
              className="text-gray-800 font-semibold"
            >
              Application Type
            </label>
            <select
              id="applicationType"
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.applicationType ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Application Type</option>
              <option value="New Registration">New Registration</option>
              <option value="Re-Submission of New Registration">
                Re-Submission of New Registration
              </option>
              <option value="Deemed">Deemed</option>
              <option value="Amendments">Amendments</option>
              <option value="Conversion">Conversion</option>
              <option value="Reconsideration of New Amendments">
                Reconsideration of New Amendments
              </option>
            </select>
            {errors.applicationType && (
              <p className="text-red-500">{errors.applicationType}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="applicationTitle"
              className="text-gray-800 font-semibold"
            >
              Application Title
            </label>
            <input
              type="text"
              id="applicationTitle"
              value={applicationTitle}
              onChange={(e) => setApplicationTitle(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.applicationTitle ? "border-red-500" : ""
              }`}
              placeholder="Enter application title"
            />
            {errors.applicationTitle && (
              <p className="text-red-500">{errors.applicationTitle}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="applicationDesc"
              className="text-gray-800 font-semibold"
            >
              Application Description
            </label>
            <textarea
              id="applicationDesc"
              value={applicationDesc}
              onChange={(e) => setApplicationDesc(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.applicationDesc ? "border-red-500" : ""
              }`}
              placeholder="Enter application description"
              rows={4}
            />
            {errors.applicationDesc && (
              <p className="text-red-500">{errors.applicationDesc}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="supportingDocs"
              className="text-gray-800 font-semibold"
            >
              Supporting Documents (Max 5)
            </label>
            <input
              type="file"
              id="supportingDocs"
              onChange={handleFileChange}
              className={`w-full py-2 ${
                errors.supportingDocs ? "border-red-500" : "border-gray-300"
              }`}
              multiple
            />
            {errors.supportingDocs && (
              <p className="text-red-500">{errors.supportingDocs}</p>
            )}
          </div>
          {supportingDocs.length > 0 && (
            <div className="mb-4">
              <label className="text-gray-800 font-semibold">
                Selected Files
              </label>
              <div className="mt-2">
                {supportingDocs.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between py-2 border-b border-gray-300"
                  >
                    <span>{trimFileName(file.name)}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-2 px-4 hover:bg-secondary"
            disabled={isLoading} // Disable the submit button when loading
          >
            {isLoading ? "Submitting..." : "Submit"}{" "}
            {/* Update the button text based on the loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewApplication;
