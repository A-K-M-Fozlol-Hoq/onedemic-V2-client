//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ManageProfile from "@/components/dashboard/shared/ManageProfile";

const Index = () => {
  return (
    <PrivateComponent>
      <ManageProfile></ManageProfile>
    </PrivateComponent>
  );
};

export default Index;
