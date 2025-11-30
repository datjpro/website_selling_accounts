import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DepositPage from "./pages/DepositPage";
import PromotionsPage from "./pages/PromotionsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
