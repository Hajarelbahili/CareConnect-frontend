import { apiSlice } from "../../store/apiSlice";

export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchDoctors: builder.query({
      query: ({
        department,
        speciality,
        username,
        active,
        page = 0,
        size = 4
      } = {}) => ({
        url: "/doctors/search",
        method: "GET",
        params: {
          department,
          speciality,
          username,
          active,
          page,
          size
        }
      })
    })
  })
});

export const { useSearchDoctorsQuery } = doctorApi;
