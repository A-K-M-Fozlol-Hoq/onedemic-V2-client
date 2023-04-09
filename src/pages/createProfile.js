//external imports
import React from "react";

//internal imports
import CreateProfile from "@/components/createProfile/CreateProfile";
import PrivateComponent from "@/components/HOC/PrivateComponent";

const index = () => {
  return (
    <div>
      <PrivateComponent>
        <CreateProfile />
      </PrivateComponent>
    </div>
  );
};

export default index;
