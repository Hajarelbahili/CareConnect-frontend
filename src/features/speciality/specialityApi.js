import { apiSlice } from "../../store/apiSlice";

export const specialityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchSpecialities: builder.query({
      query: ({ departmentId, active = true } = {}) => ({
        url: "/specialities/search",
        method: "GET",
        params: {
          departmentId,
          active
        }
      })
    })
  })
});

export const { useSearchSpecialitiesQuery } = specialityApi;
