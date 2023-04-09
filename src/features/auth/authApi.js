import { getUser } from "./authSlice";
import apiSlice from "../api/apiSlice";
// import { useSelector } from "react-redux";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user/createUser",
        body: data,
        // headers: {
        //   Authorization: `Bearer ${useSelector((state) => state.auth.user.accessToken)}`,
        // },
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = queryFulfilled;
          dispatch(getUser(data.email));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi;
