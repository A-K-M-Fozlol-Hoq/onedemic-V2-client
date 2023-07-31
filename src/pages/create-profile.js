//external imports
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

//internal imports
import CreateProfile from "@/components/createProfile/CreateProfile";
import PrivateComponent from "@/components/HOC/PrivateComponent";

const Index = () => {
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;
  const role = user?.role;
  const { push } = useRouter();

  if (email && role) {
    push("/dashboard/manage-profile");
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
