import Head from "next/head";
import { toast } from "react-toastify";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { getUser, toggleLoading } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // //hooks
  // const dispatch = useDispatch();
  const { push } = useRouter();

  // //capture user info at this useEffect
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log(user, "this is the user", user.emailVerified);
  //     if (user) {
  //       if (!user.emailVerified) {
  //         sendEmailVerification(user)
  //           .then(() => {
  //             console.log("Verification email sent.");
  //           })
  //           .catch((error) => {
  //             if (
  //               error.message === "Firebase: Error (auth/too-many-requests)."
  //             ) {
  //               console.log(
  //                 "we sent you an verification email, please check your inbox and try again"
  //               );
  //             }
  //             console.error(
  //               error,
  //               "failed to sent email verification",
  //               error.message,
  //               error.msg
  //             );
  //           });
  //       }
  //       // dispatch(getUser(user.email));
  //     } else {
  //       dispatch(toggleLoading());
  //     }
  //   });
  // }, []);

  const notify = () => {
    toast("This is your test message.", {
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
        <button className="btn btn-primary" onClick={notify}>
          hello
        </button>
        <button onClick={() => push("/login")}>login route</button>
        <button onClick={() => push("/signup")}>signup route</button>
      </main>
    </>
  );
}
