//external imports
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

//internal imports
import Login from "@/components/authentication/Login";
import auth from "@/firebase/firebase.config";

const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log({ user });
      if (user?.email) {
        push("/dashboard/manage-profile");
      }
    });
  }, [push]);

  return (
    <div>
      <Login></Login>
    </div>
  );
};

export default Index;
