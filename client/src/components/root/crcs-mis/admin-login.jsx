import React, { useContext, useState } from "react";
import { url } from "../../../assets/proxy";
import { toast } from "react-toastify";
import { UserContext } from "../../../store/userContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userType, userData, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const validationErrors = {};
    if (email.trim() === "") {
      validationErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      validationErrors.password = "Password is required";
    }

    // Set the validation errors
    setErrors(validationErrors);

    // If there are no errors, proceed with login logic
    if (Object.keys(validationErrors).length === 0) {
      // Perform the login logic here
      const payload = {
        email,
        password,
      };

      // Set loading state to true
      setIsLoading(true);
      const response = await fetch(url + "/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      if (data.errors && !data.success) {
        setErrors(data.errors);
      } else if (data.success) {
        setEmail("");
        setPassword("");
        updateUser("admin", data.admin);
        toast.success("Login successful!");
        navigate("/admin");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-md">
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-smuserContext mt-1">
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
