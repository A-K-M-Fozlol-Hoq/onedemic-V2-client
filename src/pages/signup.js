//external imports
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

//internal imports
import Signup from "@/components/authentication/Signup";
import auth from "@/firebase/firebase.config";

const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        push("/dashboard");
      }
    });
  }, [push]);

  return (
    <div>
      <Signup></Signup>
    </div>
  );
};

export default Index;
