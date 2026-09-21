import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api"
});

const baseQuery =
  () =>
  async ({ url, method, data, params }, api) => {
    console.log("🔥 RTK QUERY URL:", url);
    console.log("🔥 METHOD:", method);
    try {
      const token = api.getState().auth?.token;

      const headers =
        url === "/auth/login" || !token
          ? {}
          : {
              Authorization: `Bearer ${token}`
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
