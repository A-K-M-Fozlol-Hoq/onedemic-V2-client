//external imports
import Head from "next/head";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//internal imports
import { getUser, toggleLoading } from "../features/auth/authSlice";
import auth from "../firebase/firebase.config";

export default function Home() {
  // const dispatch = useDispatch();
  const { push } = useRouter();

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
        <button onClick={() => push("/login")}>login route</button>
        <button onClick={() => push("/signup")}>signup route</button>
      </main>
    </>
  );
}
