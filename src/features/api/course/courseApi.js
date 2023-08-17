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
    handlePendingStudent: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/approve-or-reject-pending-students`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    removeStudent: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/remove-student`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    blockStudent: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/block-student`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    unblockStudent: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/unblock-student`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    unblockAndAddStudent: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/course/unblock-and-add-student`,
        method: "PUT",
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
  useHandlePendingStudentMutation,
  useRemoveStudentMutation,
  useBlockStudentMutation,
  useUnblockStudentMutation,
  useUnblockAndAddStudentMutation,
} = courseApi;
