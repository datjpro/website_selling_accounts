import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Gamepad2,
  LogOut,
  Package,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                <Gamepad2 size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900 leading-none">
                  ShopAcc
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Mua bán tài khoản #1
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive("/products")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Sản phẩm
            </Link>
            <Link
              to="/promotions"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive("/promotions")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Khuyến mãi
            </Link>
            <Link
              to="/deposit"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive("/deposit")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Nạp tiền
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Liên hệ
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Tìm kiếm game..."
                className="w-56 bg-gray-50 text-gray-700 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-gray-200 transition-all"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {user.username}
                  </span>
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.fullName || user.username}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/user/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-3" />
                      Tài khoản của tôi
                    </Link>
                    <Link
                      to="/user/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Package size={16} className="mr-3" />
                      Đơn hàng
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-purple-600 hover:bg-purple-50"
                      >
                        <Gamepad2 size={16} className="mr-3" />
                        Admin Panel
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* Mobile User Button */}
            <button
              onClick={() => navigate("/login")}
              className="sm:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive("/products")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Sản phẩm
            </Link>
            <Link
              to="/promotions"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive("/promotions")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Khuyến mãi
            </Link>
            <Link
              to="/deposit"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive("/deposit")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Nạp tiền
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Liên hệ
            </Link>

            {/* Mobile Search */}
            <div className="pt-3 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm game..."
                  className="w-full bg-gray-50 text-gray-700 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                />
                <Search className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
