// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (credentials.username === "admin" && credentials.password === "admin123") {
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/");
//     } else {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             MINERVASUTRA
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Username: admin | Password: admin123
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           {error && <div className="text-red-500 text-center">{error}</div>}
//           <div>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Username"
//               value={credentials.username}
//               onChange={(e) => setCredentials({...credentials, username: e.target.value})}
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Password"
//               value={credentials.password}
//               onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//           >
//             Sign in
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hr-management-r6bh.vercel.app/api/auth/login",
        credentials
      );

      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Get the intended destination (if any)
      const redirectTo = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin"); // Clear it after use

      // Redirect to saved destination or default based on role
      if (redirectTo && redirectTo !== "/") {
        navigate(redirectTo);
      } else if (res.data.role === "admin") {
        navigate("/admin-route");
      } else if (res.data.role === "hr") {
        navigate("/dashboard");
      } else if (res.data.role === "employee") {
        navigate(`/employee-portal/${res.data.user.email}`);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold">
          MINERVASUTRA
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <button className="w-full py-2 bg-blue-600 text-white rounded">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
