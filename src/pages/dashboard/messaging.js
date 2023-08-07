//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import Messaging from "@/components/dashboard/shared/Messaging";

const Index = () => {
  return (
    <PrivateComponent>
      <Messaging></Messaging>
    </PrivateComponent>
  );
};

export default Index;
