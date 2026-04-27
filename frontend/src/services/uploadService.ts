import apiClient from "./api";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/api\/?$/, "");

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post("/uploads/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const relativeUrl = response.data.data.url as string;
    if (relativeUrl.startsWith("http")) {
      return relativeUrl;
    }

    return `${API_BASE_URL}${relativeUrl}`;
  },
};
