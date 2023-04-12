//external imports
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";

//internal imports
import auth from "@/firebase/firebase.config";
import { notify } from "@/helpers/utilsFuctions";

const Index = () => {
  const dispatch = useDispatch();

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
