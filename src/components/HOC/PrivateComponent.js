/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { notify } from "@/helpers/utilsFuctions";
import { useRouter } from "next/navigation";
import auth from "@/firebase/firebase.config";
import { logout, setUser } from "@/features/auth/authSlice";

function PrivateComponent({ children }) {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const {
    user: { accessToken, email },
  } = useSelector((state) => state.auth);
  console.log(email, accessToken, "email accessToken");

  function refreshToken() {
    auth()
      .currentUser.getIdToken(true)
      .then((token) => {
        console.log({ token });
        setTimeout(refreshToken, 1000); // refresh token after 55 minutes
        // setTimeout(refreshToken, 55 * 60 * 1000); // refresh token after 55 minutes
      });
  }

  //capture user info at this useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.emailVerified);
        if (user.emailVerified) {
          dispatch(
            setUser({ email: user.email, accessToken: user.accessToken })
          );
        } else {
          dispatch(
            setUser({ email: user.email, accessToken: user.accessToken })
          );
          notify("Please verify your email address", "error");
          push("/verifyProfile");
        }
      } else {
        dispatch(logout());
        push("/login");
      }
    });
  }, [push, dispatch]);

  if (email && accessToken) {
    return <>{children}</>;
  } else {
    return <h1>Loading...</h1>;
  }
}

export default function (props) {
  return <PrivateComponent {...props} />;
}
