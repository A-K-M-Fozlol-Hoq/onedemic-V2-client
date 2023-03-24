// import Login from '@/conponents/authentication/login';
// import Signup from "@/conponents/authentication/Signup";
import Head from "next/head";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { getUser, toggleLoading } from "../features/auth/authSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  // const {} = useSelector((state) => state.auth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user, "this is the user");
      if (user) {
        dispatch(getUser(user.email));
      } else {
        dispatch(toggleLoading());
      }
    });
  }, []);
  const notify = () => {
    toast("Tweet URL coppied.", {
      autoClose: 2500,
      type: "error", //success, error, warning
    });
  };
  return (
    <>
      <Head>
        <title>Onedemic</title>
        <meta
          name="description"
          content="Onedemic - an online examination platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <button className='btn btn-primary' onClick={notify}>hello</button> */}
        {/* <Login></Login> */}
        {/* <Signup></Signup> */}
      </main>
    </>
  );
}
