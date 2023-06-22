import React from "react";

const Profile = () => {
  const profileImageURL =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Replace with the URL of your desired profile image

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-0 md:min-h-screen bg-gray-100">
      <div className="bg-white w-80 sm:w-96 rounded-lg shadow-lg p-6 mt-4 sm:mt-0">
        <div className="flex justify-center mb-4">
          <img
            src={profileImageURL}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-800 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your name"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-800 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
