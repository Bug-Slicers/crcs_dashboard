import React, { useContext, useState } from "react";
import { stateOptions } from "../../../assets/stateData";
import { societyTypes } from "../../../assets/societyTypes";
import { url } from "../../../assets/proxy";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../store/userContext";

const SocietiesRegistration = () => {
  const [societyName, setSocietyName] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [societyType, setSocietyType] = useState("");
  const [nameOfOfficer, setNameOfOfficer] = useState("");
  const [designation, setDesignation] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [societyLogo, setSocietyLogo] = useState(null);
  const { userType, userData, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    // Validate society name
    if (!societyName.trim()) {
      errors.societyName = "Please enter a name for the society";
    }

    // Validate address
    if (!address.trim()) {
      errors.address = "Please enter a valid address";
    }

    // Validate pin code
    if (!pinCode.trim()) {
      errors.pinCode = "Please enter a valid pin code";
    }

    // Validate state
    if (!state.trim()) {
      errors.state = "Please select a state";
    }

    // Validate district
    if (!district.trim()) {
      errors.district = "Please select a district";
    }

    // Validate society type
    if (!societyType.trim()) {
      errors.societyType = "Please select a society type";
    }

    // Validate name of officer
    if (!nameOfOfficer.trim()) {
      errors.nameOfOfficer = "Please enter the name of the officer";
    }

    // Validate designation
    if (!designation.trim()) {
      errors.designation = "Please enter a designation";
    }

    // Validate PAN number
    const panRegex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
    if (!panRegex.test(panNumber.trim())) {
      errors.panNumber = "Please enter a valid PAN number";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email";
    }

    // Validate phone number
    const phoneRegex = /^([0-9]){10}?$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    // Validate password
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Validate Society Logo
    if (!societyLogo) {
      errors.soceityLogo = "Please add logo of society.";
      isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("society_logo", societyLogo);
    formData.append("society_name", societyName);
    formData.append("address", address);
    formData.append("pincode", pinCode);
    formData.append("state", state);
    formData.append("district", district);
    formData.append("designation", designation);
    formData.append("name_of_officer", nameOfOfficer);
    formData.append("society_type", societyType);
    formData.append("pan_number", panNumber);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("password", password);

    const response = await fetch(url + "/societies/signup", {
      method: "POST",
      headers: {
        credentials: "include",
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (data.errors && !data.success) {
      let serverErrors = {};
      if (data.errors.email) {
        serverErrors.email = data.errors.email;
      }
      if (data.errors.pan_number) {
        serverErrors.panNumber = data.errors.pan_number;
      }
      if (data.errors.phone_number) {
        serverErrors.phoneNumber = data.errors.phone_number;
      }
      setErrors(serverErrors);
    } else if (!response.ok) {
      toast.error("Something went wrong!!!");
      setIsLoading(false);
    } else if (data.success) {
      // Reset form state
      setSocietyName("");
      setAddress("");
      setPinCode("");
      setState("");
      setDistrict("");
      setSocietyType("");
      setNameOfOfficer("");
      setDesignation("");
      setPanNumber("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      setIsLoading(false);
      updateUser("society", data.society);
      toast.success("Registration successful!");
      navigate("/society");
    }

    // Show success message or redirect to another page
    // alert("Registration successful!");
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Societies Registration</h2>
      <form
        className="space-y-4 bg-gray-100 p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="societyName">
            Society Name
          </label>
          <input
            type="text"
            id="societyName"
            value={societyName}
            onChange={(e) => setSocietyName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.societyName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.societyName && (
            <p className="text-red-500">{errors.societyName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="image">
            Society Logo
          </label>
          <input
            type="file"
            id="societyLogo"
            onChange={(e) => setSocietyLogo(e.target.files[0])}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.societyLogo ? "border-red-500" : "border-gray-300"
            }`}
            required // Add 'required' attribute to make it a required field
          />
          {errors.societyLogo && (
            <p className="text-red-500">{errors.societyLogo}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="pinCode">
            Pin Code
          </label>
          <input
            type="text"
            id="pinCode"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.pinCode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pinCode && <p className="text-red-500">{errors.pinCode}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="state">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select State</option>
            {stateOptions.map((stateOption, index) => (
              <option key={index} value={stateOption.name}>
                {stateOption.name}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="district">
            District
          </label>
          <select
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.district ? "border-red-500" : "border-gray-300"
            }`}
            disabled={!state}
          >
            <option value="">Select District</option>
            {stateOptions
              .find((stateOption) => stateOption.name === state)
              ?.districts.map((districtOption, index) => (
                <option key={index} value={districtOption}>
                  {districtOption}
                </option>
              ))}
          </select>
          {errors.district && <p className="text-red-500">{errors.district}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="societyType">
            Society Type
          </label>
          <select
            id="societyType"
            value={societyType}
            onChange={(e) => setSocietyType(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.societyType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Society Type</option>
            {societyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.societyType && (
            <p className="text-red-500">{errors.societyType}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="nameOfOfficer">
            Name of Authorized Officer
          </label>
          <input
            type="text"
            id="nameOfOfficer"
            value={nameOfOfficer}
            onChange={(e) => setNameOfOfficer(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.nameOfOfficer ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nameOfOfficer && (
            <p className="text-red-500">{errors.nameOfOfficer}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="designation">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.designation ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.designation && (
            <p className="text-red-500">{errors.designation}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="panNumber">
            PAN Number
          </label>
          <input
            type="text"
            id="panNumber"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.panNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.panNumber && (
            <p className="text-red-500">{errors.panNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SocietiesRegistration;
