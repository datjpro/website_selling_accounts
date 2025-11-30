import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DepositPage from "./pages/DepositPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/deposit" element={<DepositPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
