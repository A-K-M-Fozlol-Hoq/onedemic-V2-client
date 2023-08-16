//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ManageResult from "@/components/dashboard/teacher/manageResult";

const Index = () => {
  return (
    <PrivateComponent>
      <ManageResult />
    </PrivateComponent>
  );
};

export default Index;
