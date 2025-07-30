import { useState } from "react";
import { Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthState } from "../redux/features/auth/authSlice";
import { loginUser } from "../redux/features/auth/authTrunk";
import Cookies from "js-cookie";
export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState(""); // Local state for validation errors

  const { user, error, loading: isLoading, success } = useSelector(
    (state) => state.auth
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    setValidationError("");
    if (error) {
      dispatch(resetAuthState()); // Clear Redux error on input change
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!credentials.email || !credentials.password) {
      setValidationError("Please fill in both email and password.");
      return;
    }
  
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      const { token } = result;
      
      console.log(" this is the relust ", result);
      
  
      // Decode token to get expiry time
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
  
      // JWT `exp` is in seconds since epoch
      const expiryDate = new Date(decodedPayload.exp * 1000);
  
      // Set cookie to expire at the same time as the token
      Cookies.set("auth_token", token, { expires: expiryDate });
  
      // Navigate to dashboard
      navigate("/dashboard");
  
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          MLT ETS Login
        </h2>

        {(error || validationError) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {validationError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};