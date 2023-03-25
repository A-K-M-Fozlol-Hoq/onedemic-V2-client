/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import utilsFunctions from "@/helpers/utilsFuctions";
import auth from "@/firebase/firebase.config";
import { toast } from "react-toastify";

function PrivateComponent({ children }) {
  //hooks
  const dispatch = useDispatch();
  const { push } = useRouter();
  //capture user info at this useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // notify();
      console.log(
        user,
        "this is the user",
        user.emailVerified,
        utilsFunctions.notify
      );
      if (user) {
        if (user.emailVerified) {
          // dispatch(getUser(user.email))
          utilsFunctions.notify();
          console.log("notified");
        } else {
          sendEmailVerification(user)
            .then(() => {
              console.log("Verification email sent.");
            })
            .catch((error) => {
              if (
                error.message === "Firebase: Error (auth/too-many-requests)."
              ) {
                console.log(
                  "we sent you an verification email, please check your inbox and try again"
                );
              }
              console.error(
                error,
                "failed to sent email verification",
                error.message,
                error.msg
              );
            });
        }
      } else {
        // dispatch(toggleLoading());
      }
    });
  }, []);

  return <>{children}</>;
}

export default function (props) {
  return <PrivateComponent {...props} />;
}
