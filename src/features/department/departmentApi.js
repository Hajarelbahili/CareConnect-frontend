import { apiSlice } from "../../store/apiSlice";

export const departmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // PAGINATION
    // =========================

    getDepartmentsSummary: builder.query({
      query: ({ page = 0, size = 5 } = {}) => ({
        url: "/departments/summary",
        method: "GET",
        params: {
          page,
          size
        }
      })
    }),

    // =========================
    // SEARCH
    // =========================

    searchDepartments: builder.query({
      query: ({ name, active } = {}) => ({
        url: "/departments/search",
        method: "GET",
        params: {
          name,
          active
        }
      })
    }),
    // =========================
    // GET DEPARTMENT BY ID
    // =========================

    getDepartmentById: builder.query({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "GET"
      })
    })
  })
});

export const {
  useGetDepartmentsSummaryQuery,
  useSearchDepartmentsQuery,
  useGetDepartmentByIdQuery
} = departmentApi;
