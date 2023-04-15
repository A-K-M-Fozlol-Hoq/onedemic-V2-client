//external imports
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import auth from "@/firebase/firebase.config";
import { notify } from "@/helpers/utilsFuctions";
import { useRouter } from "next/router";
import { logout } from "@/features/auth/authSlice";

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
    <div>
      <h1>Verify your profile</h1>
      <button onClick={handleSendEmail}>send email</button>
    </div>
  );
};

export default Index;
