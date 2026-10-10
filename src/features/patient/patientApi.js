import { apiSlice } from "../../store/apiSlice";

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/patients/create",
        method: "POST",
        data
      })
    })
  })
});

export const { useRegisterMutation } = patientApi;
