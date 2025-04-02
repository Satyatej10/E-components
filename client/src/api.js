import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/components";

export const fetchComponents = async (searchQuery = "") => {
  try {
    const url = searchQuery
      ? `${API_BASE_URL}?name=${encodeURIComponent(searchQuery)}`
      : API_BASE_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching components:", error);
    return [];
  }
};
