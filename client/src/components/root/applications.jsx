import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { url } from "../../assets/proxy";

const Applications = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [applicationTypeFilter, setApplicationTypeFilter] = useState("");
  const [approvalStatusFilter, setApprovalStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url + "/applications/get-all-applications", {
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Something went wrong!!!, Please try again later.");
      }
      const data = await response.json();
      console.log(data);
      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong!!!, Please try again later.");
      setIsLoading(false);
    }
  };

  // Filter and search application data
  const filteredData = data.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isMatch =
      item.application_title.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.application_desc.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.society_id.society_name.toLowerCase().includes(lowerCaseSearchTerm);
    return isMatch;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApplicationTypeFilter = (e) => {
    setApplicationTypeFilter(e.target.value);
  };

  const handleApprovalStatusFilter = (e) => {
    setApprovalStatusFilter(e.target.value);
  };

  const filteredAndSortedData = filteredData.sort((a, b) =>
    a.date_of_application.localeCompare(b.date_of_application)
  );

  const filteredDataWithFilters = filteredAndSortedData.filter((item) => {
    if (
      applicationTypeFilter &&
      item.application_type !== applicationTypeFilter
    ) {
      return false;
    }
    if (
      approvalStatusFilter &&
      item.is_approved !== (approvalStatusFilter === "Approved")
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="font-poppins flex flex-col items-center justify-center px-6 md:px-0 mt-10 md:min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-screen-lg rounded-lg shadow-lg p-6 mt-4 sm:mt-0">
        <h2 className="text-2xl font-bold mb-4">Society Applications</h2>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="ml-2 bg-white border border-gray-300 rounded-md py-2 px-4"
            value={applicationTypeFilter}
            onChange={handleApplicationTypeFilter}
          >
            <option value="">All Applications</option>
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
          <select
            className="ml-2 bg-white border border-gray-300 rounded-md py-2 px-4"
            value={approvalStatusFilter}
            onChange={handleApprovalStatusFilter}
          >
            <option value="">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            {filteredDataWithFilters.length === 0 ? (
              <p>No records found.</p>
            ) : (
              <table className="w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Society Name</th>
                    <th className="border px-4 py-2">Application Type</th>
                    <th className="border px-4 py-2">Application Title</th>
                    <th className="border px-4 py-2">
                      Application Description
                    </th>
                    <th className="border px-4 py-2">Approved Status</th>
                    <th className="border px-4 py-2">Date of Application</th>
                    <th className="border px-4 py-2">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataWithFilters.map((item) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">
                        {item.society_id.society_name}
                      </td>
                      <td className="border px-4 py-2">
                        {item.application_type}
                      </td>
                      <td className="border px-4 py-2">
                        {item.application_title}
                      </td>
                      <td className="border px-4 py-2">
                        {item.application_desc}
                      </td>
                      <td className="border px-4 py-2">
                        {item.is_approved ? "Approved" : "Pending"}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(
                          item.date_of_application
                        ).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {item.certificate ? (
                          <div>
                            <a
                              href={url + item.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                handleViewDocument(item.certificate)
                              }
                              className="text-primary underline"
                            >
                              View Certificate
                            </a>
                          </div>
                        ) : (
                          <p>No certificate available.</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
