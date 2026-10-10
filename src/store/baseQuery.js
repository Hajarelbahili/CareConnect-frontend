import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api"
});

const baseQuery =
  () =>
  async ({ url, method, data, params }, api) => {
    console.log("🔥 RTK QUERY URL:", url);
    console.log("🔥 METHOD:", method);
    console.log("🔥 DATA:", data);

    try {
      const token = api.getState().auth?.token;

      const headers =
        url === "/auth/login" || !token
          ? {
              "Content-Type": "application/json"
            }
          : {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            };

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers
      });

      return {
        data: result.data
      };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data
        }
      };
    }
  };

export default baseQuery;
