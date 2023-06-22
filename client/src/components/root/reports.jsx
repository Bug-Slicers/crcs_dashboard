import React, { useEffect, useState } from "react";
import { url } from "../../assets/proxy";

const Reports = () => {
  const [societies, setSocieties] = useState([]);
  const [filteredSocieties, setFilteredSocieties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchState, setSearchState] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url + "/societies/registered-societies", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setSocieties(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError("Failed to fetch registered societies.");
      }
    };

    fetchSocieties();
  }, []);

  useEffect(() => {
    filterSocieties();
  }, [searchState, searchDistrict, searchName, societies]);

  const filterSocieties = () => {
    let filtered = [...societies];

    if (searchState) {
      filtered = filtered.filter((society) =>
        society.state.toLowerCase().includes(searchState.toLowerCase())
      );
    }

    if (searchDistrict) {
      filtered = filtered.filter((society) =>
        society.district.toLowerCase().includes(searchDistrict.toLowerCase())
      );
    }

    if (searchName) {
      filtered = filtered.filter((society) =>
        society.society_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredSocieties(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterSocieties();
  };

  if (isLoading) {
    return <p>Loading registered societies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-4 rounded-lg bg-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Registered Societies</h2>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/3 px-2 mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                Search by State:
              </label>
              <input
                type="text"
                id="state"
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                Search by District:
              </label>
              <input
                type="text"
                id="district"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Search by Society Name:
              </label>
              <input
                type="text"
                id="name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-full px-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-primary rounded"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {filteredSocieties.length > 0 ? (
          <ul>
            {filteredSocieties.map((society) => (
              <li key={society._id} className="mb-4">
                <h3 className="text-lg font-bold">
                  {society.society_type}: {society.society_name}
                </h3>
                <p className="mb-2">
                  District: {society.district}, State: {society.state}
                </p>
                <a
                  href={url + society.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Download Certificate
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No registered societies found.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
