import { apiSlice } from "../../store/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials
      })
    })
  })
});

export const { useLoginMutation } = authApi;
