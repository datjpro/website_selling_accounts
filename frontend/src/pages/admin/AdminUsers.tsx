import React, { useEffect, useMemo, useState } from "react";
import { Search, Shield, Crown, User } from "lucide-react";
import { adminService } from "../../services/adminService";
import type { User as UserType } from "../../services/authService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsers(await adminService.getUsers());
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    void loadUsers();
  }, []);

  const filteredUsers = useMemo(() => users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
  ), [users, searchQuery]);

  const getRoleIcon = (role: UserType["role"]) => {
    if (role === "admin") return Shield;
    if (role === "vip") return Crown;
    return User;
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
        <p className="text-gray-500 mt-1">Danh sách người dùng thật từ hệ thống, chế độ chỉ xem.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm theo tên, username hoặc email..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Người dùng</th>
                <th className="px-6 py-4 text-sm font-semibold">Vai trò</th>
                <th className="px-6 py-4 text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-4 text-sm font-semibold">Đơn hàng</th>
                <th className="px-6 py-4 text-sm font-semibold">Tổng chi tiêu</th>
                <th className="px-6 py-4 text-sm font-semibold">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4"><div className="font-bold text-gray-900">{user.fullName || user.username}</div><div className="text-xs text-gray-500">{user.email}</div></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"><RoleIcon size={14} /> {user.role}</span></td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.status}</span></td>
                    <td className="px-6 py-4">{user.totalOrders}</td>
                    <td className="px-6 py-4 font-semibold text-orange-600">{formatVnd(user.totalSpent)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
