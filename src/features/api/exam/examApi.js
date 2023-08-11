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
      providesTags: ["exam"],
    }),
  }),
});

export const { useGetExamsQuery, useGetSingleExamQuery } = examApi;
