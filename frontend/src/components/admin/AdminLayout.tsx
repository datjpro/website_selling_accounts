import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Gamepad2,
  Tag,
  BarChart3,
} from "lucide-react";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: ShoppingBag, label: "Sản phẩm", path: "/admin/products" },
    { icon: ShoppingCart, label: "Đơn hàng", path: "/admin/orders" },
    { icon: Users, label: "Người dùng", path: "/admin/users" },
    { icon: Tag, label: "Khuyến mãi", path: "/admin/promotions" },
    { icon: BarChart3, label: "Thống kê", path: "/admin/analytics" },
    { icon: Settings, label: "Cài đặt", path: "/admin/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-xl flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Gamepad2 size={24} className="text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ShopAcc
                </span>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "lg:ml-64" : ""} transition-all`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="ml-2 bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={24} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">admin@shopacc.com</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Users size={18} className="mr-3" />
                      Hồ sơ
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings size={18} className="mr-3" />
                      Cài đặt
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} className="mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
