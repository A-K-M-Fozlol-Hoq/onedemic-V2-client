//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ManageCourse from "@/components/dashboard/shared/ManageCourse";

const Index = () => {
  return (
    <PrivateComponent>
      <ManageCourse />
    </PrivateComponent>
  );
};

export default Index;
