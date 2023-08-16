import apiSlice from "../apiSlice";

const examApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query({
      query: ({ accessToken, courseId }) => ({
        url: `/exam/get-exams/${courseId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      // providesTags: ["exams"],
    }),
    getAllExams: builder.query({
      query: ({ accessToken, courseId }) => ({
        url: `/exam/get-all-exams/${courseId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["exams"],
    }),
    getSingleExam: builder.query({
      query: ({ accessToken, examId }) => ({
        url: `/exam/${examId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      // providesTags: ["exam"],
    }),
    deleteExam: builder.mutation({
      query: ({ accessToken, examId }) => ({
        url: `/exam/delete-exam/${examId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      // After the deletion is successful, you might want to invalidate certain cache entries
      invalidatesTags: ["exams"],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useGetAllExamsQuery,
  useGetSingleExamQuery,
  useDeleteExamMutation,
} = examApi;
