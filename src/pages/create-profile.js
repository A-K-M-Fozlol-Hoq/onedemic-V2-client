//external imports
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

//internal imports
import CreateProfile from "@/components/createProfile/CreateProfile";
import PrivateComponent from "@/components/HOC/PrivateComponent";

const Index = () => {
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  const { push } = useRouter();

  if (email && role) {
    push("/dashboard");
  }

  return (
    <div>
      <PrivateComponent>
        <CreateProfile />
      </PrivateComponent>
    </div>
  );
};

export default Index;
