import React from "react";
import { FEATURED_ACCOUNTS } from "../constants";
import { ArrowRight } from "lucide-react";

const FeaturedAccounts: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tài khoản Nổi bật
            </h2>
            <p className="text-gray-500">
              Các tài khoản được săn đón nhiều nhất tuần qua
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ACCOUNTS.map((account) => (
            <div
              key={account.id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={account.image}
                  alt={account.gameTitle}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {account.badge && (
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-lg shadow-lg backdrop-blur-sm ${
                      account.badge === "Hot"
                        ? "bg-gradient-to-r from-orange-500 to-red-500"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }`}
                  >
                    🔥 {account.badge}
                  </span>
                )}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                  <span className="text-xs text-white font-semibold">
                    ⭐ 4.8
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {account.gameTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {account.description}
                </p>
                <div className="mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">
                        Giá bán
                      </span>
                      <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {account.price}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-semibold">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                    Xem Chi Tiết →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <a
            href="#"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAccounts;
