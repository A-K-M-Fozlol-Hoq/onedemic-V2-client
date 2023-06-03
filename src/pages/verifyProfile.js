//external imports
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import { logout } from "@/features/auth/authSlice";
import auth from "@/firebase/firebase.config";
import { notify } from "@/helpers/utilsFuctions";
import { useRouter } from "next/router";

const Index = () => {
  const dispatch = useDispatch();
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  const { push } = useRouter();

  if (email && role) {
    push("/dashboard");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          push("/createProfile");
        }
      } else {
        dispatch(logout());
        push("/login");
      }
    });
  }, [push, dispatch]);

  const handleSendEmail = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          //user is already verified, no need to do anything
        } else {
          sendEmailVerification(user)
            .then(() => {
              notify(
                "Email send successful, please check your inbox" + user.email,
                "success"
              );
            })
            .catch((error) => {
              if (
                error.message === "Firebase: Error (auth/too-many-requests)."
              ) {
                notify(
                  "We send your email before, please check your inbox",
                  "warning"
                );
              } else {
                notify("Something went wrong!", "error");
              }
            });
        }
      } else {
        notify("Please login first to verify profile", "error");
        dispatch(logout());
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-no-repeat bg-cover">
      <div className="p-24 backdrop-blur-md bg-white/20 rounded-lg">
        <h1 className="text-4xl font-semibold">Verify Your Profile</h1>
        <button
          onClick={handleSendEmail}
          className="px-6 py-3 mt-5 bg-indigo-800 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-teal-400 text-2xl text-white font-semibold rounded-lg w-full"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default Index;
