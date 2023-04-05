/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { notify } from "@/helpers/utilsFuctions";
import { useRouter } from "next/navigation";
import auth from "@/firebase/firebase.config";

function PrivateComponent({ children }) {
  //hooks
  const dispatch = useDispatch();
  const { push } = useRouter();

  //capture user info at this useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.emailVerified);
        if (user.emailVerified) {
          // notify("send ");
        } else {
          push("/verifyProfile");
          // sendEmailVerification(user)
          //   .then(() => {
          //     console.log("Verification email sent.");
          //   })
          //   .catch((error) => {
          //     if (
          //       error.message === "Firebase: Error (auth/too-many-requests)."
          //     ) {
          //     }
          //   });
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
