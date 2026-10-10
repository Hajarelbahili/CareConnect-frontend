import { apiSlice } from "../../store/apiSlice";

export const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Créer un rendez-vous
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments/create",
        method: "POST",
        data: appointmentData
      }),
      invalidatesTags: ["PatientAppointments"]
    }),

    // Historique des rendez-vous du patient
    getPatientAppointments: builder.query({
      query: () => ({
        url: "/patients/historique",
        method: "GET"
      }),
      providesTags: ["PatientAppointments"]
    })
  })
});

export const { useCreateAppointmentMutation, useGetPatientAppointmentsQuery } =
  appointmentApi;
