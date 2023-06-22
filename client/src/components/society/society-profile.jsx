import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/userContext";
import { url } from "../../assets/proxy";
import { toast } from "react-toastify";

export default function SocietyProfile() {
  const { userType, userData, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(url + "/societies/get-profile", {
          credentials: "include",
        });
        if (response.status === 401) {
          toast.error("Please login to see this page.");
          navigate("/signup");
        }
        const data = await response.json();
        updateUser("society", data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // Handle the error gracefully
        toast.error("Something went wrong!!! Please try again later.");
        setIsLoading(false);
      }
    }

    fetchUser();
    console.log(userType, userData);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className="max-w-md mx-auto bg-white mt-10 w-80 sm:w-2/3 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <img
                src={url + userData.society_logo}
                alt="Society Logo"
                className="h-16 w-16 rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{userData.society_name}</h1>
                <p className="text-gray-500">
                  {userData.name_of_officer} - {userData.designation}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">Address: </label>
                <input
                  type="text"
                  className="form-input border-none focus:outline-none"
                  value={userData.address}
                  readOnly
                />
              </div>
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">State: </label>
                <input
                  type="text"
                  className="form-input border-none focus:outline-none"
                  value={userData.state}
                  readOnly
                />
              </div>
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">District: </label>
                <input
                  type="text"
                  className="form-input border-none focus:outline-none"
                  value={userData.district}
                  readOnly
                />
              </div>
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">Society Type: </label>
                <input
                  type="text"
                  className="form-input border-none focus:outline-none"
                  value={userData.society_type}
                  readOnly
                />
              </div>
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">PAN Number: </label>
                <input
                  type="text"
                  className="form-input border-none focus:outline-none"
                  value={userData.pan_number}
                  readOnly
                />
              </div>
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">Email: </label>
                <input
                  type="email"
                  className="form-input border-none focus:outline-none"
                  value={userData.email}
                  readOnly
                />
              </div>
              <div className="form-group border-b mb-4 pb-2">
                <label className="font-semibold">Phone Number: </label>
                <input
                  type="tel"
                  className="form-input border-none focus:outline-none"
                  value={userData.phone_number.$numberDecimal}
                  readOnly
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
