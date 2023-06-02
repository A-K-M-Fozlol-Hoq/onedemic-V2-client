import PrivateComponent from "@/components/HOC/PrivateComponent";
import ManageProfile from "@/components/dashboard/shared/ManageProfile";
import React from "react";
import { useSelector } from "react-redux";

const Index = () => {
  return (
    <PrivateComponent>
      <ManageProfile></ManageProfile>
    </PrivateComponent>
  );
};

export default Index;
