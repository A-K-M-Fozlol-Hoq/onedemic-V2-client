import apiSlice from "../apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/create-course`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
      invalidatesTags: ["coruses"],
    }),
    enrollCourse: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/enroll-course`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
      invalidatesTags: ["coruses"],
    }),
    getCourses: builder.query({
      query: ({ accessToken, email }) => ({
        url: `/course/courses/${email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["coruses"],
    }),
    getSingleCourse: builder.query({
      query: ({ accessToken, courseId }) => ({
        url: `/course/${courseId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["coruses"],
    }),
    removeStudent: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/remove-student`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useGetSingleCourseQuery,
  useEnrollCourseMutation,
  useRemoveStudentMutation,
} = courseApi;
