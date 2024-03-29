import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { createUser, googleLogin } from "../../../features/auth/authSlice";
import { notify } from "@/helpers/utilsFuctions";

const SignupUI = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { isError, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isError && error) {
      notify(error, "error");
    }
  }, [isError, error]);

  const onSubmit = (data) => {
    // console.log(data);

    dispatch(createUser({ email: data.email, password: data.password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };
  return (
    <div className="block md:flex h-screen items-center justify-center pt-14">
      <div className="w-1/2 items-center hidden md:flex justify-end">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-6xl font-black">
            Welcome to
          </h2>
          {"\n"}
          <h2 className="texxt-2xl sm:text-3xl md:text-9xl font-black">
            OneDemic
          </h2>
        </div>
      </div>
      <div className="w-full md:w-1/2 grid place-items-center">
        <div className="backdrop-blur-sm bg-white/30 rounded-lg grid place-items-center py-10 px-12 drop-shadow-lg">
          <h1 className="hidden md:block mb-10 font-medium text-2xl">Signup</h1>
          <h1 className="block md:hidden  text-2xl">Create new account</h1>
          <h1 className="block md:hidden mb-10 font-bold text-4xl">
            @OneDemic
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="confirm-password" className="ml-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>
              <div className="!mt-8 ">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-lg w-full bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    // onClick={() => navigate('/login' )}
                    onClick={() => push("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="bg-slate-100 border flex justify-center text-2xl px-4 py-3 rounded-lg bg-primary w-full mt-4"
          >
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupUI;
