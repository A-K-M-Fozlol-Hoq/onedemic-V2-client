import { notify } from "@/helpers/utilsFuctions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, loginUser } from "../../../features/auth/authSlice";

const LoginUI = () => {
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
  }, [isLoading, email, push]);

  useEffect(() => {
    if (isError && error) {
      notify(error, "error");
    }
  }, [isError, error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/2 grid place-items-center">
        <div className="backdrop-blur-md bg-white/30 rounded-lg grid place-items-center p-11">
          <h1 className="mb-10 text-xl text-white font-semibold">
            Login to your account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-1 text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-1 text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>
              <div className="relative !mt-8">
                <button
                  type="submit"
                  className="font-bold py-3 px-4 bg-slate-50 rounded-lg w-full text-gray-800"
                >
                  Login
                </button>
              </div>
              <div className="text-white">
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
            className="bg-slate-100 border flex justify-center text-xl px-4 py-3 rounded-lg bg-primary w-full mt-4"
          >
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
