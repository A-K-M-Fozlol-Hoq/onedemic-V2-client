import auth from "@/firebase/firebase.config";
import { notify } from "@/helpers/utilsFuctions";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React from "react";

const index = () => {
  const handleSendEmail = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.emailVerified);
        if (user.emailVerified) {
          console.log("already verified");
        } else {
          sendEmailVerification(user)
            .then(() => {
              notify(
                "Email send successful, please check your inbox" + user.email,
                "success"
              );
            })
            .catch((error) => {
              console.log(error, "1234");
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
        // dispatch(toggleLoading());
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

export default index;
