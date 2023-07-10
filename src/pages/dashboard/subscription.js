//internal imports
import React from "react";

//external imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import Subscription from "@/components/dashboard/shared/Subscription/";

const Index = () => {
  return (
    <PrivateComponent>
      <Subscription />
    </PrivateComponent>
  );
};

export default Index;
