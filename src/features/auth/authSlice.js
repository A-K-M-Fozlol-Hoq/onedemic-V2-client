//external imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

//internal imports
import auth from "../../firebase/firebase.config";

const initialState = {
  user: {
    name: "",
    email: "",
    role: "",
    status: "",
    profile: "",
    uid: "",
    stripeCustomerID: "",
    selectedPlan: "",
    endDate: "",
    usedCreditToday: 0,
    accessToken: "",
    uid: "",
    _id: "",
  },
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }, thunkAPI) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ accessToken, email }) => {
    const res = await fetch(
      `${" https://onedemic-server.vercel.app/api/v1"}/user/getUser/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const data = await res.json();

    if (data?.isSuccess && data?.user) {
      return data.user;
    } else {
      return email;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  await signOut(auth);
});

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data?.user?.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user.email = payload.email;
      state.user.accessToken = payload.accessToken;
      state.user.uid = payload.uid;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    setUserDetails: (state, { payload }) => {
      state.user.accessToken = payload.accessToken;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.role = payload.role;
      state.user.status = payload.status;
      state.user.profile = payload.profile;
      state.user.uid = payload.uid;
      state.user.stripeCustomerID = payload.stripeCustomerID;
      state.user.selectedPlan = payload.selectedPlan;
      state.user.endDate = payload.endDate;
      state.user._id = payload._id;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload._id) {
          state.user.name = payload.name;
          state.user.role = payload.role;
          state.user.status = payload.status;
          state.user.profile = payload.profile;
          state.user.uid = payload.uid;
          state.user.stripeCustomerID = payload.stripeCustomerID;
          state.user.selectedPlan = payload.selectedPlan;
          state.user.endDate = payload.endDate;
          state.user._id = payload._id;
        } else {
          state.user.email = payload;
        }
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {
          name: "",
          email: "",
          role: "",
          status: "",
          profile: "",
          uid: "",
          stripeCustomerID: "",
          selectedPlan: "",
          endDate: "",
          usedCreditToday: 0,
          accessToken: "",
          uid: "",
          _id: "",
        };
        state.isError = false;
        state.error = "";
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.user = {
          name: "",
          email: "",
          role: "",
          status: "",
          profile: "",
          uid: "",
          stripeCustomerID: "",
          selectedPlan: "",
          endDate: "",
          usedCreditToday: 0,
          accessToken: "",
          uid: "",
          _id: "",
        };
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

export const { setUser, toggleLoading, setUserDetails } = authSlice.actions;
