// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { EmployeeProvider } from './context/EmployeeContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <EmployeeProvider>
//       <App />
//     </EmployeeProvider>
//   </StrictMode>,
// )



import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </React.StrictMode>
);
