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
  }),
});

export const { useAddCourseMutation, useGetCoursesQuery } = courseApi;
