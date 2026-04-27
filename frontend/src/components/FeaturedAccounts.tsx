import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productService, type Product } from "../services/productService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

const getSectionLabel = (account: Product): string => {
  return account.category?.name || account.gameTitle || "Khác";
};

const FeaturedAccounts: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      try {
        const data = await productService.getFeaturedProducts(8);
        setAccounts(data);
      } catch (error) {
        console.error("Failed to load featured accounts", error);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    void loadFeatured();
  }, []);

  const groupedAccounts = useMemo(() => {
    const sections = new Map<
      string,
      {
        title: string;
        slug?: string;
        items: Product[];
      }
    >();

    accounts.forEach((account) => {
      const sectionLabel = getSectionLabel(account);
      const existingSection = sections.get(sectionLabel);

      if (existingSection) {
        existingSection.items.push(account);
        return;
      }

      sections.set(sectionLabel, {
        title: sectionLabel,
        slug: account.category?.slug,
        items: [account],
      });
    });

    return Array.from(sections.values());
  }, [accounts]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tài kho?n n?i b?t theo game</h2>
            <p className="text-gray-500">M?i nhóm game có m?t khu riêng, không hi?n th? l?n acc khác lo?i.</p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            Xem t?t c? <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : groupedAccounts.length > 0 ? (
          <div className="space-y-10">
            {groupedAccounts.map((section) => (
              <div key={section.title} className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Các tài kho?n n?i b?t thu?c riêng game này.</p>
                  </div>
                  {section.slug && (
                    <button
                      onClick={() => navigate(`/products?category=${encodeURIComponent(section.slug!)}`)}
                      className="hidden md:inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                    >
                      Xem game này <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.items.map((account) => (
                    <div
                      key={account.id}
                      className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                      onClick={() => navigate(`/product/${account.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {account.images.length > 0 ? (
                          <img
                            src={
                              account.images.find((image) => image.isPrimary)?.imageUrl ||
                              account.images[0].imageUrl
                            }
                            alt={account.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Không có ?nh
                          </div>
                        )}

                        {account.badge && (
                          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-lg shadow-lg backdrop-blur-sm bg-gradient-to-r from-orange-500 to-red-500">
                            ?? {account.badge}
                          </span>
                        )}

                        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                          <span className="text-xs text-white font-semibold">
                            ? {account.ratingAverage.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {account.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{account.description}</p>

                        <div className="mt-auto">
                          <div className="flex items-baseline justify-between mb-4">
                            <div>
                              <span className="text-xs text-gray-500 block mb-1">Giá bán</span>
                              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                {formatVnd(account.price)}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-green-600 font-semibold">? Verified</span>
                            </div>
                          </div>

                          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                            Xem Chi Ti?t ?
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">Chua có s?n ph?m n?i b?t.</div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            Xem t?t c? <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAccounts;

