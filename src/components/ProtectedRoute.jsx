// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     if (!localStorage.getItem("isLoggedIn")) {
//       navigate("/login");
//     }
//   }, [navigate]);
  
//   return localStorage.getItem("isLoggedIn") ? children : null;
// }

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // ❌ Not logged in
  if (!token) {
    // Save the intended destination
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in
  return children;
}
