/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import loginImage from '../assets/login.svg';
import { googleLogin, loginUser } from "../../features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/firebase.config";
import jwt_decode from "jwt-decode";
// const refreshToken = localStorage.getItem('refreshToken');

const Login = () => {
  const { isLoading, email, isError, error } = useSelector(
    (state) => state.auth
  );
  const { register, handleSubmit, reset } = useForm();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (!isLoading && email) {
      push("/");
    }
  }, [isLoading, email]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // notify();
      console.log(user);
      const accessToken = user.accessToken;

      const currentTime = Math.floor(Date.now() / 1000);

      // if (tokenExpiration - currentTime < 600) {
      //   // if remaining time is less than 10 minutes
      //   const refreshToken = localStorage.getItem("refresh_token");
      //   const response = await axios.post(
      //     "https://your-api.com/refresh_token",
      //     {
      //       refresh_token: refreshToken,
      //     }
      //   );

      //   const newAccessToken = response.data.access_token;
      //   localStorage.setItem("access_token", newAccessToken);
      //   //   const expirationTime = jwt_decode(accessToken).exp * 1000;
      //   // const currentTime = new Date().getTime();
      //   // // const refreshToken = localStorage.getItem('refreshToken');
      //   // const newAccessToken = await auth.currentUser.getIdToken(true);
      //   // console.log({ accessToken, newAccessToken });
      // }
    });
  }, []);

  useEffect(() => {
    if (isError && error) {
      //   toast.error(error);
    }
  }, [isError, error]);

  return (
    <div className="flex h-screen items-center">
      <div className="w-1/2">
        <img src={""} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input type="email" {...register("email")} id="email" />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="relative !mt-8">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full text-black"
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don&apos;t have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => push("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="font-bold text-white py-3 rounded-full bg-primary w-full text-black"
          >
            Login with GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;