/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
//external imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

//internal imports
import { notify } from "@/helpers/utilsFuctions";
import auth from "@/firebase/firebase.config";
import {
  getUser,
  logout,
  setUser,
  setUserDetails,
} from "@/features/auth/authSlice";

function PrivateComponent({ children }) {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const {
    user: { accessToken, email, role },
  } = useSelector((state) => state.auth);

  // if (accessToken && email && !role) {
  //   dispatch(getUser({ accessToken, email }));
  // }

  // //@todo: implement refreshTime if you have available time.
  // function refreshToken() {
  //   auth()
  //     .currentUser.getIdToken(true)
  //     .then((token) => {
  //       console.log({ token });
  //       setTimeout(refreshToken, 1000); // refresh token after 55 minutes
  //       // setTimeout(refreshToken, 55 * 60 * 1000); // refresh token after 55 minutes
  //     });
  // }

  //capture user info at this useEffect
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          // dispatch(
          //   getUser({ accessToken: user.accessToken, email: user.email })
          // );
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_DEV_URL}/user/getUser/${user.email}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.accessToken,
              },
            }
          );

          const data = await res.json();
          if (
            data?.user?.role === "student" ||
            data?.user?.role === "teacher"
          ) {
            //dispatch details
            data.user.accessToken = user.accessToken;
            dispatch(setUserDetails(data?.user));
          } else {
            dispatch(
              setUser({
                email: user.email,
                accessToken: user.accessToken,
                uid: user.uid,
              })
            );
          }
        } else {
          dispatch(
            setUser({
              email: user.email,
              accessToken: user.accessToken,
              uid: user.uid,
            })
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
    // @todo: design a loading component and use that component instead of just using this loading h1 tag
    return <h1>Loading...</h1>;
  }
}

export default function (props) {
  return <PrivateComponent {...props} />;
}
