//internal imports
import { getUser } from "./authSlice";
import apiSlice from "../api/apiSlice";

//create authApi -module scaffolding
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ accessToken, ...data }) => ({
        method: "POST",
        url: "/user/createUser",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

//exports properties of authApi
export const { useRegisterMutation } = authApi;
