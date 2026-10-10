import { apiSlice } from "../../store/apiSlice";

export const availabilityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // SEARCH AVAILABILITY
    // =========================

    searchAvailability: builder.query({
      query: ({ doctorId, date }) => ({
        url: `/availabilities/doctor/${doctorId}`,
        method: "GET",
        params: {
          date
        }
      })
    })
  })
});

export const { useSearchAvailabilityQuery } = availabilityApi;
